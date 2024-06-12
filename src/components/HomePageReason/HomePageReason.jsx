import React from "react";
import "./HomePageReason.scss";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const HomePageReason = (props) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const tempComponent = (props) => {
    return (
      <div
        data-aos={props.animation}
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <div
          className={`tw-flex tw-items-center tw-mx-auto tw-max-w-4xl tw-py-16 ${
            props.reverse === false ? "" : "tw-flex-row-reverse"
          }`}
        >
          <img src={props.img} width="300px" height="300px"></img>
          <div className="tw-px-16">
            <div className="tw-font-bold tw-text-4xl tw-text-black">
              {props.title}
            </div>
            <div className="tw-font-medium tw-text-3xl tw-text-black tw-text-truncate tw-mt-7">
              {" "}
              {props.reason}
            </div>
          </div>
        </div>
        <div
          className={`HomePageDraw ${
            props.draw === false
              ? ""
              : "tw-flex tw-mx-auto tw-max-w-5xl tw-h-1 tw-bg-gray-200 tw-border-0"
          }`}
        ></div>
      </div>
    );
  };
  const DataReasons = [
    {
      img: `${process.env.PUBLIC_URL}/assets/doctor1.png`,
      title: "Đa dạng phòng khám",
      reason:
        "Cho tới nay, Pharma Track đã hợp tác với 120 phòng khám trên toàn quốc, trong đó có 70 phòng khám ở TP.HCM",
      animation: "fade-right",
      reverse: false,
      draw: true,
    },
    {
      img: `${process.env.PUBLIC_URL}/assets/doctor2.png`,
      title: "Đặt lịch khám ngay lập tức",
      reason:
        "Không cần thủ tục xác minh hay đăng nhập, với Pharma Track bạn có thể đặt lịch khám chỉ với 3 bước",
      animation: "fade-left",
      reverse: true,
      draw: true,
    },
    {
      img: `${process.env.PUBLIC_URL}/assets/doctor3.png`,
      title: "Tìm phòng khám gần nhất",
      reason:
        "Sử dụng google maps API cùng với dữ liệu được cung cấp từ phòng khám, Pharma Track sẽ giúp bạn tìm ra phòng khám gần nhất",
      animation: "fade-right",
      reverse: false,
      draw: false,
    },
  ];

  return (
    <div>
      <div
        data-aos="fade-in"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
        className="HomePageReason tw-flex tw-font-bold tw-text-4xl tw-mt-16 tw-text-black tw-justify-center"
      >
        Lý do bạn nên dùng Pharma Track
      </div>
      {DataReasons.map((DataReason) => tempComponent(DataReason))}
    </div>
  );
};

export default HomePageReason;
