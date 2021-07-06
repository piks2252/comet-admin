<template>
  <div class="chapter-row">
    <p scope="row">Volume: {{ chapter.volume }}</p>
    <p>Chapter: {{ chapter.chapter }}</p>
    <p>Title: {{ chapter.title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    chapter: {
      type: Object,
    },
  },
};
</script>
<style lang="scss">
.chapter-row {
  border: 1px solid #e8e5e5;
  padding: 8px;

  &:focus {
    border: 1px dashed #e8e5e5;
  }
}
</style>
