import { notification, Spin, Button, Divider, Row, Col } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClinicProfileFormContainer from "../../containers/ClinicProfileForm/ClinicProfileForm.container";
import Fetch from "../../fetch";
import "./ClinicProfile.scss";

const ClinicProfile = (props) => {
  const navigate = useNavigate();
  const [clinic, setClinic] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.authentication);
  const clinicFormRef = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();

    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await Fetch(
          "POST",
          "https://pharma-track.onrender.com/api/v1/clinic/id_clinic",
          {
            id_clinic: user.id_clinic,
          }
        );
        if (response.result !== "that bai") {
          setClinic(response[0]);
          setIsLoading(false);
          return true;
        }
      } catch (e) {
        console.error(e);
      }
      notification.error({
        message: "Thông tin phòng khám",
        description: "Không tìm thấy phòng khám",
      });
      navigate(-1);
      return false;
    };
    fetchData();

    return () => abortController.abort();
  }, [user, JSON.stringify(clinic)]);

  return (
    <div className="ClinicProfile tw-mt-5 tw-flex tw-flex-col tw-items-center">
      <Spin tip="Loading..." spinning={isLoading}>
        <div className="tw-flex tw-flex-row tw-m-8">
          <div className="profile-container tw-mr-8 tw-shadow tw-shadow-slate-400 tw-p-8 tw-flex tw-flex-col tw-items-center tw-bg-slate-50 tw-justify-around">
            <div className="tw-flex tw-flex-col tw-items-center">
              <img
                src={`${process.env.PUBLIC_URL}/assets/clinic real img.jpg`}
                alt="clinic real img"
                width="90px"
                className="tw-rounded-3xl"
              />
              <div className="tw-text-3xl">{clinic.name_clinic}</div>
              <div className="tw-text-xl">ID: {clinic.id_clinic}</div>
              <Button
                type="default"
                onClick={() => navigator.clipboard.writeText(clinic.id_clinic)}
                className="tw-mt-2"
              >
                Sao chép ID
              </Button>
            </div>
            <Divider />
            <div className="tw-text-xl">
              <Row>
                <Col span={12}>Tên chủ phòng khám: </Col>
                <Col span={12}>{clinic.name_doctor}</Col>
              </Row>
              <Row>
                <Col span={12}>Địa chỉ phòng khám: </Col>
                <Col
                  span={12}
                >{`${clinic.address}, ${clinic.ward}, ${clinic.city}, ${clinic.province}`}</Col>
              </Row>
              <Row>
                <Col span={12}>Trạng thái: </Col>
                <Col span={12}>
                  {clinic.status_clinic
                    ? "Đang hoạt động"
                    : "Đang chờ xét duyệt"}
                </Col>
              </Row>
            </div>
            <Divider />
            {isEditing ? (
              <Button
                type="primary"
                ghost
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Trở về trang chính
              </Button>
            ) : (
              <Button
                type="default"
                onClick={() => {
                  setIsEditing(true);
                }}
                disabled={user?.role !== "host"}
              >
                Chỉnh sửa
              </Button>
            )}
          </div>
          {!isEditing ? (
            <div
              className="tw-flex tw-flex-col tw-items-center"
              style={{
                animation: "zoomIn 1s",
              }}
            >
              <div
                style={{ width: "100%", height: "80px", maxWidth: "700px" }}
                className="tw-shadow tw-shadow-slate-400 tw-p-5 tw-bg-slate-50"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </div>
              <img
                width={"700px"}
                src={`${process.env.PUBLIC_URL}/assets/rec maps.png`}
                alt="maps img"
                className=" tw-shadow-slate-400 tw-shadow tw-mt-8 tw-mb-8"
              />
            </div>
          ) : (
            <div
              className="tw-shadow-slate-400 tw-shadow tw-self-center tw-p-8 tw-bg-slate-50"
              style={{
                height: "466px",
                animation: "zoomOut 1.75s",
              }}
            >
              <ClinicProfileFormContainer
                initialValues={clinic}
                formRef={clinicFormRef}
                setClinic={setClinic}
              />
            </div>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default ClinicProfile;
