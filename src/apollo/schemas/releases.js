import gql from 'graphql-tag';

export const QUERIES = {
  RELEASES: gql`
    query FETCH_RELEASES($limit: Int, $skip: Int) {
      releasesList(limit: $limit, skip: $skip) {
        title
        date
        description
        versionTag
        url
      }
    }
  `,
};
