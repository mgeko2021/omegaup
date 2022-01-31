import actions from "./actions";

const initState = {
  noticias: [],
};

const noticiasReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.GET_NOTICIAS_SUCCESS:
      return {
        ...state,
        noticias: action.payload.Noticias,
      };
    default:
      return state;
  }
};

export default noticiasReducer;
