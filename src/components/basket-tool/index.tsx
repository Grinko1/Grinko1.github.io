import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import numberFormat from "@src/utils/number-format";
import './style.css';
import React from "react";


interface IBasketTool {
  sum:number, 
  amount: number,
  onOpen: () => void,
  t:(str: string, amount?: number) => string
}
function BasketTool({sum, amount, onOpen, t}:IBasketTool) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('basket.inBasket')}</span>
      <span className={cn('total')}>
        {amount
          ? 
          `${amount} ${t('basket.articles', amount)} / ${numberFormat(sum)} ₽`
          : t('basket.empty')
        }
      </span>
      <button onClick={onOpen}>{t('basket.open')}</button>
    </div>
  );
}



export default memo(BasketTool);
