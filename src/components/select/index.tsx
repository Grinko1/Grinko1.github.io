import { memo } from "react";
import "./style.css";
import React from "react";

interface ISelect {
  onChange: (arg0?: string) => void;
  options: Options[];
  value: string;
}
interface Options {
  value: string | number;
  title: string;
}
function Select(props: ISelect) {
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {props.options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

export default memo(Select);
