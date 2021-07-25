import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import manga from './modules/manga';
import * as getters from './getters';
import * as mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app,
    manga,
  },
  state: {},
  mutations,
});
