<template>
  <va-select
    :options="GENRE_GROUPS"
    :value="genreGroup"
    @input="updateGenreType"
  />
</template>

<script>
import { mapMutations } from 'vuex';
import { updateGenre } from '../../apollo/api/genres';
import { GENRE_GROUPS_ARRAY } from '../../constants/defaultValues';

export default {
  name: 'genre-group',
  props: { genreGroup: String, genreId: Number },
  computed: {
    GENRE_GROUPS() {
      return GENRE_GROUPS_ARRAY;
    },
  },
  methods: {
    ...mapMutations(['setBackgroundLoading']),
    async updateGenreType(genreType) {
      this.setBackgroundLoading(true);
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
      this.setBackgroundLoading(false);
    },
  },
};
</script>
