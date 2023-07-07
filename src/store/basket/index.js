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
      waiting: false,
    };
  }


  async addArrayToBasket(arr, qtt) {
    let sum = 0;
    let newQtt = qtt || 1;
    let list = [...this.getState().list];
    let listNewItems = [];

    for (let el of arr) {
      const itemExists = list.find((item) => item._id === el._id);

      if (itemExists) {
        const index = list.indexOf(itemExists);
        const result = { ...list[index], amount: list[index].amount + newQtt };
        
        list.splice(index, 1, result); // ??

        sum += result.price * result.amount;
      } else {
        const request = this.services.api.request({
          url: `/api/v1/articles/${el._id}`,
        });

        listNewItems = [...listNewItems, request];
      }
    }

    const waitingList = await Promise.all(listNewItems);

    for (let res of waitingList) {
      const item = res.data.result;
      list.push({ ...item, amount: newQtt }); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += item.price * newQtt;
    }

    // Обновляем состояние
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
   * Добавление товара в корзину
   * @param _id {String} Код товара
   */
  async addToBasket(_id, qtt) {
    let sum = 0;
    let newQtt = qtt ? qtt : 1;
    let list;

    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;

    list = this.getState().list.map((item) => {
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
      const item = await res.data.result;
      let newItem = { ...item, amount: newQtt };
      // list.push(newItem); // list уже новый, в него можно пушить.
      list = [...list, newItem];
      // Добавляем к сумме.
      sum += item.price * newItem.amount;
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
        waiting: false,
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
