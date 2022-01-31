const actions = {
    GET_CONTACTO_REQUEST_START: 'GET_CONTACTO_REQUEST_START',
    GET_CONTACTO_REQUEST_SUCCESS: 'GET_CONTACTO_REQUEST_SUCCESS',
    getContactoInit: (payload) => ({
        type: actions.GET_CONTACTO_REQUEST_START,
        payload,
    }),
    getContactoSuccess: (payload) => ({
        type: actions.GET_CONTACTO_REQUEST_SUCCESS,
        payload,
    })
}
export default actions;