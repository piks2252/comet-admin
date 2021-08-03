<template>
  <div style="padding: 4px; height: 300px;">
    <div class="page-container">
      <va-inner-loading :loading="imageLoading">
        <div class="page-control-container" v-if="isEditMode">
          <p @click="showMenuBar = !showMenuBar">
            <va-icon
              class="option-button"
              :name="
                `glyphicon glyphicon-${
                  showMenuBar ? 'remove-sign' : 'option-horizontal'
                } icon-right input-icon`
              "
              :size="20"
            />
          </p>
          <div class="flex option-container" v-if="showMenuBar">
            <p @click="setAsThumbnail">
              <va-icon
                class="option-button"
                name="glyphicon glyphicon-pushpin icon-left input-icon"
                :size="20"
              />
            </p>
            <p @click="updatePageImage">
              <va-icon
                class="option-button"
                name="glyphicon glyphicon-edit icon-left input-icon"
                :size="20"
              />
            </p>
          </div>
        </div>
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
import { mapGetters } from 'vuex';
import {
  setChapterThumbnail,
  updateChapterPage,
} from '../../../../../apollo/api/mangas';
export default {
  props: {
    imageSource: {
      type: String,
    },
    useAltSrc: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showMenuBar: false,
      imageLoading: true,
    };
  },
  computed: {
    ...mapGetters(['selectedChapterMode', 'selectedChapterId']),
    isEditMode() {
      return this.selectedChapterMode === 'edit'; // && this.useAltSrc === false;
    },
  },
  methods: {
    loaded(ev) {
      this.imageLoading = false;
    },
    async setAsThumbnail() {
      try {
        await setChapterThumbnail(this.selectedChapterId, this.imageSource);
        this.showToast('Chapter thumbnail updated successfully', {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      } catch (e) {
        console.log(e);
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.showMenuBar = false;
    },
    updatePageImage() {},
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

.page-control-container {
  position: absolute;
  right: 0;
  width: 25px;
}

.option-button {
  cursor: pointer;
  color: #969696;
  padding: 0;

  &:hover {
    color: #333030;
  }
}

.page-control-container > .option-container {
  margin-top: -10px;
  background: #fff7f7;
  border: 1px solid rgb(202, 201, 201);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.option-container > .option-button {
  margin-top: 10px;
  margin-left: -10px;
}
</style>
