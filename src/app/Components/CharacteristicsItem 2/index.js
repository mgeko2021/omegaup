import React from "react";
import style from "./CharacteristicsItem2.module.scss";

const CharacteristicsItem2 = ({ title, description, icon, type }) => {
  return (
    <div style={{marginBottom:"0.5rem"}}
    className={
      type === "benefits"
        ? `${style.o_characteristics_card_container} ${style.o_benefits}`
        : style.o_characteristics_card_container
    }
  >
    <img style={{width:"64px"}} src={icon} alt={title} />
    <div>
      <p style={{fontSize:"1.2rem", marginLeft:"0.5rem"}}>{description}</p>
    </div>
  </div>
);
};
export default CharacteristicsItem2;
