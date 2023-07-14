export interface InitStateModals {
  modals: ModalType[];
}
export interface ModalType {
  id: number;
  name: string;
  props: any;
  close: (arg0:any) => void;
}
