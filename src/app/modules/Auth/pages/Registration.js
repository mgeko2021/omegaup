import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../_redux/actions";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import {
  Modal,
  Button,
  Form,
  Dropdown,
  InputGroup,
  FormControl,
} from "react-bootstrap";

function Registration(props) {
  const { handleClose, show } = props;
  const dispatch = useDispatch();
  const [showPuesto, setShowPuesto] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [id, setId] = useState({
    identificacion: null,
  });
  const [puesto, setPuesto] = useState({});
  const [filterPuesto, setFilterPuesto] = useState({
    search: "",
  });
  const { general } = useSelector((state) => state.auth);
  const [formRegister, setFormRegister] = useState({
    nombres: null,
    apellidos: null,
    email: null,
    password: null,
  });

  const handleSubmitId = (e) => {
    e.preventDefault();
    if (id.identificacion.trim()) {
      dispatch(authActions.registrationId(id));
      setShowPuesto(true);
    }
  };

  const handleChargePuesto = (puestoFn) => {
    setShowRegister(true);
    setPuesto(puestoFn);
  };

  const handleResetRegister = () => {
    setPuesto({});
    setShowPuesto(false);
    setShowRegister(false);
    setId(null);
    setFormRegister(null);
    setFilterPuesto({
      search: "",
    });
    handleClose();
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    formRegister.identificacion = id.identificacion;
    formRegister.basededatos = puesto.database;
    formRegister.instancia = puesto.instancia;
    dispatch(authActions.registrationUser(formRegister));
    handleResetRegister();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmitId(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Identificación</Form.Label>
              <Form.Control
                type="number"
                name="identificacion"
                placeholder="Identificación"
                required
                onChange={(e) =>
                  setId({
                    ...id,
                    identificacion: e.target.value,
                  })
                }
              />
              <Form.Text className="text-muted">
                Cedula o identificación del usuario.
              </Form.Text>
            </Form.Group>
            <Button variant="dark" type="submit" className="mt-2 ml-2">
              Enviar
            </Button>
          </Form>
          {showPuesto && (
            <>
              <Dropdown className="mt-4">
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                  <InputGroup className="mb-3">
                    <FormControl
                      onChange={(e) =>
                        setFilterPuesto({
                          ...filterPuesto,
                          search: e.target.value,
                        })
                      }
                      placeholder="Buscar puestos"
                      style={{
                        backgroundColor: "#A30000",
                        border: "none",
                        color: "white",
                      }}
                    />
                  </InputGroup>
                  {showRegister ? puesto.nombre : "Seleccionar Puesto"}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ overflowY: "scroll", height: 200 }}>
                  {general.length &&
                    general
                      .filter((puesto) =>
                        puesto.nombre
                          .toLowerCase()
                          .includes(filterPuesto.search.toLowerCase())
                      )
                      .map((puesto) => (
                        <Dropdown.Item
                          type="button"
                          onClick={() => handleChargePuesto(puesto)}
                        >
                          {puesto.nombre}
                        </Dropdown.Item>
                      ))}
                </Dropdown.Menu>
              </Dropdown>
              {showRegister && (
                <Form
                  className="mt-10"
                  onSubmit={(e) => handleSubmitRegister(e)}
                >
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nombre Completo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombres"
                      name="nombres"
                      required
                      onChange={(e) =>
                        setFormRegister({
                          ...formRegister,
                          nombres: e.target.value,
                        })
                      }
                    />
                    <Form.Text className="text-muted">
                      Nombres completos
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Apellidos"
                      required
                      name="apellidos"
                      onChange={(e) =>
                        setFormRegister({
                          ...formRegister,
                          apellidos: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Correo electronico"
                      required
                      name="email"
                      onChange={(e) =>
                        setFormRegister({
                          ...formRegister,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      required
                      name="password"
                      onChange={(e) =>
                        setFormRegister({
                          ...formRegister,
                          password: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Registrarse
                  </Button>
                </Form>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleResetRegister()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
