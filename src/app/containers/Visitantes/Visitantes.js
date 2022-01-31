import React from "react";
import BasicTable from "./BasicTable";
import { Paper } from "@material-ui/core";
import { useSelector } from "react-redux";

const Visitantes = () => {
  const { idContacto, numeroInstancia, NameInstance } = useSelector(
    (state) => state.auth
  );

  return (
    <Paper style={{ padding: "10px 20px", display: "flex" }}>
      {/* Si es Visitantes entonces tabla de Visitantes */}
      <BasicTable
        idContacto={idContacto}
        numeroInstancia={numeroInstancia}
        NameInstance={NameInstance}
      />
    </Paper>
  );
};

export default Visitantes;
