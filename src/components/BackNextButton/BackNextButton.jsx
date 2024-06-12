import React from "react";
import "./BackNextButton.scss";
import { Button } from "antd";

const BackNextButton = ({ onClickBack, onClickNext }) => {
  return (
    <div className="BackNextButton tw-flex tw-justify-center tw-my-8">
      <div className="tw-px-9">
        <Button
          danger
          size="large"
          style={{
            width: "120px",
            height: "50px",
          }}
          onClick={() => {
            onClickBack();
          }}
        >
          Quay lại
        </Button>
      </div>
      <div className="tw-px-9">
        <Button
          size="large"
          style={{
            backgroundColor: "rgba(0, 103, 169, 0.7)",
            color: "white",
            width: "120px",
            height: "50px",
            backgroundColor: "#4B56D2",
          }}
          onClick={() => {
            onClickNext();
          }}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default BackNextButton;
