import { all, fork } from "redux-saga/effects";
import { combineReducers } from "redux";

// import * as auth from "../app/modules/Auth/_redux/authRedux";
import authReducer from "../app/modules/Auth/_redux/reducer";
import authSagas from "../app/modules/Auth/_redux/sagas";
import guardasReducer from "../app/modules/Guardas/_redux/reducer";
import guardasSagas from "../app/modules/Guardas/_redux/sagas";
import noticiasReducer from "../app/modules/Noticias/_redux/reducer";
import noticiasSagas from "../app/modules/Noticias/_redux/sagas";
import minutasSagas from "../app/modules/Minutas/_redux/sagas";
import porteriaSagas from "../app/modules/Visitantes/sagas";
import contactoReducer from "../app/modules/Contacto/_redux/reducer";
import contactoSagas from "../app/modules/Contacto/_redux/sagas";
import SupervisionSaga from "../app/modules/Supervision/sagas";
import puestosSagas from '../app/modules/Puestos/_redux/sagas';
import puestosReducer from "../app/modules/Puestos/_redux/reducer";
import PQRSSaga from "../app/modules/PQRS/_redux/sagas";
import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  guardas: guardasReducer,
  noticias: noticiasReducer,
  contacto: contactoReducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  puestos: puestosReducer,
});

export function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(guardasSagas),
    fork(noticiasSagas),
    fork(minutasSagas),
    fork(porteriaSagas),
    fork(contactoSagas),
    fork(PQRSSaga),
    fork(SupervisionSaga),
    fork(puestosSagas),
  ]);
}
