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

const setMangaSavedState = (state, val) => {
  if (state.manga.selectedManga.mode !== 'view') {
    state.manga.selectedManga.isSaved = val;
  }
};

const setSelectedChapter = (state, payload) => {
  state.manga.selectedChapter.id = payload.id;
  if (state.manga.selectedManga.mode !== 'view') {
    state.manga.selectedChapter.mode = payload.mode;
  }
};

const setChapterSavedState = (state, val) => {
  if (state.manga.selectedManga.mode !== 'view') {
    state.manga.selectedChapter.isSaved = val;
  }
};

export {
  setLoading,
  setBackgroundLoading,
  setSelectedManga,
  setMangaSavedState,
  setSelectedChapter,
  setChapterSavedState,
};
