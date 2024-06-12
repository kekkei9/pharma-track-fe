import React, { useEffect, useState } from "react";
import "./StaffTable.scss";
import { Table, notification, Popconfirm, Spin, Modal, Button } from "antd";
import Fetch from "../../fetch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserProp, getUidByStaffId } from "../../firebase";
import StaffProfilePage from "../../pages/StaffProfilePage/StaffProfilePage";

const StaffTable = ({ className, requestData, setRequestData }) => {
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState([]);
  const [currentStaffId, setCurrentStaffId] = useState();
  const [isSpinning, setIsSpinning] = useState(true);
  const [modal, setModal] = useState(false);
  const { user } = useSelector((state) => state.authentication);

  useEffect(() => {
    const abortController = new AbortController();
    setIsSpinning(true);
    const fetchStaff = async () => {
      try {
        const response = await Fetch(
          "POST",
          "https://pharma-track.onrender.com/api/v1/staff/staffByClinicID",
          {
            id_clinic: user.id_clinic,
          }
        );
        setStaffData(response);
        setIsSpinning(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchStaff();

    return () => abortController.abort();
  }, [requestData, user]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id_staff",
      key: "if_staff",
      width: "auto",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "number",
      key: "number",
      width: "20%",
    },
    {
      title: "Chức vụ",
      dataIndex: "type",
      key: "type",
      width: "15%",
    },
    {
      title: "Khoa",
      dataIndex: "department",
      key: "department",
      width: "10%",
    },
    {
      title: "Action",
      key: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Bạn có muốn xóa người này khỏi phòng khám?"
          onConfirm={async () => {
            try {
              const response = await Fetch(
                "DELETE",
                "https://pharma-track.onrender.com/api/v1/staff",
                {
                  id_staff: record.id_staff,
                }
              );
              if (response.results === "thanh cong") {
                notification.success({
                  message: "Bảng nhân viên",
                  description: `Xóa nhân viên ${record.id_staff} thành công`,
                });
                setRequestData(new Date());
                const { uid } = await getUidByStaffId(record.id_staff);
                await Promise.all([
                  deleteUserProp(uid, "id_staff"),
                  deleteUserProp(uid, "id_clinic"),
                ]);
                return true;
              }
            } catch (e) {
              console.error(e);
            }
            notification.error({
              message: "Bảng nhân viên",
              description: `Xóa nhân viên ${record.id_staff} thất bại`,
            });
          }}
          okText="Có"
          cancelText="Không"
        >
          <a style={{ color: "#1890FF" }} href="#">
            Xoá
          </a>
        </Popconfirm>
      ),
      width: "10%",
    },
  ];

  return (
    <div className={`StaffTable tw-w-2/3 ${className}`}>
      <Spin tip="Loading..." spinning={isSpinning}>
        <Modal
          open={modal}
          title="Thông tin nhân viên"
          centered
          onCancel={() => setModal(false)}
          footer={[]}
          width={400}
          top={120}
          zIndex={10002}
        >
          <StaffProfilePage staffId={currentStaffId} />
        </Modal>
        <Table
          onRow={(record) => ({
            onDoubleClick: () => {
              setCurrentStaffId(record.id_staff);
              setModal(true);
            },
          })}
          className="staff-table"
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          columns={columns}
          dataSource={staffData}
          pagination={{ pageSize: 6 }}
        />
      </Spin>
    </div>
  );
};

export default StaffTable;
