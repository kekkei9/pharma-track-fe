import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, notification, Modal } from "antd";
import CreateClinicFormContainer from "../../containers/CreateClinicForm/CreateClinicForm.container";
import StaffSignUpFormContainer from "../../containers/StaffSignUpForm/StaffSignUpForm.container";
import RoleCard from "../../components/RoleCard/RoleCard";

import "./RolePage.scss";
import {
  createUserUsingEmailPassword,
  setUserInfo,
  getUserData,
} from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authentication/authentication.slice";
import InputForm from "../../components/InputForm/InputForm";
import BackButton from "../../components/BackButton/BackButton";
import Fetch from "../../fetch";

const RolePage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [tab, setTab] = useState(-1);
  const [warnText, setWarnText] = useState();
  const [desText, setDesText] = useState();
  const [modal, setModal] = useState(false);
  const hostFormRef = useRef(null);
  const staffFormRef = useRef(null);
  let bonusClinic = {};

  const RoleData = [
    {
      name: "host",
      title: "Chủ Phòng Khám",
      imgsrc: `${process.env.PUBLIC_URL}/assets/host.png`,
      description: "Chủ phòng khám",
    },
    {
      name: "staff",
      title: "Nhân Viên",
      imgsrc: `${process.env.PUBLIC_URL}/assets/staff.png`,
      description: "Nhân viên",
    },
    {
      name: "user",
      title: "Người Dùng",
      imgsrc: `${process.env.PUBLIC_URL}/assets/user.png`,
      description: "Người dùng",
    },
  ];

  const handleSubmitHost = async () => {
    if (hostFormRef.current) {
      hostFormRef.current.handleSubmit();
      if (
        !(
          hostFormRef.current.isValid &&
          Object.keys(hostFormRef.current.touched).length > 0
        )
      ) {
        return false;
      }
      try {
        const response = await Fetch(
          "POST",
          "https://pharma-track.onrender.com/api/v1/clinic",
          {
            ...hostFormRef.current.values,
            status_clinic: true,
          }
        );
        if (response.results === "that bai") {
          notification.error({
            message: "Tạo phòng khám",
            description: `Phòng khám với ID ${hostFormRef.current.values.id_clinic} đã tồn tại`,
          });
          return false;
        }
      } catch (e) {
        console.error(e);
      }
    }
    bonusClinic.id_clinic = hostFormRef.current.values.id_clinic;
    return true;
  };

  const handleSubmit = async (tab) => {
    if (tab >= 3 || tab < 0) {
      setWarnText("Bạn chưa chọn loại tài khoản !");
    } else {
      const role = RoleData[tab].name;
      try {
        if (!!state.password) {
          const user = await createUserUsingEmailPassword({
            ...state,
            role,
            ...bonusClinic,
          });
          if (!user) {
            notification.error({
              message: "Đăng kí",
              description: "Lỗi đăng kí",
            });
            return;
          }
          const { uid } = user;
          notification.success({
            message: "Đăng kí",
            description: "Đăng kí thành công",
          });
          const userData = await getUserData(uid);
          dispatch(setUser(userData));
          localStorage.setItem("user", JSON.stringify(userData));
          notification.success({
            message: "Đăng nhập",
            description: "Đăng nhập thành công",
          });
          navigate("/home");
        } else {
          setUserInfo(state.uid, { ...state, role });
          navigate("/login");
          notification.success({
            message: "Đăng kí",
            description: "Đăng kí thành công",
          });
        }
      } catch (e) {
        notification.error({
          message: "Đăng kí",
          description:
            e.code === "auth/email-already-in-use" ? "Email đã được dùng" : "",
        });
      }
    }
  };

  return (
    <div className="RolePage tw-flex tw-flex-col tw-items-center">
      <Modal
        open={modal}
        title={tab === 0 ? "Thông tin phòng khám" : "Thông tin nhân viên"}
        onCancel={() => setModal(false)}
        footer={[
          <Button key="back" onClick={() => setModal(false)}>
            Quay lại
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={async () => {
              if (tab === 0) {
                if (!(await handleSubmitHost())) return false;
              } else {
                bonusClinic = await staffFormRef.current.submitForm();
                if (!bonusClinic) return false;
              }
              await handleSubmit(tab);
              return true;
            }}
          >
            {tab === 0 ? "Tạo phòng khám" : "Tạo tài khoản"}
          </Button>,
        ]}
        width={448}
        style={{
          top: 120,
        }}
      >
        {tab === 0 ? (
          <CreateClinicFormContainer {...state} formRef={hostFormRef} />
        ) : (
          <StaffSignUpFormContainer {...state} formRef={staffFormRef} />
        )}
      </Modal>
      <div>
        <BackButton />
        <div className="RoleHeader">
          <div className="header1 ">Vui lòng chọn loại</div>
          <div className="header2 "> TÀI KHOẢN</div>
        </div>
        <div className="RoleCardList tw-flex tw-flex-row">
          {RoleData.map((role, index) => (
            <RoleCard
              {...role}
              style={
                tab === index
                  ? {
                      borderColor: "rgba(0, 121, 255, 0.5)",
                    }
                  : {}
              }
              setTab={setTab}
              setDesText={setDesText}
              index={index}
            />
          ))}
        </div>
        <div className="tw-text-gray-400 tw-text-center tw-mt-2">{desText}</div>
      </div>
      {tab === -1 && warnText && (
        <div
          className="warn-container tw-text-red-500 tw-text-base tw-mt-3"
          style={{ animation: "fadeIn 1s" }}
        >
          {warnText}
        </div>
      )}
      <div className="RoleButton tw-flex tw-flex-row tw-justify-center tw-space-x-40 tw-mt-5">
        <div>
          <Button
            className="button1"
            type="primary"
            shape="round"
            style={{ width: "150px", height: "40px" }}
            onClick={() => navigate(-1)}
          >
            QUAY LẠI
          </Button>
        </div>

        <div>
          <Button
            className="button2"
            type="primary"
            shape="round"
            style={{ backgroundColor: "blue", width: "150px", height: "40px" }}
            onClick={async () => {
              if (tab === 2) {
                await handleSubmit(tab);
              } else {
                setModal(true);
              }
            }}
          >
            TIẾP TỤC
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RolePage;
