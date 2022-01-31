const actions = {
  GET_MINUTAS_REQUEST_START: "GET_MINUTAS_REQUEST_START",
  GET_MINUTAS_REQUEST_SUCCESS: "GET_MINUTAS_REQUEST_SUCCESS",
  GET_BITACORA_REQUEST_START: "GET_BITACORA_REQUEST_START",
  GET_BITACORA_REQUEST_SUCCESS: "GET_BITACORA_REQUEST_SUCCESS",

  getMinutasInit: (params) => {
    return {
      type: actions.GET_MINUTAS_REQUEST_START,
      payload: params,
    };
  },
  getMinutasSuccess: (minutas) => ({
    type: actions.GET_MINUTAS_REQUEST_SUCCESS,
    payload: minutas,
  }),
  getBitacoraInit: (params) => ({
    type: actions.GET_BITACORA_REQUEST_START,
    payload: params,
  }),
  getBitacoraSuccess: (Bitacoras) => ({
    type: actions.GET_BITACORA_REQUEST_SUCCESS,
    payload: Bitacoras,
  }),
};
export default actions;
