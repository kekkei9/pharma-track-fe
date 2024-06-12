import React from "react";

import BookPage2 from "../../components/BookPage2/BookPage2";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

const BookingFormContainer = ({
  formRef,
  currentDoctor,
  time,
  userFormValues,
}) => {
  const navigate = useNavigate();
  const {
    number: numberDoctor,
    name: nameDoctor,
    address: doctorAddress,
  } = currentDoctor;

  const { shift: timeDoctor } = time;

  const initialValues = userFormValues
    ? { ...userFormValues, birthday: "" }
    : {
        ...currentDoctor,
        yearEx: "4",
        username: "",
        birthday: "",
        gender: "",
        email: "",
        address: "",
        number: "",
        symptom: "",
        timeDoctor,
        nameDoctor,
        numberDoctor,
        doctorAddress,
      };

  return (
    <div className="BookingFormContainer">
      <Formik initialValues={initialValues} innerRef={formRef}>
        {BookPage2}
      </Formik>
    </div>
  );
};

export default BookingFormContainer;
