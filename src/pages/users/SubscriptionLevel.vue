<template>
  <va-select
    :options="getUserSubscriptionLevel"
    :value="selectedSubscriptionLevel"
    @input="toggleSubscribedLevel"
  />
</template>

<script>
import { mapMutations } from 'vuex';
import { updateSubscribedLevel } from '../../apollo/api/users';
import { USER_SUBSCRIPTIONS_LEVELS } from '../../constants/defaultValues';

export default {
  name: 'subscription-level',
  props: { level: Number, userId: String },
  computed: {
    getUserSubscriptionLevel() {
      return USER_SUBSCRIPTIONS_LEVELS.map(e => {
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
    ...mapMutations(['setBackgroundLoading']),
    async toggleSubscribedLevel(value) {
      const level = value.id;
      this.setBackgroundLoading(true);
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
      this.setBackgroundLoading(false);
    },
  },
};
</script>
