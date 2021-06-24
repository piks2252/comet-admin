<template>
  <div>{{ mangaId }}</div>
</template>

<script>
import Loader from '../../ui/Loader';
import { fetchChapters } from '../../../apollo/api/mangas';

export default {
  components: { Loader },
  props: {
    mangaId: {
      type: String,
    },
  },
  data() {
    return {
      apiLoading: false,
      chapters: [],
    };
  },
  methods: {
    async loadChapters() {
      // console.log('making reqwuest to ', this.mangaId);
      this.apiLoading = true;
      try {
        const { chaptersList } = await fetchChapters(this.mangaId);
        this.chapters = chaptersList;
        console.log(this.chapters);
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
    },
  },
};
</script>
