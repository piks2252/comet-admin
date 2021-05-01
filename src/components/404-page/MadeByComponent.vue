<template>
  <div class="made-by-component text--center pb-3">
    <span> ©{{ getYear }}. Made by Team Comet </span>
  </div>
</template>

<script>
export default {
  name: 'made-by',
  computed: {
    getYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss">
.made-by-component {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
