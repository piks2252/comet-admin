import { QUERIES, MUTATIONS } from '../schemas/manga';
import { apolloClient } from '../index';

export const fetchMangas = async(limit = 100, skip = 0, sortBy = '+title') => {
  const { data } = await apolloClient.query({
    query: QUERIES.MANGAS,
    variables: { limit, skip, sortBy },
  });
  return data;
};

export const fetchManga = async id => {
  const { data } = await apolloClient.query({
    query: QUERIES.MANGA,
    variables: { id },
  });
  return data;
};

// export const createManga = async author => {
//   const { data } = await apolloClient.mutate({
//     mutation: MUTATIONS.CREATE_AUTHOR,
//     variables: { ...author },
//     context: {
//       hasUpload: true,
//     },
//   });
//   return data;
// };

// export const updateManga = async(id, author) => {
//   const variables = { ...author, id };
//   const { data } = await apolloClient.mutate({
//     mutation: MUTATIONS.UPDATE_AUTHOR,
//     variables,
//     context: {
//       hasUpload: true,
//     },
//   });
//   return data;
// };
