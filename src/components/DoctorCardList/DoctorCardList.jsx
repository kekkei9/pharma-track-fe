import React, { useState } from "react";
import "./DoctorCardList.scss";
import DoctorCard from "../DoctorCard/DoctorCard";
import { List } from "antd";
import { Modal, notification } from "antd";
import OpenDoctorCard from "../OpenDoctorCard/OpenDoctorCard";
import { useNavigate } from "react-router-dom";
import BackNextButton from "../BackNextButton/BackNextButton";

const DoctorCardList = ({
  DoctorData,
  handleDoubleClick,
  id_staff,
  setID,
}) => {


  const navigate = useNavigate();

  const [changeStyle, setStyle] = useState(-1);

  return (
    <div className="DoctorCardList">
      <div className="List tw-mx-auto tw-flex-wrap tw-max-w-4xl">
        <List
          grid={{
            column: 3,
          }}
          dataSource={DoctorData}
          pagination={{
            pageSize: 6,
          }}
          renderItem={(item) => (
            <List.Item>
              <DoctorCard
                {...item}
                style={
                  changeStyle === item.id_staff
                    ? { "border-color": "rgba(0, 121, 255, 0.5)" }
                    : {}
                }
                changeStyle={changeStyle}
                setID={setID}
                setStyle={setStyle}
                handleDoubleClick={handleDoubleClick}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default DoctorCardList;
