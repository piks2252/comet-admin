import Vue from 'vue';
import VuexI18n from 'vuex-i18n'; // load vuex i18n module
import store from './store';

Vue.use(VuexI18n.plugin, store);

export default store;
