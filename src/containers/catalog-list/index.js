import { memo, useCallback, useState } from "react";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import Item from "@src/components/item";
import List from "@src/components/list";
import Pagination from "@src/components/pagination";
import Spinner from "@src/components/spinner";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import modalsActions from "@src/store-redux/modals/actions";
import AddingToCard from "@src/components/adding-to-card";

function CatalogList() {
  const store = useStore();
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    list: state.catalog.list,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
  }));

  const [itemId, setItemId] = useState(null);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id, qtt) => {
        store.actions.basket.addToBasket(_id, qtt);
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
    openModalBasket: useCallback(() => {
      dispatch(modalsActions.open("add"));
    }, [store]),
    closeModal: useCallback(() => {
      dispatch(modalsActions.close());
    }, [store]),
  };

  const { t } = useTranslate();
  const activeModal = useSelectorRedux((state) => state.modals.name);


  const openModalAndGetId = (_id) => {
    setItemId(_id);
    callbacks.openModalBasket();
  };

  const renders = {
    item: useCallback(
      (item) => (
        <>
          <Item
            item={item}
            openModalBasket={openModalAndGetId}
            link={`/articles/${item._id}`}
            labelAdd={t("article.add")}
            activeModal={activeModal}
          />
          {activeModal === "add" && (
            <AddingToCard
              onAdd={callbacks.addToBasket}
              closeModal={callbacks.closeModal}
              _id={itemId}
              t={t}
            />
          )}
        </>
      ),
      [callbacks.openModalBasket, t, activeModal]
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
