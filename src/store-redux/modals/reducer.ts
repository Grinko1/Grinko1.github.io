// Начальное состояние

import { InitStateModals } from "@src/store/modals/types";
import { AnyAction } from "redux";

const initialState: InitStateModals = {
  modals: [],
};
// Обработчик действий

const reducer = (state = initialState.modals, action: AnyAction) => {
  switch (action.type) {
    case "modal/open":
      const exist = state.findIndex(
        (modal) => modal.name === action.payload.name
      );
      if (exist === -1) {
        return [
          ...state,
          {
            name: action.payload.name,
            isOpen: true,
            id: action.payload.id ? action.payload.id : "",
          },
        ];
      } else {
        return state;
      }
    case "modal/close":
      console.log(action.payload.name, "close");
      return state.filter((modal) => modal.name !== action.payload.name);
    default:
      return state;
  }
};

export default reducer;
