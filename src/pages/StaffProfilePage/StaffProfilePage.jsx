import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  notification,
  Spin,
  Button,
  Divider,
  Typography,
  Col,
  Row,
} from "antd";
import {
  checkUserInfoExist,
  getUidByStaffId,
  getUserData,
} from "../../firebase";
import "./StaffProfilePage.scss";
import BackButton from "../../components/BackButton/BackButton";
import Fetch from "../../fetch";

const StaffProfilePage = ({ staffId }) => {
  const navigate = useNavigate();
  const [staffInfo, setStaffInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchStaff = async () => {
      try {
        const [userData, staffInf] = await Promise.all([
          getUidByStaffId(staffId),
          Fetch(
            "POST",
            "https://pharma-track.onrender.com/api/v1/staff/staffByID",
            {
              id_staff: staffId,
            }
          ),
        ]);
        setIsLoading(false);
        setStaffInfo({ ...userData, ...staffInf[0] });
      } catch (e) {
        console.error(e);
      }
    };
    fetchStaff();
    return () => abortController.abort();
  }, [staffId, navigate]);

  return (
    <div className="StaffProfilePage tw-flex tw-flex-col tw-items-center">
      <Spin tip="Loading..." spinning={isLoading}>
        <div className="StaffCardContainer">
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
            {staffInfo.name}
          </Typography.Title>
          <Typography.Title level={5} style={{ margin: 0, marginTop: "8px" }}>
            {staffInfo.type}
          </Typography.Title>
          <Typography.Title level={5} italic style={{ margin: "8px 0" }}>
            Mã nhân viên: {staffInfo?.id_staff?.substring(0, 8).concat("...")}
          </Typography.Title>
          <Button
            type="default"
            onClick={() => navigator.clipboard.writeText(staffInfo.id_staff)}
            className="tw-mt-4"
          >
            Sao chép ID
          </Button>

          <Divider />

          <div style={{ width: "67%" }}>
            <Row>
              <Col span={12}>Số điện thoại:</Col>
              <Col span={12}>{staffInfo?.number}</Col>
            </Row>
            <Row>
              <Col span={12}>Tỉnh/thành phố:</Col>
              <Col span={12}>{staffInfo?.province}</Col>
            </Row>
            <Row>
              <Col span={12}>Khoa:</Col>
              <Col span={12}>{staffInfo?.department}</Col>
            </Row>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default StaffProfilePage;
