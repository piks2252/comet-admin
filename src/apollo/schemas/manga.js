import gql from 'graphql-tag';

export const QUERIES = {
  MANGAS: gql`
    query FETCH_MANGAS($limit: Int, $skip: Int, $sortBy: String) {
      mangasList(limit: $limit, skip: $skip, sortBy: $sortBy) {
        id
        title
        status
        cover
        disabled
      }
    }
  `,
  MANGA: gql`
    query FETCH_MANGA($id: String!) {
      mangaInfo(id: $id) {
        id
        title
        alternativeTitles
        status
        authors {
          id
          name
        }
        artists {
          id
          name
        }
        cover
        description
        hentai
        isAdult
        type {
          id
          name
        }
        genres {
          id
          name
        }
        demographics {
          id
          name
        }
        themes {
          id
          name
        }
        tags
        releaseDate
        disabled
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
