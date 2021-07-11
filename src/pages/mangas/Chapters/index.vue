<template>
  <div>
    <div class="row align--center">
      <div class="flex xs12 offset--md8 offset--lg7">
        <va-button color="success">Update chapter list</va-button>
        <va-button>Add Chapter</va-button>
      </div>
    </div>
    <div class="row align--center">
      <div class="flex md10 lg11">
        <loader v-if="apiLoading" />
        <div v-else>
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
          <draggable v-model="chapters" style="margin-top: 10px;">
            <transition-group>
              <chapter-row
                v-for="(chapter, index) in chapters"
                :key="chapter.id"
                :chapter="chapter"
                :index="chapters.length - index"
              />
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Loader from '../../../components/Loader';
import ChapterRow from './ChapterRow';
import { fetchChapters } from '../../../apollo/api/mangas';

export default {
  components: { Loader, draggable, ChapterRow },
  props: {
    mangaId: {
      type: String,
    },
  },
  data() {
    return {
      apiLoading: false,
      chapters: [],
    };
  },
  async mounted() {
    if (this.mangaId) {
      await this.loadChapters();
    }
  },
  methods: {
    async loadChapters() {
      this.apiLoading = true;
      try {
        const { chaptersList } = await fetchChapters(this.mangaId);
        this.chapters = chaptersList;
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
