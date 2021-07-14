<template>
  <div style="padding: 4px; height: 300px;">
    <div class="page-container">
      <va-inner-loading :loading="imageLoading">
        <img
          class="page-thumbnail"
          :src="imageSource"
          loading="lazy"
          draggable="false"
          @load="loaded"
        />
      </va-inner-loading>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageSource: {
      type: String,
    },
  },
  data() {
    return {
      imageLoading: true,
    };
  },
  methods: {
    loaded(ev) {
      this.imageLoading = false;
    },
  },
};
</script>

<style lang="scss">
.page-container {
  display: flex;
  width: 192px;
  border: 1px solid #e8e5e5;
  border-radius: 10px;
  padding: 4px;
  transition-delay: 0.2;

  &:hover {
    border: 2px solid #726e6e;
  }
}

.page-thumbnail {
  width: 182px;
  height: auto;
}
</style>
