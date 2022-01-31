import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import actions from "./actions";

const URL_API =
  "https://omega.proteccionenlinea.co/proteccionenlinea/services/api/guardas";

const getGuardasRequest = async (data) => {
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
    //console.log('Estos es',result);
  return result;
};
export function* getGuardas({ payload }) {
  try {
    const result = yield call(getGuardasRequest, payload);
    yield put(actions.getGuardasSuccess(result));
  } catch (error) {
    console.log("error", error);
  }
}

export function* guardasSaga() {
  yield takeEvery(actions.GET_GUARDAS_REQUEST_START, getGuardas);
}

const getFormacionRequest = async (payload) => {
  const { dataInit, setRows } = payload;
  const result = await fetch(
    "https://crm.segomega.com/update_data/services/Capacitation.php",
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
    .then((result) => setRows(result))
    .catch((error) => console.log(error));
  console.log('Esto es :',dataInit);
  return result;
};
export function* getFormacion({ payload }) {
  try {
    yield call(getFormacionRequest, payload);
  } catch (error) {
    console.log("error", error);
  }
}

export function* formacionSaga() {
  yield takeEvery(actions.GET_FORMACION, getFormacion);
}

//;;;;;;;;;;;;;;;;;;;;;;;;;;
const getProgramacionRequest = async (payload) => {
  const { dataInit, programacionCallBack } = payload;
  const result = await fetch(
    `https://crm.segomega.com/index.php?entryPoint=guardLanding&_customAction=data&guardCode=${dataInit.colaboradorCode}`
  )
    .then((response) => response.json())
    .then((result) => programacionCallBack(result))
    .catch((error) => console.log(error));

  return result;
};
export function* getProgramacion({ payload }) {
  try {
    yield call(getProgramacionRequest, payload);
  } catch (error) {
    console.log("error", error);
  }
}

export function* programacionSaga() {
  yield takeEvery(actions.GET_PROGRAMACION, getProgramacion);
}

export default function* rootSaga() {
  yield all([fork(guardasSaga), fork(formacionSaga), fork(programacionSaga)]);
}
