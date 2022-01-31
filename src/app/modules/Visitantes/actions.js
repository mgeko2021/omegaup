const actions = {
  GET_VISITANTES_REQUEST_START: "GET_VISITANTES_REQUEST_START",
  GET_VISITANTES_REQUEST_SUCCESS: "GET_VISITANTES_REQUEST_SUCCESS",
  GET_CORRESPONDENCIA_REQUEST_START: "GET_CORRESPONDENCIA_REQUEST_START",
  GET_CORRESPONDENCIA_REQUEST_SUCCESS: "GET_CORRESPONDENCIA_REQUEST_SUCCESS",

  getVisitantesInit: (params) => {
    return {
      type: actions.GET_VISITANTES_REQUEST_START,
      payload: params,
    };
  },
  getVisitantesSuccess: (visitantes) => ({
    type: actions.GET_VISITANTES_REQUEST_SUCCESS,
    payload: visitantes,
  }),
  getCorrespondenciaInit: (params) => ({
    type: actions.GET_CORRESPONDENCIA_REQUEST_START,
    payload: params,
  }),
  getCorrespondenciaSuccess: (Correspondencia) => ({
    type: actions.GET_CORRESPONDENCIA_REQUEST_SUCCESS,
    payload: Correspondencia,
  }),
};
export default actions;
