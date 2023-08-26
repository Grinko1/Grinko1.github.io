import { memo, useCallback } from "react";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import useInit from "@src/hooks/use-init";
import Navigation from "@src/containers/navigation";
import PageLayout from "@src/components/page-layout";
import Head from "@src/components/head";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import LocaleSelect from "@src/containers/locale-select";
import TopHead from "@src/containers/top-head";
import React from "react";
import useSelector from "@src/hooks/use-selector";
import { TStore } from "@src/store/types";

function Main() {
  const store = useStore();

  useInit(
    async () => {
      await Promise.all([
        store.actions.catalog.initParams(),
        store.actions.categories.load(),
        store.actions.countries.load(),
        store.actions.catalog.loadSelectedCountry(),
      ]);
    },
    [],
    true
  );
  const { t }: any = useTranslate();


  return (
    <PageLayout>
      <TopHead />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter moduleName="catalog" />
      <CatalogList moduleName="catalog" />
    </PageLayout>
  );
}

export default memo(Main);
