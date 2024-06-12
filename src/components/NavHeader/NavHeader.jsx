import React from "react";
import "./NavHeader.scss";
import { Link } from "react-router-dom";

const NavHeader = ({ page, title, nav, setNav }) => {
  return (
    <div
      className={`NavHeader tw-ml-7 tw-text-white tw-font-semibold tw-text-base ${
        nav === title ? "nav-chosen" : ""
      }`}
      onClick={() => setNav(title)}
    >
      <Link to={`/${page}` || "login"}>{title}</Link>
    </div>
  );
};

export default NavHeader;
