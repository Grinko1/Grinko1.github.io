import useSelector from "@src/hooks/use-selector";
import * as modals from "./modals";
import React from "react";
import { Modals } from "@src/general-types";
import { ModalType } from "@src/store/modals/types";
import { TStore } from "@src/store/types";

const Modals = () => {
  const select = useSelector((state: TStore) => ({
    modals: state.modals.modals,
  }));

  return (
    <div>
      {select.modals &&
        select.modals.map((item: Modals) => {
          //@ts-ignore
          const Component = modals[item.name] ;
          if (Component)
            return (
              <Component
                key={item.id}
                props={item.props}
                onClose={item.close}
              />
            );
        })}
    </div>
  );
};

export default Modals;
