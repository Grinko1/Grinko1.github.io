import { createContext, useMemo, useState } from "react";
import translate from "./translate";
import React from "react";

type I18n = {
  lang: string;
  setLang: (lang: string) => void;
  t: (text: string, number?: number) => string;
};
type I18nProviderProps = {
  children: React.ReactNode;
};
/**
 * @type {React.Context<{}>}
 */
export const I18nContext: React.Context<{}> = createContext({
  lang: "ru",
  setLang: () => {},
  t: () => "",
});

/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */
export function I18nProvider({ children }: I18nProviderProps): JSX.Element {
  const [lang, setLang] = useState("ru");

  const i18n = useMemo(
    () => ({
      // Код локали
      lang,
      // Функция для смены локали
      setLang,
      // Функция для локализации текстов с замыканием на код языка
      t: (text: string, number?: number) => translate(lang, text, number),
    }),
    [lang]
  );

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}
