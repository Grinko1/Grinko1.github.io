import { ReactComponentElement, memo, useCallback, useState } from "react";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import Item from "@src/components/item";
import List from "@src/components/list";
import Pagination from "@src/components/pagination";
import Spinner from "@src/components/spinner";
import ItemBasketModal from "@src/components/item-basket-modal";
import React from "react";
import { Product } from "@src/general-types";
import { TModuleNames, TStore } from "@src/store/types";

interface ICatalogList {
  moduleName: string;
}
type OpenModalParams = {
  productId?: string;
};
function CatalogList(props: ICatalogList) {
  const store = useStore();
  const moduleName = props.moduleName || "catalog";

  const select = useSelector((state: TStore) => ({
    page: state[moduleName].params.page,
    limit: state[moduleName].params.limit,
    sort: state[moduleName].params.sort,
    query: state[moduleName].params.query,
    count: state[moduleName].count,
    waiting: state[moduleName].waiting,
    list: state[moduleName].list,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id: string, qtt: number) => {
        store.actions.basket.addToBasket(_id, qtt);
      },
      [store]
    ),
    removeFromBasket: useCallback(
      (_id: string) => {
        store.actions.basket.removeFromBasket(_id);
      },
      [store]
    ),
    select: useCallback(
      (_id: string) => {
        store.actions[moduleName]?.selectItem(_id);
      },
      [store]
    ),

    openModal: useCallback(
      async (name: string, { productId }: OpenModalParams) => {
        const res = await store.actions.modals.open(name, { productId });
        if (res && res.qtt) {
          await store.actions.basket.addToBasket(res.productId, res.qtt);
        }
      },
      [store]
    ),
    // Пагинация
    onPaginate: useCallback(
      (page: number) => store.actions[moduleName]?.setParams({ page }),
      [store]
    ),
    // генератор ссылки для пагинатора

    makePaginatorLink: useCallback(
      (page: any): string => {
        return `?${new URLSearchParams({
          page,
          limit: select.limit,
          sort: select.sort,
          query: select.query,
        })}`;
      },
      [select.limit, select.sort, select.query]
    ),
  };

  const { t }: any = useTranslate();

  const openModalAndGetId = ({ productId: _id }: OpenModalParams) => {
    callbacks.openModal("AddingToCart", { productId: _id });
  };

  const renders = {
    item: useCallback(
      (item: Product) => (
        <>
          {moduleName === "catalog_copy" ? (
            <ItemBasketModal
              item={item}
              link={`/articles/${item._id}`}
              select={callbacks.select}
              labelCurr=" ₽"
            />
          ) : (
            <Item
              item={item}
              openModalBasket={openModalAndGetId}
              link={`/articles/${item._id}`}
              labelAdd={t("article.add")}
              labelCurr=" ₽"
            />
          )}
        </>
      ),

      [openModalAndGetId, t]
    ),
  };

  return (
    <Spinner active={select.waiting}>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        count={select.count}
        page={select.page}
        limit={select.limit}
        onChange={callbacks.onPaginate}
        makeLink={callbacks.makePaginatorLink}
      />
    </Spinner>
  );
}

export default memo(CatalogList);
