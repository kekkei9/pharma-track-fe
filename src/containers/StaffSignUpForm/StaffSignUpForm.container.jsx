import React from "react";
import StaffSignUpForm from "../../components/StaffSignUpForm/StaffSignUpForm";
import { Formik } from "formik";
import {
  checkUserInfoExist,
  getUserData,
  setUserInfo,
  updateUserInfo,
} from "../../firebase";
import { async } from "@firebase/util";
import { notification } from "antd";
import Fetch from "../../fetch";

const StaffSignUpFormContainer = ({
  username,
  province,
  id_clinic,
  hostSide = false,
  setRequestData,
  formRef,
}) => {
  const initialValues = {
    OTP: "",
    uid: "",
    id_clinic: id_clinic || "",
    name: username || "",
    province: province || "",
    number: "",
    type: "Bác sĩ",
    department: "A",
  };

  const handleSubmitHost = async (values) => {
    const retVal = await (async () => {
      if (!(await checkUserInfoExist(values.uid))) return false;
      const userData = await getUserData(values.uid);
      if (userData.id_clinic || userData.id_staff || userData.role !== "staff")
        return false;
      const response = await Fetch(
        "POST",
        "https://pharma-track.onrender.com/api/v1/staff",
        {
          ...values,
          name: userData.username,
          ...{
            department: values.type === "Bác sĩ" ? values.department : null,
          },
        }
      );

      if (response.results === "that bai") {
        return false;
      }

      await setUserInfo(values.uid, {
        ...userData,
        id_clinic: values.id_clinic,
        id_staff: response.data.id_staff,
      });

      return true;
    })();
    if (retVal) {
      notification.success({
        message: "Thêm nhân viên",
        description: "Thêm nhân viên thành công",
      });
    } else {
      notification.error({
        message: "Thêm nhân viên",
        description: "Thêm nhân viên thất bại",
      });
    }
    setRequestData(new Date());
  };

  const handleSubmitStaff = async (values) => {
    let bonusClinic = {};
    try {
      const response = await Fetch(
        "POST",
        "https://pharma-track.onrender.com/api/v1/staff",
        {
          ...values,
          ...{
            department: values.type === "Bác sĩ" ? values.department : null,
          },
        }
      );

      if (response.results === "that bai") {
        notification.error({
          message: "Tạo tài khoản nhân viên",
          description: `Không tìm thấy phòng khám với ID ${values.id_clinic}`,
        });
        return false;
      }
      bonusClinic.id_staff = response.data.id_staff;
      bonusClinic.id_clinic = response.data.id_clinic;
    } catch (e) {
      console.error(e);
    }
    return bonusClinic;
  };

  return (
    <div className="StaffSignUpFormContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={hostSide ? handleSubmitHost : handleSubmitStaff}
        innerRef={formRef}
      >
        {(props) => <StaffSignUpForm {...props} hostSide={hostSide} />}
      </Formik>
    </div>
  );
};

export default StaffSignUpFormContainer;
