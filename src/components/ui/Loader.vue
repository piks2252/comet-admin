<template>
  <div class="spinners">
    <div class="flex-center spinner-box">
      <fulfilling-square-spinner
        :animation-duration="speed"
        :color="spinnersColor"
        :size="size"
      />
    </div>
  </div>
</template>

<script>
import { FulfillingSquareSpinner } from 'epic-spinners';
export default {
  components: {
    FulfillingSquareSpinner,
  },
  data() {
    return {
      size: 80,
      speed: 1500,
      spinnersColor: this.$themes.primary,
    };
  },
};
</script>

<style lang="scss">
.spinners {
  &__size {
    &-smaller,
    &-bigger {
      width: 40px;
      text-align: center;
      font-weight: 600;
    }

    &-smaller {
      font-size: 1rem;
    }

    &-bigger {
      font-size: 1.3rem;
    }
  }

  &__duration {
    &-slower,
    &-faster {
      transform: translateY(-1px);
    }
  }

  .spinner-box {
    height: 140px;
  }
}
</style>
