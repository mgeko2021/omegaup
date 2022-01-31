const actions = {
  SEND_PQRS_INIT: "SEND_PQRS_INIT",
  SEND_PQRS_SUCCESS: "SEND_PQRS_SUCCESS",
  SEND_PQRS_FAULIRE: "SEND_PQRS_FAULIRE",
  sendPQRSInit: (payload) => ({
    type: actions.SEND_PQRS_INIT,
    payload,
  })
};

export default actions;
