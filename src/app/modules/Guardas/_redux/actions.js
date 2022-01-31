const actions = {
  GET_GUARDAS_REQUEST_START: "GET_GUARDAS_REQUEST_START",
  GET_GUARDAS_REQUEST_SUCCESS: "GET_GUARDAS_REQUEST_SUCCESS",
  GET_GUARDA_DATA: "GET_GUARDA_DATA",
  GET_FORMACION: "GET_FORMACION",
  GET_PROGRAMACION: "GET_PROGRAMACION",
  getGuardasInit: (payload) => ({
    type: actions.GET_GUARDAS_REQUEST_START,
    payload,
  }),
  getGuardasSuccess: (payload) => ({
    type: actions.GET_GUARDAS_REQUEST_SUCCESS,
    payload,
  }),
  getGuardaData: (payload) => ({
    type: actions.GET_GUARDA_DATA,
    payload,
  }),
  getFormacion: (payload) => ({
    type: actions.GET_FORMACION,
    payload,
  }),
  getProgramacion: (payload) => ({
    type: actions.GET_PROGRAMACION,
    payload,
  }),
};
export default actions;
