<template>
  <div class="flex flex-left chapter-detail">
    Chapter edit/view item will be shown here
    <p @click="closeSelf">close me</p>
  </div>
</template>

<script>
export default {
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
      chapter: {},
    };
  },
  created() {
    if (this.mode === 'edit') {
      this.edit = true;
    } else if (this.mode === 'delete') {
      this.delete = true;
    }
  },
  mounted() {
    console.log('api loading', this.chapterId, this.mode);
  },
  methods: {
    closeSelf() {
      this.$emit('closePopDown');
    },
  },
};
</script>

<style lang="scss">
.chapter-detail {
  margin: auto;
  border: 1px solid #999898;
  width: 98%;
  top: -5px;
  border-radius: 0 0 8px 8px;
  padding: 4px;
}
</style>
