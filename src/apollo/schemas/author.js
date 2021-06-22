import gql from 'graphql-tag';

export const QUERIES = {
  AUTHORS: gql`
    query FETCH_AUTHORS($limit: Int, $skip: Int, $sortBy: String) {
      peopleList(limit: $limit, skip: $skip, sortBy: $sortBy) {
        id
        name
        peopleType
        picture
        twitter
        instagram
        patreon
        website
      }
    }
  `,
};

export const MUTATIONS = {
  CREATE_AUTHOR: gql`
    mutation CREATE_AUTHOR(
      $name: String!
      $peopleType: Int!
      $twitter: String
      $instagram: String
      $patreon: String
      $website: String
      $picture: Upload!
    ) {
      createPeople(
        peopleData: {
          name: $name
          peopleType: $peopleType
          twitter: $twitter
          instagram: $instagram
          patreon: $patreon
          website: $website
        }
        picture: $picture
      ) {
        people {
          id
          name
          peopleType
          picture
          twitter
          instagram
          patreon
          website
        }
      }
    }
  `,
  UPDATE_AUTHOR: gql`
    mutation UPDATE_GENRE(
      $id: ID!
      $name: String
      $peopleType: Int
      $twitter: String
      $instagram: String
      $patreon: String
      $website: String
      $picture: Upload
    ) {
      updatePeople(
        peopleData: {
          id: $id
          name: $name
          peopleType: $peopleType
          twitter: $twitter
          instagram: $instagram
          patreon: $patreon
          website: $website
        }
        picture: $picture
      ) {
        people {
          id
          name
          peopleType
          picture
          twitter
          instagram
          patreon
          website
        }
      }
    }
  `,
};
