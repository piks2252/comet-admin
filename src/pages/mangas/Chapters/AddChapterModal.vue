<template>
  <div style="display: inline-block;">
    <va-button @click="showModal = true" :disabled="isLoading">
      Add chapter</va-button
      >
    <va-modal
      v-model="showModal"
      okText="Add chapter"
      :cancelText="$t('modal.cancel')"
      @ok="submitChapter()"
    >
      <div class="flex">
        <div class="row">
          <div class="flex xs12 md12">
            <p class="display-4">New Chapter</p>
            <br />
            <div class="row">
              <div class="flex xs6 md6">
                <va-input
                  label="Volume"
                  placeholder="Volume"
                  type="number"
                  v-model="newChapter.volume"
                />
                <va-input
                  label="Index"
                  placeholder="Index"
                  type="number"
                  v-model="newChapter.chapter"
                />
                <va-input
                  label="Title"
                  placeholder="Title"
                  v-model="newChapter.title"
                />
              </div>
              <div class="flex xs6 md5 offset--md1">
                <va-date-picker
                  label="Release Date"
                  v-model="newChapter.releaseDate"
                />
                <va-toggle
                  label="Long Strip"
                  color="primary"
                  v-model="newChapter.longStrip"
                  small
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import { addChapterInfo } from '../../../apollo/api/mangas';
export default {
  name: 'AddChapterModal',
  data() {
    return {
      showModal: false,
      apiLoading: false,
      newChapter: {
        volume: 1,
        chapter: 1,
        title: '',
        releaseDate: moment(new Date()).format('YYYY-MM-DD'),
        longStrip: false,
      },
    };
  },
  watch: {
    showModal(newVal, oldVal) {
      if (newVal) {
        this.newChapter = { ...this.newChapter, ...this.baseNewChapter };
      } else {
        this.newChapter = {
          volume: 1,
          chapter: 1,
          title: '',
          releaseDate: moment(new Date()).format('YYYY-MM-DD'),
          longStrip: false,
        };
      }
    },
  },
  computed: {
    ...mapGetters(['selectedMangaId', 'baseNewChapter', 'isLoading']),
  },
  methods: {
    async submitChapter() {
      this.apiLoading = true;
      try {
        const releaseDate = moment(this.newChapter.releaseDate, 'YYYY-MM-DD');
        const { addChapter } = await addChapterInfo({
          ...this.newChapter,
          releaseDate,
          mangaId: this.selectedMangaId,
        });

        if (addChapter.chapter) {
          this.showToast('Chapter added successfully', {
            position: 'top-right',
            duration: 800,
            fullWidth: false,
          });
          this.$router.go();
        }
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
