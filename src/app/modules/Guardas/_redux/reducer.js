import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import actions from "./actions";

const initState = {
  guardas: [],
  guarda: {},
};

const guardasReducer = persistReducer(
  {
    storage,
    key: "Guardas",
    whitelist: ["guarda"],
  },

  (state = initState, action) => {
    switch (action.type) {
      case actions.GET_GUARDAS_REQUEST_START:
        return {
          ...state,
        };
      case actions.GET_GUARDAS_REQUEST_SUCCESS:
        return {
          ...state,
          guardas: action.payload.Guardas,
        };
      case actions.GET_GUARDA_DATA:
        return {
          ...state,
          guarda: action.payload,
        };
      default:
        return state;
    }
  }
);

export default guardasReducer;
