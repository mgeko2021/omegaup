import actions from "./actions";

const initState = {
  puestos: []
};

const puestosReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.GET_PLACES_SUCCESS:
      return {
        ...state,
        puestos: action.payload,
      };
    default:
      return state;
  }
};

export default puestosReducer;