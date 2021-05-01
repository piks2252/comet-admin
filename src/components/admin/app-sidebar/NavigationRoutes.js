export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
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
      name: 'mangas',
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
      name: 'appReleases',
      displayName: 'menu.appReleases',
      meta: {
        iconClass: 'fa fa-code-fork',
      },
    },
    {
      name: 'discordBot',
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
    {
      name: 'dashboard2',
      displayName: 'menu2.dashboard',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
    {
      name: 'statistics',
      displayName: 'menu2.statistics',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-statistics',
      },
      disabled: true,
      children: [
        {
          name: 'charts',
          displayName: 'menu2.charts',
        },
        {
          name: 'progress-bars',
          displayName: 'menu2.progressBars',
        },
      ],
    },
    {
      name: 'forms',
      displayName: 'menu2.forms',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-forms',
      },
      disabled: true,
      children: [
        {
          name: 'form-elements',
          displayName: 'menu2.formElements',
        },
        {
          name: 'medium-editor',
          displayName: 'menu2.mediumEditor',
        },
      ],
    },
    {
      name: 'tables',
      displayName: 'menu2.tables',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-tables',
      },
      children: [
        {
          name: 'markup',
          displayName: 'menu2.markupTables',
        },
        {
          name: 'data',
          displayName: 'menu2.dataTables',
        },
      ],
    },
    {
      name: 'ui',
      displayName: 'menu2.uiElements',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-ui-elements',
      },
      disabled: true,
      children: [
        {
          name: 'buttons',
          displayName: 'menu2.buttons',
        },
        {
          name: 'cards',
          displayName: 'menu2.cards',
        },
        {
          name: 'chat',
          displayName: 'menu2.chat',
        },
        {
          name: 'chips',
          displayName: 'menu2.chips',
        },
        {
          name: 'collapses',
          displayName: 'menu2.collapses',
        },
        {
          name: 'colors',
          displayName: 'menu2.colors',
        },
        {
          name: 'color-pickers',
          displayName: 'menu2.colorPickers',
        },
        {
          name: 'file-upload',
          displayName: 'menu2.fileUpload',
        },
        {
          name: 'grid',
          displayName: 'menu2.grid',
        },
        {
          name: 'icon-sets',
          displayName: 'menu2.icons',
          children: [
            {
              displayName: 'concrete',
              name: 'icon-set',
            },
          ],
        },
        {
          name: 'lists',
          displayName: 'menu2.lists',
        },
        {
          name: 'modals',
          displayName: 'menu2.modals',
        },
        {
          name: 'notifications',
          displayName: 'menu2.notifications',
        },
        {
          name: 'popovers',
          displayName: 'menu2.popovers',
        },
        {
          name: 'rating',
          displayName: 'menu2.rating',
        },
        {
          name: 'sliders',
          displayName: 'menu2.sliders',
        },
        {
          name: 'spacing',
          displayName: 'menu2.spacing',
        },
        {
          name: 'spinners',
          displayName: 'menu2.spinners',
        },
        {
          name: 'tabs',
          displayName: 'menu2.tabs',
        },
        {
          name: 'timelines',
          displayName: 'menu2.timelines',
        },
        {
          name: 'tree-view',
          displayName: 'menu2.treeView',
        },
        {
          name: 'typography',
          displayName: 'menu2.typography',
        },
      ],
    },
    {
      name: 'maps',
      displayName: 'menu2.maps',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-maps',
      },
      disabled: true,
      children: [
        {
          name: 'google-maps',
          displayName: 'Google Maps',
        },
        {
          name: 'yandex-maps',
          displayName: 'Yandex Maps',
        },
        {
          name: 'leaflet-maps',
          displayName: 'Leaflet Maps',
        },
        {
          name: 'bubble-maps',
          displayName: 'Bubble Maps',
        },
        {
          name: 'line-maps',
          displayName: 'Line Maps',
        },
      ],
    },
  ],
};
