import {memo} from "react";
import './style.css';
import React from "react";

interface IHead {
  title: string,
  children: React.ReactNode
}
function Head({title, children}:IHead){
  return (
    <div className='Head'>
      <div className='Head-place'>
        <h1 >{title}</h1>
      </div>
      <div className='Head-place'>{children}</div>
    </div>
  )
}


export default memo(Head);
