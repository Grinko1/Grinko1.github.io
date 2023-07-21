import * as modules from "./exports";

export type TModules = typeof modules;

//названия
export type TModuleNames = keyof TModules;

//key 
export type TStoreModuleKey<Name extends string> = Name | `${Name}${string}`;

//модули стора
export type TStoreModules = {
  [T in TModuleNames as TStoreModuleKey<T>]: InstanceType<TModules[T]>;
};

//стор

export type TStore = {
  [T in TModuleNames as TStoreModuleKey<T>]: ReturnType<TStoreModules[T]["initState"]>;
}

//конфиг для каждого модуля
export type TModuleConfig = {
  [T in TModuleNames  as TStoreModuleKey<T>]: Partial<InstanceType<TModules[T]>["config"]>;
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

// export type TActions = {
//   [T in TModuleNames]: typeof StoreModule;
// };

// export type TActions<T extends TModuleNames> = {
//   [K in T]: StoreModule<Config, any>;
// };



// import * as modules from "./exports";
// import StoreModule from "./module";

// export type TModules = typeof modules;

// //названия
// export type TModuleNames = keyof TModules;

// //skeleton
// export type TStoreModuleKey<Name extends string> = Name | `${Name}${string}`;


// //стор

// export type TStore = {
//   [T in TModuleNames]: ReturnType<TStoreModules[T]["initState"]>;
// } & {
//   [name: string]: any;
// };

// // export type Actions<T> = {
// //   [K in keyof T]: T[K];
// // }
// // export type TActions = Actions<TModuleNames>

// export type TActions = {
//   [T in TModuleNames]: InstanceType<TModules[T]>;
// };



// //модули стора
// export type TStoreModules = {
//   [T in TModuleNames]: InstanceType<TModules[T]>;
// };

// //конфиг для каждого модуля
// export type TModuleConfig = {
//   [T in TModuleNames]: Partial<InstanceType<TModules[T]>["config"]>;
// };

// export interface StoreConfig {
//   log?: boolean;
//   modules: Partial<TModuleConfig>;
// }

// export interface Config {
//   store: StoreConfig;

//   api?: {
//     baseUrl: string;
//   };
//   redux?: {};
// }

// // export type TStore = {
// //   [T in TModuleNames]: ReturnType<TStoreModules[T]["initState"]>;
// // }

// // export type TStore = {
// //   [T in TModuleNames]: ReturnType<TStoreModules[T]["initState"]>;
// // } & {
// //   [name in `${string}catalog${string}`]: ReturnType<CatalogState["initState"]>;
// // };
// // export type TActions = {
// //   [T in TModuleNames]: typeof StoreModule;
// // };

// // export type TActions<T extends TModuleNames> = {
// //   [K in T]: StoreModule<Config, any>;
// // };
