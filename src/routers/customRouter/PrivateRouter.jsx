import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import { RootState } from "../../redux/store";

const PrivateRouter = ({ component: Component, accessibleRoles, ...rest }) => {
  const { user, isAuthUser } = useSelector((state) => state.authentication);
  const ResultComponent = (props) => {
    if (isAuthUser && accessibleRoles.includes(user.role)) {
      return <Component {...props} />;
    }

    if (isAuthUser && !accessibleRoles.includes(user.role)) {
      return <ErrorPage code={403} />;
    }

    if (!isAuthUser) {
      return <ErrorPage code={403} />;
    }

    return <ErrorPage code={500} />;
  };
  return <ResultComponent />;
};
export default PrivateRouter;
