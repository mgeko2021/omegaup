import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Image, Button } from "react-bootstrap";
import contactoActions from "../../modules/Contacto/_redux/actions";

export default function Contacto() {
  const dispatch = useDispatch();
  const { contacto } = useSelector((state) => state.contacto);
  const { tipoUsuario, numeroInstancia, NameInstance } = useSelector(
    (state) => state.auth
  );
  // eslint-disable-next-line no-unused-vars
  const [dataInit, setDataInit] = useState({
    idInstancia: numeroInstancia,
    bdName: NameInstance,
    userType: tipoUsuario,
  });

  useEffect(() => {
    dispatch(contactoActions.getContactoInit(dataInit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="row">
        {contacto && contacto.length > 0 && (
          <>
            {contacto.map((persona, index) => (
              <div className="col-md-6 col-lg-4 col-sm-6">
                <Card
                  key={index}
                  style={{
                    width: "25rem",
                    marginBottom: "2rem",
                    borderRadius: 6,
                    WebkitBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                    MozBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                  }}
                >
                  <Image
                    variant="top"
                    roundedCircle
                    style={{
                      margin: "0 auto",
                      padding: "2rem",
                      width: 200,
                      height: "auto",
                    }}
                    src={
                      persona.fotoContacto
                        ? `https://omega.proteccionenlinea.co/controldevisitantes/${persona.fotoContacto}`
                        : "https://omega.proteccionenlinea.co/controldevisitantes/images/upload/registrovisitante.png"
                    }
                  />
                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Title>
                      {persona.nombreContacto} {persona.apellidoContacto}
                    </Card.Title>
                    <Card.Text>{persona.cargoContacto}</Card.Text>
                    <Card.Text>{persona.emailContacto}</Card.Text>
                    <Card.Text>{persona.celularContacto}</Card.Text>
                    <div className="row justify-content-around">
                      <Button
                        variant="warning"
                        style={{ width: "120px", borderRadius: "12px" }}
                      >
                        Mensaje
                      </Button>
                      <Button
                        variant="danger"
                        style={{ width: "120px", borderRadius: "12px" }}
                      >
                        Llamar
                      </Button>
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
