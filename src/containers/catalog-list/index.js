import { memo, useCallback, useState } from "react";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import Item from "@src/components/item";
import List from "@src/components/list";
import Pagination from "@src/components/pagination";
import Spinner from "@src/components/spinner";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import ItemBasketModal from "@src/components/item-basket-modal";

function CatalogList(props) {
  const store = useStore();
  const select = useSelector((state) => ({
    list: state.catalog.list,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,

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
        store.actions.catalog.selectItem(_id);
      },
      [store]
    ),

    openModal: useCallback(
      (name, id) => {
        store.actions.modals.open(name, id);
      },
      [store]
    ),
    // Пагинация
    onPaginate: useCallback(
      (page) => store.actions.catalog.setParams({ page }),
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

  const openModalAndGetId = (_id) => {
    callbacks.openModal("add", _id);
  };


  const renders = {
    item: useCallback(
      (item) => (
        <>
          {props.useId === "modal_list_to_add" ? (
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
