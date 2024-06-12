import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./StaffTablePage.scss";
import StaffTable from "../../components/StaffTable/StaffTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import StaffSignUpFormContainer from "../../containers/StaffSignUpForm/StaffSignUpForm.container";
import { useSelector } from "react-redux";

const StaffTablePage = (props) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [requestData, setRequestData] = useState(new Date());
  const { user } = useSelector((state) => state.authentication);

  return (
    <div className="StaffTablePage tw-flex tw-flex-col tw-items-center">
      <div className="tw-w-2/3 tw-justify-end tw-flex tw-flex-row tw-mt-5">
        <Modal
          open={modal}
          title="Thông tin nhân viên"
          centered
          onCancel={() => setModal(false)}
          footer={[
            <Button key="back" onClick={() => setModal(false)}>
              Quay lại
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              form="staffSignUpForm"
            >
              Thêm nhân viên
            </Button>,
          ]}
          width={448}
        >
          <StaffSignUpFormContainer
            hostSide={true}
            id_clinic={user.id_clinic}
            setRequestData={setRequestData}
          />
        </Modal>
        <Button type="default" onClick={() => setRequestData(new Date())}>
          <FontAwesomeIcon icon={faRotateRight} className="tw-self-center" />
          <div className="tw-ml-2">Tải lại</div>
        </Button>
        <Button
          type="default"
          onClick={() => {
            setModal(true);
          }}
          className="tw-ml-2"
        >
          <FontAwesomeIcon icon={faPlus} className="tw-self-center" />
          <div className="tw-ml-2">Thêm nhân viên</div>
        </Button>
      </div>
      <StaffTable
        className={"tw-mt-5"}
        requestData={requestData}
        setRequestData={setRequestData}
      />
    </div>
  );
};

export default StaffTablePage;
