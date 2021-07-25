export const mangaThumbFilter = mangaId => {
  if (mangaId && mangaId.length) {
    return `https://cdn.comet.shivy.co.in/images/mangas/${mangaId}`;
  }
  return 'https://cdn.comet.shivy.co.in/images/mangas/default.png';
};

export const genrePicFilter = imageId => {
  if (imageId && imageId.length) {
    return `https://cdn.comet.shivy.co.in/images/genres/${imageId}`;
  }
  return 'https://cdn.comet.shivy.co.in/images/genres/default.png';
};

export const profilePicFilter = imageId => {
  if (imageId && imageId.length) {
    return `https://cdn.comet.shivy.co.in/images/profile/${imageId}`;
  }
  return 'https://cdn.comet.shivy.co.in/images/profile/default.png';
};

export const authorPicFilter = authorId => {
  if (authorId && authorId.length) {
    return `https://cdn.comet.shivy.co.in/images/authors/${authorId}`;
  }
  return 'https://cdn.comet.shivy.co.in/images/profile/default.png';
};
