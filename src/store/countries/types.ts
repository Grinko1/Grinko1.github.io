import { Option } from "@src/components/custom-select";


export interface InitStateCountries {
  list: Country[];
  waiting: boolean;
  total:number;
  canLoad:boolean;
  error:string;

}
export interface Country {
  
        _id: string,
        selected?:boolean,
        _key?: string,
        title: string,
        code: string,
        order?: number,
        isNew?: boolean,
        proto?: object,
        description?: string,
        _type?: string,
        dateCreate?: string,
        dateUpdate?: string,
        isDeleted?: boolean
      
}
