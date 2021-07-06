<template>
  <va-page-not-found class="va-page-not-found-simple"> </va-page-not-found>
</template>

<script>
import VaPageNotFound from './VaPageNotFound';

export default {
  name: 'vuestic-page-not-found-simple',
  components: {
    VaPageNotFound,
  },
};
</script>

<style lang="scss">
.va-page-not-found-simple {
  .va-icon-vuestic {
    width: 19rem;
    height: 2rem;
    max-width: 100%;
    margin-bottom: 13%;
  }
}
</style>
