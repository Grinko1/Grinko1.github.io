import { memo, useCallback } from "react";
import SideLayout from "@src/components/side-layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTranslate from "@src/hooks/use-translate";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import React from "react";
import { TStore } from "@src/store/types";

function TopHead() {
  const { t }: any = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector((state: any) => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),

    // Отмена авторизации
    onSignOut: useCallback(() => {
      store.actions.session.signOut();
    }, []),
  };


  return (
    <SideLayout side="end" padding="small">
        {
          select.exists ? (
    <Link to="/profile">{select.user.profile.name}</Link>
  ) : (
      <p></p>
  )
        }
      {select.exists ? (
        <button onClick={callbacks.onSignOut}>{t("session.signOut")}</button>
      ) : (
        <button onClick={callbacks.onSignIn}>{t("session.signIn")}</button>
      )}
    </SideLayout>
  );
}

export default memo(TopHead);
