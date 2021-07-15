import gql from 'graphql-tag';

export const QUERIES = {
  MANGAS: gql`
    query FETCH_MANGAS(
      $search: String
      $limit: Int
      $page: Int
      $sortBy: String
    ) {
      mangasList(search: $search, limit: $limit, page: $page, sortBy: $sortBy) {
        mangas {
          id
          title
          status
          cover
          disabled
        }
        currentPage
        pages
        total
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
  CHAPTERS: gql`
    query FETCH_CHAPTERS(
      $limit: Int
      $page: Int
      $sortBy: String
      $mangaId: String
    ) {
      chaptersList(
        mangaId: $mangaId
        limit: $limit
        page: $page
        sortBy: $sortBy
      ) {
        chapters {
          id
          title
          chapter
          volume
        }
        currentPage
        pages
        total
      }
    }
  `,
  CHAPTER: gql`
    query FETCH_CHAPTER($id: String) {
      chapterItem(id: $id) {
        id
        chapter
        volume
        title
        mangaId
        releaseDate
        thumbnail
        pages
        longStrip
        alternateSource
        useAltSrc
      }
    }
  `,
};

export const MUTATIONS = {
  CREATE_MANGA: gql`
    mutation CREATE_MANGA(
      $title: String!
      $alternativeTitles: [String]
      $description: String
      $authors: [String]
      $artists: [String]
      $genres: [Int]
      $demographics: [Int]
      $themes: [Int]
      $type: Int!
      $tags: [String]
      $hentai: Boolean
      $isAdult: Boolean
      $status: Int!
      $disabled: Boolean
      $releaseDate: DateTime
      $thumbnail: Upload!
    ) {
      createManga(
        mangaData: {
          title: $title
          alternativeTitles: $alternativeTitles
          description: $description
          authors: $authors
          artists: $artists
          genres: $genres
          demographics: $demographics
          themes: $themes
          type: $type
          tags: $tags
          hentai: $hentai
          isAdult: $isAdult
          status: $status
          disabled: $disabled
          releaseDate: $releaseDate
        }
        cover: $thumbnail
      ) {
        manga {
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
    }
  `,
  UPDATE_MANGA: gql`
    mutation UPDATE_MANGA(
      $id: ID!
      $title: String
      $alternativeTitles: [String]
      $description: String
      $authors: [String]
      $artists: [String]
      $genres: [Int]
      $demographics: [Int]
      $themes: [Int]
      $type: Int
      $tags: [String]
      $hentai: Boolean
      $isAdult: Boolean
      $status: Int
      $disabled: Boolean
      $releaseDate: DateTime
      $thumbnail: Upload
    ) {
      updateManga(
        mangaData: {
          id: $id
          title: $title
          alternativeTitles: $alternativeTitles
          description: $description
          authors: $authors
          artists: $artists
          genres: $genres
          demographics: $demographics
          themes: $themes
          type: $type
          tags: $tags
          hentai: $hentai
          isAdult: $isAdult
          status: $status
          disabled: $disabled
          releaseDate: $releaseDate
        }
        cover: $thumbnail
      ) {
        manga {
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
    }
  `,
};
