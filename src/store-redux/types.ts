import { Action } from "redux";
import { ArticleAction, ArticleData } from "./article/types";

type RootState = {
  data: ArticleData | {};
  waiting: boolean;
};


type RootAction = Action<ArticleAction>; 


export { RootState, RootAction };