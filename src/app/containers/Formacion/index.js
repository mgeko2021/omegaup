import React from "react";
import { useSelector } from "react-redux";
import FormacionTable from "./FormacionTable";

const Formacion = () => {
  const guarda = useSelector((state) => state.guardas);

  return (
    <div className="bg-white rounded-lg">
      <div
        className="d-flex align-items-center mb-5 p-5"
        style={{ gap: "10px" }}
      >
        <img
          style={{ borderRadius: "50%", width: "72px" }}
          src={`https://omega.proteccionenlinea.co/proteccionenlinea/images/${guarda.guarda.foto}`}
          alt=""
        />
        <div className="d-flex flex-column">
          <h4>{`${guarda.guarda.nombres} ${guarda.guarda.apellidos}`}</h4>
          <h4>{guarda.guarda.cargo}</h4>
        </div>
      </div>
      <FormacionTable colaboradorCode={guarda.guarda.colaboradorCode} />
    </div>
  );
};

export default Formacion;
