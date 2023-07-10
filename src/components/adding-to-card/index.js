import ItemToCard from "@src/components/item-to-card";
import ModalLayout from "@src/components/modal-layout";
import React, { useState } from "react";

const AddingToCard = ({ t, closeModal, ...props }) => {
  const [qtt, setQtt] = useState(1);
  
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
          {...props}
        />
      </ModalLayout>
    </>
  );
};

export default AddingToCard;
