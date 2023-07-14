import Services from "@src/services";

interface Config {
  baseUrl:string
}

class APIService{
  services: Services;
  config: Config;
  defaultHeaders: any;

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services: Services, config: Config) {
    this.services = services;
    this.config = config;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * HTTP запрос
   * @param url
   * @param method
   * @param headers
   * @param options
   * @returns {Promise<{}>}
   */
  async request({
    url,
    method = "GET",
    headers = {},
    ...options
  }: {
    url: string;
    method?: string;
    headers?: {};
    body?:any
  }): Promise<{data:any, status:any, headers:any}> {
 
    if (!url.match(/^(http|\/\/)/)) url = this.config.baseUrl + url;
    const res = await fetch(url, {
      method,
      headers: { ...this.defaultHeaders, ...headers },
      ...options,
    });
    return { data: await res.json(), status: res.status, headers: res.headers };
  }

  /**
   * Установка или сброс заголовка
   * @param name {String} Название заголовка
   * @param value {String|null} Значение заголовка
   */
  setHeader(name: string, value: string | null = null) {
    if (value) {
      this.defaultHeaders[name] = value;
    } else if (this.defaultHeaders[name]) {
      delete this.defaultHeaders[name];
    }
  }
}

export default APIService;
