import React from "react";
import "./Header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authentication/authentication.slice";
import { signOutUser } from "../../firebase";
import { Dropdown, notification } from "antd";
import { useState } from "react";
import NavHeader from "../NavHeader/NavHeader";
import { useEffect } from "react";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [nav, setNav] = useState("Trang chủ");
  const { user, isAuthUser } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (location.pathname === "/bookap") {
      setNav("Đăng kí khám bệnh");
    } else if (location.pathname === "/login") {
      setNav("Đăng nhập");
    } else if (location.pathname.includes("/signup")) {
      setNav("Đăng kí");
    } else if (
      ["/host", "/staff", "/user"].some((p) => location.pathname.includes(p))
    ) {
      setNav("Tổng quan");
    } else {
      setNav("Trang chủ");
    }
  }, [location]);

  const logOutHandler = async () => {
    await signOutUser();
    dispatch(logout());
    localStorage.removeItem("user");
    notification.success({
      message: "Đăng xuất",
      description: "Đăng xuất thành công",
    });
    if (
      ["/host", "/staff", "/user", "/bookap"].some((p) =>
        location.pathname.includes(p)
      )
    ) {
      // setNav("Trang chủ");
      navigate("/home");
    }
  };

  const roleDropdownItems = {
    host: [
      {
        key: "1",
        label: <Link to={"/host/clinic"}>Thông tin phòng khám</Link>,
      },
      {
        key: "2",
        label: <Link to={"/host/staffTable"}>Quản lí nhân viên</Link>,
      },
    ],
    staff: [
      {
        key: "1",
        label: <Link to={"/staff/clinic"}>Thông tin phòng khám</Link>,
      },
      {
        key: "2",
        label: <Link to={"/staff/appointments"}>Quản lí lịch hẹn</Link>,
      },
      {
        key: "3",
        label: <Link to={"/staff/QRscan"}>Quét mã QR</Link>,
      },
    ],
    user: [
      {
        key: "1",
        label: <Link to={"user/appointments"}>Lịch hẹn của tôi</Link>,
      },
    ],
  };

  const userDropdownItems = [
    {
      key: "1",
      label: (
        <Link to={`/user/${user.uid}`} activeClassName="current">
          Thông tin người dùng
        </Link>
      ),
    },
    {
      key: "2",
      label: <Link to={"/help"}>Trợ giúp</Link>,
    },
    {
      key: "3",
      label: <Link to={"/setting"}>Cài đặt</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: <div onClick={logOutHandler}>Đăng xuất</div>,
    },
  ];

  return (
    <div className="Header tw-px-24 tw-flex tw-flex-row tw-p-5 tw-fixed tw-top-0 tw-justify-between tw-items-center">
      <div
        className="Dogtor tw-flex tw-flex-row tw-items-center"
        onClick={() => {
          // setNav("Trang chủ");
          navigate("/home");
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/dogtor.png`}
          alt="dogtor"
          width="60px"
          height="60px"
          className="tw-rounded-full"
        ></img>
        <div className="tw-font-bold tw-text-4xl tw-text-white tw-ml-2">
          Pharma Track
        </div>
      </div>
      <div className="tw-flex tw-flex-row tw-items-center">
        <NavHeader page="home" title="Trang chủ" nav={nav} setNav={setNav} />

        {(!isAuthUser || user.role === "user") && (
          <NavHeader
            page="bookap"
            title="Đăng kí khám bệnh"
            nav={nav}
            setNav={setNav}
          />
        )}

        {isAuthUser && (
          <Dropdown
            menu={{
              items: roleDropdownItems[user.role],
            }}
            placement="bottomRight"
            arrow
            trigger={["click"]}
          >
            <div
              className={`RoleDropdown tw-ml-7 tw-text-white tw-font-semibold tw-text-base ${
                nav === "Tổng quan" ? "nav-chosen" : ""
              }`}
              onClick={() => setNav("Tổng quan")}
            >
              Tổng quan
            </div>
          </Dropdown>
        )}
        {isAuthUser && (
          <Dropdown
            menu={{
              items: userDropdownItems,
            }}
            placement="bottomRight"
            arrow
            trigger={["click"]}
          >
            <div className="header_primary-btn">Xin chào, {user.username}</div>
          </Dropdown>
        )}

        {!isAuthUser && (
          <div
            className="header_primary-btn"
            onClick={() => {
              // setNav("Đăng nhập");
              navigate("/login");
            }}
          >
            Đăng nhập
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
