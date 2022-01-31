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
  identificacion: "",
};

function ForgotPassword(props) {
  const { intl, show, handleClose } = props;
  const dispatch = useDispatch();

  const forgotPasswordSchema = Yup.object().shape({
    identificacion: Yup.number().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      dispatch(authActions.forgotPassword(values));
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
          <Modal.Title>Recordar contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Identificación</Form.Label>
              <Form.Control
                type="number"
                name="identificacion"
                placeholder="Identificación"
                {...formik.getFieldProps("identificacion")}
              />
              <Form.Text className="text-muted">
                Cedula o identificación del usuario.
              </Form.Text>
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

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
