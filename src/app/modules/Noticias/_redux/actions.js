const actions = {
    GET_NOTICIAS_START: 'GET_NOTICIAS_START',
    GET_NOTICIAS_SUCCESS: 'GET_NOTICIAS_SUCCESS',
    getNoticiasInit: () => ({
        type: actions.GET_NOTICIAS_START,
    }),
    getNoticiasSuccess: (payload) => ({
        type: actions.GET_NOTICIAS_SUCCESS,
        payload,
    })
}

export default actions;