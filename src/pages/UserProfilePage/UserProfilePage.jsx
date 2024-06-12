import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserData } from "../../firebase";
import { notification, Spin, Button, Divider, Row, Col } from "antd";
import "./UserProfilePage.scss";

const UserProfilePage = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    const fetchUser = async () => {
      setUserData(await getUserData(params.userId));
      setIsLoading(false);
    };
    fetchUser();

    return () => abortController.abort();
  }, [params?.userId]);

  const RoleName = {
    host: "Chủ phòng khám",
    staff: "Nhân viên",
    user: "Người dùng",
  };

  return (
    <div className="UserProfilePage">
      <Spin tip="Loading..." spinning={isLoading}>
        <div className="shawdow-user  tw-items-center  tw-mt-5 tw-p-8">
          <div>
            <Row>
              <Col
                span={16}
                offset={4}
                className="container-userprofile  tw-p-10 tw-shadow tw-shadow-slate-400  "
              >
                <Row className="main-row">
                  <Col span={6}>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/userProfile.jpg`}
                      alt="user"
                      width="150px"
                      className="tw-rounded-full tw-border-4 tw-border-gray-300"
                    />
                  </Col>

                  <Col span={14}>
                    {" "}
                    <Row>
                      <div className="tw-text-2xl tw-uppercase tw-font-bold">
                        {" "}
                        {userData.username}
                      </div>
                    </Row>
                    <Row>
                      {" "}
                      <div className="tw-text-xl tw-text-[#06b6d4]">
                        {RoleName[userData.role]}
                      </div>{" "}
                    </Row>
                    <Divider />
                    <Row>
                      {" "}
                      <Col className="col-infor" span={12}>
                        ID{" "}
                      </Col>
                      <Col span={12} className="col-infor-2">{userData.userId}123</Col>
                    </Row>
                    <Row>
                      {" "}
                      <Col className="col-infor" span={12}>
                        Họ tên{" "}
                      </Col>
                      <Col span={12} className="col-infor-2">{userData.username}</Col>
                    </Row>
                    <Row>
                      {" "}
                      <Col className="col-infor" span={12}>
                        Email{" "}
                      </Col>
                      <Col span={12} className="col-infor-2">{userData.email}</Col>
                    </Row>
                    <Row>
                      {" "}
                      <Col className="col-infor" span={12}>
                        Số điện thoại{" "}
                      </Col>
                      <Col span={12} className="col-infor-2">0932341123</Col>
                    </Row>
                    <Row>
                      {" "}
                      <Col className="col-infor" span={12}>
                        Chức vụ{" "}
                      </Col>
                      <Col span={12} className="col-infor-2">{RoleName[userData.role]}</Col>
                    </Row>
                    <Row>
                      {" "}
                      <Col className="col-infor" span={12}>
                        Tỉnh thành{" "}
                      </Col>
                      <Col span={12} className="col-infor-2">{userData?.province}</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default UserProfilePage;
