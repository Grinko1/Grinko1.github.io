import { Action } from "redux";
import { ArticleAction, ArticleData, InitStateArticle } from "./article/types";

type RootState = InitStateArticle


type RootAction = Action<ArticleAction>; 


export { RootState, RootAction };