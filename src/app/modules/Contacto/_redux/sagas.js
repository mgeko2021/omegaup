import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import actions from "./actions";

const URL_API =
  "https://omega.proteccionenlinea.co/proteccionenlinea/services/api/contacto";

const getContactoRequest = async (data) => {
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
    console.log(JSON.stringify(data))
    console.log(result)
  return result;
};
export function* getContacto({ payload }) {
  try {
    const result = yield call(getContactoRequest, payload);
    yield put(actions.getContactoSuccess(result));
  } catch (error) {
    console.log("error", error);
  }
}

export function* contactoSaga() {
  yield takeEvery(actions.GET_CONTACTO_REQUEST_START, getContacto);
}

export default function* rootSaga() {
  yield all([fork(contactoSaga)]);
}
