const actions = {
  GET_SUPERVISION_REQUEST_START: "GET_SUPERVISION_REQUEST_START",

  getSupervision: (params) => {
    return {
      type: actions.GET_SUPERVISION_REQUEST_START,
      payload: params,
    };
  },
};
export default actions;
