<template>
  <div class="flex flex-left chapter-detail">
    Chapter edit/view item will be shown here
    <p @click="closeSelf">close me</p>
    <grid
      :draggable="true"
      :sortable="true"
      :items="items"
      :height="100"
      :width="100"
    >
      <template slot="cell" slot-scope="props">
        <div>{{ props.item }}</div>
      </template>
    </grid>
  </div>
</template>

<script>
import Grid from 'vue-js-grid';
export default {
  components: { Grid },
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
