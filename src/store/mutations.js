const setLoading = (state, payload) => {
  state.app.isLoading += payload.isLoading;
};

export { setLoading };
