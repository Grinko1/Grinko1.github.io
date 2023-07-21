import { Option } from "@src/components/custom-select";
import StoreModule from "../module";
import { Config } from "../types";
import { InitStateCountries } from "./types";

/**
 * Список стран
 */

class CountriesState extends StoreModule<Config, InitStateCountries> {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): InitStateCountries {
    return {
      list: [],
      waiting: false,
      total: 0,
      canLoad: true,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(skip = 0) {

    skip = skip * 10;

    this.setState(
      { ...this.getState(), waiting: true },
      "Ожидание загрузки country"
    );

    let res = await this.services.api.request({
      url: `/api/v1/countries?lang=ru&search%5Bquery%5D=&limit=10&skip=${skip}&fields=items(*),count`,
    });

    if (skip > 0) {
      let restSkip = Math.ceil(res.data.result.count / skip);

      console.log(restSkip, "this.getState().total/ skip");
      if (restSkip === 1) {
        this.setState({
          ...this.getState(),
          canLoad: false,
        });
      } else {
        this.setState({
          ...this.getState(),
          canLoad: true,
        });
      }
    }

    // Товар загружен успешно

    this.setState(
      {
        ...this.getState(),
        list: [...this.getState().list, ...res.data.result.items],
        waiting: false,
        total: res.data.result.count,
      },
      "Contries загружены"
    );
  }

 
  async search(title = "", skip = 0) {
    skip = skip * 10;

    this.setState(
      { ...this.getState(), waiting: true },
      "Ожидание загрузки country"
    );

    let res = await this.services.api.request({
      url: `/api/v1/countries?lang=ru&search%5Bquery%5D=${title}&limit=10&skip=${skip}&fields=items(*),count`,
    });


    if (skip > 0) {
      let restSkip = Math.ceil(res.data.result.count / skip);
      if (restSkip === 1) {
        this.setState({
          ...this.getState(),
          canLoad: false,
          waiting: false,
          total: res.data.result.count,
        });
      } else {
        this.setState({
          ...this.getState(),
          canLoad: true,
          list: [...this.getState().list, ...res.data.result.items],
          waiting: false,
          total: res.data.result.count,
        });
      }
    } else {
      this.setState(
        {
          ...this.getState(),
          list: [...res.data.result.items],
          waiting: false,
          total: res.data.result.count,
          canLoad: true,
        },
        "Contries загружены"
      );
    }

    // Товар загружен успешно
  }

}

export default CountriesState;
