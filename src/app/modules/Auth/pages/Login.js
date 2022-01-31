import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authActions from "../../../modules/Auth/_redux/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import ForgotPassword from "./ForgotPassword";
import Registration from "./Registration";
import * as auth from "../_redux/authRedux";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  const dispatch = useDispatch();
  const { intl } = props;
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
      enableLoading();
      dispatch(authActions.login(values));
      disableLoading();
      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <div className="container-login">
      <div className="overlay-image">
        <div className="header-login">
          <img
            src={process.env.PUBLIC_URL + "/media/bg/WEB_LOG-01-FONDOLOGO.png"}
            style={{ width: 400, height: 130 }}
            alt=""
          />
          <img
            src={process.env.PUBLIC_URL + "/media/bg/WEB_LOG-01-LOGO1.png"}
            alt=""
            style={{
              width: 150,
              height: 60,
              marginTop: -110,
              marginRight: 120,
            }}
          />
        </div>
        <div className="body-login">
          <div className="mr-12">
            <h1
              className="mb-3 text-white font-size"
              style={{ fontSize: "4rem", fontWeight: "bold" }}
            >
              TOMA EL
              <br />
              <strong style={{ color: "#d61216", fontWeight: "bolder" }}>
                CONTROL
              </strong>{" "}
              DE TU
              <br />
              SEGURIDAD
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="email"
                placeholder="Usuario"
                name="email"
                {...formik.getFieldProps("email")}
              />
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                {...formik.getFieldProps("password")}
              />
              <div className="checkbox-login">
                <input
                  type="checkbox"
                  style={{ border: "solid 1px white", backgroundColor: "red" }}
                />
                <h6>Recordarme</h6>
              </div>
              <div className="d-flex align-items-center m-0">
                <button type="submit">Iniciar Sesión</button>
                <button type="button" onClick={handleShow}>
                  Olvidé Contraseña
                </button>
              </div>
              <span
                className="text-white mt-3 cursor-pointer text-center"
                onClick={handleShowRegister}
              >
                Aún no tienes una cuenta? <br /> Registrate!
              </span>
              <h2 className="align-self-end text-right mt-10 font-weight-bold text-white">
                Uso exclusivo para clientes <br /> de Seguridad Omega
              </h2>
            </form>
            <ForgotPassword handleClose={handleClose} show={show} />
            <Registration
              handleClose={handleCloseRegister}
              show={showRegister}
            />
          </div>
        </div>
        <div className="footer-login">
          <img
            src={process.env.PUBLIC_URL + "/media/bg/WEB_LOG-02-LOGO1.png"}
            alt="backwall"
          />
        </div>
      </div>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
