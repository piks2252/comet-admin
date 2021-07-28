<template>
  <div class="app-navbar-actions">
    <notification-dropdown class="app-navbar-actions__item" />
    <div class="app-navbar-actions__item app-navbar-actions__item--profile">
      <span>{{ userName }}</span>
      <router-link :to="{ name: 'logout' }" class="profile-logout">
        <va-icon name="fa fa-share" color="white" size="100" />
      </router-link>
    </div>
  </div>
</template>

<script>
import NotificationDropdown from './dropdowns/NotificationDropdown';

export default {
  name: 'app-navbar-actions',
  inject: ['contextConfig'],
  components: {
    NotificationDropdown,
  },
  props: {
    userName: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.app-navbar-actions {
  display: flex;
  margin-right: 50px;

  &__item {
    margin-top: 0.3rem;
    padding: 0;
    margin-left: 1.25rem;
    margin-right: 1.25rem;

    &:last-of-type {
      margin-right: 0;
    }

    &--profile {
      display: flex;
      justify-content: center;
      margin: auto 0 auto 1.25rem;
    }

    @include media-breakpoint-down(lg) {
      margin-right: 0.25rem;
    }

    @include media-breakpoint-down(sm) {
      margin-right: 0;

      &:first-of-type {
        margin-left: 0;
      }

      &--profile {
        position: absolute;
        right: 0.75rem;
        top: 1.25rem;
        height: fit-content;
        margin: auto;
      }
    }
  }
}

.profile-logout {
  margin-left: 10px;
  padding: 3px;
  border: 2px solid white;
  border-radius: 5px;

  &:hover {
    border: 2px solid #efefef;
  }
}
</style>
