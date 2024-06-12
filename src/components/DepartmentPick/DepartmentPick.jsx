import React from "react";
import "./DepartmentPick.scss";

import { Field, useFormikContext } from "formik";
import { AntSelect } from "../CreateAntField/CreateAntField";
import { isRequired } from "../ValidateFields/ValidateFields";
import { useState } from "react";
import { useEffect } from "react";
import Fetch from "../../fetch";

const DepartmentPick = ({
  DepartmentValues,
  setDepartmentValues,
  requiredFields = true,
  style
}) => {

  const formikProps = useFormikContext();

  if (!setDepartmentValues) {
    setDepartmentValues = (values) => {};
  }

  const DepartmentData = [
    {
      name: "A",
    },
    {
      name: "B",
    },
    {
      name: "C",
    },
    {
      name: "D",
    },
    {
      name: "E",
    },
  ];

  return (
    <div className="DepartmentPick">
      <Field
        component={AntSelect}
        name="department"
        label="Chọn Khoa"
        defaultValue={formikProps.values.DepartmentData}
        validate={
          requiredFields ? isRequired("Khoa") : (value) => false
        }
        submitCount={formikProps.submitCount}
        tokenSeparators={[","]}
        style={Object.assign({ width: "400px" },style)}
        hasFeedback
        showSearch
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={
          DepartmentData
            ? DepartmentData.map((department) => ({
              value: department.name,
              label: department.name , 
            }))
          : []
        }
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        onSelect={(value) => {
          setDepartmentValues({ department: value });
        }}
      />
    </div>
  );
};

export default DepartmentPick;
