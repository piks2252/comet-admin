import { QUERIES, MUTATIONS } from '../schemas/user';
import { apolloClient } from '../index';

export const fetchUsers = async(limit = 50, skip = 0, sortBy = '-id') => {
  const { data } = await apolloClient.query({
    query: QUERIES.USERS,
    variables: { limit, skip, sortBy },
  });
  return data;
};

export const disableUser = async(userId, disabledReason) => {
  const { data } = apolloClient.mutate({
    mutation: MUTATIONS.TOGGLE_DISBALE,
    variables: { userId, disabled: true, disabledReason },
  });
  return data;
};

export const enableUser = async userId => {
  const { data } = apolloClient.mutate({
    mutation: MUTATIONS.TOGGLE_DISBALE,
    variables: { userId, disabled: false, disabledReason: '' },
  });
  return data;
};
