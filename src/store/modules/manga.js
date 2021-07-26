const state = {
  selectedManga: {
    id: null,
    isSaved: true,
  },
  selectedChapter: {
    id: null,
    isSaved: true,
    pagesSaved: true,
  },
};

const mutations = {
  setMangaId(state, mangaId) {
    state.selectedManga.id = mangaId;
  },
  setMangaSave(state, isSaved) {
    state.isSaved = isSaved;
  },
  setChapterId(state, chapterId) {
    state.selectedChapter.id = chapterId;
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
