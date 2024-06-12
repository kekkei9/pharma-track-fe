import React, { useState } from "react";
import "./ClinicProfileForm.scss";
import { Form, Field } from "formik";
import { AntInput, AntTextArea } from "../CreateAntField/CreateAntField";
import {
  validateLat,
  validateLng,
  isRequired,
} from "../ValidateFields/ValidateFields";
import AddressPickForm from "../AddressPickForm/AddressPickForm";
import { Button, notification, Popconfirm } from "antd";
import Fetch from "../../fetch";

const ClinicProfileForm = ({
  values,
  initialValues,
  handleSubmit,
  submitCount,
  setClinic,
}) => {
  const [addrChosen, setAddrChosen] = useState(false);
  const [mountAnimate, setMountAnimate] = useState(false);

  return (
    <div className="ClinicProfileForm">
      <Form
        className="form-container tw-flex tw-flex-row tw-items-center"
        onSubmit={handleSubmit}
      >
        <div className="tw-flex tw-flex-col tw-items-center">
          <Field
            component={AntInput}
            name="id_clinic"
            type="textarea"
            label="ID phòng khám"
            submitCount={submitCount}
            hasFeedback
            style={{
              width: "400px",
            }}
            disabled
          />
          <Field
            component={AntInput}
            name="name_clinic"
            type="textarea"
            label="Tên phòng khám"
            submitCount={submitCount}
            validate={isRequired("Tên phòng khám")}
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
            submitCount={submitCount}
            hasFeedback
            style={{
              width: "400px",
            }}
            disabled
          />
          <Field
            component={AntTextArea}
            value={`${values.address}, ${values.ward}, ${values.city}, ${values.province}`}
            label="Địa chỉ phòng khám"
            submitCount={submitCount}
            hasFeedback
            style={{
              width: "400px",
            }}
            disabled
          />
          {addrChosen && (
            <div
              className="expand-addr-btn tw-text-slate-400 tw-mt-1"
              onClick={async () => {
                setMountAnimate(false);
                setTimeout(() => setAddrChosen(false), 1000);
              }}
              style={{
                animation: `fadeIn 1s`,
              }}
            >
              Nhấp vào đây để thu gọn
            </div>
          )}
          {!addrChosen && (
            <div
              className="expand-addr-btn tw-text-slate-400 tw-mt-1"
              onClick={() => {
                setAddrChosen(true);
                setMountAnimate(true);
              }}
              style={{
                animation: `fadeIn 1s`,
              }}
            >
              Nhấp vào đây để xem chi tiết
            </div>
          )}

          <div className="tw-flex tw-flex-row tw-m-4">
            <Button
              type="primary"
              danger
              ghost
              htmlType="reset"
              className="isTrans"
            >
              Đặt lại
            </Button>
            <Popconfirm
              title="Xác nhận sửa thông tin phòng khám"
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={async () => {
                const response = await Fetch(
                  "PUT",
                  "https://pharma-track.onrender.com/api/v1/clinic",
                  {
                    ...values,
                    status_clinic: false,
                  }
                );
                if (response.results === "that bai") {
                  notification.error({
                    message: "Sửa thông tin phòng khám",
                    description: response.message,
                  });
                  return false;
                }
                notification.success({
                  message: "Sửa thông tin phòng khám",
                  description: "Sửa thông tin thành công",
                });
                setClinic(values);
                return true;
              }}
            >
              <Button className="tw-ml-2">Hoàn tất</Button>
            </Popconfirm>
          </div>
        </div>
        {addrChosen && values && (
          <div
            className={`tw-flex tw-flex-col tw-items-center ${
              mountAnimate ? "tw-ml-8" : ""
            } tw-self-start`}
            style={{
              animation: `${mountAnimate ? "floatInRight" : "floatOutLeft"} 1s`,
            }}
          >
            <AddressPickForm values={values} submitCount={submitCount} />
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
          </div>
        )}
      </Form>
    </div>
  );
};

export default ClinicProfileForm;
