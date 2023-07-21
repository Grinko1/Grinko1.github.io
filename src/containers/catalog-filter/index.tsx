import { memo, useCallback, useEffect, useMemo, useState } from "react";
import useTranslate from "@src/hooks/use-translate";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import Select from "@src/components/select";
import Input from "@src/components/input";
import SideLayout from "@src/components/side-layout";
import treeToList from "@src/utils/tree-to-list";
import listToTree from "@src/utils/list-to-tree";
import React from "react";
import { TStore, TStoreModuleKey } from "@src/store/types";
import CustomSelect, { Option } from "@src/components/custom-select";

interface ICatalogFilter {
  moduleName: TStoreModuleKey<"catalog">;
}
function CatalogFilter(props: ICatalogFilter) {
  const store = useStore();

  const moduleName = props.moduleName || "catalog";

  const select = useSelector((state: TStore) => ({
    sort: state[moduleName].params.sort,
    query: state[moduleName].params.query,
    category: state[moduleName].params.category,
    madeIn: state[moduleName].params.madeIn,
    categories: state.categories.list,
    countries: state.countries.list,
    waiting: state.countries.waiting,
    canLoad: state.countries.canLoad,
    selectedCountries: state.catalog.selectedCountry,
    countriesArr: state.catalog.selectedCountryIds,
  }));

  // console.log(select.countriesArr, "selectedCountryIds");
    console.log(select.selectedCountries, "selectedCountry"); 
  //   console.log(select.madeIn, 'madeIn')
  const [skip, setSkip] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const callbacks = {
    // Сортировка
    onSort: useCallback(
      (sort: string) => store.actions[moduleName]?.setParams({ sort }),
      [store]
    ),
    // Поиск
    onSearch: useCallback(
      (query: string) =>
        store.actions[moduleName]?.setParams({ query, page: 1 }),
      [store]
    ),
    // Сброс
    onReset: useCallback(
      () => store.actions[moduleName]?.resetParams(),
      [store]
    ),
    // Фильтр по категории
    onCategory: useCallback(
      (category: string) =>
        store.actions[moduleName]?.setParams({ category, page: 1 }),
      [store]
    ),
    // Фильтр по странам
    onCountry: useCallback(
      (option: Option) => {
        //simple click
   
        // store.actions[moduleName]?.setParams({ madeIn: option._id, page: 1 }); 
            //  store.actions[moduleName]?.setSelectedCoutries(option._id); 
        store.actions[moduleName].loadSelectedCountry();
      },
      [store]
    ),
    //поиск стран
    searchCountry: useCallback(
      (title: string) => store.actions.countries.search(title),
      [store]
    ),
    //test
    setArrSelectedCountries: useCallback(
      (id: string) => store.actions.catalog.setSelectedCoutries(id),
      [store]
    ),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    ),
    categories: useMemo(
      () => [
        { value: "", title: "Все" },
        ...treeToList(
          listToTree(select.categories),
          (item: any, level: number) => ({
            value: item._id,
            title: "- ".repeat(level) + item.title,
          })
        ),
      ],
      [select.categories]
    ),
    countries: useMemo(
      () => [
        { _id: "", value: "", title: "Все", code: "All" },
        ...select.countries.map((item) => {
          return {
            _id: item._id,
            value: item._id,
            title: item.title,
            code: item.code,
          };
        }),
      ],
      [select.countries]
    ),
  };

  const { t }: any = useTranslate();

  // загрузка стран
  useEffect(() => {
    // поиск стран
    if (searchTerm.length) {
      store.actions.countries.search(searchTerm, skip);
    } else {
      // дозагрузка
      if (skip > 0) store.actions?.countries.load(skip);
    }
  }, [skip]);

  return (
    <SideLayout padding="medium">
      <CustomSelect
        // options={select.countries}
        options={options.countries}
        waiting={select.waiting}
        onChange={callbacks.onCountry}
        skip={skip}
        setSkip={setSkip}
        searchOption={callbacks.searchCountry}
        canLoad={select.canLoad}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedValue={select.selectedCountries}
        setArrSelectedCountries={callbacks.setArrSelectedCountries}
      />

      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategory}
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={"Поиск"}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
