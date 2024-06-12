import React from "react";
import SignUpFormContainer from "../../containers/SignUpForm/SignUpForm.container";
import "./SignUpPage.scss";
import BackButton from "../../components/BackButton/BackButton";
import LoginProviders from "../../components/LoginProviders/LoginProviders";

const SignUpPage = (props) => {
  return (
    <div className="SignUpPage tw-flex tw-flex-col tw-items-center">
      <div style={{ width: "400px" }}>
        <BackButton />
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/assets/dogtor.png`}
        alt="dogtor"
        width="140px"
        height="140px"
        className="tw-rounded-full"
      />
      <SignUpFormContainer />
      <div className="tw-mt-4">Hoặc đăng kí với</div>
      <LoginProviders />
    </div>
  );
};

export default SignUpPage;
