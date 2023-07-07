import StoreModule from "../module";

class ModalsState extends StoreModule {
  initState() {
    return {
      modals: [],
    };
  }

  open(name, id = "") {
    const exist = this.getState().modals?.findIndex(
      (modal) => modal.name === name
    );
    if (exist === -1) {
      this.setState(
        {
          ...this.getState(),
          modals: [
            ...this.getState().modals,
            {
              name: name,
              isOpen: true,
              id: id,
            },
          ],
        },
        `Открытие модалки ${name}`
      );
    }
  }

  close(name) {
    const list = this.getState().modals.filter((item) => item.name !== name);
    this.setState(
      {
        ...this.getState(),
        modals: list,
      },
      `Закрытие модалки  ${name}`
    );
  }
}

export default ModalsState;
