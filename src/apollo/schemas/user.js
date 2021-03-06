import gql from 'graphql-tag';

export const QUERIES = {
  USERS: gql`
    query FETCH_READERS($limit: Int, $skip: Int, $sortBy: String) {
      readersList(limit: $limit, skip: $skip, sortBy: $sortBy) {
        id
        name
        profilePic
        disabled
        disabledReason
        verified
        subscribedLevel
        updatedAt
        createdAt
      }
    }
  `,
};

export const MUTATIONS = {
  TOGGLE_DISBALE: gql`
    mutation TOGGLE_DISABLE_READER(
      $userId: ID!
      $disabled: Boolean
      $disabledReason: String
    ) {
      updateReader(
        readerData: {
          id: $userId
          disabled: $disabled
          disabledReason: $disabledReason
        }
      ) {
        reader {
          id
          disabled
          disabledReason
        }
      }
    }
  `,
  UPDATE_SUBSCRIBED_LEVEL: gql`
    mutation UPDATE_SUBSCRIBED_LEVEL($userId: ID!, $subscribedLevel: Int) {
      updateReader(
        readerData: { id: $userId, subscribedLevel: $subscribedLevel }
      ) {
        reader {
          id
          subscribedLevel
        }
      }
    }
  `,
};
