import ItemToCard from "@src/components/item-to-card";
import ModalLayout from "@src/components/modal-layout";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import React, { useCallback, useState } from "react";

const AddingToCard = ({ onClose, ...props }) => {
  const [qtt, setQtt] = useState(1);
  const store = useStore();
  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    onAdd: useCallback(
      (_id, qtt) => {
        store.actions.basket.addToBasket(_id, qtt);
      },
      [store]
    ),
  };

  return (
    <>
      <ModalLayout
        title="Добавить в корзину"
        labelClose={t("basket.close")}
        onClose={onClose}
      >
        <ItemToCard
          onClose={onClose}
          onAdd={callbacks.onAdd}
          qtt={qtt}
          setQtt={setQtt}
          t={t}
          {...props}
        />
      </ModalLayout>
    </>
  );
};

export default AddingToCard;
