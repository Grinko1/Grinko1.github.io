// Начальное состояние

const initialState = {
  modals: [],
};
// Обработчик действий

const reducer = (state = initialState.modals, action) => {
  switch (action.type) {
    case "modal/open":
      console.log(action.payload, "open");
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

// // Начальное состояние
// const initialState = {
//   name: ''
// }

// // Обработчик действий
// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case 'modal/open':
//       return {...state, name: action.payload.name};
//     case 'modal/close':
//       return {...state, name: null};
//     default:
//       return state;
//   }
// }

// export default reducer;
