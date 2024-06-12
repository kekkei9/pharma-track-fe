import React from "react";
import { Input } from "antd";
import "./InputForm.scss";

const InputForm = ({ title, placeholder, style, setInput }) => {
  return (
    <div className="InputForm">
      <div className="tw-text-base tw-ml-3">{title}</div>
      <Input
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        style={Object.assign(
          {
            borderRadius: "10px",
            padding: "7px 12px",
            border: "solid #D9D9D9",
            width: "400px",
            marginTop: "6px",
          },
          style
        )}
      />
    </div>
  );
};

export default InputForm;
