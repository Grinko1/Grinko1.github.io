import StoreModule from "../module";
import { Config } from "../types";
import { initStateLocal } from "./types";

class LocaleState extends StoreModule<Config, initStateLocal> {
  initState(): initStateLocal {
    return {
      lang: "ru",
    };
  }

  /**
   * Установка кода языка (локали)
   * @param lang
   */
  setLang(lang: string) {
    this.setState({ lang }, "Установлена локаль");
  }
}

export default LocaleState;
