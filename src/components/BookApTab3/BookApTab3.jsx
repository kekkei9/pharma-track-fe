import React from "react";
import "./BookApTab3.scss";
import { Button, notification, Divider, Row, Col } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import BackNextButton from "../BackNextButton/BackNextButton";
import { useSelector } from "react-redux";
import Fetch from "../../fetch";
import { updateUserInfo } from "../../firebase";

const BookApTab3 = (props) => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const { isAuthUser, user } = useSelector((state) => state.authentication);

  if (!state) {
    state = JSON.parse(localStorage.getItem("bookingState"));
  }

  const onClickBack = () => {
    navigate("/bookap2", { state });
  };

  const onClickNext = async () => {
    localStorage.setItem("bookingState", JSON.stringify(state));
    if ((isAuthUser, user?.role === "user")) {
      try {
        const { time, currentDoctor, userFormValues } = state;
        let postData = {};
        postData.time = time.shift;
        postData.doctor = currentDoctor.name;
        postData.test = "Test1";
        postData.number = currentDoctor.number;
        postData.address = `${currentDoctor.address}, ${currentDoctor.ward}, ${currentDoctor.city}, ${currentDoctor.province}`;
        postData.status = "Chờ khám";
        postData.id_clinic = currentDoctor.id_clinic;
        postData.id_user = user.uid;
        postData.id_staff = currentDoctor.id_staff;

        const responseAppointment = await Fetch(
          "POST",
          "https://pharma-track.onrender.com/api/v1/appointment",
          postData
        );

        if (responseAppointment.results === "thanh cong") {
          notification.success({
            message: "Đăng kí lịch hẹn",
            description: "Đăng kí thông tin thành công",
          });

          const response = await Fetch(
            "PUT",
            "https://pharma-track.onrender.com/api/v1/doctortime/updateDoctorShift",
            {
              id_doctortime: "7b8f78f4-b9b8-4c99-8a8d-108035733333",
              shift: time.shift,
              action: "booked",
            }
          );
          if (response.results === "thanh cong") {
            notification.success({
              message: "Đăng kí lịch hẹn",
              description: "Đăng kí lịch hẹn thành công",
            });
          }

          const userData = (({ address, cccd, gender, phonenumber }) => ({
            address,
            cccd,
            gender,
            phonenumber,
          }))(userFormValues);

          userData.birthday = userFormValues.birthday.$d;

          await updateUserInfo(user.uid, userData);
          notification.success({
            message: "Cập nhật thông tin",
            description: "Cập nhật thông tin người dùng thành công",
          });
          localStorage.removeItem("bookingState");

          navigate(
            `/user/appointment/${responseAppointment.data.id_appointment}`,
            { state: { disabled: true } }
          );
          return;
        }
      } catch (e) {
        console.error(e);
      }
      notification.error({
        message: "Đặt lịch hẹn",
        description: "Lỗi hệ thống, đang chờ xử lí",
      });
    } else {
      notification.error({
        message: "Đặt lịch hẹn",
        description: "Vui lòng đăng nhập tài khoản bệnh nhân",
      });
    }
  };

  return (
    <div className="BookApTab3">
      <div className="shawdow-user  tw-mt-5 tw-p-8">
        <Row>
          <Col
            span={12}
            offset={6}
            className="container-payment tw-shadow tw-shadow-slate-400"
          >
            <Row className="image_finish">
              <img
                src={`${process.env.PUBLIC_URL}/assets/tick.png`}
                alt="tick"
                width="150px"
                className="tw-rounded-full tw-mb-5"
              />
            </Row>
            <Row className="header1 ">XÁC NHẬN THANH TOÁN THÀNH CÔNG</Row>
            <Row className="header2">
              Thanh toán thành công, bấm 'Tiếp tục' để hoàn tất đặt lịch
            </Row>
            <Row className="header2">
              Thông tin xem tại Tổng quan {">"} Lịch hẹn của tôi
            </Row>
          </Col>
        </Row>
      </div>

      <BackNextButton onClickBack={onClickBack} onClickNext={onClickNext} />
    </div>
  );
};

export default BookApTab3;
