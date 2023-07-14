import { memo, useCallback, useEffect } from "react";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import ItemBasket from "@src/components/item-basket";
import List from "@src/components/list";
import ModalLayout from "@src/components/modal-layout";
import BasketTotal from "@src/components/basket-total";
import BtnAddElseToCart from "@src/components/btn-add-else-to-cart";
import useInit from "@src/hooks/use-init";
import React from "react";
import { Product } from "@src/general-types";
import { TStore } from "@src/store/types";

interface IBasket {
  onClose: () => void;
}
function Basket({ onClose }: IBasket) {
  const store = useStore();

  useInit(() => {
    store.createModule("catalog_copy", "catalog", { saveUrl: false });
    store.actions.catalog_copy.initParams({});
  });

  useEffect(() => {
    return () => {
      store.removeModule("catalog_copy");
    };
  }, []);

  const select = useSelector((state: TStore) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id: string) => store.actions.basket.removeFromBasket(_id),
      [store]
    ),
    openModal: useCallback(async () => {
      const res = await store.actions.modals.open("ModalList");
      if (res) {
        store.actions.basket.addArrayToBasket(res);
        store.actions.catalog_copy?.resetWaitingList();
      }
    }, [store]),
  };

  const { t }: any = useTranslate();

  const renders = {
    itemBasket: useCallback(
      (item: Product) => (
        <ItemBasket
          item={item}
          link={`/articles/${item._id}`}
          onRemove={callbacks.removeFromBasket}
          onLink={onClose}
          labelUnit={t("basket.unit")}
          labelDelete={t("basket.delete")}
          labelCurr=" ₽"
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
