import { QUERIES, MUTATIONS } from '../schemas/genre';
import { apolloClient } from '../index';

export const fetchGenres = async(limit = 120, skip = 0, sortBy = '+name') => {
  const { data } = await apolloClient.query({
    query: QUERIES.GENRES,
    variables: { limit, skip, sortBy },
  });
  return data;
};

export const updateGenre = async(id, name = null, groupType = null) => {
  const variables = { id };
  if (name !== null) variables.name = name;
  if (groupType !== null) variables.groupType = groupType;
  const { data } = await apolloClient.mutate({
    mutation: MUTATIONS.UPDATE_GENRE,
    variables: { id, name, groupType },
  });
  return data;
};
