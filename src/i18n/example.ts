const dic ={
    [Symbol('1')] : 100,
  "title": "Shop",
  "menu.main": "Main",
  "basket.title": "Cart",
  "basket.open": "Open",
  "basket.close": "Close",
  "basket.inBasket": "In cart",
  "basket.empty": "empty",
  "basket.total": "Total",
  "basket.unit": "pcs",
  "basket.delete": "Delete",
  "basket.cancel": "Cancel",
  "basket.articles": {
    "one": "article",
    "other": "articles"
  },
  "article.add": "Add",
  "filter.reset": "Reset",
  "auth.title": "Sign In",
  "auth.login": "Login",
  "auth.password": "Password",
  "auth.signIn": "Sign in",
  "session.signIn": "Sign In",
  "session.signOut": "Sign Out",
  [Symbol('1')] : 100
}

type Dic = typeof dic
type Test = keyof Dic

type NestedKeys<Obj extends object> = {
    [Key in keyof Obj & string] : ( Obj[Key] extends object ? Key | `${Key}.${NestedKeys<Obj[Key]>}` : Key )
}[keyof Obj & string]

type DicFlat = NestedKeys<Dic>

