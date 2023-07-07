import ModalLayout from "@src/components/modal-layout";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import useInit from "@src/hooks/use-init";
import useStore from "@src/hooks/use-store";
import { useCallback } from "react";

const ListToCard = (props) => {
  const store = useStore();
  const callbacks = {
    closeModal: () => props.closeModal("listToCart"),
    // Сброс
    // onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  // useInit(async () => {
  //   await Promise.all([
  //     store.actions.catalog.initParams(
  //       store.actions.catalog.initState().params,
  //       true,
  //       true
  //     ),
  //   ]);
  // }, []);

  return (
    <>
      <ModalLayout
        title="Добавить в корзину"
        labelClose="закрыть"
        onClose={callbacks.closeModal}
      >
        <CatalogFilter useId={props.useId} />
        <CatalogList useId={props.useId} />
      </ModalLayout>
    </>
  );
};

export default ListToCard;
