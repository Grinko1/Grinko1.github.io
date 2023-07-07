import ItemToCard from "@src/components/item-to-card";
import ModalLayout from "@src/components/modal-layout";
import React, { useState } from "react";


const AddingToCard = ({ t,...props}) => {
  const [qtt, setQtt] = useState(1);


  const callbacks = {
    closeModal: () => props.closeModal('add'),
  };


  return (
    <>
      <ModalLayout
        title='Добавить в корзину'
        labelClose={t("basket.close")}
        onClose={callbacks.closeModal}
      >
        <ItemToCard
          onClose={callbacks.closeModal}
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
