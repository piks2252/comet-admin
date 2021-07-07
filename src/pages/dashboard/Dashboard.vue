<template>
  <div>
    <loader v-if="apiLoading" />
    <div class="dashboard" v-else>
      <h2 class="display-1" v-if="data === null">No data found</h2>
      <dashboard-info-block
        v-if="data !== null"
        :overAllStats="data.overAllStats"
        :totalMangas="data.mangas.total"
        :todayStats="data.todayStats"
      />
      <dashboard-charts
        v-if="data !== null"
        :monthlyStats="data.monthlyStats"
        :readersStats="data.readersStats"
        :mangasStats="data.mangas"
      />
      <div class="row row-equal" v-if="data !== null">
        <div class="flex xs12">
          <dashboard-map ref="dashboardMap" :countries="data.countryStats" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCharts from './DashboardCharts';
import DashboardInfoBlock from './DashboardInfoBlock';
import DashboardMap from './DashboardMap';
import { fetchDashboardStats } from '../../apollo/api/dashboard';
import Loader from '../../components/Loader';

export default {
  name: 'dashboard',
  components: {
    DashboardCharts,
    DashboardInfoBlock,
    DashboardMap,
    Loader,
  },
  data() {
    return {
      apiLoading: false,
      data: null,
    };
  },
  async mounted() {
    await this.loadDashboardStats();
  },
  methods: {
    async loadDashboardStats() {
      this.apiLoading = true;
      try {
        const response = await fetchDashboardStats();
        this.data = response.dashboardStats;
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.apiLoading = false;
    },
  },
};
</script>

<style lang="scss">
.row-equal .flex {
  .va-card {
    height: 100%;
  }
}

.dashboard {
  .va-card {
    margin-bottom: 0 !important;
  }
}
</style>
