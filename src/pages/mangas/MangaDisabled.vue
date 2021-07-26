<template>
  <va-toggle
    :value="disabled"
    small
    :color="disabled ? 'primary' : 'success'"
    @input="toggleDisableManga"
  />
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  props: {
    disabled: Boolean,
    mangaId: String,
  },
  methods: {
    ...mapMutations(['setBackgroundLoading']),
    async toggleDisableManga(event) {
      this.setBackgroundLoading(true);
      try {
        // TODO: Update manga toggle disable
        await this.$emit('updateManga', {
          id: this.mangaId,
          disabled: event,
        });
        this.showToast(`Manga ${event ? 'disbaled' : 'enabled'}`, {
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
