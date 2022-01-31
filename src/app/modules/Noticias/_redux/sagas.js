import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import actions from "./actions";

const URL_API =
  "https://omega.proteccionenlinea.co/proteccionenlinea/services/api/news/showNews";

const getNoticiasRequest = async (data) => {
  const result = await fetch(URL_API)
    .then((response) => response.json())
    .then((myJson) => myJson)
    .catch((error) => console.log(error));
  return result;
};

export function* getNoticias() {
  try {
    const result = yield call(getNoticiasRequest);
    yield put(actions.getNoticiasSuccess(result));
  } catch (error) {
    console.log("error", error);
  }
}

export function* noticiasSaga() {
  yield takeEvery(actions.GET_NOTICIAS_START, getNoticias);
}

export default function* rootSaga() {
  yield all([fork(noticiasSaga)]);
}
