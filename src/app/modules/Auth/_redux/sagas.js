/* eslint-disable require-yield */
import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import actions from "./actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserHistory } from "history";

toast.configure();
const sha1 = require("sha1");
const md5 = require("md5");

const LOGIN_URL =
  "https://omega.proteccionenlinea.co/proteccionenlinea/services/api_prueba/login";

const CHANGE_PASSWORD_URL =
  "https://omega.proteccionenlinea.co/proteccionenlinea/services/api_prueba/changePass";

const FORGOT_PASSWORD_URL =
  "https://omega.proteccionenlinea.co/proteccionenlinea/services/api_prueba/rememberPass/remember";

const REGISTRATION_ID_URL =
  "https://omega.proteccionenlinea.co/proteccionenlinea/services/api_prueba/localizacion/getLocalization";

const REGISTRATION_USER_URL =
  "https://omega.proteccionenlinea.co/proteccionenlinea/services/api_prueba/signUp/register";

const history = createBrowserHistory();

const loginRequest = async (data) =>
  await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

const changePasswordRequest = async (data) =>
  await fetch(CHANGE_PASSWORD_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

const forgotPasswordRequest = async (data) =>
  await fetch(FORGOT_PASSWORD_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

const registrationIdRequest = async (data) =>
  await fetch(REGISTRATION_ID_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

const registrationUserRequest = async (data) =>
  await fetch(REGISTRATION_USER_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

export function* loginAuth({ payload }) {
  try {
    const hashMD5 = md5(payload.password);
    const hashSHA1 = sha1(hashMD5);
    payload.password = hashSHA1;

    const result = yield call(loginRequest, payload);
    if (result.length) {
      const NameInstance = result[0].NameInstance;
      const user = result[1];
      yield put(actions.loginRequestSuccess({ NameInstance, user }));
    } else {
      const { Error } = result;
      toast.error(`${Error}`, {
        hideProgressBar: false,
        autoClose: false,
        position: "top-center",
      });
      yield put(actions.loginRequestFaulire());
    }
  } catch (error) {
    console.log("error", error);
    yield put(actions.loginRequestFaulire());
  }
}

export function* loginSaga() {
  yield takeEvery(actions.LOGIN_REQUEST_START, loginAuth);
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_REQUEST_FAULIRE, function*() {
    history.push("/auth/login");
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    history.push("/auth/login");
  });
}

export function* changePassword({ payload }) {
  try {
    const hashMD5 = md5(payload.oldPassword);
    const hashSHA1 = sha1(hashMD5);

    const hashMD52 = md5(payload.password);
    const hashSHA12 = sha1(hashMD52);

    payload.oldPassword = hashSHA1;
    payload.password = hashSHA12;

    const result = yield call(changePasswordRequest, payload);
    if (Object.keys(result).length) {
      const { Data } = result;
      toast(`${Data}`, {
        hideProgressBar: false,
        autoClose: false,
        position: "top-center",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function* forgotPassword({ payload }) {
  try {
    const result = yield call(forgotPasswordRequest, payload);
    if (Object.keys(result).length) {
      const { Data } = result;
      toast(`${Data}`, {
        hideProgressBar: false,
        autoClose: false,
        position: "top-center",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function* forgotPasswordSaga() {
  yield takeEvery(actions.FORGOT_PASSWORD, forgotPassword);
}

export function* changePasswordSaga() {
  yield takeEvery(actions.CHANGE_PASSWORD, changePassword);
}

export function* registrationId({ payload }) {
  try {
    const result = yield call(registrationIdRequest, payload);
    if (Object.keys(result).length) {
      const { general, omega, SeguridadOmega } = result;
      yield put(
        actions.getLocationsSuccess({ general, omega, SeguridadOmega })
      );
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function* registrationUser({ payload }) {
  try {
    const hashMD5 = md5(payload.password);
    const hashSHA1 = sha1(hashMD5);
    payload.password = hashSHA1;
    const result = yield call(registrationUserRequest, payload);
    if (Object.keys(result).length) {
      const { Data } = result;
      toast(`${Data}`, {
        hideProgressBar: false,
        autoClose: false,
        position: "top-center",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function* registrationIdSaga() {
  yield takeEvery(actions.REGISTRATION_ID, registrationId);
}

export function* registrationUserSaga() {
  yield takeEvery(actions.REGISTRATION_USER, registrationUser);
}

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(changePasswordSaga),
    fork(forgotPasswordSaga),
    fork(registrationIdSaga),
    fork(registrationUserSaga),
  ]);
}
