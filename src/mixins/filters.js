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

export const pageURL = pageId => {
  if (this.chapter.useAltSrc) {
    return pageId.replace(
      'https://xn--cckb8hk3i.com/',
      'https://s3.eu-central-1.wasabisys.com/xn--cckb8hk3i.com/',
    );
  } else {
    return `https://s3.eu-central-1.wasabisys.com/xn--cckb8hk3i.com/${this.chapter.mangaId}/${this.chapterId}/${pageId}`;
  }
};
