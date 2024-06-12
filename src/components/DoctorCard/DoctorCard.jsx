import React, { useState } from "react";
import "./DoctorCard.scss";

const DoctorCard = ({
  id_staff,
  name,
  province,
  city,
  ward,
  address,
  department,
  style,
  changeStyle,
  setStyle,
  handleDoubleClick,
  setID,
}) => {
  return (
    <div
      className="DoctorCard tw-border-2 tw-px-8 tw-pt-10 tw-select-none tw-cursor-pointer tw-transform tw-transition tw-duration-500 hover:tw-scale-110"
      style={style}
      onClick={() => {
        setID(id_staff);
        setStyle(id_staff);
      }}
      onDoubleClick={() => {
        handleDoubleClick();
        setID(id_staff);
      }}
    >
      <div className="tw-flex tw-justify-center">
        <img
          src={`${process.env.PUBLIC_URL}/assets/avatardoctor.png`}
          alt="dogtor"
        ></img>
      </div>
      <div className="tw-text-center tw-my-auto tw-pt-2 ">
        <div className="Name tw-text-2xl tw-font-bold tw-pb-2">{name}</div>
        <div className="Địa chỉ tw-text-sm ">
          Địa chỉ phòng khám: {address}, {ward}, {city}, {province}
        </div>
        <div className="field tw-text-sm">Khoa: {department}</div>
      </div>
    </div>
  );
};

export default DoctorCard;
