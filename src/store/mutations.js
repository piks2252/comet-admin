// modules/app mutations
const setLoading = (state, payload) => {
  state.app.isLoading = payload;
};

const setBackgroundLoading = (state, payload) => {
  state.app.backgroundLoading = payload;
};

// modules/manga mutations
const setSelectedManga = (state, payload) => {
  state.manga.selectedManga.id = payload.id;
  state.manga.selectedManga.mode = payload.mode;
};

const setSavedState = (state, val) => {
  if (state.manga.selectedManga.mode !== 'view') { state.manga.selectedManga.isSaved = val; }
};

export { setLoading, setBackgroundLoading, setSelectedManga, setSavedState };
