import useSelector from "@src/hooks/use-selector";
import * as modals from "./modals";

const Modals = () => {
  const select = useSelector((state) => ({
    modals: state.modals.modals,
  }));

  return (
    <div>
      {select.modals &&
        select.modals.map((item) => {
          const Component = modals[item.name];
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
