import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SignUpFormContainer = () => {
  const [provinces, setProvinces] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    retypePassword: "",
    province: "Hà Nội",
  };

  const handleSubmit = (formProps) => {
    const userProps = (({ username, email, password, province }) => ({
      username,
      email,
      password,
      province,
    }))(formProps);
    navigate(location.pathname + "/role", {
      state: userProps,
    });
  };

  return (
    <div className="LoginFormContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {SignUpForm}
      </Formik>
    </div>
  );
};

export default SignUpFormContainer;
