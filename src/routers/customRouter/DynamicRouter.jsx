import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import { RootState } from "../../redux/store";

const DynamicRouter = ({ componentList, accessibleRoles, ...rest }) => {
  const { user, isAuthUser } = useSelector((state) => state.authentication);
  const ResultComponent = () => {
    if (isAuthUser && user?.role && accessibleRoles.includes(user?.role)) {
      const Component = componentList[user?.role];
      return Component();
    }

    if (isAuthUser && user?.role && !accessibleRoles.includes(user?.role)) {
      return <ErrorPage code={403} />;
    }

    if (!isAuthUser) {
      return <ErrorPage code={403} />;
    }

    return <ErrorPage code={500} />;
  };
  return <Route {...rest} element={<ResultComponent />} />;
};
export default DynamicRouter;
