import ItemToCard from "@src/components/item-to-card";
import ModalLayout from "@src/components/modal-layout";
import useTranslate from "@src/hooks/use-translate";
import React, { useState } from "react";

interface IAddingToCard {
  onClose: () => void;
  productId?: string;
  props: TProps;
}
type TProps = {
  productId?: string;
};
const AddingToCard = ({ onClose, props }: IAddingToCard) => {
  const [qtt, setQtt] = useState<number>(1);
  const { t }: any = useTranslate();

  return (
    <>
      <ModalLayout
        title="Добавить в корзину"
        labelClose={t("basket.close")}
        onClose={onClose}
      >
        <ItemToCard
          onClose={onClose}
          qtt={qtt}
          setQtt={setQtt}
          t={t}
          productId={props.productId}
        />
      </ModalLayout>
    </>
  );
};

export default AddingToCard;
