<template>
  <div class="dashboard">
    <dashboard-info-block />
    <dashboard-charts />
    <div class="row row-equal">
      <div class="flex xs12">
        <dashboard-map ref="dashboardMap" />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCharts from './DashboardCharts';
import DashboardInfoBlock from './DashboardInfoBlock';
import DashboardMap from './DashboardMap';

export default {
  name: 'dashboard',
  components: {
    DashboardCharts,
    DashboardInfoBlock,
    DashboardMap,
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
