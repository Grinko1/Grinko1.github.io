import { memo, useEffect } from "react";
import PropTypes from "prop-types";
import useSelector from "@src/hooks/use-selector";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { TStore } from "@src/store/types";

interface IProtected {
  children: React.ReactNode,
  redirect: string
}
function Protected({ children, redirect }:IProtected) {

  
  const select = useSelector((state:TStore) => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!select.exists && !select.waiting) {
      navigate(redirect, { state: { back: location.pathname } });
    }
  }, [select.exists, select.waiting]);

  if (!select.exists || select.waiting) {
    return <div>Ждём...</div>;
  } else {
    return children;
  }
}

Protected.propTypes = {
  redirect: PropTypes.string,
  children: PropTypes.node,
};

export default memo(Protected);
