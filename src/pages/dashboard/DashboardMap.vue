<template>
  <va-card title="Recently registered users">
    <line-map class="dashboard-map" :map-data="lineMapData" />
  </va-card>
</template>

<script>
import LineMap from '../../components/maps/LineMap';
import COUNTRIES_LIST from '../../constants/CountriesList';

export default {
  name: 'dashboard-map',
  components: {
    LineMap,
  },
  props: {
    countries: {
      type: Array,
    },
  },
  computed: {
    lineMapData() {
      const targetSVG =
        'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z';

      const cities = this.countries.map(c => {
        const countryData = COUNTRIES_LIST[c.name];
        return {
          svgPath: targetSVG,
          color: this.$themes.info,
          country: countryData.name,
          title: `${c.users} user(s) from ${countryData.name}`,
          latitude: countryData.latitude,
          longitude: countryData.longitude,
        };
      });
      return { cities };
    },
  },
};
</script>

<style>
.dashboard-map {
  height: 380px;
}
</style>
