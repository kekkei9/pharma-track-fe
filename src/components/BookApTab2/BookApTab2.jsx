import React from "react";
import "./BookApTab2.scss";
import { useNavigate, useLocation } from "react-router-dom";
import BackNextButton from "../BackNextButton/BackNextButton";
import BookingFormContainer from "../../containers/BookingForm/BookingForm.container";
import { useRef } from "react";

const BookApTab2 = (props) => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const bookingFormRef = useRef("a");

  const onClickBack = () => {
    navigate("/bookap");
  };

  if (!!localStorage.getItem("bookingState")) {
    navigate("/bookap3");
  }

  const onClickNext = () => {
    if (bookingFormRef.current) {
      bookingFormRef.current.handleSubmit();
      if (
        !(
          bookingFormRef.current.isValid &&
          Object.keys(bookingFormRef.current.touched).length > 0
        )
      ) {
        return false;
      }
    }

    if (bookingFormRef.current.submitCount === 0) {
      window.open(
        "https://pharma-track.onrender.com/api/v1/payment/create_payment_url1"
      );
    } else {
      navigate("/bookap3", {
        state: { ...state, userFormValues: bookingFormRef.current.values },
      });
    }

    return true;
  };

  return (
    <div className="BookApTab2">
      <BookingFormContainer formRef={bookingFormRef} {...state} />
      <BackNextButton onClickBack={onClickBack} onClickNext={onClickNext} />
    </div>
  );
};

export default BookApTab2;
