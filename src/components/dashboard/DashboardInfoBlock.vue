<template>
  <div class="row row-equal">
    <div class="flex xl6 xs12">
      <div class="row">
        <div class="flex xs12 sm4" v-for="(info, idx) in infoTiles" :key="idx">
          <va-card class="mb-4" :color="info.color">
            <p class="display-2 mb-0" style="color: white;">{{ info.value }}</p>
            <p>{{ info.text }}</p>
          </va-card>
        </div>
      </div>
    </div>
    <div class="flex xs12 xl6">
      <div class="row">
        <div class="flex xs12 md6">
          <va-card>
            <p class="display-2 mb-1" :style="{ color: this.$themes.primary }">
              372701
            </p>
            <p class="no-wrap">
              Mangas
            </p>
          </va-card>
        </div>
        <div class="flex xs12 md6">
          <va-card>
            <div class="row row-separated">
              <p class="display-5">Today's stats</p>
            </div>
            <div class="row row-separated">
              <div class="flex xs4">
                <p
                  class="display-2 mb-1 text--center"
                  :style="{ color: this.$themes.primary }"
                >
                  3
                </p>
                <p class="text--center mb-1">
                  users
                </p>
              </div>
              <div class="flex xs4">
                <p
                  class="display-2 mb-1 text--center"
                  :style="{ color: this.$themes.info }"
                >
                  24
                </p>
                <p class="text--center no-wrap mb-1">
                  chapters
                </p>
              </div>
              <div class="flex xs4">
                <p
                  class="display-2 mb-1 text--center"
                  :style="{ color: this.$themes.warning }"
                >
                  91
                </p>
                <p class="text--center mb-1">
                  downloads
                </p>
              </div>
            </div>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardInfoBlock',
  data() {
    return {
      infoTiles: [
        {
          color: 'success',
          value: '265',
          text: 'users',
          icon: '',
        },
        {
          color: 'info',
          value: '142',
          text: 'devices',
          icon: '',
        },
        {
          color: 'danger',
          value: '14',
          text: 'issues',
          icon: '',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.row-separated {
  .flex + .flex {
    border-left: 1px solid #e3eaeb;
  }

  @include media-breakpoint-down(xs) {
    p:not(.display-2) {
      font-size: 0.875rem;
    }
  }
}

.dashboard {
  .va-card__header--over {
    @include media-breakpoint-up(md) {
      padding-top: 0 !important;
    }
  }
}
</style>
