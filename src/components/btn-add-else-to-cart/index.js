import './style.css';
import { cn as bem } from "@bem-react/classname";

const BtnAddElseToCart = (props) => {
    const callbacks = {
      openModalBasket: () => props.openModalBasket(),
    };
      const cn = bem("AddElseToCart");
    return (
      <div className={cn()}>
        <button className={cn("button")} onClick={callbacks.openModalBasket}>
          Добавить
        </button>
      </div>
    );
};

export default BtnAddElseToCart;