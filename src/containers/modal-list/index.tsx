import ModalLayout from "@src/components/modal-layout";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import useSelector from "@src/hooks/use-selector";
import { TStore } from "@src/store/types";
import React from "react";

interface IModalList {
onClose: (arg0?: any) => void
}
const ModalList = (props: IModalList) => {

  const select = useSelector((state:TStore) => ({
    selectedList: state?.catalog_copy?.selectedList,
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
