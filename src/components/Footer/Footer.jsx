import React from "react";
import "./Footer.scss";

const Footer = (props) => {
  return (
    <div className="Footer tw-mt-6">
      <div className="tw-pl-20 tw-pt-4 tw-pb-4 tw-pr-20 tw-flex tw-flex-col tw-items-center">
        <ul className="tw-self-start">
          {["Copyright", "About", "Contact"].map((prop) => (
            <li className="tw-text-white ">{prop}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
