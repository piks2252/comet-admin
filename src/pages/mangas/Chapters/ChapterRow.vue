<template>
  <div>
    <div class="flex md12 xs12 chapter-row">
      <div class="row">
        <div class="chapter-index">
          <p class="flex flex-center">#{{ index }}</p>
        </div>
        <div class="flex xs3 md9">
          <div class="grid__container flex-left">
            <b>Volume:</b> {{ chapter.volume }} | <b>Ch.</b>
            {{ chapter.chapter }}
            <p>Title: {{ chapter.title }}</p>
          </div>
        </div>
        <div class="flex xs8 md2">
          <action-button
            v-if="!showChapterDetail"
            :viewChapter="viewChapter"
            :editChapter="editChapter"
            :deleteChapter="deleteChapter"
          />
        </div>
      </div>
    </div>
    <transition name="slide">
      <chapter-detail
        v-if="showChapterDetail"
        :chapterId="chapter.id"
        :mode="mode"
        @closePopDown="closeDetailPage"
      />
    </transition>
  </div>
</template>

<script>
import ActionButton from './ActionButton';
import ChapterDetail from './ChapterDetail';

export default {
  components: {
    ActionButton,
    ChapterDetail,
  },
  data() {
    return {
      showChapterDetail: false,
      mode: 'view',
    };
  },
  props: {
    chapter: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    viewChapter() {
      this.mode = 'view';
      this.showChapterDetail = true;
    },
    editChapter() {
      this.mode = 'edit';
      this.showChapterDetail = true;
    },
    deleteChapter() {
      this.mode = 'delete';
      this.showChapterDetail = true;
    },
    closeDetailPage() {
      this.mode = 'view';
      this.showChapterDetail = false;
    },
  },
};
</script>

<style lang="scss">
.chapter-row {
  background: #ffffff;
  border: 1px solid #e8e5e5;
  border-radius: 10px;
  padding: 4px;

  &:hover {
    border: 1px dashed #c2ac06;
  }
}

.chapter-index {
  display: flex;
  background-color: #0c9f67;
  width: 50px;
  border-radius: 10px 0 0 10px;
  justify-content: center;
  align-items: center;
}

.chapter-index > p {
  color: white;
  font-size: 18px;
  text-align: center;
}
</style>
