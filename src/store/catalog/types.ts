import { Product } from "@src/general-types";

export interface InitStateCatalog {
  list: Product[];
  params: {
    page: number;
    limit: number;
    sort: string;
    query: string;
    category: string;
  };
  count: number;
  waiting: boolean;
  selectedList: Product[];
}
export interface ValidParams {
  page?: number;
  limit?: number;
  sort?: string;
  query?: string;
  category?: string;
}

export interface StateCatalogConfig {
  saveUrl: boolean;
}