import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';

import { InMemoryCache } from 'apollo-cache-inmemory';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

// HTTP connection to the API
const httpLink = createUploadLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_SERVER,
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default new VueApollo({
  defaultClient: apolloClient,
});
