import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Image } from "react-bootstrap";
import guardasActions from "../../modules/Guardas/_redux/actions";
import { useHistory } from "react-router-dom";

export default function Guardas() {
  const dispatch = useDispatch();
  const { guardas } = useSelector((state) => state.guardas);
  const { NameInstance, numeroInstancia, tipoUsuario } = useSelector(
    (state) => state.auth
  );
  // eslint-disable-next-line no-unused-vars
  const [dataInit, setDataInit] = useState({
    idInstancia: numeroInstancia,
    bdName: NameInstance,
  });

  const history = useHistory();

  useEffect(() => {
    dispatch(guardasActions.getGuardasInit(dataInit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redireccionarFormacion = (guarda) => {
    dispatch(guardasActions.getGuardaData(guarda));
    history.push(`/formacion/${guarda.colaboradorCode}`);
  };

  const redireccionarProgramacion = (guarda) => {
    dispatch(guardasActions.getGuardaData(guarda));
    history.push(`/programacion/${guarda.colaboradorCode}`);
  };

  return (
    <>
      <div className="row flex-wrap" style={{ gap: "15px 0px" }}>
        {guardas.length > 0 && (
          <>
            {guardas.map((persona, index) => (
              <div className="col-md-6 col-lg-6 col-xl-4 col-sm-6">
                <Card
                  key={index}
                  style={{
                    borderRadius: 6,
                    WebkitBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                    MozBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                  }}
                >
                  {persona.foto.length > 0 && (
                    <Image
                      variant="top"
                      roundedCircle
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem",
                        width: "200px",
                        alignSelf: "center",
                      }}
                      src={`https://omega.proteccionenlinea.co/proteccionenlinea/images/${persona.foto}`}
                    />
                  )}
                  <Card.Body
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Card.Title>
                      {persona.nombres} {persona.apellidos}{" "}
                    </Card.Title>
                    <Card.Text>{persona.cargo}</Card.Text>
                    <div className="d-flex" style={{ gap: "10px" }}>
                      {(tipoUsuario === "Administrador" ||
                        tipoUsuario === "seguridadadministrativo") && (
                        <>
                          <button
                            className="btn btn-warning w-100 font-weight-bold"
                            onClick={() => redireccionarFormacion(persona)}
                          >
                            Formacion
                          </button>
                        </>
                      )}
                      {(tipoUsuario === "Administrador" ||
                        tipoUsuario === "seguridadadministrativo" ||
                        tipoUsuario === "seguridadguarda") && (
                        <button
                          className="btn btn-danger w-100 font-weight-bold"
                          onClick={() => redireccionarProgramacion(persona)}
                        >
                          Programacion
                        </button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
