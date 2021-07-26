<template>
  <div>
    <img
      :src="thumbnail | genrePicFilter"
      class="thumb-pic"
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
import { mapMutations } from 'vuex';
import { updateGenre } from '../../apollo/api/genres';
import { genrePicFilter } from '../../mixins/filters';

export default {
  name: 'genre-thumbnail',
  props: { thumbnail: String, genreId: Number },
  filters: {
    genrePicFilter,
  },
  methods: {
    ...mapMutations(['setBackgroundLoading']),
    async uploadThumbnail({ target: { files = [] } }) {
      if (!files.length) {
        return;
      }
      const thumbnailFile = files[0];
      this.setBackgroundLoading(true);
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
      this.setBackgroundLoading(false);
    },
  },
};
</script>
