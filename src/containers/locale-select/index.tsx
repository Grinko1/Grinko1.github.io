import {memo, useCallback, useMemo} from "react";

import useTranslate from "@src/hooks/use-translate";
import Select from "@src/components/select";
import React from "react";


function LocaleSelect() {

  const {lang, setLang}:any = useTranslate();

  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  return (
    <Select onChange={setLang} value={lang} options={options.lang}/>
  );
}

export default memo(LocaleSelect);
