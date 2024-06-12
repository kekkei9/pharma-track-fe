import React from "react";
import "./RoleCard.scss";
import { Card } from "antd";

const { Meta } = Card;

const RoleCard = ({
  title,
  imgsrc,
  description,
  style,
  setTab,
  setDesText,
  index,
}) => {
  return (
    <div className="RoleCard">
      <div>
        <Card
          hoverable
          cover={<img alt={title} src={imgsrc} />}
          style={style}
          onClick={() => {
            setTab(index);
            setDesText(description);
          }}
        >
          <Meta title={title} />
        </Card>
      </div>
    </div>
  );
};

export default RoleCard;
