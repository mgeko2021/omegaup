import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import actions from "./actions";
import { toast } from "react-toastify";
toast.configure();

const URL_API =
  "https://omega.proteccionenlinea.co/proteccionenlinea/services/api/pqrs/save";

const postPQRSRequest = async (data) => {
  const result = await fetch(URL_API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((myJson) => myJson)
    .catch((error) => console.log(error));

  return result;
};

export function* postPQRS({ payload }) {
  try {
    const result = yield call(postPQRSRequest, payload);
    toast.success('Enviado exitosamente.', {
      hideProgressBar: false,
      autoClose: false,
      position: "top-center",
    });
  } catch (error) {
    console.log("error", error);
  }
}

export function* PQRSSaga() {
  yield takeEvery(actions.SEND_PQRS_INIT, postPQRS);
}

export default function* rootSaga() {
  yield all([fork(PQRSSaga)]);
}
