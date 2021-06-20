import gql from 'graphql-tag';

export const QUERIES = {
  USERS: gql`
    query FETCH_READERS($limit: Int, $skip: Int, $sortBy: String) {
      readersList(limit: $limit, skip: $skip, sortBy: $sortBy) {
        id
        name
        profilePic
        disabled
        verified
        subscribedLevel
        updatedAt
        createdAt
      }
    }
  `,
};
