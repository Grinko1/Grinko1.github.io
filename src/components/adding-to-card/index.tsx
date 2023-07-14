import ItemToCard from "@src/components/item-to-card";
import ModalLayout from "@src/components/modal-layout";
import React, { useState } from "react";


interface IAddingToCard {
  t: (arg0: string) => string;
  closeModal: ({}?:any) => void;
}
const AddingToCard = ({ t, closeModal }: IAddingToCard) => {
  const [qtt, setQtt] = useState<number>(1);

  return (
    <>
      <ModalLayout
        title="Добавить в корзину"
        labelClose={t("basket.close")}
        onClose={closeModal}
      >
        <ItemToCard
          onClose={closeModal}
          qtt={qtt}
          setQtt={setQtt}
          t={t}
        />
      </ModalLayout>
    </>
  );
};

export default AddingToCard;
