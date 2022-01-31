import React, { useState } from "react";
import BasicTable from "./BasicTable";
import Menu from "./Menu";
import { Paper } from "@material-ui/core";
import { useSelector } from "react-redux";

const Porteria = () => {
  const { idContacto, numeroInstancia, NameInstance } = useSelector(
    (state) => state.auth
  );

  const [selection, setSelection] = useState("");

  return (
    <Paper style={{ padding: "10px 20px", display: "flex" }}>
      <Menu setSelection={setSelection} />
      {/* Si es visitantes entonces tabla de Visitantes */}
      {selection === "Visitantes" && (
        <BasicTable
          selection={selection}
          idContacto={idContacto}
          numeroInstancia={numeroInstancia}
          NameInstance={NameInstance}
        />
      )}
      {/* Si es Correspondencia entonces tabla de correspondencia */}
      {selection === "Correspondencia" && (
        <BasicTable
          selection={selection}
          idContacto={idContacto}
          numeroInstancia={numeroInstancia}
          NameInstance={NameInstance}
        />
      )}
    </Paper>
  );
};

export default Porteria;
