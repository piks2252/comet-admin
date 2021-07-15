import { QUERIES, MUTATIONS } from '../schemas/user';
import { apolloClient } from '../index';

export const fetchUsers = async(
  search = '',
  limit = 50,
  page = 1,
  sortBy = '-id',
) => {
  const { data } = await apolloClient.query({
    query: QUERIES.USERS,
    variables: { limit, page, sortBy },
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

export const updateSubscribedLevel = async(userId, level) => {
  const LEVELS = [0, 1, 2];
  if (level in LEVELS) {
    const { data } = await apolloClient.mutate({
      mutation: MUTATIONS.UPDATE_SUBSCRIBED_LEVEL,
      variables: { userId, subscribedLevel: level },
    });
    return data;
  }
  // Throw exception
  throw new Error('Invalid level');
};
