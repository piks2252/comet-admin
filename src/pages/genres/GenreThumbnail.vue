<template>
  <div>
    <img
      :src="thumbnail | genreImage"
      class="genre-pic"
      @click="$refs[`${genreId}_thumb`].click()"
    />
    <input
      :ref="`${genreId}_thumb`"
      type="file"
      style="display: none;"
      v-on:change="uploadThumbnail"
    />
  </div>
</template>

<script>
import { updateGenre } from '../../apollo/api/genres';

export default {
  name: 'genre-thumbnail',
  props: { thumbnail: String, genreId: Number },
  filters: {
    genreImage: value => {
      if (!value) {
        return 'https://cdn.comet.shivy.co.in/images/genres/default.png';
      }
      return `https://cdn.comet.shivy.co.in/images/genres/${value}`;
    },
  },
  methods: {
    async uploadThumbnail({ target: { files = [] } }) {
      if (!files.length) {
        return;
      }
      const thumbnailFile = files[0];
      try {
        const response = await updateGenre(
          this.genreId,
          null,
          null,
          thumbnailFile,
        );

        this.$emit('updateGenre', response.updateGenre.genre);
        this.showToast('Genre updated successfully', {
          position: 'top-right',
          duration: 800,
          fullWidth: false,
        });
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
