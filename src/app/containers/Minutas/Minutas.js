import React, { useState } from "react";
import { useSelector } from "react-redux";
import BasicTable from "./BasicTable";
import ReactSelect from "react-select";
import style from "./Minutas.module.scss";

const Minutas = () => {
  const [category, setCategory] = useState({
    value: "Administracion",
    label: "Libro de Administración",
  });
  const options = [
    { value: "Administracion", label: "Libro de Administración" },
    { value: "Bitacora", label: "Bitácora" },
  ];

  const { numeroInstancia, NameInstance } = useSelector((state) => state.auth);

  return (
    <div>
      <div className={style.o_actions_container}>
        <ReactSelect
          className={style.o_input}
          options={options}
          defaultValue={category}
          onChange={(option) => setCategory(option)}
        />
      </div>
      <BasicTable
        category={category}
        numeroInstancia={numeroInstancia}
        NameInstance={NameInstance}
      />
    </div>
  );
};

export default Minutas;
