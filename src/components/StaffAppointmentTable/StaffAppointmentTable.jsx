import React, { useEffect, useState } from "react";
import "./StaffAppointmentTable.scss";
import { Table, Button, Spin } from "antd";
import Fetch from "../../fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "ID",
    dataIndex: "id_appointment",
    key: "id_appointment",
    width: "20%",
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
    width: "20%",
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

const StaffAppointmentTable = (props) => {
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.authentication);

  const [userAppointment, setUserAppointment] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const response = await Fetch(
          "GET",
          "https://pharma-track.onrender.com/api/v1/appointment/id_clinic",
          {
            id_clinic: user.id_clinic,
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
  }, [user, requestData]);

  return (
    <div className="UserAppointmentTable tw-flex tw-flex-col tw-items-center">
      <div className="tw-flex tw-flex-col tw-w-2/3  tw-mt-5">
        <Button
          type="default"
          onClick={() => setRequestData(new Date())}
          className="tw-self-end"
        >
          <FontAwesomeIcon icon={faRotateRight} className="tw-self-center" />
          <div className="tw-ml-2">Tải lại</div>
        </Button>
        <Spin spinning={isLoading}>
          <Table
            className="staff-table tw-mt-5"
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

export default StaffAppointmentTable;
