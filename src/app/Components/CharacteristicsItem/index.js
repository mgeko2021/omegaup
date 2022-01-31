import React from "react";
import style from "./CharacteristicsItem.module.scss";

const CharacteristicsItem = ({ title, description, icon, type }) => {
  return (
    <div
      className={
        type === "benefits"
          ? `${style.o_characteristics_card_container} ${style.o_benefits}`
          : style.o_characteristics_card_container
      }
    >
      <img src={icon} style={{width:"50px"}} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CharacteristicsItem;
