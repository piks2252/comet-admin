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
          <va-button-group
            flat
            color="secondary"
            style="display: inline-block;"
          >
            <va-button small @click="submitZipFile"> Add zip file</va-button>
            <va-button small @click="submitMangaPages"> Add pages</va-button>
          </va-button-group>
          <va-button
            outline
            color="success"
            small
            @click="updatePageOrder"
            style="display: inline-block;"
            v-if="!isPagesSaved"
          >
            Update page order
          </va-button>
        </div>
      </div>
      <div class="row">
        <grid
          :draggable="true"
          :sortable="true"
          :items="pages"
          :cellWidth="200"
          :cellHeight="300"
          @dragend="pageReorder"
        >
          <template slot="cell" slot-scope="props">
            <Page :imageSource="pageURL(props.item)" />
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

export default {
  components: { Grid, Page },
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
    async submitZipFile() {},
    async submitMangaPages() {},
  },
};
</script>
