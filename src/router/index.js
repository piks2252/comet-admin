import Vue from 'vue';
import Router from 'vue-router';
import AuthLayout from '../pages/auth/AuthLayout';
import AppLayout from '../components/admin/AppLayout';

Vue.use(Router);
const DEFAULT_TITLE = 'Comet Admin';
const EmptyParentComponent = {
  template: '<router-view></router-view>',
};

const router = new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    {
      path: '*',
      redirect: { name: '404' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('../pages/auth/login/Login.vue'),
        },
        {
          name: 'recover-password',
          path: 'recover-password',
          component: () =>
            import('../pages/auth/recover-password/RecoverPassword.vue'),
        },
        {
          path: '',
          redirect: { name: 'login' },
        },
      ],
    },
    {
      name: 'Base',
      path: '/',
      component: AppLayout,
      children: [
        {
          name: 'dashboard',
          path: '',
          component: () => import('../pages/dashboard/Dashboard.vue'),
          default: true,
          meta: { title: 'Dashboard' },
        },
        {
          name: 'mangas',
          path: 'mangas',
          component: EmptyParentComponent,
          children: [
            {
              name: 'base-manga',
              path: '/',
              component: () => import('../pages/mangas'),
              meta: { title: 'Mangas' },
            },
            {
              name: 'add-manga',
              path: 'add',
              component: () => import('../pages/mangas/MangaInfo.vue'),
              meta: { title: 'Add new manga' },
            },
            {
              name: 'view-manga',
              path: 'view/:id',
              component: () => import('../pages/mangas/MangaInfo.vue'),
              props: true,
            },
            {
              name: 'edit-manga',
              path: 'edit/:id',
              component: () => import('../pages/mangas/MangaInfo.vue'),
              props: true,
            },
          ],
        },
        {
          name: 'users',
          path: 'users',
          component: () => import('../pages/users'),
          meta: { title: 'Users' },
        },
        {
          name: 'authors',
          path: 'authors',
          component: () => import('../pages/authors'),
          meta: { title: 'Authors' },
        },
        {
          name: 'genres',
          path: 'genres',
          component: () => import('../pages/genres'),
          meta: { title: 'Genres' },
        },
        {
          name: 'app-releases',
          path: 'app-releases',
          component: () => import('../pages/app-releases'),
          meta: { title: 'Github app release' },
        },
        {
          name: 'discord-bot',
          path: 'discord-bot',
          component: () => import('../pages/discord-bot'),
          meta: { title: 'Discord bot' },
        },
        {
          name: 'settings',
          path: 'settings',
          component: () => import('../pages/settings'),
          meta: { title: 'Settings' },
        },
      ],
    },
    {
      name: '404',
      path: '/404',
      component: () => import('../pages/404-page'),
    },
  ],
});

router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title
      ? `${DEFAULT_TITLE} - ${to.meta.title}`
      : DEFAULT_TITLE;
  });
});

export default router;
