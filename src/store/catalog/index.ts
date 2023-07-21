import StoreModule from "../module";
import exclude from "@src/utils/exclude";
import { InitStateCatalog, StateCatalogConfig, ValidParams } from "./types";
import { Product } from "@src/general-types";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */

class CatalogState extends StoreModule<StateCatalogConfig, InitStateCatalog> {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): InitStateCatalog {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: "order",
        query: "",
        category: "",
        madeIn: "",
      },
      count: 0,
      waiting: false,
      selectedList: [],
      selectedCountry: [],
      selectedCountryIds: [],
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams: object = {}): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams: ValidParams = {};

    if (this.config) {
      if (urlParams.has("page"))
        validParams.page = Number(urlParams.get("page")) || 1;
      if (urlParams.has("limit"))
        validParams.limit = Math.min(Number(urlParams.get("limit")) || 10, 50);

      if (urlParams.has("sort")) validParams.sort = urlParams.get("sort");

      if (urlParams.has("query")) validParams.query = urlParams.get("query");
      if (urlParams.has("category"))
        validParams.category = urlParams.get("category");
      if (urlParams.has("madeIn")) validParams.madeIn = urlParams.get("madeIn");
    }

    await this.setParams(
      { ...this.initState().params, ...validParams, ...newParams },
      true
    );
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams: object = {}): Promise<void> {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(
    newParams: object = {},
    replaceHistory: boolean = false
  ): Promise<void> {
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      "Установлены параметры каталога"
    );

    // Сохранить параметры в адрес страницы

    if (this.config) {
      let urlSearch = new URLSearchParams(
        exclude(params, this.initState().params)
      ).toString();
      const url =
        window.location.pathname +
        (urlSearch ? `?${urlSearch}` : "") +
        window.location.hash;
      if (replaceHistory) {
        window.history.replaceState({}, "", url);
      } else {
        window.history.pushState({}, "", url);
      }
    }

    const apiParams = exclude(
      {
        limit: params.limit,
        skip: (params.page - 1) * params.limit,
        fields: "items(*),count",
        sort: params.sort,
        "search[query]": params.query,
        "search[category]": params.category,
        "search[madeIn]": params.madeIn,
      },
      {
        skip: 0,
        "search[query]": "",
        "search[category]": "",
        "search[madeIn]": "",
      }
    );

    const res = await this.services.api.request({
      url: `/api/v1/articles?${new URLSearchParams(apiParams)}`,
    });
    this.setState(
      {
        ...this.getState(),
        list: res.data.result.items,
        count: res.data.result.count,
        waiting: false,
      },
      "Загружен список товаров из АПИ"
    );
  }

  selectItem(_id: string) {
    let exist = false;
    let selectedList = [...this.getState().selectedList];

    const filterById = (arr: Product[], id: string) => {
      return arr.filter((item) => item._id !== id);
    };

    this.getState().list.map((item: Product) => {
      if (item._id === _id) {
        item.selected = !item.selected;
        if (item.selected === true) {
          selectedList.map((i) => {
            if (i._id === item._id) {
              exist = true;
              selectedList = filterById(selectedList, _id); //redo
              return;
            }
          });
          if (!exist) {
            selectedList.push(item);
            item.selected = true;
          }
        } else {
          selectedList = filterById(selectedList, _id);
        }
      } else {
        item.selected = false;
      }
    });

    this.setState({
      ...this.getState(),
      selectedList,
    });
  }

  resetWaitingList() {
    this.setState({
      ...this.getState(),
      selectedList: [],
    });
  }
  async loadSelectedCountry() {
    let id = this.getState().params.madeIn;
    console.log(id, id.length, "id");
    let idsForArr:any;
    if (id.length > 1) {
      idsForArr = id.split("|");

    }else{
      idsForArr =[]
      id = ''
        this.setState({
      ...this.getState(),
      params: {
        ...this.getState().params,
        madeIn: '',
      },
    });
    }

    console.log(idsForArr, "idsForArr loadSelectedCountry");
    let res;
    if (id) {
      if (id.includes("|")) {
        console.log("|");
        res = await this.services.api.request({
          url: `/api/v1/countries?search[ids]=${id}?lang=ru&fields=`,
        });
        console.log(res.data.result.items, "res.data.result.items");
        this.setState(
          {
            ...this.getState(),
            selectedCountry: res.data.result.items,
            selectedCountryIds: idsForArr,
          },
          "Contries загружены"
        );
      } else {
        res = await this.services.api.request({
          url: `/api/v1/countries/${id}?lang=ru&fields=`,
        });
        console.log([res.data.result], "[res.data.result]");
        this.setState(
          {
            ...this.getState(),
            selectedCountry: [res.data.result],
            selectedCountryIds: idsForArr,
          },
          "Contries загружены"
        );
      }
    }
  }
  setSelectedCoutries(id: string) {
    const countries = [...this.getState().selectedCountryIds];
  
    const exist = countries.findIndex((item) => item === id);
      console.log(countries, exist, 'countries')
    if (exist === -1) {
      countries.push(id);
    } else {
      countries.splice(exist, 1);
    }
    let IdsStr = countries.filter((id) => id.trim() !== "").join("|") + "|";
    console.log(IdsStr.length);

    this.setState({
      ...this.getState(),
      selectedCountryIds: countries,
      params: {
        ...this.getState().params,
        madeIn: IdsStr.length > 1 ? IdsStr : '',
      },
    });
    this.setParams({ madeIn: IdsStr.length > 1 ? IdsStr : '', page: 1 });

    console.log(IdsStr, "IdsStr");
  }
}

export default CatalogState;
