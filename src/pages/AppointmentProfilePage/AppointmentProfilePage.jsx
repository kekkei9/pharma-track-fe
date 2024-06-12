import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import "./AppointmentProfilePage.scss";
import QRCode from "qrcode.react";
import { Button, Row, Col, Divider, Typography, Spin } from "antd";
import { useState } from "react";
import Fetch from "../../fetch";
import { getUserData } from "../../firebase";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StaffProfilePage from "../StaffProfilePage/StaffProfilePage";

const AppointmentProfilePage = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const disabled = state?.disabled || false;
  const { user } = useSelector((state) => state.authentication);
  const params = useParams();
  const [QRData, setQRData] = useState("");
  const [appointmentData, setAppointmentData] = useState({});
  const [userData, setUserData] = useState({});
  const [doctorData, setDoctorData] = useState({});
  const [clinicData, setClinicData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    setQRData(JSON.stringify({ id_appointment: params.appointmentId }));
    setIsLoading(true);
    const fetchAppointment = async () => {
      try {
        const response = await Fetch(
          "GET",
          "https://pharma-track.onrender.com/api/v1/appointment/id_appointment",
          {
            id_appointment: params.appointmentId,
          }
        );
        setAppointmentData(response[0]);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAppointment();
    return () => abortController.abort();
  }, [params.appointmentId]);

  useEffect(() => {
    const abortController = new AbortController();

    setIsLoading(true);
    const fetchOtherData = async () => {
      try {
        const [responseUser, responeDoctor, responseClinic] = await Promise.all(
          [
            getUserData(appointmentData.id_user),
            Fetch(
              "POST",
              "https://pharma-track.onrender.com/api/v1/staff/staffByID",
              {
                id_staff: appointmentData.id_staff,
              }
            ),
            Fetch(
              "POST",
              "https://pharma-track.onrender.com/api/v1/clinic/id_clinic",
              {
                id_clinic: appointmentData.id_clinic,
              }
            ),
          ]
        );
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(responseUser?.birthday?.seconds);
        responseUser.birthday = t.toLocaleDateString("en-GB");

        setUserData(responseUser);
        setDoctorData(responeDoctor[0]);
        setClinicData(responseClinic[0]);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchOtherData();
    return () => abortController.abort();
  }, [appointmentData]);

  const downloadQRCode = async () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${params.appointmentId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="AppointmentProfilePage tw-flex tw-flex-col tw-items-center tw-mb-8">
      {!disabled && <BackButton className="tw-ml-20" />}
      <Spin spinning={isLoading}>
        <div className="tw-flex tw-flex-row tw-m-8">
          {user.role === "user" ? (
            <div className="profile-container tw-shadow tw-shadow-slate-400 tw-p-8 tw-flex tw-flex-col tw-items-center tw-bg-slate-50 tw-justify-around">
              <div className="tw-text-2xl tw-font-bold tw-mb-4">
                Thông tin phòng khám
              </div>
              <div className="tw-flex tw-flex-col tw-items-center">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/clinic real img.jpg`}
                  alt="clinic real img"
                  width="90px"
                  className="tw-mb-4"
                />
                <div className="tw-text-3xl">{clinicData?.name_clinic}</div>
              </div>
              <Divider />
              <div className="tw-text-xl tw-w-fit">
                <Row>
                  <Col span={12}>Tên chủ phòng khám: </Col>
                  <Col span={12}>{clinicData?.name_doctor}</Col>
                </Row>
                <Row>
                  <Col span={12}>Địa chỉ phòng khám: </Col>
                  <Col
                    span={12}
                  >{`${clinicData?.address}, ${clinicData?.ward}, ${clinicData?.city}, ${clinicData?.province}`}</Col>
                </Row>
                <Row>
                  <Col span={12}>Trạng thái: </Col>
                  <Col span={12}>
                    {clinicData?.status_clinic
                      ? "Đang hoạt động"
                      : "Đang chờ xét duyệt"}
                  </Col>
                </Row>
              </div>
            </div>
          ) : (
            <div className="tw-ml-8 tw-shadow tw-shadow-slate-400 tw-p-8 tw-flex tw-flex-row  tw-bg-slate-50 tw-items-center">
              <div className="tw-flex tw-flex-col tw-items-center tw-justify-around">
                <div className="tw-text-2xl tw-font-bold tw-mb-4">
                  Thông tin bệnh nhân
                </div>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/userProfile.jpg`}
                  alt="dogtor"
                  style={{
                    borderRadius: "9999px",
                    border: "solid 4px #e1e1e1",
                    width: "170px",
                    marginBottom: "16px",
                  }}
                />
                <Typography.Title level={2} style={{ margin: 0 }}>
                  {userData?.username}
                </Typography.Title>
                <Typography.Title level={5} style={{ margin: "8px 0" }}>
                  Mã đặt chỗ:{" "}
                  {params?.appointmentId?.substring(0, 8).concat("...")}
                </Typography.Title>
                <Button
                  type="default"
                  onClick={() =>
                    navigator.clipboard.writeText(params.appointmentId)
                  }
                >
                  Sao chép mã đặt chỗ
                </Button>
              </div>

              {/* <Divider type="vertical" /> */}

              <div className="tw-flex tw-flex-col tw-ml-8">
                <Row>
                  <Col span={12}>Số điện thoại:</Col>
                  <Col span={12}>{userData?.phonenumber}</Col>
                </Row>
                <Row>
                  <Col span={12}>Giới tính:</Col>
                  <Col span={12}>{userData?.gender}</Col>
                </Row>
                <Row>
                  <Col span={12}>Địa chỉ:</Col>
                  <Col span={12}>{userData?.address}</Col>
                </Row>
                <Row>
                  <Col span={12}>Căn cước công dân:</Col>
                  <Col span={12}>{userData?.cccd}</Col>
                </Row>
                <Row>
                  <Col span={12}>Ngày sinh:</Col>
                  <Col span={12}>{userData?.birthday}</Col>
                </Row>
              </div>
            </div>
          )}
          <div className="profile-container tw-ml-8 tw-shadow tw-shadow-slate-400 tw-p-8 tw-flex tw-flex-col tw-items-center tw-bg-slate-50 tw-justify-around">
            <div className="tw-text-2xl tw-font-bold tw-mb-4">
              Thông tin bác sĩ
            </div>

            <img
              src={`${process.env.PUBLIC_URL}/assets/dogtor.png`}
              alt="dogtor"
              style={{
                borderRadius: "9999px",
                border: "solid 4px #e1e1e1",
                width: "170px",
                marginBottom: "16px",
              }}
            />
            <Typography.Title level={2} style={{ margin: 0 }}>
              {doctorData?.name}
            </Typography.Title>
            <Typography.Title level={5} style={{ margin: 0, marginTop: "8px" }}>
              {doctorData?.type}
            </Typography.Title>

            {user.role === "staff" ? (
              <div className="tw-flex tw-flex-col tw-items-center">
                <Typography.Title level={5} style={{ margin: "8px 0" }}>
                  Mã nhân viên:{" "}
                  {doctorData?.id_staff?.substring(0, 8).concat("...")}
                </Typography.Title>
                <Button
                  type="default"
                  onClick={() =>
                    navigator.clipboard.writeText(doctorData.id_staff)
                  }
                >
                  Sao chép ID
                </Button>
              </div>
            ) : (
              <div className="tw-flex tw-flex-col tw-items-center tw-w-full">
                <Divider />

                <div className="tw-text-base">
                  Số điện thoại: {doctorData?.number}
                </div>
                <div className="tw-text-base">
                  Khoa: {doctorData?.department}
                </div>
              </div>
            )}
          </div>
          {user.role === "user" && (
            <div className="profile-container tw-ml-8 tw-shadow tw-shadow-slate-400 tw-p-8 tw-flex tw-flex-col tw-items-center tw-bg-slate-50 tw-justify-around">
              <div className="tw-text-2xl tw-font-bold tw-mb-4">Mã QR</div>

              <QRCode
                id="qr-gen"
                value={QRData}
                size={250}
                level={"H"}
                includeMargin={true}
              />
              <Button
                type="primary"
                onClick={downloadQRCode}
                className="tw-mt-5  QR-btn"
              >
                <FontAwesomeIcon icon={faDownload} />
                <div className="tw-ml-2">Tải về</div>
              </Button>
            </div>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default AppointmentProfilePage;
