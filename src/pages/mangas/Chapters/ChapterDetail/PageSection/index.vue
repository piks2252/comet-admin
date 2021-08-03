<template>
  <div class="row">
    <div class="flex xs12 md12">
      <div class="row align--center">
        <div class="flex xs12 md2">
          <p class="display-4" style="margin-bottom: 10px;">
            Pages
          </p>
        </div>
        <div class="flex xs12 md6 offset--md4" v-if="!isViewMode">
          <add-file-modal v-if="!useAltSrc" />
          <va-button
            color="success"
            @click="updatePageOrder"
            style="display: inline-block;"
            v-if="!isPagesSaved && !!pages && pages.length > 0"
          >
            Update page order
          </va-button>
        </div>
      </div>
      <div class="row">
        <div class="flex xs12 md12" v-if="!!pages && pages.length == 0">
          <p class="display-6">No pages have been uploaded</p>
        </div>
        <grid
          :draggable="true"
          :sortable="true"
          :items="pages"
          :cellWidth="200"
          :cellHeight="300"
          v-else
          @dragend="pageReorder"
        >
          <template slot="cell" slot-scope="props">
            <Page :imageSource="pageURL(props.item)" :useAltSrc="useAltSrc" />
          </template>
        </grid>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters, mapMutations } from 'vuex';
import Grid from 'vue-js-grid/src/Grid';
import Page from './Page';
import { updateChapterPageOrder } from '../../../../../apollo/api/mangas';
import AddFileModal from './AddFileModal.vue';

export default {
  components: { Grid, Page, AddFileModal },
  props: {
    pages: {
      type: Array,
    },
    useAltSrc: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      apiLoading: false,
      newPageArray: [],
    };
  },
  computed: {
    ...mapGetters([
      'selectedMangaId',
      'selectedChapterId',
      'selectedChapterMode',
      'isPagesSaved',
    ]),
    isViewMode() {
      return this.selectedChapterMode === 'view';
    },
  },
  watch: {
    newPageArray(newVal) {
      if (_.isEqual(newVal, this.pages)) {
        this.setChapterPagesSavedState(true);
      } else {
        this.setChapterPagesSavedState(false);
      }
    },
  },
  methods: {
    ...mapMutations([
      'setSelectedChapter',
      'setChapterSavedState',
      'setChapterPagesSavedState',
    ]),
    pageURL(pageId) {
      if (this.useAltSrc) {
        return pageId.replace(
          'https://xn--cckb8hk3i.com/',
          'https://s3.eu-central-1.wasabisys.com/xn--cckb8hk3i.com/',
        );
      } else {
        return `https://s3.eu-central-1.wasabisys.com/xn--cckb8hk3i.com/${this.selectedMangaId}/${this.selectedChapterId}/${pageId}`;
      }
    },
    pageReorder(e) {
      this.newPageArray = e.items.map(p => p.item);
    },
    async updatePageOrder() {
      this.apiLoading = true;
      try {
        let response = null;
        if (this.useAltSrc) {
          response = await updateChapterPageOrder(
            this.selectedChapterId,
            undefined,
            this.newPageArray,
          );
        } else {
          response = await updateChapterPageOrder(
            this.selectedChapterId,
            this.newPageArray,
          );
        }

        // Update pages of the model here
        this.$emit('refreshChapterPages', this.newPageArray);

        if (response.updateChapterPageIndices.response === 'OK') {
          this.setChapterPagesSavedState(true);
          this.showToast('Chapter pages updates successfully', {
            position: 'top-right',
            duration: 800,
            fullWidth: false,
          });
        }
      } catch (e) {
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
