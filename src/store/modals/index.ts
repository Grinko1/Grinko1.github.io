import codeGenerator from "@src/utils/code-generator";
import StoreModule from "../module";
import { Config } from "../types";
import { InitStateModals, ModalType } from "./types";

const generateCode = codeGenerator();


class ModalsState extends StoreModule<Config, InitStateModals> {
  initState(): InitStateModals {
    return {
      modals: [],
    };
  }
  //  getState() {
  //   return super.getState() as InitStateModals;
  // }

  async open(name: string, props: any) {
    const id = generateCode();
    return new Promise((resolve) => {
      this.setState(
        {
          ...this.getState(),
          modals: [
            ...this.getState().modals!,
            {
              id,
              name: name,
              props,
              close: (result: any) => {
                resolve(result);
                this.setState({
                  modals: this.getState().modals.filter(
                    (item: ModalType) => item.id !== id
                  ),
                });
              },
            },
          ],
        },
        `Открытие модалки ${name}`
      );
    });
  }

  close(id: number) {
    const modals = [...this.getState().modals];
    if (id) {
      const index = modals.findIndex((item) => item.id === id);
      if (index !== -1) {
        modals.splice(index, 1);
      }
    }
    this.setState(
      {
        modals: modals,
      },
      `Закрытие модалки ${id}`
    );
  }
}

export default ModalsState;

