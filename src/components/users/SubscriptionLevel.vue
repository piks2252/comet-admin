<template>
  <va-select
    :options="getUserSubscriptionLevel"
    :value="selectedSubscriptionLevel"
    @input="toggleSubscribedLevel"
  />
</template>

<script>
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
    toggleSubscribedLevel(value) {
      const level = value.id;
      // TODO: Update the value of user here using mutation
      this.$emit('updateUser', {
        id: this.userId,
        subscribedLevel: level,
      });
    },
  },
};
</script>
