import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.scss";
import HomePageMain from "../../components/HomePageMain/HomePageMain";
import HomePageReason from "../../components/HomePageReason/HomePageReason";
import { useSelector } from "react-redux";

const HomePage = (props) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authentication);

  return (
    <div className="HomePage tw-flex tw-flex-col tw-items-center">
      <HomePageMain />
      <HomePageReason />
      {!["host", "staff"].includes(user?.role) && (
        <div
          className="RegBtn tw-px-12 tw-py-2.5 tw-bg-white tw-font-semibold tw-text-xl tw-my-5"
          onClick={() => navigate("/bookap")}
        >
          Đặt khám ngay!
        </div>
      )}
    </div>
  );
};

export default HomePage;
