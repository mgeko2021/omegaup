import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import actions from "./actions";

const URL_API =
  "https://omega.proteccionenlinea.co/proteccionenlinea/services/api/visitantes";

const getVisitantesRequest = async ({
  payload: { dataInit, visitantesRowsCallback },
}) => {
  const result = await fetch(URL_API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInit),
  })
    .then((response) => response.json())
    .then((result) => visitantesRowsCallback(result))
    .catch((error) => console.log(error));
  return result;
};
export function* getVisitantes(payload) {
  try {
    /* payload.dbName = "proteccion_db_crsegomega"; */
    const result = yield call(getVisitantesRequest, payload);
    yield put(actions.getVisitantesSuccess(result));
  } catch (error) {
    console.log(error);
  }
}
export function* visitantesSaga() {
  yield takeEvery(actions.GET_VISITANTES_REQUEST_START, getVisitantes);
}

const getCorrespondenciaRequest = async ({
  payload: { dataInit, visitantesRowsCallback },
}) => {
  const result = await fetch(
    "https://omega.proteccionenlinea.co/proteccionenlinea/services/api/correspondencia",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataInit),
    }
  )
    .then((response) => response.json())
    .then((result) => visitantesRowsCallback(result))
    .catch((error) => console.log(error));

  return result;
};

export function* getCorrespondencia(payload) {
  try {
    const result = yield call(getCorrespondenciaRequest, payload);
    yield put(actions.getCorrespondenciaSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

export function* correspondenciaSaga() {
  yield takeEvery(
    actions.GET_CORRESPONDENCIA_REQUEST_START,
    getCorrespondencia
  );
}

export default function* rootSaga() {
  yield all([fork(visitantesSaga), fork(correspondenciaSaga)]);
}
