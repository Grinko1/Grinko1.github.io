import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
} from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import * as reducers from "./exports";
import { Config } from "@src/store/types";
import { RootAction, RootState } from "./types";

export default function createStoreRedux(
  services: any,
  config: Partial<Config> = {}
) {
  const rootReducer = combineReducers(reducers);

  const middleware: Middleware<{}, RootState>[] = [
    thunk.withExtraArgument(services) as ThunkMiddleware<RootState, RootAction>,
  ];

  const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(...middleware)
  );

  return store;
}

// import {
//   applyMiddleware,
//   combineReducers,
//   createStore,
// } from "redux";
// import thunk from "redux-thunk";
// import * as reducers from "./exports";

// export default function createStoreRedux(services: any, config = {}) {
//   return createStore(
//     combineReducers(reducers),
//     undefined,
//     applyMiddleware(thunk.withExtraArgument(services))
//   );
// }
