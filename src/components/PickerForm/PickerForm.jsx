import { Select } from "antd";
import React from "react";
import "./PickerForm.scss";

const PickerForm = ({ title, placeholder, items, style }) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="PickerForm">
      <div className="tw-text-base tw-ml-3">{title}</div>
      <Select
        showSearch
        style={Object.assign(
          {
            width: "400px",
            marginTop: "6px",
          },
          style
        )}
        placeholder={placeholder}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={items}
      />
    </div>
  );
};

export default PickerForm;
