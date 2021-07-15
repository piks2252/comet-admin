import gql from 'graphql-tag';

export const QUERIES = {
  GENRES: gql`
    query FETCH_GENRES(
      $search: String
      $groupType: String
      $limit: Int
      $page: Int
      $sortBy: String
    ) {
      genresList(
        search: $search
        groupType: $groupType
        limit: $limit
        page: $page
        sortBy: $sortBy
      ) {
        genres {
          id
          name
          thumbnail
          groupType
        }
        currentPage
        pages
        total
      }
    }
  `,
};

export const MUTATIONS = {
  CREATE_GENRE: gql`
    mutation CREATE_GENRE(
      $name: String!
      $groupType: String!
      $thumbnail: Upload!
    ) {
      createGenre(
        genreData: { name: $name, groupType: $groupType }
        thumbnail: $thumbnail
      ) {
        genre {
          id
          name
          groupType
          thumbnail
        }
      }
    }
  `,
  UPDATE_GENRE: gql`
    mutation UPDATE_GENRE(
      $id: ID!
      $name: String
      $groupType: String
      $thumbnail: Upload
    ) {
      updateGenre(
        genreData: { id: $id, name: $name, groupType: $groupType }
        thumbnail: $thumbnail
      ) {
        genre {
          id
          name
          groupType
          thumbnail
        }
      }
    }
  `,
};
