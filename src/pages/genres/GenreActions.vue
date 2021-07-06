<template>
  <div>
    <va-button outline color="success" small @click="editGenre">
      Edit
    </va-button>
    <va-modal
      v-model="showModal"
      size="small"
      title="Update Genre"
      :okText="$t('modal.confirm')"
      :cancelText="$t('modal.cancel')"
      @ok="updateGenreName"
      @cancel="resetForm"
    >
      <va-input v-model="name" placeholder="Genre name" removable />
    </va-modal>
  </div>
</template>

<script>
import { updateGenre } from '../../apollo/api/genres';

export default {
  name: 'genre-actions',
  props: { genreName: String, genreId: Number },
  data() {
    return {
      name: { ...this.genreName },
      showModal: false,
    };
  },
  methods: {
    resetForm() {
      this.name = this.genreName;
    },
    editGenre() {
      this.resetForm();
      this.showModal = true;
    },
    async updateGenreName() {
      try {
        await updateGenre(this.genreId, this.name);
        this.$emit('updateGenre', { id: this.genreId, name: this.name });
        this.showToast('Genre updated successfully', {
          position: 'top-right',
          duration: 800,
          fullWidth: false,
        });
        this.resetForm();
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
