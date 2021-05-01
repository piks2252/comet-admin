<template>
  <va-card title="Top readers" class="d-flex dashboard-contributors-list">
    <va-button
      flat
      small
      slot="actions"
      class="mr-0"
      :disabled="contributors.length <= step"
      @click="showNext"
    >
      {{ $t('dashboard.charts.showNextFive') }}
    </va-button>
    <va-inner-loading :loading="loading">
      <div class="mb-3" v-for="(contributor, idx) in visibleList" :key="idx">
        <va-progress-bar
          :value="getPercent(contributor.contributions)"
          :color="getRandomColor()"
        >
          {{ contributor.contributions }} {{ 'chapters' }}
        </va-progress-bar>
        <p class="mt-2 user-container">
          <img class="user-avatar" :src="contributor.avatar_url" />
          {{ contributor.login }}
        </p>
      </div>
    </va-inner-loading>
  </va-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DashboardReadersList',
  data() {
    return {
      contributors: [],
      loading: false,
      progressMax: 392,
      visibleList: [],
      step: 5,
    };
  },
  mounted() {
    this.loadContributorsList();
  },
  methods: {
    async loadContributorsList() {
      this.loading = true;
      const { data } = await axios.get(
        'https://api.github.com/repos/epicmaxco/vuestic-admin/contributors'
      );
      this.contributors = data;
      this.progressMax = Math.max(
        ...this.contributors.map(({ contributions }) => contributions)
      );
      this.showNext();
      this.loading = false;
    },
    getPercent(val) {
      return (val / this.progressMax) * 100;
    },
    showNext() {
      this.visibleList = this.contributors.splice(0, this.step);
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
