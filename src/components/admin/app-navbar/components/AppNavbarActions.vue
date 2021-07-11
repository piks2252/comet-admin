<template>
  <div class="app-navbar-actions">
    <notification-dropdown class="app-navbar-actions__item" />
    <profile-dropdown
      class="app-navbar-actions__item app-navbar-actions__item--profile"
    >
      <span>{{ userName }}</span>
    </profile-dropdown>
    <color-dropdown class="app-navbar-actions__item" />
  </div>
</template>

<script>
import ProfileDropdown from './dropdowns/ProfileDropdown';
import NotificationDropdown from './dropdowns/NotificationDropdown';
import ColorDropdown from './dropdowns/ColorDropdown';
import { ColorThemeMixin } from '../../../../vuestic-ui';

export default {
  name: 'app-navbar-actions',
  mixins: [ColorThemeMixin],
  inject: ['contextConfig'],
  components: {
    ColorDropdown,
    NotificationDropdown,
    ProfileDropdown,
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
</style>
