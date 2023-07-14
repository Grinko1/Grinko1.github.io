export interface InitStateSession {
  user: User | {};
  token: string | null;
  errors: IError | null;
  waiting: boolean;
  exists: boolean;
}
export interface User {
  dateCreate?: string;
  dateUpdate?: string;
  email: string;
  isDeleted: boolean;
  isNew?: boolean;
  order?: number;
  profile: Profile;
  proto?: any;
  roles?: any;
  status?: string;
  username: string;
  _id: string;
  _key?: string;
  _type: string;
}
export interface Profile {
  avatar?: any;
  birthday?: string;
  city?: any;
  country?: any;
  middlename?: string;
  name: string;
  phone: string;
  position?: string;
  street?: string;
  surname?: string;
}

export interface UserData {
  login: string;
  password: string;
}
export interface IError {
  other?: string;
  login?: string;
  password?: string;
}
export interface SessionStateConfig {
  tokenHeader: string;
}
