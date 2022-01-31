import { all, call, takeEvery, fork } from "redux-saga/effects";
import actions from "./actions";

const URL_API =
  "https://crm.segomega.com/update_data/services/MonitoringViews.php";

const getSupervisionRequest = async ({ payload: { dataInit, setRows } }) => {
  const result = await fetch(URL_API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInit),
  })
    .then((response) => response.json())
    .then((result) => setRows(result))
    .catch((error) => console.log(error));

  return result;
};
export function* getSupervision(payload) {
  try {
    yield call(getSupervisionRequest, payload);
  } catch (error) {
    console.log(error);
  }
}
export function* supervisionSaga() {
  yield takeEvery(actions.GET_SUPERVISION_REQUEST_START, getSupervision);
}

export default function* rootSaga() {
  yield all([fork(supervisionSaga)]);
}
