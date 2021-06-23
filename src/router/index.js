import Vue from 'vue';
import Router from 'vue-router';
import AuthLayout from '../components/auth/AuthLayout';
import AppLayout from '../components/admin/AppLayout';

Vue.use(Router);

const EmptyParentComponent = {
  template: '<router-view></router-view>',
};

export default new Router({
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
          component: () => import('../components/auth/login/Login.vue'),
        },
        {
          name: 'recover-password',
          path: 'recover-password',
          component: () =>
            import('../components/auth/recover-password/RecoverPassword.vue'),
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
          path: 'dashboard',
          component: () => import('../components/dashboard/Dashboard.vue'),
          default: true,
        },
        {
          name: 'mangas',
          path: 'mangas',
          component: EmptyParentComponent,
          children: [
            {
              name: 'base-manga',
              path: '/',
              component: () => import('../components/mangas'),
            },
            {
              name: 'add-manga',
              path: 'add',
              component: () => import('../components/mangas/MangaInfo.vue'),
            },
            {
              name: 'view-manga',
              path: 'view/:id',
              component: () => import('../components/mangas/MangaInfo.vue'),
              props: true,
            },
            {
              name: 'edit-manga',
              path: 'edit/:id',
              component: () => import('../components/mangas/MangaInfo.vue'),
              props: true,
            },
          ],
        },
        {
          name: 'users',
          path: 'users',
          component: () => import('../components/users'),
        },
        {
          name: 'authors',
          path: 'authors',
          component: () => import('../components/authors'),
        },
        {
          name: 'genres',
          path: 'genres',
          component: () => import('../components/genres'),
        },
        {
          name: 'app-releases',
          path: 'app-releases',
          component: () => import('../components/app-releases'),
        },
        {
          name: 'discord-bot',
          path: 'discord-bot',
          component: () => import('../components/discord-bot'),
        },
        {
          name: 'settings',
          path: 'settings',
          component: () => import('../components/settings'),
        },
      ],
    },
    {
      name: '404',
      path: '/404',
      component: () => import('../components/404-page'),
    },
  ],
});
