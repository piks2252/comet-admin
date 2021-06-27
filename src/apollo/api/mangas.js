import { QUERIES, MUTATIONS } from '../schemas/manga';
import { apolloClient } from '../index';

export const fetchMangas = async(
  search = '',
  limit = 100,
  skip = 0,
  sortBy = '+title',
) => {
  const { data } = await apolloClient.query({
    query: QUERIES.MANGAS,
    variables: { search, limit, skip, sortBy },
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

export const fetchChapters = async(
  mangaId,
  limit = 100,
  skip = 0,
  sortBy = '-chapter',
) => {
  const { data } = await apolloClient.query({
    query: QUERIES.CHAPTERS,
    variables: { mangaId, limit, skip, sortBy },
  });
  return data;
};

export const createManga = async(manga, coverImage) => {
  const { data } = await apolloClient.mutate({
    mutation: MUTATIONS.CREATE_MANGA,
    variables: { ...manga, thumbnail: coverImage },
    context: {
      hasUpload: true,
    },
  });
  return data;
};

export const updateManga = async(id, manga, coverImage = null) => {
  const variables = { ...manga, id };
  if (coverImage !== null) {
    variables.thumbnail = coverImage;
  }
  const { data } = await apolloClient.mutate({
    mutation: MUTATIONS.UPDATE_MANGA,
    variables,
    context: {
      hasUpload: true,
    },
  });
  return data;
};
