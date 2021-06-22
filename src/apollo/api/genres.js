import { QUERIES, MUTATIONS } from '../schemas/genre';
import { apolloClient } from '../index';

export const fetchGenres = async(limit = 120, skip = 0, sortBy = '+name') => {
  const { data } = await apolloClient.query({
    query: QUERIES.GENRES,
    variables: { limit, skip, sortBy },
  });
  return data;
};

export const createGenre = async(name, groupType, thumbnail) => {
  const { data } = await apolloClient.mutate({
    mutation: MUTATIONS.CREATE_GENRE,
    variables: { name, groupType, thumbnail },
    context: {
      hasUpload: true,
    },
  });
  return data;
};

export const updateGenre = async(
  id,
  name = null,
  groupType = null,
  thumbnail = null,
) => {
  const variables = { id };
  if (name !== null) variables.name = name;
  if (groupType !== null) variables.groupType = groupType;
  if (thumbnail !== null) variables.thumbnail = thumbnail;
  const { data } = await apolloClient.mutate({
    mutation: MUTATIONS.UPDATE_GENRE,
    variables,
    context: {
      hasUpload: true,
    },
  });
  return data;
};
