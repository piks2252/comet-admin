import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

const AUTH_TOKEN = 'AUTH_TOKEN';

Vue.use(VueApollo);

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://192.168.0.104:8000/graphql',
});

// Middleware auth
const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return forward(operation);
});

// Authenticated httpLink
const httpLinkAuth = middlewareLink.concat(httpLink);

const link = split(
  // Split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  httpLinkAuth,
);

// Create the apollo client
const apolloClient = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default new VueApollo({
  defaultClient: apolloClient,
});
