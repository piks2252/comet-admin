<template>
  <div class="row row-equal">
    <div class="flex xs12 xl6">
      <va-card title="Graphs">
        <va-chart
          class="chart"
          ref="lineChart"
          :data="lineChartData"
          type="line"
        />
      </va-card>
    </div>

    <div class="flex xs12 md6 xl3">
      <va-card title="Mangas">
        <va-chart
          class="chart chart--donut"
          :data="donutMangasData"
          type="donut"
        />
      </va-card>
    </div>

    <div class="flex xs12 md6 xl3">
      <dashboard-readers-list :readersStats="readersStats" />
    </div>
  </div>
</template>

<script>
import { hex2rgb } from '../../services/vuestic-ui';
import _ from 'lodash';
import { getLineChartData } from '../../data/charts/LineChartData';
import DashboardReadersList from './DashboardReadersList';

export default {
  name: 'dashboard-charts',
  props: {
    monthlyStats: {
      type: Array,
    },
    mangasStats: {
      type: Object,
    },
    readersStats: {
      type: Array,
    },
  },
  components: { DashboardReadersList },
  computed: {
    donutChartDataURL() {
      return document
        .querySelector('.chart--donut canvas')
        .toDataURL('image/png');
    },
    donutMangasData() {
      return {
        labels: ['Completed', 'On-going', 'Dropped'],
        datasets: [
          {
            label: 'Mangas (thousands)',
            backgroundColor: [
              this.$themes.danger,
              this.$themes.info,
              this.$themes.primary,
            ],
            data: [this.mangasStats.completed, this.mangasStats.onGoing, 0],
          },
        ],
      };
    },
    lineChartData() {
      const size = this.monthlyStats.length;
      const generatedData = {
        labels: this.monthlyStats.map(e => e.date).splice(0, size),
        datasets: [
          {
            label: 'Chapters Read',
            backgroundColor: hex2rgb(this.$themes.primary, 0.6).css,
            borderColor: 'transparent',
            data: this.monthlyStats.map(e => e.chapters).splice(0, size),
          },
        ],
      };
      return generatedData;
    },
  },
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
