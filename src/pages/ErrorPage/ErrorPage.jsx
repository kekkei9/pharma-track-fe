import { useSelector } from "react-redux";
import React, { useMemo } from "react";
import { RootState } from "../../redux/store";

const ErrorPage = ({ code = 404 }) => {
  const { isAuthUser } = useSelector((state) => state.authentication);
  const subTitle = useMemo(() => {
    switch (code) {
      case 403:
        return "Sorry, You can not access this page.";
      case 404:
        return "Sorry, The page you visit does not exist.";
      case 500:
        return "Sorry, something went wrong";
      default:
        return "Sorry, something went wrong.";
    }
  }, [code]);
  return (
    <div className="page">
      <h1>{code}</h1>
      <p>{subTitle}</p>
    </div>
  );
};
export default ErrorPage;
