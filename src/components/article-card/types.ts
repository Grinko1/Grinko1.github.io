export interface Article {
  _id: string | number;
  description: string;
  madeIn: MadeIn;
  category: Category;
  edition: string | number;
  price: number;
}
interface MadeIn {
  title: string;
  code: string | number;
}
interface Category {
  title: string;
}