import React from "react";
import "./LoginForm.scss";
import { Form, Field } from "formik";
import { Form as AntdForm, Button } from "antd";
import { AntInput, AntPassword } from "../CreateAntField/CreateAntField";
import {
  validateEmail,
  validatePassword,
} from "../ValidateFields/ValidateFields";

const FormItem = AntdForm.Item;

const LoginForm = ({
  handleSubmit,
  values,
  submitCount,
  setForgotPassword,
}) => {
  return (
    <div className="LoginForm">
      <Form
        className="form-container tw-flex tw-flex-col tw-items-center"
        onSubmit={handleSubmit}
      >
        <Field
          component={AntInput}
          name="email"
          type="email"
          label="Email đăng nhập"
          validate={validateEmail}
          submitCount={submitCount}
          hasFeedback
          style={{
            width: "400px",
          }}
          placeholder="Email đăng nhập"
        />
        <Field
          component={AntPassword}
          name="password"
          type="password"
          label="Mật khẩu"
          validate={validatePassword}
          submitCount={submitCount}
          hasFeedback
          placeholder="Mật khẩu"
        />
        <div
          className="tw-text-red-500 tw-mt-3 tw-ml-3 tw-self-start forgot-password"
          onClick={() => setForgotPassword(true)}
        >
          Quên mật khẩu
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
              Đăng nhập
            </Button>
          </FormItem>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
