import { memo, useCallback, useMemo } from "react";
import useTranslate from "@src/hooks/use-translate";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import Select from "@src/components/select";
import Input from "@src/components/input";
import SideLayout from "@src/components/side-layout";
import treeToList from "@src/utils/tree-to-list";
import listToTree from "@src/utils/list-to-tree";
import React from "react";
import { TStore } from "@src/store/types";

interface ICatalogFilter {
  moduleName: string;
}
function CatalogFilter(props: ICatalogFilter) {
  const store = useStore();

  const moduleName = props.moduleName || "catalog";

  const select = useSelector((state: TStore) => ({
    sort: state[moduleName].params.sort,
    query: state[moduleName].params.query,
    category: state[moduleName].params.category,
    categories: state.categories.list,
  }));

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
  };

  const { t }: any = useTranslate();

  return (
    <SideLayout padding="medium">
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
