import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import actions from "./actions";

const initState = {
  user: null,
  authToken: null,
  NameInstance: null,
  numeroInstancia: null,
  tipoUsuario: null,
  loadingError: null,
  idContacto: null,
  nitPuesto: null,
  userName: null,
  general: [],
  omega: [],
  SeguridadOmega: [],
};

const authReducer = persistReducer(
  {
    storage,
    key: "Auth",
    whitelist: [
      "user",
      "NameInstance",
      "numeroInstancia",
      "tipoUsuario",
      "idContacto",
      "nitPuesto",
      "userName",
    ],
  },
  (state = initState, action) => {
    switch (action.type) {
      case actions.LOGIN_REQUEST_SUCCESS:
        const email = action.payload.user.correoUsuario;
        const userName = email.substr(0, email.indexOf("@"));
        return {
          ...state,
          NameInstance: action.payload.NameInstance,
          user: action.payload.user,
          authToken: action.payload.user.token,
          numeroInstancia: action.payload.user.numeroInstancia,
          tipoUsuario: action.payload.user.tipoUsuario,
          idContacto: action.payload.user.idContacto,
          nitPuesto: action.payload.user.instanciaNit,
          loadingError: false,
          userName: userName,
        };
      case actions.LOGIN_REQUEST_FAULIRE: {
        return {
          ...state,
          loadingError: true,
        };
      }
      case actions.GET_LOCATIONS_SUCCESS: {
        const { general, omega, SeguridadOmega } = action.payload;
        return {
          ...state,
          general,
          omega,
          SeguridadOmega
        }
      }
      case actions.LOGOUT:
        return initState;
      default:
        return state;
    }
  }
);

export default authReducer;
