import actions from "./actions";

const initState = {
  contacto: [],
};

const contactoReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.GET_CONTACTO_REQUEST_START:
      return {
        ...state,
      };
    case actions.GET_CONTACTO_REQUEST_SUCCESS:
      return {
        ...state,
        contacto: action.payload.Administrador,
      };
    default:
      return state;
  }
};

export default contactoReducer;
