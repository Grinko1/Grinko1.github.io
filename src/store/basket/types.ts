import { Product } from "@src/general-types";

export interface InitStateBasket {
  list: Product[];
  sum: number;
  amount: number;
  waiting: boolean;
}

