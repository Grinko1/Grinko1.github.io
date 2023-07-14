import { ReactFragment, memo } from "react";
import "./style.css";
import React from "react";

interface ISpinner {
  active: boolean;
  children: React.ReactNode;
}
function Spinner({ active, children }: ISpinner) {
  if (active) {
    return <div className="Spinner">{children}</div>;
  } else {
    return children;
  }
}



export default memo(Spinner);
