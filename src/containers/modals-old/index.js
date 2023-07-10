import Basket from "@src/app/basket";
import AddingToCard from "@src/components/adding-to-card";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import React, { useCallback } from "react";
import useSelector from "@src/hooks/use-selector";
import ModalLayout from "@src/components/modal-layout";
import ModalList from "@src/components/modal-list";

const Modals = () => {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    modals: state.modals.modals,
    selectedList: state.catalog_copy?.selectedList,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id, qtt) => {
        store.actions.basket.addToBasket(_id, qtt);
      },
      [store]
    ),
    //добавление массива в корзину
    addArrayToBasket: useCallback(
      (list) => {
        store.actions.basket.addArrayToBasket(list);
      },
      [store]
    ),
    //закрытие модалки
    closeModal: useCallback(
      (name) => {
        store.actions.modals.close(name);
      },
      [store]
    ),
    //сброс выделенных айтемов
    resetListToCart: useCallback(() => {
      store.actions.catalog_copy?.resetWaitingList();
    }, [store]),
  };

  //закрытие модалки с листом товаров
  const closeModalList = (cb) => {
    if (select.selectedList.length) {
      cb(callbacks.addArrayToBasket(select.selectedList));
    }
    cb();
    callbacks.resetListToCart();
  };

  return (
    <div>
      {select.modals &&
        select.modals.map(
          (item) =>
            (item.name === "basket" && (
              <Basket key={item.name} onClose={item.close} />
            )) ||
            (item.name === "listToCart" && (
              <ModalList
                key={item.name}
                closeModal={() => closeModalList(item.close)}
              />
            )) ||
            (item.name === "add" && (
              <AddingToCard
                key={item.name}
                onAdd={callbacks.addToBasket}
                closeModal={item.close}
                _id={item.props.productId}
                t={t}
              />
            )) ||
            (item.name === "example" && (
              <ModalLayout
                key={item.name}
                title={"example"}
                labelClose={t("basket.close")}
                onClose={item.close}
              >
                nothing{" "}
                <button
                  onClick={() =>
                    item.close(
                      callbacks.addToBasket("64845d45f4686f573a2287c6")
                    )
                  }
                >
                  Close
                </button>
              </ModalLayout>
            ))
        )}
    </div>
  );
};

export default Modals;
