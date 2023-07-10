import * as modules from "./exports.js";

/**
 * Хранилище состояния приложения
 */
class Store {
  /**
   * @param services {Services}
   * @param config {Object}
   * @param initState {Object}
   */
  constructor(services, config = {}, initState = {}) {
    this.services = services;
    this.config = config;
    this.listeners = []; // Слушатели изменений состояния
    this.state = initState;
    /** @type {{
     * basket: BasketState,
     * catalog: CatalogState,
     * modals: ModalsState,
     * article: ArticleState,
     * locale: LocaleState,
     * categories: CategoriesState,
     * session: SessionState,
     * profile: ProfileState
     * }} */
    this.actions = {};
    for (const name of Object.keys(modules))
      this.createModule(name, name, this.config?.modules[name] || {});
  }

  createModule(name, moduleName, config = {}) {
    console.log(name, "create store");
    if (this.actions[name]) {
      throw new Error(`${name} module already exist`);

    }
    this.actions[name] = new modules[moduleName](this, name, config);
    this.state[name] = this.actions[moduleName].initState();
  }

  removeModule(name) {
    console.log(`delete store ${name}`);
  
    if (this.actions[name]) {
      delete this.actions[name];
      delete this.state[name];
    }

  }

  //the right
  makeStore(name, moduleName, config = {}) {
    if (!this.actions[name]) {
      if (!modules[moduleName])
        throw new Error(`Not found store module "${moduleName}"`);
      config = {
        ...(this.config.modules[moduleName] || {}),
        ...config,
      };
      this.actions[name] = new modules[moduleName](this, name, config);
      this.state[name] = this.actions[name].initState();
    }
  }
  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {{
   * basket: Object,
   * catalog: Object,
   * modals: Object,
   * article: Object,
   * locale: Object,
   * categories: Object,
   * session: Object,
   * profile: Object,
   * }}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState, description = "setState") {
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
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener(this.state);
  }
}

export default Store;
