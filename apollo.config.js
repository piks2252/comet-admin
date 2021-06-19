// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'comet-api',
      // URL to the GraphQL API
      url: 'http://192.168.0.104:8000/graphql',
    },
    skipSSLValidation: true,
    excludes: ['node_modules/**/*'],
    includes: ['src/**/*.{vue,js}'],
  },
};
