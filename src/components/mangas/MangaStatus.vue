<template>
  <va-select
    :options="statusOptions"
    :value="getSelectedOption(status)"
    clearable="false"
    @input="toggleMangaStatus"
  />
</template>

<script>
export default {
  props: {
    status: Number,
    mangaId: String,
  },
  computed: {
    statusOptions() {
      return [
        { id: 1, text: 'On going' },
        { id: 2, text: 'Completed' },
        { id: 3, text: 'Dropped' },
      ];
    },
  },
  methods: {
    getSelectedOption(status_id) {
      const val = this.statusOptions.find(e => e.id === status_id);
      return val;
    },
    async toggleMangaStatus(event) {
      const mangaStatus = event.id;
      try {
        // await updateManga(this.userId, this.userDisableReason);
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
    },
  },
};
</script>
