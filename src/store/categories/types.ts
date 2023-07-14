export interface InitStateCategories {
  list: Categories[];
  waiting: boolean;
}
export interface Categories {
  _id: string;
  title: string;
  parent?: Parent;
  children?: Categories[];
}
interface Parent {
  _id: string;
}
