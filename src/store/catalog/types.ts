import { Option } from "@src/components/custom-select";
import { Product } from "@src/general-types";
import { Country } from "../countries/types";

export interface InitStateCatalog {
  list: Product[];
  params: {
    page: number;
    limit: number;
    sort: string;
    query: string;
    category: string;
    madeIn: string;
  };
  count: number;
  waiting: boolean;
  selectedList: Product[];
  selectedCountry:Option[] ;
  selectedCountryIds:any
}
export interface ValidParams {
  page?: number;
  limit?: number;
  sort?: string;
  query?: string;
  category?: string;
  madeIn?: string;
}

export interface StateCatalogConfig {
  saveUrl: boolean;
}
