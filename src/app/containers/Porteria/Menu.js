import React, { useState, useEffect } from "react";
import style from "./Menu.module.scss";

const Menu = ({ setSelection }) => {
  const [visitantes, setVisitantes] = useState(true);
  const [correspondencia, setCorrespondencia] = useState(false);

  useEffect(() => {
    setSelection("Visitantes");
  }, [setSelection]);

  const handleChange = (e) => {
    if (e.target.name === "Visitantes") {
      //haga una cosa
      setVisitantes(true);
      setCorrespondencia(false);
      setSelection(e.target.name);
    } else {
      //haga otra cosa
      setVisitantes(false);
      setCorrespondencia(true);
      setSelection(e.target.name);
    }
  };

  return (
    <div className={style.o_button_container}>
      <button
        name="Visitantes"
        disabled={visitantes}
        className={
          visitantes
            ? `${style.o_button} ${style.o_button_pressed}`
            : style.o_button
        }
        onClick={handleChange}
      >
        Visitantes
      </button>
      <button
        name="Correspondencia"
        disabled={correspondencia}
        className={
          correspondencia
            ? `${style.o_button} ${style.o_button_pressed}`
            : style.o_button
        }
        onClick={handleChange}
      >
        Correspondencia
      </button>
    </div>
  );
};

export default Menu;
