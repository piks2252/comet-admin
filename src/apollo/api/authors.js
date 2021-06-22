import { QUERIES, MUTATIONS } from '../schemas/author';
import { apolloClient } from '../index';

export const fetchAuthors = async(limit = 120, skip = 0, sortBy = '+name') => {
  const { data } = await apolloClient.query({
    query: QUERIES.AUTHORS,
    variables: { limit, skip, sortBy },
  });
  return data;
};

export const createAuthor = async author => {
  const { data } = await apolloClient.mutate({
    mutation: MUTATIONS.CREATE_AUTHOR,
    variables: { ...author },
    context: {
      hasUpload: true,
    },
  });
  return data;
};

export const updateAuthor = async(id, author) => {
  const variables = { ...author, id };
  const { data } = await apolloClient.mutate({
    mutation: MUTATIONS.UPDATE_AUTHOR,
    variables,
    context: {
      hasUpload: true,
    },
  });
  return data;
};
