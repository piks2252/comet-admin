export const NEW_AUTHOR = {
  name: '',
  twitter: '',
  instagram: '',
  patreon: '',
  website: '',
  picture: null,
};

export const NEW_GENRE = {
  name: '',
  groupType: '',
  thumbnail: null,
};

export const GENRE_GROUPS_ARRAY = ['genre', 'theme', 'demographics', 'format'];

export const USER_SUBSCRIPTIONS_LEVELS = [0, 1, 2];

export const MANGA_STATUSES = [
  { id: 1, text: 'On going' },
  { id: 2, text: 'Completed' },
  { id: 3, text: 'Dropped' },
];

export const DEFAULT_MANGA = {
  title: '',
  alternativeTitles: [],
  status: 1,
  authors: [],
  artists: [],
  cover: null,
  description: '',
  hentai: false,
  isAdult: false,
  type: null,
  genres: [],
  demographics: [],
  themes: [],
  tags: [],
  releaseDate: new Date(),
  disabled: false,
  otherSources: {
    isbnCode: '',
    anilistId: '',
    malId: '',
  },
};
