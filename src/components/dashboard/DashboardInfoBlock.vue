<template>
  <div class="row row-equal">
    <div class="flex xl6 xs12">
      <div class="row">
        <div class="flex xs12 sm4">
          <va-card class="mb-4" color="success">
            <p class="display-2 mb-0" style="color: white;">
              {{ overAllStats.users }}
            </p>
            <p>Users</p>
          </va-card>
        </div>
        <div class="flex xs12 sm4">
          <va-card class="mb-4" color="info">
            <p class="display-2 mb-0" style="color: white;">
              {{ overAllStats.devices }}
            </p>
            <p>Devices</p>
          </va-card>
        </div>
        <div class="flex xs12 sm4">
          <va-card class="mb-4" color="danger">
            <p class="display-2 mb-0" style="color: white;">
              {{ overAllStats.issues }}
            </p>
            <p>Issues</p>
          </va-card>
        </div>
      </div>
    </div>
    <div class="flex xs12 xl6">
      <div class="row">
        <div class="flex xs12 md6">
          <va-card>
            <p class="display-2 mb-1" :style="{ color: this.$themes.primary }">
              {{ totalMangas }}
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
                  {{ todayStats.users }}
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
                  {{ todayStats.chapters }}
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
                  {{ todayStats.downloads }}
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
  props: {
    overAllStats: {
      type: Object,
    },
    totalMangas: {
      type: Number,
    },
    todayStats: {
      type: Object,
    },
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
