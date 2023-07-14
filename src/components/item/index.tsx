import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "@src/utils/number-format";
import "./style.css";
import { Link } from "react-router-dom";
import React from "react";
import { Product } from "@src/general-types";

interface IItem {
  openModalBasket: (arg0: PropsToOpen) => void;
  item: Product;
  link: string;
  labelCurr?: string;
  labelAdd?: string;
}
type PropsToOpen = {
  productId: string;
};

function Item(props: IItem) {
  const cn = bem("Item");

  const callbacks = {
    openModalBasket: async () => {
      props.openModalBasket({ productId: props.item._id });
    },
  };

  return (
    <>
      <div className={cn()}>
        <div className={cn("title")}>
          <Link to={props.link}>{props.item.title}</Link>
        </div>
        <div className={cn("actions")}>
          <div className={cn("price")}>
            {numberFormat(props.item.price)} {props.labelCurr}
          </div>
          <button onClick={callbacks.openModalBasket}>{props.labelAdd}</button>
        </div>
      </div>
    </>
  );
}

export default memo(Item);
