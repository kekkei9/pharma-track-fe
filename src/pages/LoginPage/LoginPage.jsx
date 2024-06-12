import React, { useState } from "react";
import "./LoginPage.scss";
import LoginFormContainer from "../../containers/LoginForm/LoginForm.container";
import { useNavigate } from "react-router-dom";
import { Button, Form as AntdForm, notification } from "antd";
import BackButton from "../../components/BackButton/BackButton";
import LoginProviders from "../../components/LoginProviders/LoginProviders";
import { Formik, Form, Field } from "formik";
import { AntInput } from "../../components/CreateAntField/CreateAntField";
import { validateEmail } from "../../components/ValidateFields/ValidateFields";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../../firebase";

const FormItem = AntdForm.Item;

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleForgotPassword = async (values) => {
    try {
      await sendPasswordResetEmail(auth, values.email);
    } catch (e) {
      notification.error({
        message: "Gửi yêu cầu xác nhận",
        description:
          e.code === "auth/user-not-found" ? "Không tìm thấy người dùng" : "",
      });
      return false;
    }
    notification.success({
      message: "Gửi yêu cầu xác nhận",
      description: "Đã gửi yêu cầu xác nhận tới email",
    });
    setForgotPassword(false);
    return true;
  };

  return (
    <div className="LoginPage tw-flex tw-flex-col tw-items-center">
      <div
        style={{ width: "400px" }}
        className="tw-flex tw-flex-col tw-items-center"
      >
        <BackButton />
        <img
          src={`${process.env.PUBLIC_URL}/assets/dogtor.png`}
          alt="dogtor"
          width="140px"
          height="140px"
          className="tw-rounded-full"
        />
        {!forgotPassword ? (
          <div className="login-action-container tw-flex tw-flex-col tw-items-center">
            <LoginFormContainer setForgotPassword={setForgotPassword} />
            <div className="tw-mt-3">
              Đăng kí tài khoản, nếu bạn chưa đăng kí!
            </div>
            <Button
              className="tw-mt-3"
              style={{ width: "400px" }}
              onClick={() => navigate("/signup")}
            >
              Đăng kí tài khoản
            </Button>
            <div className="tw-mt-4">Hoặc đăng nhập với</div>
            <LoginProviders />
          </div>
        ) : (
          <Formik initialValues={{ email: "" }} onSubmit={handleForgotPassword}>
            <Form className="form-container tw-flex tw-flex-col tw-items-center">
              <Field
                component={AntInput}
                name="email"
                type="email"
                label="Email đăng nhập"
                validate={validateEmail}
                hasFeedback
                style={{
                  width: "400px",
                }}
                placeholder="Email đăng nhập"
              />
              <div
                className="tw-mt-3 tw-ml-3 tw-self-start forgot-password tw-text-slate-400"
                onClick={() => setForgotPassword(false)}
              >
                Quay lại trang đăng nhập
              </div>
              <div className="submit-container">
                <FormItem>
                  <Button
                    type="primary"
                    style={{
                      width: "400px",
                    }}
                    htmlType="submit"
                  >
                    Gửi yêu cầu xác nhận
                  </Button>
                </FormItem>
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
