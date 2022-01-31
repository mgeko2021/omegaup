import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import actions from "./actions";

const URL_API =
  "https://omega.proteccionenlinea.co/proteccionenlinea/services/api/minuta/showMinuta";

const getMinutasRequest = async ({
  payload: { dataInit, minutasRowsCallback },
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
    .then((result) => minutasRowsCallback(result))
    .catch((error) => console.log(error));

  return result;
};

export function* getMinutas(payload) {
  try {
    /* payload.dbName = "proteccion_db_crsegomega"; */
    const result = yield call(getMinutasRequest, payload);
    yield put(actions.getMinutasSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

export function* minutasSaga() {
  yield takeEvery(actions.GET_MINUTAS_REQUEST_START, getMinutas);
}

const getBitacorasRequest = async ({
  payload: { dataInit, minutasRowsCallback },
}) => {
  const result = await fetch(
    "https://omega.proteccionenlinea.co/proteccionenlinea/services/api/minuta/showBitacora",
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
    .then((result) => minutasRowsCallback(result))
    .catch((error) => console.log(error));

  return result;
};

export function* getBitacoras(payload) {
  try {
    /* payload.dbName = "proteccion_db_crsegomega"; */
    const result = yield call(getBitacorasRequest, payload);
    yield put(actions.getBitacoraSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

export function* bitacoraSaga() {
  yield takeEvery(actions.GET_BITACORA_REQUEST_START, getBitacoras);
}

export default function* rootSaga() {
  yield all([fork(minutasSaga), fork(bitacoraSaga)]);
}
