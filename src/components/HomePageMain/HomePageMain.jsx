import React from "react";
import "./HomePageMain.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const HomePageMain = (props) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div
      data-aos="fade-in"
      data-aos-easing="ease-in-out"
      data-aos-once="true"
      className="HomePageMain tw-block tw-mt-7"
    >
      <div className="tw-flex tw-items-center tw-mx-auto tw-max-w-5xl">
        <img
          src={`${process.env.PUBLIC_URL}/assets/dogtor.png`}
          alt="dogtor"
          width="370px"
          height="370px"
        ></img>
        <div className="tw-ml-36">
          <div className="tw-font-bold tw-text-6xl tw-text-blue-600">
            {" "}
            Pharma Track
          </div>
          <div className="tw-font-normal tw-text-5xl tw-text-black tw-text-truncate tw-mt-7">
            {" "}
            Giải pháp khám bệnh nhanh chóng cho tất cả mọi người
          </div>
        </div>
      </div>
      <div className="HomePageDraw tw-flex tw-mx-auto tw-max-w-5xl tw-h-1 tw-bg-gray-200 tw-border-0"></div>
    </div>
  );
};

export default HomePageMain;
