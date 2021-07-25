<template>
  <va-inner-loading :loading="apiLoading">
    <div class="flex flex-left chapter-detail">
      <div class="row">
        <div class="flex xs12 md9">
          <p class="display-4">{{ this.edit ? 'Edit' : 'View' }} Chapter</p>
          <div class="row">
            <div class="flex xs6 md5">
              <va-input
                label="Volume"
                placeholder="Volume"
                type="number"
                v-model="chapter.volume"
                :disabled="!edit"
              />
              <va-input
                label="Index"
                placeholder="Index"
                type="number"
                v-model="chapter.chapter"
                :disabled="!edit"
              />
              <va-input
                label="Title"
                placeholder="Title"
                v-model="chapter.title"
                :disabled="!edit"
              />
            </div>
            <div class="flex xs6 md4">
              <va-date-picker
                label="Release Date"
                v-model="chapter.releaseDate"
              />
              <va-toggle
                label="Long Strip"
                color="primary"
                v-model="chapter.longStrip"
                small
              />
              <va-toggle
                label="Use alternative source"
                color="success"
                v-model="chapter.useAltSrc"
                small
              />
            </div>
          </div>
        </div>
        <div class="flex xs9 md3">
          <div class="flex flex-center">
            <va-button
              outline
              color="success"
              small
              @click="saveChanges()"
              v-if="!isSaved"
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
          <p class="display-4" style="margin-bottom: 10px;">
            Pages
          </p>
          <va-button outline color="success" small @click="updatePageOrder">
            Update page order
          </va-button>
          <grid
            :draggable="true"
            :sortable="true"
            :items="chapter.useAltSrc ? chapter.alternateSource : chapter.pages"
            :cellWidth="200"
            :cellHeight="300"
          >
            <template slot="cell" slot-scope="props">
              <Page :imageSource="pageURL(props.item)" />
            </template>
          </grid>
        </div>
      </div>
    </div>
  </va-inner-loading>
</template>

<script>
import Grid from 'vue-js-grid/src/Grid';
import Page from './Page';
import _ from 'lodash';
import { fetchChapter } from '../../../../apollo/api/mangas';

export default {
  components: { Grid, Page },
  props: {
    chapterId: {
      type: String,
    },
    mode: {
      type: String,
    },
  },
  data() {
    return {
      edit: false,
      delete: false,
      apiLoading: false,
      isSaved: true,
      chapter: {},
      loadedChapter: null,
    };
  },
  watch: {
    chapter: {
      handler: function(newVal) {
        console.log(newVal);
        if (_.isEqual(newVal, this.loadedChapter)) {
          this.isSaved = true;
        } else {
          this.isSaved = false;
        }
      },
      deep: true,
    },
  },
  created() {
    if (this.mode === 'edit') {
      this.edit = true;
    } else if (this.mode === 'delete') {
      this.delete = true;
    }
  },
  async mounted() {
    await this.loadChapter();
  },
  methods: {
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
    async updatePageOrder() {},
    async saveChanges() {},
    closeSelf() {
      if (!this.isSaved) {
        const confirmation = confirm(
          'Unsaved changes will be not saved, are you sure?',
        );
        if (confirmation === false) {
          return;
        }
      }
      this.$emit('closePopDown');
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
