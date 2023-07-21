import { Article } from "@src/store/article/types";

export interface InitStateArticle {
  data: ArticleData ;
  waiting: boolean;

}
export interface ArticleData extends Article {
  dateCreate?: string;
  dateUpdate?: string;
  isDeleted?: boolean;
  isFavorite?: boolean;
  isNew?: boolean;
  name?: string;
  order?: string;
  proto?: any;
  title?: string;
  _key?: string;
  _type?: string;
  _id?:string
}

export type ArticleAction = {
  type: "article/load-start";
} | {
  type: "article/load-success";
  payload: {
    data: ArticleData;
  };
} | {
  type: "article/load-error";
};