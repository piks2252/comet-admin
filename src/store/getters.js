const config = state => state.app.config;
const palette = state => state.app.config.palette;
const isLoading = state => state.app.isLoading;
const backgroundLoading = state => state.app.backgroundLoading;
const currentPage = state => state.app.currentPage;

export { config, palette, isLoading, backgroundLoading, currentPage };
