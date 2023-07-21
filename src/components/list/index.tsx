import { memo, useState } from "react";
import Item from "../item";
import "./style.css";
import React from "react";
import { Product } from "@src/general-types";

interface IList {
  list: Item[] | undefined;
  renderItem: (el: Item) => React.ReactNode;
}
interface Item {
  _id: string;
}
function List({ list = [], renderItem }: IList) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item._id} className="List-item">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default memo(List);
