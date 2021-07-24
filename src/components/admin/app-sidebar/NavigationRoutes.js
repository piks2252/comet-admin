export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'menu.dashboard',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
    {
      name: 'base-manga',
      displayName: 'menu.mangas',
      meta: {
        iconClass: 'fa fa-book',
      },
    },
    {
      name: 'users',
      displayName: 'menu.users',
      meta: {
        iconClass: 'fa fa-users',
      },
    },
    {
      name: 'authors',
      displayName: 'menu.authors',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-user',
      },
    },
    {
      name: 'genres',
      displayName: 'menu.genres',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-ui-elements',
      },
    },
    {
      name: 'app-releases',
      displayName: 'menu.appReleases',
      meta: {
        iconClass: 'fa fa-code-fork',
      },
    },
    {
      name: 'discord-bot',
      displayName: 'menu.discordBot',
      meta: {
        iconClass: 'fa fa-drivers-license',
      },
    },
    {
      name: 'settings',
      displayName: 'menu.settings',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-settings',
      },
    },
  ],
};
