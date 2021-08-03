import gql from 'graphql-tag';

export const QUERIES = {
  /** Manga queries */
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
  /** Chapter queries */
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
  /** Manga mutations */
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
  /** Chapter mutations */
  ADD_CHAPTER_INFO: gql`
    mutation ADD_CHAPTER_INFO(
      $title: String
      $chapter: Int
      $volume: String
      $longStrip: Boolean
      $releaseDate: DateTime
      $mangaId: ID
    ) {
      addChapter(
        mangaId: $mangaId
        chapterData: {
          title: $title
          chapter: $chapter
          volume: $volume
          longStrip: $longStrip
          releaseDate: $releaseDate
        }
      ) {
        chapter {
          id
          chapter
          volume
          title
          releaseDate
          longStrip
          useAltSrc
        }
      }
    }
  `,
  UPDATE_CHAPTERS_INDICES: gql`
    mutation UPDATE_CHAPTERS_INDICES($chapters: [ChapterIndexInput]) {
      updateChaptersIndices(chapters: $chapters) {
        response
      }
    }
  `,
  UPDATE_CHAPTER_INFO: gql`
    mutation UPDATE_CHAPTER_INFO(
      $id: ID
      $title: String
      $chapter: Int
      $volume: String
      $longStrip: Boolean
      $releaseDate: DateTime
    ) {
      updateChapterInfo(
        chapterData: {
          id: $id
          title: $title
          chapter: $chapter
          volume: $volume
          longStrip: $longStrip
          releaseDate: $releaseDate
        }
      ) {
        chapter {
          id
          chapter
          volume
          title
          releaseDate
          longStrip
          useAltSrc
        }
      }
    }
  `,
  UPDATE_CHAPTER_PAGE_ORDER: gql`
    mutation UPDATE_CHAPTER_PAGE_ORDER(
      $id: ID
      $pages: [String]
      $alternateSource: [String]
    ) {
      updateChapterPageIndices(
        id: $id
        pages: $pages
        alternateSource: $alternateSource
      ) {
        response
      }
    }
  `,
  ADD_CHAPTER_PAGES: gql`
    mutation ADD_CHAPTER_PAGES($id: ID, $pages: [Upload]) {
      addChapterPages(id: $id, pages: $pages) {
        response
      }
    }
  `,
  UPDATE_CHAPTER_PAGE: gql`
    mutation UPDATE_CHAPTER_PAGE($id: ID, $pageId: String, $page: Upload) {
      updateChapterPage(id: $id, pageId: $pageId, page: $page) {
        response
      }
    }
  `,
  DELETE_CHAPTER_PAGES: gql`
    mutation DELETE_CHAPTER_PAGES($id: ID, $pages: [String]) {
      deleteChapterPages(id: $id, pages: $pages) {
        response
      }
    }
  `,
};
