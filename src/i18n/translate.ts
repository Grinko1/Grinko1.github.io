

// import * as translations from "./translations";

// type Translations = {
//   [key: string]: { [key: string]: string };
// };
// const translationsAsUnknown = translations as unknown;
// /**
//  * Перевод фразу по словарю
//  * @param lang {String} Код языка
//  * @param text {String} Текст для перевода
//  * @param [plural] {Number} Число для плюрализации
//  * @returns {String} Переведенный текст
//  */
// export default function translate(
//   lang: string,
//   text: string,
//   plural?: number
// ): string {
//   let result =
//     (translations as typeof translationsAsUnknown)[lang] &&
//     text in (translations as Translations)[lang]
//       ? (translations as Translations)[lang][text]
//       : text;

//   if (typeof plural !== "undefined") {
//     const key = new Intl.PluralRules(lang).select(plural);
//     if (key in (translations as Translations)[lang]) {
//       result = (translations as Translations)[lang][key];
//     }
//   }
//   console.log(plural, 'plural', result,'-result');
//   return result;
// }


import * as translations from "./translations";
type Translations = {
  [key: string]: { [key: string]: string };
};
/**
 * Перевод фразу по словарю
 * @param lang {String} Код языка
 * @param text {String} Текст для перевода
 * @param [plural] {Number} Число для плюрализации
 * @returns {String} Переведенный текст
 */
export default function translate(lang:string, text:string, plural?:number): string {
  let result =
  //@ts-ignore
    translations[lang] && text in translations[lang]
    //@ts-ignore
      ? translations[lang][text]
      : text;

  if (typeof plural !== "undefined") {
    const key = new Intl.PluralRules(lang).select(plural);
    if (key in result) {
      result = result[key];
    }
  }

  return result;
}
