import React from "react";
import "./BookApNav.scss";
import StepComponent from "../StepComponent/StepComponent";
import { useNavigate } from "react-router-dom";

const BookApNav = ({ current }) => {
  const StepData = [
    {
      step: "Bước 1",
      content: "Chọn phòng khám",
    },
    {
      step: "Bước 2",
      content: "Phiếu thông tin",
    },
    {
      step: "Bước 3",
      content: "Xác nhận & Thanh toán",
    },
  ];

  return (
    <div className="BookApNav">
      <div className="Boxes tw-flex tw-mx-auto tw-max-w-5xl tw-pt-12 ">
        {StepData.map((step, index) => (
          <StepComponent
            {...step}
            style={
              current === index
                ? {
                    background: "linear-gradient(133deg, #383f75, #f1795c)",
                    color: "white",
                  }
                : {}
            }
          />
        ))}
      </div>
    </div>
  );
};

export default BookApNav;
