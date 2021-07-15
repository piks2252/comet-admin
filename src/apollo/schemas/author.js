import gql from 'graphql-tag';

export const QUERIES = {
  AUTHORS: gql`
    query FETCH_AUTHORS(
      $search: String
      $limit: Int
      $page: Int
      $sortBy: String
    ) {
      peopleList(search: $search, limit: $limit, page: $page, sortBy: $sortBy) {
        people {
          id
          name
          picture
          twitter
          instagram
          patreon
          website
        }
        currentPage
        pages
        total
      }
    }
  `,
};

export const MUTATIONS = {
  CREATE_AUTHOR: gql`
    mutation CREATE_AUTHOR(
      $name: String!
      $twitter: String
      $instagram: String
      $patreon: String
      $website: String
      $picture: Upload!
    ) {
      createPeople(
        peopleData: {
          name: $name
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
    mutation UPDATE_AUTHOR(
      $id: ID!
      $name: String
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
