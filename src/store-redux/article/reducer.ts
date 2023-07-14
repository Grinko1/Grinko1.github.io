import { ArticleAction, InitStateArticle } from "./types";

// Начальное состояние
export const initialState: InitStateArticle = {
  data: {},
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий

function reducer(state = initialState, action: ArticleAction) {
  switch (action.type) {
    case "article/load-start":
      console.log("start");
      return { ...state, data: {}, waiting: true };

    case "article/load-success":
      console.log("success");
      return { ...state, data: action.payload.data, waiting: false };

    case "article/load-error":
      return { ...state, data: {}, waiting: false };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
