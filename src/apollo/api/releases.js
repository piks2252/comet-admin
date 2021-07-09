import { QUERIES } from '../schemas/releases';
import { apolloClient } from '../index';

export const fetchReleases = async(limit = 100, skip = 0) => {
  const { data } = await apolloClient.query({
    query: QUERIES.RELEASES,
    variables: { limit, skip },
  });
  return data;
};
