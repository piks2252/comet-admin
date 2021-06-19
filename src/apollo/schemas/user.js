import gql from 'graphql-tag';

export const QUERIES = {
  USERS: () => gql`
    query FETCH_READERS {
      readersList(limit: 50) {
        id
        name
        verified
      }
    }
  `,
};
