import ModalLayout from "@src/components/modal-layout";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import useSelector from "@src/hooks/use-selector";

const ModalList = (props) => {
  const select = useSelector((state) => ({
    selectedList: state.catalog_copy?.selectedList,
  }));

  //закрытие модалки
  const closeModal = () => {
    if (select.selectedList.length) {
      props.onClose(select.selectedList);
    }
    props.onClose();
  };

  return (
    <>
      <ModalLayout
        title="Добавить в корзину"
        labelClose="закрыть"
        onClose={closeModal}
      >
        <CatalogFilter moduleName="catalog_copy" />
        <CatalogList moduleName="catalog_copy" />
      </ModalLayout>
    </>
  );
};

export default ModalList;
