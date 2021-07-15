import { QUERIES, MUTATIONS } from '../schemas/author';
import { apolloClient } from '../index';

export const fetchAuthors = async(
  search = '',
  limit = 120,
  page = 1,
  sortBy = '+name',
) => {
  const { data } = await apolloClient.query({
    query: QUERIES.AUTHORS,
    variables: { search, limit, page, sortBy },
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
