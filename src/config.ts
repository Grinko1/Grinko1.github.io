import { Config } from "./store/types";

const isProduction: boolean = process.env.NODE_ENV === "production";

/**
 * Настройки сервисов
 */
const config: Config = {
  store: {
    // Логировать установку состояния?
    log: !isProduction,
    // Настройки модулей состояния
    modules: {
      session: {
        // Названия токена в АПИ
        tokenHeader: "X-Token",
      },
      catalog: {
        saveUrl: true,
      },
    },
  
  },
  redux:{},
  api: {
    baseUrl: "",
  },
};

export default config;
