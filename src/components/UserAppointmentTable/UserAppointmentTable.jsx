import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserAppointmentTable.scss";
import { Spin, Table } from "antd";
import Fetch from "../../fetch";
import { getUserData } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";

const columns = [
  {
    title: "ID",
    dataIndex: "id_appointment",
    key: "id_appointment",
    width: "15%",
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
    width: "10%",
  },
  {
    title: "Tên bác sĩ",
    dataIndex: "doctor",
    key: "doctor",
    width: "15%",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: "30%",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: "10%",
  },
];

const UserAppointmentTable = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.authentication);
  const { uid } = user;

  const [userAppointment, setUserAppointment] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const response = await Fetch(
          "GET",
          "https://pharma-track.onrender.com/api/v1/appointment/id_user",
          {
            id_user: uid,
          }
        );
        setUserAppointment(response);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();

    return () => abortController.abort();
  }, [uid]);

  return (
    <div className="UserAppointmentTable tw-flex tw-flex-col tw-items-center">
      <div className="tw-w-2/3 tw-mt-5">
        <div className="booking tw-flex tw-justify-center tw-mb-5 tw-font-bold tw-text-4xl ">
          Lịch hẹn của bạn
        </div>
        <Spin spinning={isLoading}>
          <Table
            className="staff-table"
            onRow={(record) => ({
              onDoubleClick: () => {
                navigate(`/${user.role}/appointment/${record.id_appointment}`);
              },
            })}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-dark"
            }
            columns={columns}
            dataSource={userAppointment}
            pagination={{ pageSize: 6 }}
          />
        </Spin>
      </div>
    </div>
  );
};

export default UserAppointmentTable;
