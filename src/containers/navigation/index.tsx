import { memo, useCallback, useMemo } from "react";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import Menu from "@src/components/menu";
import BasketTool from "@src/components/basket-tool";
import SideLayout from "@src/components/side-layout";
import React from "react";
import { TStore } from "@src/store/types";

function Navigation() {
  const store = useStore();
  const select = useSelector((state: TStore) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
  }));

  const callbacks = {
    openModal: useCallback(
      (name?: string) => {
        store.actions.modals.open("Basket");
      },
      [store]
    ),

    // Обработка перехода на главную
    onNavigate: useCallback(
      (item: any) => {
        if (item.key === 1) store.actions.catalog.resetParams();
      },
      [store]
    ),
  };

  // Функция для локализации текстов
  const { t }: any = useTranslate();

  const options = {
    menu: useMemo(() => [{ key: 1, title: t("menu.main"), link: "/" }], [t]),
  };

  return (
    <SideLayout side="between">
      <Menu items={options.menu} onNavigate={callbacks.onNavigate} />
      <BasketTool
        onOpen={callbacks.openModal}
        amount={select.amount}
        sum={select.sum}
        t={t}
      />
    </SideLayout>
  );
}

export default memo(Navigation);
