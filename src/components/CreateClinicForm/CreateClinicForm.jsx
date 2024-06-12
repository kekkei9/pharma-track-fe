import React from "react";
import "./CreateClinicForm.scss";
import { Form, Field } from "formik";
import { AntInput, AntSelect } from "../CreateAntField/CreateAntField";
import {
  validateLat,
  validateLng,
  isRequired,
} from "../ValidateFields/ValidateFields";
import { useState } from "react";
import { useEffect } from "react";
import Fetch from "../../fetch";
import AddressPickForm from "../AddressPickForm/AddressPickForm";

const CreateClinicForm = ({
  values,
  handleSubmit,
  submitCount,
  initialValues,
}) => {
  return (
    <div className="CreateClinicForm">
      <Form
        className="form-container tw-flex tw-flex-col tw-items-center"
        onSubmit={handleSubmit}
      >
        <Field
          component={AntInput}
          name="OTP"
          type="textarea"
          label="Nhập OTP đã được cấp"
          validate={isRequired("OTP")}
          submitCount={submitCount}
          hasFeedback
          style={{
            width: "400px",
          }}
          placeholder="Mã OTP"
        />
        <Field
          component={AntInput}
          name="id_clinic"
          type="textarea"
          label="Nhập ID phòng khám đã được cấp"
          validate={isRequired("ID phòng khám")}
          submitCount={submitCount}
          hasFeedback
          style={{
            width: "400px",
          }}
          placeholder="ID phòng khám"
        />
        <Field
          component={AntInput}
          name="name_clinic"
          type="textarea"
          label="Nhập tên phòng khám"
          validate={isRequired("Tên phòng khám")}
          submitCount={submitCount}
          hasFeedback
          style={{
            width: "400px",
          }}
          placeholder="Tên phòng khám"
        />
        <Field
          component={AntInput}
          name="name_doctor"
          type="textarea"
          label="Tên chủ phòng khám"
          validate={isRequired("Tên chủ phòng khám")}
          submitCount={submitCount}
          hasFeedback
          style={{
            width: "400px",
          }}
          disabled
          placeholder="Tên chủ phòng khám"
        />
        <AddressPickForm
          values={values}
          submitCount={submitCount}
          initialValues={initialValues}
          disabledByInit={true}
        />
        <Field
          component={AntInput}
          name="address"
          type="textarea"
          label="Nhập địa chỉ phòng khám"
          validate={isRequired("Địa chỉ phòng khám")}
          submitCount={submitCount}
          hasFeedback
          style={{
            width: "400px",
          }}
          placeholder="Địa chỉ phòng khám"
        />
        <div className="tw-flex tw-flex-row tw-justify-between tw-w-full">
          <Field
            component={AntInput}
            name="lng"
            type="textarea"
            label="Kinh độ"
            validate={validateLng}
            submitCount={submitCount}
            hasFeedback
            style={{
              width: "190px",
            }}
            placeholder="Kinh độ"
          />
          <Field
            component={AntInput}
            name="lat"
            type="textarea"
            label="Vĩ độ"
            validate={validateLat}
            submitCount={submitCount}
            hasFeedback
            style={{
              width: "190px",
            }}
            placeholder="Vĩ độ"
          />
        </div>
      </Form>
    </div>
  );
};

export default CreateClinicForm;
