<template>
  <div class="grid__container flex-center chapter-actions">
    <div @click="viewChapter">
      <va-icon name="fa fa-eye" :size="21" class="action-icon pointer" />
    </div>

    <div @click="editChapter">
      <va-icon name="fa fa-edit" :size="21" class="action-icon pointer" />
    </div>
    <div @click="deleteChapter">
      <va-icon
        name="fa fa-trash-o"
        :size="21"
        class="action-icon pointer"
        @click="deleteChapter"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chapterId: {
      type: String,
    },
  },
  mounted() {
    console.log(this.chapterId);
  },
  methods: {
    viewChapter() {
      console.log('Rtoue navigate to view chapoter ', this.chapterId);
    },
    editChapter() {
      console.log('Rtoue navigate to edit chapoter ', this.chapterId);
    },
    deleteChapter() {
      console.log('Rtoue navigate to delete chapoter ', this.chapterId);
    },
  },
};
</script>

<style lang="scss">
.chapter-actions {
  border-left: 2px dashed #5b656c;
}

.chapter-actions > * {
  margin: 5px;
  padding: 2px;

  &:hover {
    border: 1px solid #6a7277;
    border-radius: 4px;
  }
}
</style>
