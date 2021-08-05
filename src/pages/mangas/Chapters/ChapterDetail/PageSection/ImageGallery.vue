<template>
  <div style="padding: 4px; height: 300px;">
    <div class="page-container">
      <va-inner-loading :loading="imageLoading">
        <img
          class="image page-thumbnail"
          v-for="(image, i) in images"
          :src="image"
          :key="i"
          @click="index = i"
          loading="lazy"
          @load="loaded"
        />
        <vue-gallery-slideshow :images="images" :index="index" @close="index = null"></vue-gallery-slideshow>
      </va-inner-loading>
    </div>
  </div>
</template>

<script>
import VueGallerySlideshow from 'vue-gallery-slideshow';
export default {
  components: {
    VueGallerySlideshow,
  },
  props: {
    images: {
      type: Array,
    },
  },
  data() {
    return {
      imageLoading: true,
      index: null,
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
