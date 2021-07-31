<template>
  <va-inner-loading :loading="apiLoading">
    <div class="flex flex-left chapter-detail">
      <div class="row">
        <div class="flex xs12 md9">
          <p class="display-4">{{ isViewMode ? 'View' : 'Edit' }} Chapter</p>
          <div class="row">
            <div class="flex xs6 md5">
              <va-input
                label="Volume"
                placeholder="Volume"
                type="number"
                v-model="chapter.volume"
                :disabled="isViewMode"
              />
              <va-input
                label="Index"
                placeholder="Index"
                type="number"
                v-model="chapter.chapter"
                :disabled="isViewMode"
              />
              <va-input
                label="Title"
                placeholder="Title"
                v-model="chapter.title"
                :disabled="isViewMode"
              />
            </div>
            <div class="flex xs6 md4">
              <va-date-picker
                label="Release Date"
                v-model="chapter.releaseDate"
                :disabled="isViewMode"
              />
              <va-toggle
                label="Long Strip"
                color="primary"
                v-model="chapter.longStrip"
                :disable="isViewMode"
                small
              />
              <va-toggle
                label="Use alternative source"
                color="success"
                v-model="chapter.useAltSrc"
                :disable="isViewMode"
                small
              />
            </div>
          </div>
        </div>
        <div class="flex xs9 md3">
          <div class="flex flex-center" v-if="isViewMode">
            <va-button outline color="danger" small @click="closeSelf">
              Close
            </va-button>
          </div>
          <div class="flex flex-center" v-else>
            <va-button
              outline
              color="success"
              small
              @click="saveChanges()"
              :disabled="isChapterSaved"
            >
              Save
            </va-button>
            <va-button outline color="danger" small @click="closeSelf">
              Cancel
            </va-button>
          </div>
        </div>
      </div>
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
                <va-button small @click="submitZipFile">
                  Add zip file</va-button
                  >
                <va-button small @click="submitMangaPages">
                  Add pages</va-button
                >
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
              :items="
                chapter.useAltSrc ? chapter.alternateSource : chapter.pages
              "
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
    </div>
  </va-inner-loading>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import { mapGetters, mapMutations } from 'vuex';
import Grid from 'vue-js-grid/src/Grid';
import Page from './Page';
import {
  fetchChapter,
  updateChapterInfo,
  updateChapterPageOrder,
} from '../../../../apollo/api/mangas';

export default {
  components: { Grid, Page },
  props: {
    chapterId: {
      type: String,
    },
  },
  data() {
    return {
      apiLoading: false,
      chapter: {},
      loadedChapter: null,
      newPageArray: [],
    };
  },
  computed: {
    ...mapGetters(['selectedChapterMode', 'isChapterSaved', 'isPagesSaved']),
    isViewMode() {
      return this.selectedChapterMode === 'view';
    },
  },
  watch: {
    chapter: {
      handler: function(newVal, oldVal) {
        if (!this.apiLoading && !_.isEmpty(oldVal, true)) {
          // Need to use temp variable to store copy of original chapter data
          // With using chapter.releaseDate as model in va-date-picker it converts
          // ISO date format to YYYY-MM-DD hence need to make a custom object for comparision
          const valueToCompare = { ...this.loadedChapter };
          valueToCompare.releaseDate = moment(
            valueToCompare.releaseDate,
          ).format('YYYY-MM-DD');
          if (_.isEqual(newVal, valueToCompare)) {
            this.setChapterSavedState(true);
          } else {
            this.setChapterSavedState(false);
          }
        }
      },
      deep: true,
    },
    newPageArray(newVal) {
      const arrayToCheck = this.chapter.useAltSrc
        ? this.chapter.alternateSource
        : this.chapter.pages;

      if (_.isEqual(newVal, arrayToCheck)) {
        this.setChapterPagesSavedState(true);
      } else {
        this.setChapterPagesSavedState(false);
      }
    },
  },
  async mounted() {
    await this.loadChapter();
  },
  methods: {
    ...mapMutations([
      'setSelectedChapter',
      'setChapterSavedState',
      'setChapterPagesSavedState',
    ]),
    pageURL(pageId) {
      if (this.chapter.useAltSrc) {
        return pageId.replace(
          'https://xn--cckb8hk3i.com/',
          'https://s3.eu-central-1.wasabisys.com/xn--cckb8hk3i.com/',
        );
      } else {
        return `https://s3.eu-central-1.wasabisys.com/xn--cckb8hk3i.com/${this.chapter.mangaId}/${this.chapterId}/${pageId}`;
      }
    },
    pageReorder(e) {
      this.newPageArray = e.items.map(p => p.item);
    },
    async loadChapter() {
      this.apiLoading = true;
      try {
        const { chapterItem } = await fetchChapter(this.chapterId);
        this.chapter = chapterItem;
        this.loadedChapter = { ...this.chapter };
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.apiLoading = false;
    },
    async saveChanges() {
      this.apiLoading = true;
      try {
        const chapterBody = {
          id: this.chapter.id,
          volume: this.chapter.volume,
          chapter: this.chapter.chapter,
          title: this.chapter.title,
          releaseDate: new Date(this.chapter.releaseDate),
          longStrip: this.chapter.longStrip,
          useAltSrc: this.chapter.useAltSrc,
        };

        const response = await updateChapterInfo(chapterBody);
        this.chapter = {
          ...this.chapter,
          ...response.updateChapterInfo.chapter,
        };
        this.loadedChapter = {
          ...this.chapter,
          ...response.updateChapterInfo.chapter,
        };
        this.setChapterSavedState(true);
        this.showToast('Chapter info updated successfully', {
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
      this.apiLoading = false;
    },
    async updatePageOrder() {
      this.apiLoading = true;
      try {
        let response = null;
        if (this.chapter.useAltSrc) {
          response = await updateChapterPageOrder(
            this.chapterId,
            undefined,
            this.newPageArray,
          );
        } else {
          response = await updateChapterPageOrder(
            this.chapterId,
            this.newPageArray,
          );
        }

        // Update pages of the model here
        if (this.chapter.useAltSrc) {
          this.chapter.alternateSource = this.newPageArray;
        } else {
          this.chapter.pages = this.pages;
        }

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
    closeSelf() {
      if (!this.isChapterSaved && !this.isViewMode) {
        const confirmation = confirm(
          'Unsaved changes will be not saved, are you sure?',
        );
        if (confirmation === false) {
          return;
        }
      }
      this.setSelectedChapter({ id: null, mode: 'view' });
    },
  },
};
</script>

<style lang="scss">
.chapter-detail {
  margin-left: 10px;
  border: 1px solid #999898;
  width: 98%;
  top: -5px;
  border-radius: 0 0 8px 8px;
  padding: 4px;
}

.chapter-detail > .row {
  padding: 10px;
}
</style>
