import React, { useImperativeHandle } from "react";
import CreateClinicForm from "../../components/CreateClinicForm/CreateClinicForm";
import { Formik } from "formik";
import { useSelector } from "react-redux";

const CreateClinicFormContainer = ({ username, province, formRef }) => {
  const initialValues = {
    OTP: "",
    id_clinic: "",
    name_clinic: "",
    name_doctor: username || "",
    province: province || "",
    city: "",
    ward: "",
    address: "",
    lat: "",
    lng: "",
  };

  return (
    <div className="CreateClinicFormContainer">
      <Formik initialValues={initialValues} innerRef={formRef}>
        {CreateClinicForm}
      </Formik>
    </div>
  );
};

export default CreateClinicFormContainer;
