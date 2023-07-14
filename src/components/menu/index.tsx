import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';
import React from "react";
import { Item } from "./types";

interface IMenu {
items:Item[] ,
onNavigate:(arg0: Item) => void
}

function Menu({items, onNavigate}:IMenu) {
  const cn = bem('Menu');
  return (
    <ul className={cn()}>
      {items.map(item => (
        <li key={item.key} className={cn('item')}>
          <Link to={item.link} onClick={() => onNavigate(item)}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}



export default memo(Menu);
