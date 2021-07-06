<template>
  <va-select
    :options="GENRE_GROUPS"
    :value="genreGroup"
    @input="updateGenreType"
  />
</template>

<script>
import { updateGenre } from '../../apollo/api/genres';
const GENRE_GROUPS_ARRAY = ['genre', 'theme', 'demographics', 'format'];

export default {
  name: 'genre-group',
  props: { genreGroup: String, genreId: Number },
  computed: {
    GENRE_GROUPS() {
      return GENRE_GROUPS_ARRAY;
    },
  },
  methods: {
    async updateGenreType(genreType) {
      try {
        await updateGenre(this.genreId, null, genreType);
        this.$emit('updateGenre', { id: this.genreId, groupType: genreType });
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
