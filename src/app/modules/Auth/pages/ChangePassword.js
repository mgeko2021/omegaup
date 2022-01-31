import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import authActions from "../_redux/actions";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { Modal, Button, Form } from "react-bootstrap";

const initialValues = {
  cedula: "",
  oldPassword: "",
  password: "",
};

function ChangePassword(props) {
  const { intl, show, handleClose } = props;
  const dispatch = useDispatch();

  const changePasswordSchema = Yup.object().shape({
    cedula: Yup.number().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    oldPassword: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    password: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      dispatch(authActions.changePassword(values));
      setSubmitting(false);
      resetForm();
      handleClose();
    },
  });

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cambiar tú contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Identificación</Form.Label>
              <Form.Control
                type="number"
                name="cedula"
                placeholder="Identificación"
                {...formik.getFieldProps("cedula")}
              />
              <Form.Text className="text-muted">
                Cedula o identificación del usuario
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Antigua contraseña</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                placeholder="Anterior contraseña"
                {...formik.getFieldProps("oldPassword")}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Nueva contraseña"
                {...formik.getFieldProps("password")}
              />
            </Form.Group>
            <Button variant="dark" type="submit" className="mt-2 ml-2">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ChangePassword));
