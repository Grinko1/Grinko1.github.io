import {memo} from "react";
import './style.css';
import React from "react";

interface IControls {
  onAdd:()=>void
}
function Controls({onAdd}:IControls){
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>Добавить</button>
    </div>
  )
}



export default memo(Controls);
