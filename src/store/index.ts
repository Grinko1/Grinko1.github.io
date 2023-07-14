import Services from "@src/services";
import * as modules from "./exports";
import {
  Config,
  TModuleConfig,
  TStore,
  TStoreModules,
  TModuleNames,
  TActions,
  StoreConfig,
} from "@src/store/types";

/**
 * Хранилище состояния приложения
 */
class Store {
  services: Services;
  private config: StoreConfig;
  private listeners: Function[];
  private state: TStore;
  private actions: any;

  /**
   * @param services {Services}
   * @param config {Config}
   * @param initState {TStore}
   */
  constructor(services: Services, config: StoreConfig, initState: TStore) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    this.state = initState;
    this.actions = {};

    for (const name of Object.keys(modules) as TModuleNames[]) {
      this.createModule(name, name, this.config.modules[name] || {});
    }
  }

  createModule<T extends TModuleNames>(
    name: T,
    moduleName: T,
    config: TModuleConfig[T]
  ): void {
    if (this.actions[name]) {
      throw new Error(`${name} module already exists`);
    }
    this.actions[name] = new modules[moduleName](this, name, config);
    this.state[name] = this.actions[moduleName].initState();
  }

  removeModule(name: TModuleNames): void {
    if (this.actions[name]) {
      delete this.actions[name];
      delete this.state[name as keyof TStore];
    }
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener: Function): Function {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {TStore}
   */
  getState(): TStore {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {TStore}
   */
  setState(newState: any, description = "setState"): void {
    if (this.config.log) {
      console.group(
        `%c${"store.setState"} %c${description}`,
        `color: ${"#777"}; font-weight: normal`,
        `color: ${"#333"}; font-weight: bold`
      );
      console.log(`%c${"prev:"}`, `color: ${"#d77332"}`, this.state);
      console.log(`%c${"next:"}`, `color: ${"#2fa827"}`, newState);
      console.groupEnd();
    }
    this.state = newState;

    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export default Store;

// import Services from "@src/services";
// import * as modules from "./exports";
// import { Config, TModuleConfig, TStore, TStoreModules } from "@src/store/types";

// /**
//  * Хранилище состояния приложения
//  */
// class Store {
//   services: Services;
//   private config: Config;
//   private listeners: Function[];
//   private state: any;
//   private actions: any;
//   /**
//    * @param services {Services}
//    * @param config {Object}
//    * @param initState {Object}
//    */
//   constructor(services: Services, config: Config, initState: any) {
//     this.services = services;
//     this.config = config;
//     this.listeners = []; // Слушатели изменений состояния
//     this.state = initState;
//     /** @type {{constructor(services: Services, config: Config = {}, initState: InitState = {}) {
//       // ...
//     }
//      * basket: BasketState,
//      * catalog: CatalogState,
//      * modals: ModalsState,
//      * article: ArticleState,
//      * locale: LocaleState,
//      * categories: CategoriesState,
//      * session: SessionState,
//      * profile: ProfileState
//      * }} */
//     this.actions = {};

//     for (const name of Object.keys(modules))
//     //@ts-ignore
//       this.createModule(name, name, this.config.modules[name] || {});
//       //@ts-ignore
//             // this.createModule(name, name, (this.config.store.modules as TStoreModules)[name] || {});

//   }

//   createModule(name: string, moduleName: string, config: Config) {
//     if (this.actions[name]) {
//       throw new Error(`${name} module already exist`);
//     }
// //@ts-ignore
//     this.actions[name] = new modules[moduleName](this, name, config);
//     //@ts-ignore
//     this.state[name] = this.actions[moduleName].initState();
//   }

//   removeModule(name: string) {
//     if (this.actions[name]) {
//       delete this.actions[name];
//       delete this.state[name];
//     }
//   }
//   /**
//    * Подписка слушателя на изменения состояния
//    * @param listener {Function}
//    * @returns {Function} Функция отписки
//    */
//   subscribe(listener: Function): Function {
//     this.listeners.push(listener);
//     // Возвращается функция для удаления добавленного слушателя
//     return () => {
//       this.listeners = this.listeners.filter((item) => item !== listener);
//     };
//   }

//   /**
//    * Выбор состояния
//    * @returns {{
//    * basket: Object,
//    * catalog: Object,
//    * modals: Object,
//    * article: Object,
//    * locale: Object,
//    * categories: Object,
//    * session: Object,
//    * profile: Object,
//    * }}
//    */
//   getState() {
//     return this.state;
//   }

//   /**
//    * Установка состояния
//    * @param newState {Object}
//    */
//   setState(newState:any, description = "setState") {

//     //@ts-ignore
//     if (this.config.log) {
//       console.group(
//         `%c${"store.setState"} %c${description}`,
//         `color: ${"#777"}; font-weight: normal`,
//         `color: ${"#333"}; font-weight: bold`
//       );
//       console.log(`%c${"prev:"}`, `color: ${"#d77332"}`, this.state);
//       console.log(`%c${"next:"}`, `color: ${"#2fa827"}`, newState);
//       console.groupEnd();
//     }
//     this.state = newState;
//     // Вызываем всех слушателей
//     for (const listener of this.listeners) listener(this.state);
//   }
// }

// export default Store;
