import React from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Formik } from "formik";
import { signInUsingEmailPassword, getUserData } from "../../firebase";
import { setUser } from "../../redux/authentication/authentication.slice";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const initialValues = {
  email: "",
  password: "",
};

notification.config({
  placement: "topRight",
  top: 120,
  duration: 1.5,
});

const LoginFormContainer = ({ setForgotPassword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formProps) => {
    try {
      const { email, password } = formProps;
      const user = await signInUsingEmailPassword(email, password, "host");
      if (!user) {
        notification.error({
          message: "Đăng nhập",
          description: "Lỗi đăng nhập",
        });
        return;
      }
      notification.success({
        message: "Đăng nhập",
        description: "Đăng nhập thành công",
      });
      const { uid } = user;
      const userData = await getUserData(uid);
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/home");
    } catch (e) {
      notification.error({
        message: "Đăng nhập",
        description:
          e.code === "auth/user-not-found"
            ? "Không tồn tại người dùng"
            : e.code === "auth/wrong-password"
            ? "Sai mật khẩu"
            : "",
      });
    }
  };

  return (
    <div className="LoginFormContainer">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(props) => (
          <LoginForm {...props} setForgotPassword={setForgotPassword} />
        )}
      </Formik>
    </div>
  );
};

export default LoginFormContainer;
