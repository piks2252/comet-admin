<template>
  <va-select
    :options="statusOptions"
    :value="getSelectedOption(status)"
    clearable="false"
    @input="toggleMangaStatus"
  />
</template>

<script>
import { mapMutations } from 'vuex';
import { MANGA_STATUSES } from '../../constants/defaultValues';
export default {
  props: {
    status: Number,
    mangaId: String,
  },
  computed: {
    statusOptions() {
      return MANGA_STATUSES;
    },
  },
  methods: {
    ...mapMutations(['setBackgroundLoading']),
    getSelectedOption(statusId) {
      return this.statusOptions.find(e => e.id === statusId);
    },
    async toggleMangaStatus(event) {
      const mangaStatus = event.id;
      this.setBackgroundLoading(true);
      try {
        // TODO: Update manga toggle status
        await this.$emit('updateManga', {
          id: this.mangaId,
          status: mangaStatus,
        });
        this.showToast('Manga updated successfully', {
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
