import { QUERIES } from '../schemas/dashboard';
import { apolloClient } from '../index';

export const fetchDashboardStats = async() => {
  const { data } = await apolloClient.query({
    query: QUERIES.DASHBOARD,
  });
  return data;
};
