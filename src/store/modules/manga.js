const state = {
  selectedManga: {
    id: null,
    isSaved: true,
    mode: 'view',
  },
  selectedChapter: {
    id: null,
    isSaved: true,
    pagesSaved: true,
    mode: 'view',
  },
};

const mutations = {
  setMangaId(state, mangaId) {
    state.selectedManga.id = mangaId;
  },
  setMangaSave(state, isSaved) {
    state.selectedManga.isSaved = isSaved;
  },
  setMangaMode(state, mode) {
    state.selectedManga.mode = mode;
  },
  setChapterId(state, chapterId) {
    state.selectedChapter.id = chapterId;
  },
  setChapterMode(state, mode) {
    if (state.selectedManga.mode == 'edit') {
      state.selectedChapter.mode = mode;
    }
  },
  setChapterSave(state, isSaved) {
    state.selectedChapter.isSaved = isSaved;
  },
  setChapterPageSave(state, isSaved) {
    state.selectedChapter.pagesSaved = isSaved;
  },
};

const actions = {};

export default {
  state,
  mutations,
  actions,
};
