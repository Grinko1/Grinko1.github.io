import { memo, useCallback, useState } from "react";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import Item from "@src/components/item";
import List from "@src/components/list";
import Pagination from "@src/components/pagination";
import Spinner from "@src/components/spinner";
import ItemBasketModal from "@src/components/item-basket-modal";

function CatalogList(props) {
  const store = useStore();
  const moduleName = props.moduleName || "catalog";

  const select = useSelector((state) => ({
    page: state[moduleName].params.page,
    limit: state[moduleName].params.limit,
    count: state[moduleName].count,
    waiting: state[moduleName].waiting,
    list: state[moduleName].list,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id, qtt) => {
        store.actions.basket.addToBasket(_id, qtt);
      },
      [store]
    ),
    removeFromBasket: useCallback(
      (_id) => {
        store.actions.basket.removeFromBasket(_id);
      },
      [store]
    ),
    select: useCallback(
      (_id) => {
        store.actions[moduleName]?.selectItem(_id);
      },
      [store]
    ),

    openModal: useCallback(
      async (name, { productId, qtt }) => {
        const res = await store.actions.modals.open(name, { productId, qtt });
        if (res) {
          await store.actions.basket.addToBasket(res.productId, res.qtt);
        }
      },
      [store]
    ),
    // Пагинация
    onPaginate: useCallback(
      (page) => store.actions[moduleName]?.setParams({ page }),
      [store]
    ),
    // генератор ссылки для пагинатора
    makePaginatorLink: useCallback(
      (page) => {
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

  const { t } = useTranslate();

  const openModalAndGetId = ({ productId: _id }) => {
    callbacks.openModal("AddingToCart", { productId: _id });
  };

  const renders = {
    item: useCallback(
      (item) => (
        <>
          {moduleName === "catalog_copy" ? (
            <ItemBasketModal
              item={item}
              openModalBasket={openModalAndGetId}
              link={`/articles/${item._id}`}
              labelAdd={t("article.add")}
              select={callbacks.select}
            />
          ) : (
            <Item
              item={item}
              openModalBasket={openModalAndGetId}
              link={`/articles/${item._id}`}
              labelAdd={t("article.add")}
            />
          )}
        </>
      ),
      [callbacks.openModalBasket, t]
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
