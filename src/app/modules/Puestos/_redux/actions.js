const actions = {
    GET_PLACES_START: "GET_PLACES_START",
    GET_PLACES_SUCCESS: "GET_PLACES_SUCCESS",
    getPlacesInit: (payload) => ({
      type: actions.GET_PLACES_START,
      payload,
    }),
    getPlacesSuccess: (payload) => ({
        type: actions.GET_PLACES_SUCCESS,
        payload,
      }),
}

export default actions;