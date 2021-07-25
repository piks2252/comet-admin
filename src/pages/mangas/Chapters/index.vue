<template>
  <div>
    <div
      class="row align--center justify-content--start"
      style="padding: 10px;"
    >
      <div class="flex xs12 md6">
        <va-button :disabled="apiLoading" @click="refreshChaptersPage"
        >Refresh</va-button
        >
        <va-button>Add Chapter</va-button>
        <va-button
          color="success"
          v-if="!isSaved"
          @click="submitChaptersIndices"
        >Update chapter list</va-button
        >
      </div>
      <div class="flex xs12 md2 offset--md4">
        <va-select
          v-model="perPage"
          :label="$t('tables.perPage')"
          :options="perPageOptions"
          noClear
        />
      </div>
    </div>
    <div class="row align--center">
      <div class="flex md10 lg11">
        <h1>
          Chapters
          <va-popover
            title=""
            message="Chapters are sorted in non-increasing order"
            placement="left"
          >
            <span>↓</span>
          </va-popover>
        </h1>
        <loader v-if="apiLoading" />
        <div v-else>
          <div v-if="pagination.pages > 1" class="va-data-table__pagination">
            <va-pagination
              :value="pagination.currentPage"
              :visible-pages="3"
              :pages="pagination.pages"
              @input="loadChapters"
            />
          </div>
          <draggable
            v-model="chapters"
            style="margin-top: 10px;"
            draggable=".item"
          >
            <transition-group>
              <chapter-row
                :class="!chapterFocused ? 'item' : ''"
                v-for="(chapter, index) in chapters"
                :key="chapter.id"
                :chapter="chapter"
                :index="
                  pagination.total -
                    (pagination.currentPage - 1) * pagination.limit -
                    index
                "
                @chapterSelected="chapterSelectEvent"
              />
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import draggable from 'vuedraggable';
import { setTitle } from '../../../mixins/utils';
import Loader from '../../../components/Loader';
import ChapterRow from './ChapterRow';
import {
  fetchChapters,
  updateChaptersIndices,
} from '../../../apollo/api/mangas';

const MAX_CHAPTER_COUNT = 2000;

export default {
  components: { Loader, draggable, ChapterRow },
  props: {
    mangaId: {
      type: String,
    },
    mangaTitle: {
      type: String,
    },
  },
  data() {
    return {
      apiLoading: false,
      chapterFocused: false,
      perPageOptions: ['20', '40', '100', '200', '500', 'All'],
      perPage: '20',
      isSaved: true,
      chapters: [],
      originalChaptersIndex: [],
      pagination: {
        limit: 20,
        currentPage: 1,
        pages: 0,
        total: 0,
      },
    };
  },
  created() {
    setTitle(`Chapters - ${this.mangaTitle}`);
  },
  async mounted() {
    if (this.mangaId) {
      await this.loadChapters();
    }
  },
  watch: {
    perPage: function(newVal) {
      if (newVal === 'All') {
        this.pagination.limit = MAX_CHAPTER_COUNT;
      } else {
        this.pagination.limit = parseInt(newVal);
      }
      this.loadChapters();
    },
    chapters: {
      handler: function(newVal, oldVal) {
        const areEqual = _.isEqual(
          newVal.map(e => e.id),
          this.originalChaptersIndex,
        );

        if (oldVal.length && !areEqual) {
          this.isSaved = false;
        } else {
          this.isSaved = true;
        }
      },
      deep: true,
    },
  },
  methods: {
    async loadChapters(page = 1) {
      this.apiLoading = true;
      try {
        const { chaptersList } = await fetchChapters(
          this.mangaId,
          this.pagination.limit,
          page,
        );
        this.chapters = chaptersList.chapters;
        this.originalChaptersIndex = this.chapters.map(c => c.id);
        this.pagination = {
          ...this.pagination,
          currentPage: chaptersList.currentPage,
          pages: chaptersList.pages,
          total: chaptersList.total,
        };
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.apiLoading = false;
    },
    async refreshChaptersPage() {
      await this.loadChapters();
      this.chapterFocused = false;
    },
    chapterSelectEvent(val) {
      this.chapterFocused = val;
    },
    async submitChaptersIndices() {
      const offset =
        this.pagination.total -
        (this.pagination.currentPage - 1) * this.pagination.limit;
      const newChaptersIndices = this.chapters.map((ch, index) => {
        return {
          id: ch.id,
          chapter: offset - index,
        };
      });

      console.log(newChaptersIndices);

      this.apiLoading = true;
      try {
        const {
          updateChaptersIndices: { response },
        } = await updateChaptersIndices(newChaptersIndices);

        if (response === 'OK') {
          this.showToast('Chapter list updated successfully', {
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
