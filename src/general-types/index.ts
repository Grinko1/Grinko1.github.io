export interface Modals {
  id: number;
  props: any;
  name: string;
  close:(arg0?: any) => void
}

export interface Product {
  _id: string ;
  title: string;
  price: number;
  amount?: number;
  selected?: boolean
}
