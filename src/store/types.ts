import * as modules from "./exports";
import StoreModule from "./module";

export type TModules = typeof modules;

//названия
export type TModuleNames = keyof TModules;


//стор

export type TStore = {
  [T in TModuleNames]: ReturnType<TStoreModules[T]['initState']>;
} & {
    [name: string]: any;
  // [name: string]: Partial<TModuleNames>;
};

// export type TActions = {
//   [T in keyof TModuleNames]: typeof StoreModule;
// }
// export type TActions ={
//   [key in TModuleNames] : InstanceType<TModules[key]>
// }

// export type Actions<T> = {
//   [K in keyof T]: T[K];
// }
// export type TActions = Actions<TModuleNames>

export type TActions = {
  [T in TModuleNames]: InstanceType<TModules[T]>;
};



//модули стора
export type TStoreModules = {
  [T in TModuleNames]: InstanceType<TModules[T]>;
};
//конфиг для каждого модуля
export type TModuleConfig = {
  [T in TModuleNames]: Partial<InstanceType<TModules[T]>["config"]>;
};

export interface StoreConfig {
  log?: boolean;
  modules: Partial<TModuleConfig>;
}

export interface Config {
  store: StoreConfig;

  api?: {
    baseUrl: string;
  };
  redux?: {};
}

// export type TStore = {
//   [T in TModuleNames]: ReturnType<TStoreModules[T]["initState"]>;
// }

// export type TStore = {
//   [T in TModuleNames]: ReturnType<TStoreModules[T]["initState"]>;
// } & {
//   [name in `${string}catalog${string}`]: ReturnType<CatalogState["initState"]>;
// };
// export type TActions = {
//   [T in TModuleNames]: typeof StoreModule;
// };

// export type TActions<T extends TModuleNames> = {
//   [K in T]: StoreModule<Config, any>;
// };