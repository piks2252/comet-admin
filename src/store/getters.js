// Getters from modules/app.js
const config = state => state.app.config;
const palette = state => state.app.config.palette;
const isLoading = state => state.app.isLoading;
const backgroundLoading = state => state.app.backgroundLoading;
const currentPage = state => state.app.currentPage;
const user = state => state.app.user;

// Getters from modules/manga.js
const selectedMangaId = state => state.manga.selectedManga.id;
const isMangaSaved = state => state.manga.selectedManga.isSaved;
const selectedChapterId = state => state.manga.selectedChapter.id;
const isChapterSaved = state => state.manga.selectedChapter.isSaved;
const isPagesSaved = state => state.manga.selectedChapter.pagesSaved;

export {
  config,
  palette,
  isLoading,
  backgroundLoading,
  currentPage,
  user,
  selectedMangaId,
  isMangaSaved,
  selectedChapterId,
  isChapterSaved,
  isPagesSaved,
};
