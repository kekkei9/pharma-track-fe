import React, { useState } from "react";
import "./BookPage2.scss";
import { Form, Field } from "formik";
import { Checkbox } from "antd";
import { Form as AntdForm, Button } from "antd";

import {
  AntInput,
  AntSelect,
  AntDatePicker,
  AntTimePicker,
} from "../CreateAntField/CreateAntField";
import {
  validateFullName,
  validateDiaChi,
  validateBirthDay,
  validateDate,
  validateEmailBooking,
  validateGioiTinh,
  validateTime,
  isRequired,
  validatePhoneNumber,
} from "../ValidateFields/ValidateFields";

const FormItem = AntdForm.Item;

export const dateFormat = "MM-DD-YYYY";

const BookPage2 = ({ handleSubmit, values, submitCount }) => {
  const [isChecked, setIsChecked] = useState(false);
  const onChange = (e) => {
    setIsChecked(e.target.checked);
  };
  return (
    <div className="BookPage2">
      <Form className="form-container" onSubmit={handleSubmit}>
        <div className="header tw-text-xl tw-font-bold tw-pb-5 ">
          1.Thông tin phòng khám đăng kí khám
        </div>

        <div className="doctorProfile">
          <div className="col tw-flex tw-flex-col tw-items-center">
            <div className="row tw-flex tw-flex-row">
              <Field
                component={AntInput}
                name="nameDoctor"
                type="textarea"
                label="Họ và tên bác sĩ"
                submitCount={submitCount}
                hasFeedback
                style={{
                  width: "300px",
                }}
                disabled={true}
              />
              <Field
                component={AntInput}
                name="department"
                type="textarea"
                label="Chuyên khoa"
                submitCount={submitCount}
                hasFeedback
                style={{
                  width: "300px",
                }}
                disabled={true}
              />

              <Field
                component={AntInput}
                name="yearEx"
                type="textarea"
                label="Số năm kinh nghiệm"
                submitCount={submitCount}
                hasFeedback
                style={{
                  width: "300px",
                }}
                disabled={true}
              />
            </div>
            <div className="row tw-flex tw-flex-row">
              <Field
                component={AntInput}
                name="numberDoctor"
                type="textarea"
                label="Số điện thoại phòng khám"
                submitCount={submitCount}
                hasFeedback
                style={{
                  width: "300px",
                }}
                defaultValue="0935123456"
                disabled={true}
              />
              <Field
                component={AntInput}
                value={`${values.address}, ${values.ward}, ${values.city}, ${values.province}`}
                type="textarea"
                label="Địa chỉ phòng khám"
                //validate={validateFullName}
                submitCount={submitCount}
                hasFeedback
                style={{
                  width: "640px",
                }}
                defaultValue="70 Lê Thánh Tôn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh"
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div className="header tw-text-xl tw-font-bold tw-pb-5 ">
          2.Thông tin người đăng ký khám
        </div>
        <div className="col tw-flex tw-flex-col tw-items-center">
          <div className="row tw-flex tw-flex-row">
            <Field
              component={AntInput}
              name="fullname"
              type="textarea"
              label="Họ và tên"
              validate={validateFullName}
              submitCount={submitCount}
              hasFeedback
              style={{
                width: "300px",
              }}
              placeholder="Họ và tên"
            />

            <Field
              component={AntDatePicker}
              name="birthday"
              label="Ngày sinh"
              defaultValue={values.birthdayDate}
              format="DD/MM/YYYY"
              validate={validateBirthDay}
              submitCount={submitCount}
              hasFeedback
              style={{
                width: "300px",
                height: "38px",
                borderRadius: "10px",
              }}
              placeholder="Ngày/Tháng/Năm"
            />
            <Field
              component={AntInput}
              name="cccd"
              type="textarea"
              label="Số CCCD/CMND"
              validate={isRequired("Số CCCD/CMND")}
              submitCount={submitCount}
              hasFeedback
              style={{
                width: "300px",
              }}
              placeholder="Số CCCD/CMND"
            />
          </div>
          <div className="row tw-flex tw-flex-row">
            <Field
              component={AntSelect}
              name="gender"
              label="Giới tính"
              defaultValue={values.type}
              validate={isRequired("Giới tính")}
             
              submitCount={submitCount}
              tokenSeparators={[","]}
              style={{ width: "300px" }}
              hasFeedback
              showSearch
              options={["Nam", "Nữ", "Khác"].map((type) => ({
                value: type,
                label: type,
              }))}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />

            <Field
              component={AntInput}
              name="email"
              type="email"
              label="Email "
              validate={validateEmailBooking}
              submitCount={submitCount}
              hasFeedback
              style={{
                width: "300px",
              }}
              placeholder="Email "
            />

            <Field
              component={AntInput}
              name="BHYT"
              type="ma"
              label="Số thẻ BHYT"
              //  validate={isRequired}
              submitCount={submitCount}
              hasFeedback
              style={{
                width: "300px",
              }}
              placeholder="Số thẻ BHYT "
            />
          </div>
          <div className="row tw-flex tw-flex-row">
            <Field
              component={AntInput}
              name="phonenumber"
              type="textarea"
              label="Số điện thoại"
              validate={validatePhoneNumber}
              submitCount={submitCount}
              hasFeedback
              style={{
                width: "300px",
              }}
              placeholder="Số điện thoại"
            />

            <Field
              component={AntInput}
              name="address"
              type="textarea"
              label="Địa chỉ"
              validate={validateDiaChi}
              submitCount={submitCount}
              hasFeedback
              style={{
                width: "640px",
              }}
              placeholder="Địa chỉ"
            />
          </div>

          <div className="row tw-flex tw-flex-row">
            <Field
              component={AntInput}
              name="symptom"
              type="textarea"
              label="Triệu chứng"
              submitCount={submitCount}
              hasFeedback
              style={{
                width: "980px",
                height: "80px",
              }}
              placeholder="Triệu chứng"
            />
          </div>
        </div>
        <div className="header tw-text-xl tw-font-bold tw-pb-5">
          3.Thông tin đăng ký khám
        </div>
        <div className="col tw-flex tw-flex-col tw-items-center">
          <div className="row tw-flex tw-flex-row ">
            <Field
              component={AntInput}
              label="Ngày hẹn khám "
              value={new Date().toISOString().split("T")[0]}
              format={dateFormat}
              submitCount={submitCount}
              hasFeedback
              style={{
                width: "300px",
                height: "38px",
                borderRadius: "10px",
              }}
              disabled={true}
            />

            <Field
              component={AntInput}
              name="timeDoctor"
              type="textarea"
              label="Thời gian hẹn"
              submitCount={submitCount}
              hasFeedback
              style={{
                width: "300px",
                height: "38px",
                borderRadius: "10px",
              }}
              disabled={true}
            />
          </div>
        </div>
        <div className="Note tw-text-red-600 tw-pl-4 tw-list-disc tw-items-center tw-w-2/3">
          <div className=" tw-font-bold tw-text-xl">Lưu ý và điều khoản:</div>
          <ul className="tw-list-disc tw-pl-5 tw-text-[16px] tw-align-center">
            <li>
              Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho dịch vụ
              khám bệnh
            </li>
            <li>
              Xin vui lòng kiểm tra kỹ các thông tin bắt buộc (VD: Họ và tên,
              Ngày tháng năm sinh, Số điện thoại, CCCD/Mã định danh công dân/HC
              ...)
            </li>
            <li>
              Vui lòng kiểm tra kỹ thông tin về bác sĩ bạn sẽ đặt khám để chắc
              rằng bạn đang kết nối đúng với bác sĩ chuyên khoa phù hợp
            </li>
            <li>
              Hãy tới đúng ngày, giờ đặt khám và đúng địa chỉ phòng khám để có
              được dịch vụ tốt nhất.{" "}
            </li>
            <li>
              Mọi thông tin trên của bạn được bảo mật và chỉ sử dụng cho phòng
              khám mà bạn đã đặt khám.
            </li>
            <li>
              Chúng tôi sẽ thu một khoản phí dịch vụ, vui lòng thanh toán và xin
              cảm ơn vì đã chọn chúng tôi
            </li>
            <li>
              Bằng việc đồng ý và nhấn nút "Tiếp tục", bạn hoàn toàn hiểu và
              chịu trách nhiệm với các thông tin đã cung cấp.
            </li>
          </ul>
        </div>
        <div className="checkbox tw-items-center tw-w-3/5 ">
          <Checkbox onChange={onChange}>
            Tôi đã đọc kĩ và đồng ý với những điều khoản trên
          </Checkbox>
          {!isChecked && (
            <div className="tw-text-red-500 tw-ml-24">
              Vui lòng chọn ô trên !
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default BookPage2;
