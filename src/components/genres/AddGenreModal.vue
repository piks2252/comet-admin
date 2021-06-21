<template>
  <div>
    <va-button @click="showModal = true">Add Genre</va-button>
    <va-modal
      v-model="showModal"
      size="medium"
      title="Create Genre"
      :okText="$t('modal.confirm')"
      :cancelText="$t('modal.cancel')"
      @ok="submitGenre"
      @cancel="resetForm"
    >
      <va-input v-model="genre.name" placeholder="Genre name" removable />
      <va-select :options="GENRE_GROUPS" v-model="genre.groupType" />
      <input type="file" accept="image/*" @change="uploadPhoto" />
    </va-modal>
  </div>
</template>

<script>
import { createGenre } from '../../apollo/api/genres';
const GENRE_GROUPS_ARRAY = ['genre', 'theme', 'demographics', 'format'];

export default {
  data() {
    return {
      genre: {
        name: '',
        groupType: '',
        thumbnail: null,
      },
      showModal: false,
    };
  },
  computed: {
    GENRE_GROUPS() {
      return GENRE_GROUPS_ARRAY;
    },
  },
  mounted() {
    this.resetForm();
  },
  methods: {
    resetForm() {
      this.genre = {
        name: '',
        groupType: '',
        thumbnail: null,
      };
    },
    uploadPhoto({ target: { files = [] } }) {
      if (!files.length) {
        return;
      }
      this.genre.thumbnail = files[0];
    },
    async submitGenre() {
      try {
        const response = await createGenre(
          this.genre.name,
          this.genre.groupType,
          this.genre.thumbnail,
        );
        this.showToast('New genre added', {
          position: 'top-right',
          duration: 800,
          fullWidth: false,
        });
        window.location.reload();
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
