import codeGenerator from "@src/utils/code-generator";
import StoreModule from "../module";

const generateCode = codeGenerator();

class ModalsState extends StoreModule {
  initState() {
    return {
      modals: [],
    };
  }

  async open(name, props) {
    const id = generateCode();
    console.log(props)
    return new Promise((resolve) => {
      this.setState(
        {
          ...this.getState(),
          modals: [
            ...this.getState().modals,
            {
              id,
              name: name,
              props,
              close: (result) => {
                resolve(result);
                this.setState({
                  modals: this.getState().modals.filter(
                    (item) => item.id !== id
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

  close(id) {
    let modals = [...this.getState().modals];
    if (id) {
      modals = modals.filter((item) => item.id !== id);
    }
    modals.splice(arr.length - 1);

    this.setState(
      {
        ...this.getState(),
        modals: modals,
      },
      `Закрытие модалки  ${id}`
    );
  }
}

export default ModalsState;
