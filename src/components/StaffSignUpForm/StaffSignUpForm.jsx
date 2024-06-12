import React from "react";
import "./StaffSignUpForm.scss";
import { Form, Field } from "formik";
import { AntInput, AntSelect } from "../CreateAntField/CreateAntField";
import { isRequired } from "../ValidateFields/ValidateFields";

const StaffSignUpForm = ({ values, handleSubmit, submitCount, hostSide }) => {
  return (
    <div className="StaffSignUpForm">
      <Form
        className="form-container tw-flex tw-flex-col tw-items-center"
        onSubmit={handleSubmit}
        id="staffSignUpForm"
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
        {hostSide ? (
          <Field
            component={AntInput}
            name="uid"
            type="textarea"
            label="Nhập UID nhân viên"
            validate={isRequired("UID nhân viên")}
            submitCount={submitCount}
            hasFeedback
            style={{
              width: "400px",
            }}
            placeholder="UID nhân viên"
          />
        ) : (
          <div>
            <Field
              component={AntInput}
              name="id_clinic"
              type="textarea"
              label="Nhập ID phòng khám"
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
              name="name"
              type="textarea"
              label="Nhập tên nhân viên"
              validate={isRequired("Tên nhân viên")}
              submitCount={submitCount}
              hasFeedback
              style={{
                width: "400px",
              }}
              disabled
              placeholder="Tên nhân viên"
            />
          </div>
        )}
        <Field
          component={AntInput}
          name="number"
          type="textarea"
          label="Nhập số điện thoại"
          validate={isRequired("Số điện thoại")}
          submitCount={submitCount}
          hasFeedback
          style={{
            width: "400px",
          }}
          placeholder="Số điện thoại"
        />
        <Field
          component={AntSelect}
          name="type"
          label="Chọn loại nhân viên"
          defaultValue={values.type}
          validate={isRequired("Loại nhân viên")}
          submitCount={submitCount}
          tokenSeparators={[","]}
          style={{ width: "400px" }}
          hasFeedback
          showSearch
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={["Bác sĩ", "Nhân viên", "Điều hướng viên"].map((type) => ({
            value: type,
            label: type,
          }))}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
        {values.type === "Bác sĩ" && (
          <Field
            component={AntSelect}
            name="department"
            label="Chọn khoa"
            defaultValue={values.department}
            validate={isRequired("Khoa")}
            submitCount={submitCount}
            tokenSeparators={[","]}
            style={{ width: "400px" }}
            hasFeedback
            showSearch
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={["A", "B", "C"].map((dep) => ({
              value: dep,
              label: dep,
            }))}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        )}
      </Form>
    </div>
  );
};

export default StaffSignUpForm;
