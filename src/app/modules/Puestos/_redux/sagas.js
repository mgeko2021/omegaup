import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import actions from "./actions";

const URL_API =
  "https://omega.proteccionenlinea.co/proteccionenlinea/services/api_prueba/localizacion/getUserLocation";

const getPuestosRequest = async (data) => {
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

export function* getPuestos({ payload }) {
  try {
    const result = yield call(getPuestosRequest, payload);
    if (result.length) {
      yield put(actions.getPlacesSuccess(result));
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function* puestosSagas() {
  yield takeEvery(actions.GET_PLACES_START, getPuestos);
}

export default function* rootSaga() {
  yield all([fork(puestosSagas)]);
}
