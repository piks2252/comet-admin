import { QUERIES } from '../schemas/user';
import { apolloClient } from '../index';

export const fetchUsers = async(limit = 50, skip = 0, sortBy = '-id') => {
  const { data } = await apolloClient.query({
    query: QUERIES.USERS,
    variables: { limit, skip, sortBy },
  });
  return data;
};
