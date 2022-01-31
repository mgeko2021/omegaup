const actions = {
  LOGIN_REQUEST_START: "LOGIN_REQUEST_START",
  LOGIN_REQUEST_SUCCESS: "LOGIN_REQUEST_UCCESS",
  LOGIN_REQUEST_FAULIRE: "LOGIN_REQUEST_FAULIRE",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  REGISTRATION_ID: "REGISTRATION_ID",
  GET_LOCATIONS_SUCCESS: "GET_LOCATIONS_SUCCESS",
  REGISTRATION_USER: "REGISTRATION_USER",
  LOGOUT: "LOGOUT",
  login: (payload) => ({
    type: actions.LOGIN_REQUEST_START,
    payload,
  }),
  loginRequestSuccess: (payload) => ({
    type: actions.LOGIN_REQUEST_SUCCESS,
    payload,
  }),
  loginRequestFaulire: (payload) => ({
    type: actions.LOGIN_REQUEST_FAULIRE,
    payload,
  }),
  logout: () => ({
    type: actions.LOGOUT,
  }),
  changePassword: (payload) => ({
    type: actions.CHANGE_PASSWORD,
    payload,
  }),
  forgotPassword: (payload) => ({
    type: actions.FORGOT_PASSWORD,
    payload,
  }),
  registrationId: (payload) => ({
    type: actions.REGISTRATION_ID,
    payload,
  }),
  getLocationsSuccess: (payload) => ({
    type: actions.GET_LOCATIONS_SUCCESS,
    payload
  }),
  registrationUser: (payload) => ({
    type: actions.REGISTRATION_USER,
    payload,
  }),

};
export default actions;
