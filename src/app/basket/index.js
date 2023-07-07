import { memo, useCallback } from "react";
import { useDispatch, useStore as useStoreRedux } from "react-redux";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import ItemBasket from "@src/components/item-basket";
import List from "@src/components/list";
import ModalLayout from "@src/components/modal-layout";
import BasketTotal from "@src/components/basket-total";
import modalsActions from "@src/store-redux/modals/actions";
import BtnAddElseToCart from "@src/components/btn-add-else-to-cart";

function Basket() {
  const store = useStore();
  const dispatch = useDispatch();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.actions.basket.removeFromBasket(_id),
      [store,]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(
      (name) => {
        store.actions.modals.close("basket");
        // dispatch(modalsActions.close("basket"));
      },
      [store ]
    ),
    openModalBasket: useCallback(() => {
      dispatch(modalsActions.open("addElseToCart"));
    }, [store]),
    openModal: useCallback(
      (name) => {
        store.actions.modals.open("listToCart");
      },
      [store]
    ),
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => {
        store.actions.basket.addToBasket(_id);
      },
      [store]
    ),
  };

  const { t } = useTranslate();



  const onClose = () => {
     callbacks.closeModal("basket");
}

  const renders = {
    itemBasket: useCallback(
      (item) => (
        <ItemBasket
          item={item}
          link={`/articles/${item._id}`}
          onRemove={callbacks.removeFromBasket}
          onLink={onClose}
          labelUnit={t("basket.unit")}
          labelDelete={t("basket.delete")}
        />
      ),
      [callbacks.removeFromBasket, t]
    ),
  };

  return (
    <ModalLayout
      title={t("basket.title")}
      labelClose={t("basket.close")}
      onClose={onClose}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} t={t} />
      <BtnAddElseToCart openModalBasket={callbacks.openModal} />
    </ModalLayout>
  );
}

export default memo(Basket);
