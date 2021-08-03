<template>
  <div style="display: inline-block;">
    <va-button-group flat color="secondary">
      <va-button @click="showAddPagesModal = true"> Add new page(s)</va-button>
    </va-button-group>
    <va-modal
      v-model="showAddPagesModal"
      title="Chapter page(s)"
      okText="Upload pages"
      cancelText="Cancel"
      @ok="uploadPages"
    >
      <div class="image-upload-container">
        <UploadImages
          :max="10"
          maxError="Only 10 pages can be uploaded at a time"
          uploadMsg="Upload pages"
          fileError="Only images are accepted"
          clearAll="Clear"
          @changed="handleImages"
        />
      </div>
    </va-modal>
  </div>
</template>

<script>
import UploadImages from 'vue-upload-drop-images';
import { mapGetters } from 'vuex';
import { addChapterPages } from '../../../../../apollo/api/mangas';
export default {
  name: 'AddFileModal',
  components: { UploadImages },
  data() {
    return {
      showAddPagesModal: false,
      pages: [],
      apiLoading: false,
    };
  },
  computed: {
    ...mapGetters(['selectedChapterId']),
  },
  methods: {
    handleImages(files) {
      this.pages = files;
    },
    async uploadPages() {
      if (this.pages.length === 0) {
        this.showToast('At least add one page', {
          position: 'top-right',
          duration: 800,
          fullWidth: false,
        });
        return;
      }
      this.apiLoading = true;
      try {
        const response = await addChapterPages(
          this.selectedChapterId,
          this.pages,
        );
        console.log(response);
        this.showToast('Chapter pages added successfully', {
          position: 'top-right',
          duration: 800,
          fullWidth: false,
        });
      } catch (e) {
        console.log(e);
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.apiLoading = false;
    },
  },
};
</script>
