<template>
  <va-card title="Top readers" class="d-flex dashboard-contributors-list">
    <va-button
      flat
      small
      slot="actions"
      class="mr-0"
      :disabled="readersStats.length <= stepSize"
      @click="showNext"
    >
      {{ step == 4 ? 'Reset' : 'Show next' }}
    </va-button>
    <!-- <va-inner-loading :loading="loading"> -->
    <div class="mb-3" v-for="(reader, idx) in visibleList" :key="idx">
      <va-progress-bar
        :value="getPercent(reader.chaptersRead)"
        :color="getRandomColor()"
      >
        {{ reader.chaptersRead }} {{ 'chapters' }}
      </va-progress-bar>
      <p class="mt-2 user-container">
        <img class="user-avatar" :src="reader.profilePic | profilePicURL" />
        {{ reader.name }}
      </p>
    </div>
    <!-- </va-inner-loading> -->
  </va-card>
</template>

<script>
import _ from 'lodash';
import { profilePicURL } from '../../mixins/filters';
export default {
  name: 'DashboardReadersList',
  props: {
    readersStats: {
      type: Array,
    },
  },
  data() {
    return {
      step: 0,
      stepSize: 5,
    };
  },
  computed: {
    visibleList() {
      return _.chunk(this.readersStats, this.stepSize)[this.step];
    },
    progressMax() {
      let maxValue = -1;
      this.readersStats.map(r => {
        if (r.chaptersRead > maxValue) {
          maxValue = r.chaptersRead;
        }
      });
      return maxValue;
    },
  },
  filters: {
    profilePicURL,
  },
  methods: {
    getPercent(val) {
      return (val / this.progressMax) * 100;
    },
    showNext() {
      if (this.step < 4) this.step++;
      else this.resetStep();
    },
    resetStep() {
      this.step = 0;
    },
    getRandomColor() {
      const keys = Object.keys(this.$themes);
      return this.$themes[keys[(keys.length * Math.random()) << 0]];
    },
  },
};
</script>

<style scoped lang="scss">
.dashboard-contributors-list {
  flex-direction: column;

  .inner-loading {
    height: 100%;
  }

  .user-container {
    display: flex;
    flex-direction: row;
  }

  .user-avatar {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 1px solid #d6dbe0;
    margin-right: 10px;
  }
}
</style>
