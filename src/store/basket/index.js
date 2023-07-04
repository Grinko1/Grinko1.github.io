import StoreModule from "../module";

/**
 * Покупательская корзина
 */
class BasketState extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id {String} Код товара
   */
  async addToBasket(_id, qtt) {
    let sum = 0;
    let newQtt = qtt ? qtt : 1;

    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map((item) => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине

        result = { ...item, amount: item.amount + newQtt };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.

      const res = await this.services.api.request({
        url: `/api/v1/articles/${_id}`,
      });
      const item = res.data.result;
      let newItem = { ...item, amount: newQtt };
      list.push(newItem); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += item.price * newItem.amount;
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      "Добавление в корзину"
    );
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter((item) => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      "Удаление из корзины"
    );
  }
}

export default BasketState;
