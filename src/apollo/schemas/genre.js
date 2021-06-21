import gql from 'graphql-tag';

export const QUERIES = {
  GENRES: gql`
    query FETCH_GENRES($limit: Int, $skip: Int, $sortBy: String) {
      genresList(limit: $limit, skip: $skip, sortBy: $sortBy) {
        id
        name
        thumbnail
        groupType
      }
    }
  `,
};

export const MUTATIONS = {
  UPDATE_GENRE: gql`
    mutation UPDATE_GENRE($id: ID!, $name: String, $groupType: String) {
      updateGenre(genreData: { id: $id, name: $name, groupType: $groupType }) {
        genre {
          id
          groupType
        }
      }
    }
  `,
};
