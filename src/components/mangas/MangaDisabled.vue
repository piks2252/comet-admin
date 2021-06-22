<template>
  <va-toggle
    :value="disabled"
    small
    :color="disabled ? 'primary' : 'success'"
    @input="toggleDisableManga"
  />
</template>

<script>
import { updateManga } from '../../apollo/api/mangas';
export default {
  props: {
    disabled: Boolean,
    mangaId: String,
  },
  methods: {
    async toggleDisableManga(event) {
      try {
        // await updateManga(this.userId, this.userDisableReason);
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
    },
  },
};
</script>
