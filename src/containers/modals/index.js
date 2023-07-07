import Basket from "@src/app/basket";
import AddingToCard from "@src/components/adding-to-card";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import React, { useCallback } from "react";
import useSelector from "@src/hooks/use-selector";
import ListToCard from "../list-to-card";


const Modals = () => {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    modals: state.modals.modals,
    listToCart: state.catalog.selectedList,
    list: state.basket.list,
  }));

  console.log(select.listToCart, " listToCart");
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id, qtt) => {
        store.actions.basket.addToBasket(_id, qtt);
      },
      [store]
    ),
    closeModal: useCallback(
      (name) => {
        store.actions.modals.close(name);
      },
      [store, select.listToCart]
    ),
    resetListToCart: useCallback(() => {
      store.actions.catalog.resetWaitingList();
    }, [store]),
    addArrayToBasket: useCallback(
      (list) => {
        store.actions.basket.addArrayToBasket(list);
      },
      [store]
    ),
  };

  const closeModalListToCart =  async() => {
    if (select.listToCart.length) {
      callbacks.addArrayToBasket(select.listToCart);
    }
    callbacks.closeModal("listToCart");
    callbacks.resetListToCart();
  };

  return (
    <div>
      {select.modals &&
        select.modals.map(
          (item) =>
            (item.name === "basket" && (
              <Basket
                key={item.name}
                // listToCart={select.listToCart}
                closeModal={callbacks.closeModal}
              />
            )) ||
            (item.name === "listToCart" && (
              <ListToCard
                key={item.name}
                closeModal={closeModalListToCart}
                doubleUsage={true}
                useId='modal_list_to_add'
              />
            )) ||
            (item.name === "add" && (
              <AddingToCard
                key={item.name}
                onAdd={callbacks.addToBasket}
                closeModal={callbacks.closeModal}
                _id={item.id}
                t={t}
              />
            ))
        )}
    </div>
  );
};

export default Modals;
