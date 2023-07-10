import ModalLayout from "@src/components/modal-layout";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";

const ModalList = (props) => {
  const callbacks = {
    closeModal: () => props.closeModal(),
  };

  return (
    <>
      <ModalLayout
        title="Добавить в корзину"
        labelClose="закрыть"
        onClose={callbacks.closeModal}
      >
        <CatalogFilter moduleName="catalog_copy" />
        <CatalogList moduleName="catalog_copy" />
      </ModalLayout>
    </>
  );
};

export default ModalList;
