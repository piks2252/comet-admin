<template>
  <va-select
    :options="getUserSubscriptionLevel"
    :value="selectedSubscriptionLevel"
    @input="toggleSubscribedLevel"
  />
</template>

<script>
import { updateSubscribedLevel } from '../../apollo/api/users';
const LEVELS = [0, 1, 2];

export default {
  name: 'subscription-level',
  props: { level: Number, userId: String },
  computed: {
    getUserSubscriptionLevel() {
      return LEVELS.map(e => {
        return {
          id: e,
          text: `Level ${e}`,
        };
      });
    },
    selectedSubscriptionLevel() {
      return this.getUserSubscriptionLevel.find(e => e.id === this.level);
    },
  },
  methods: {
    async toggleSubscribedLevel(value) {
      const level = value.id;
      try {
        await updateSubscribedLevel(this.userId, level);
        this.$emit('updateUser', {
          id: this.userId,
          subscribedLevel: level,
        });
        this.showToast('User updated successfully', {
          position: 'top-right',
          duration: 800,
          fullWidth: false,
        });
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
    },
  },
};
</script>
