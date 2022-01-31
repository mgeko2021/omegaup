import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import pqrsActions from "../../modules/PQRS/_redux/actions";
import { makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import style from "./Pqrs.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const Pqrs = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    user,
    numeroInstancia,
    idContacto,
    tipoUsuario,
    NameInstance,
  } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    pqrs: "",
  });

  const handleInput = (e) => {
    setData({
      ...data,
      pqrs: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      numeroInstancia,
      idSector: user.idSector,
      nombreSector: user.nombreSector,
      idUnidadPrivada: user.idUnidadPrivada,
      nombreUnidadPrivada: user.nombreUnidadPrivada,
      idContacto,
      tipoUsuario: 'Administrador',
      cedulaUsuario: user.cedulaUsuario,
      baseDeDatos: NameInstance,
      pqrs: data.pqrs,
    };

    dispatch(pqrsActions.sendPQRSInit(dataToSend));
    document.getElementById("form").reset();
  };

  return (
    <>
      <Paper className={classes.root}>
        <h4>Peticiones, quejas reclamos y sugerencias</h4>
        <p>
          Describa con detalle su caso. Nuestros funcionarios estarán trabajando
          para darle una pronta respuesta:
        </p>
        <div className="o_form_container">
          <form onSubmit={(e) => handleSubmit(e)} id="form">
            <div className="form-group">
              <textarea
                className={style.o_textarea}
                rows="10"
                onInput={(e) => handleInput(e)}
              />
            </div>
            <div className={style.o_actions}>
              <button type="submit" className="btn btn-danger">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </Paper>
    </>
  );
};

export default Pqrs;
