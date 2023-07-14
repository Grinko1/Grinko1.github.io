import { AnyAction, Dispatch } from "redux";
import { RootState } from "../types";

interface Services {
  api: {
    request: (params: any) => Promise<any>;
  };
}

export interface LoadAction {
  type: string;
  payload?: {
    data: any;
  };
}
export default {
  _load: (id: string) => {
    return async (dispatch: Dispatch<AnyAction>, getState: () => RootState, services: Services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "article/load-start" });
      try {
        const res = await services.api.request({
          url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
        });
        // Товар загружен успешно
        dispatch({
          type: "article/load-success",
          payload: { data: res.data.result },
        });
      }
      catch (e) {
        //Ошибка загрузки
        dispatch({ type: "article/load-error" });
      }
    };
  },
  get load() {
    return this._load;
  },
  set load(value) {
    this._load = value;
  },
};
