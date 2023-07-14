import { memo, useEffect, useState } from "react";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "@src/utils/number-format";
import "./style.css";
import { Link } from "react-router-dom";
import React from "react";
import { Product } from "@src/general-types";

interface IItemBasketModal {
  item: Product;
  labelCurr?: string;
  link: string;
  select: (arg0: string) => void;
  labelAdd?:string
}

function ItemBasketModal(props: IItemBasketModal) {
  const cn = bem("ItemBasketModal");
  const [isSelected, setIsSelected] = useState(false);

  const callbacks = {
    select: () => {
      setIsSelected(!isSelected);
      props.select(props.item._id);
    },
  };

  return (
    <>
      <div className={cn({ selected: isSelected })} onClick={callbacks.select}>
        <div className={cn("title")}>
          <Link to={props.link}>{props.item.title}</Link>
        </div>
        <div className={cn("actions")}>
          <div className={cn("price")}>
            {numberFormat(props.item.price)} {props.labelCurr}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(ItemBasketModal);
