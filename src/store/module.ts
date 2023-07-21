import Services from "@src/services";
import Store from ".";
import { TModuleNames } from "./types";

/**
 * Базовый класс для модулей хранилища
 * Для группировки действий над внешним состоянием
 */
class StoreModule<Config,  State> {
   store: Store;
   name: TModuleNames;
   config: Partial<Config>;
   services: Services;

  /**
   * @param store {Store}
   * @param name {string}
   * @param [config] {Partial<Config>}
   */
  constructor(store: Store, name: TModuleNames, config: Partial<Config> = {}) {
    this.store = store;
    this.name = name;
    this.config = config;
    this.services = store.services;
  }

  initState(): State {
    return {} as State; 
  }

  getState():State {
    return this.store.getState()[this.name] as State;
  }

  setState(newState: State, description: string = "setState"): void {
    this.store.setState(
      {
        ...this.store.getState(),
        [this.name]: newState,
      },
      description
    );
  }
}

export default StoreModule;
