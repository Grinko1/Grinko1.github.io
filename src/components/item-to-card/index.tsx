import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Input from "@src/components/input";
import React from "react";

interface IItemToCard {
  qtt: number;
  setQtt: (num?: number) => void;
  onClose: ({}:any) => void;
  t: (str: string) => string;
  productId?:string;
}

function ItemToCard(props:IItemToCard) {
  const cn = bem("ItemToCard");

  //уменьшение к-ва
  const decreasedQtt = () => {
    if (props.qtt > 0) {
      props.setQtt(+props.qtt - 1);
    }
  };
  //добавление к-ва
  const increasedQtt = () => {
    props.setQtt(+props.qtt + 1);
  };

  //добавление в корзину
  const callbacks = {
    onAdd: () => {
      if (props.qtt > 0) {
        const productId = props.productId;
        const qtt = props.qtt;
        props.onClose({ productId, qtt });
      }
    },
  };

  return (
    <>
      <div className={cn()}>
        <div className={cn("qtt")}>
          <button onClick={decreasedQtt}>-</button>

          <Input value={props.qtt} onChange={props.setQtt} type="number" />
          <button onClick={increasedQtt}>+</button>
        </div>
        <div className={cn("actions")}>
          <button onClick={props.onClose}>{props.t("basket.cancel")}</button>
          <button onClick={callbacks.onAdd}>{props.t("article.add")}</button>
        </div>
      </div>
    </>
  );
}

export default memo(ItemToCard);
