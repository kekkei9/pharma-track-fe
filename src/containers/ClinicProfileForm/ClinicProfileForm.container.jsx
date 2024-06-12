import React, { useImperativeHandle } from "react";
import ClinicProfileForm from "../../components/ClinicProfileForm/ClinicProfileForm";
import { Formik } from "formik";

const ClinicProfileFormContainer = ({ initialValues, formRef, setClinic }) => {
  return (
    <div className="ClinicProfileFormContainer">
      <Formik
        initialValues={initialValues}
        innerRef={formRef}
        enableReinitialize
      >
        {(props) => <ClinicProfileForm {...props} setClinic={setClinic} />}
      </Formik>
    </div>
  );
};

export default ClinicProfileFormContainer;
