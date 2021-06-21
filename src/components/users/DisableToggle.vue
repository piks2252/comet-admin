<template>
  <div>
    <va-toggle key="afase" :value="disabled" @input="toggleFunction" small />
    <blockquote
      class="va-blockquote"
      :style="{ borderColor: $themes.primary }"
      v-if="disabled && disabledReason && disabledReason.length"
    >
      <p>
        {{ disabledReason }}
      </p>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: 'disable-toggle',
  props: { disabled: Boolean, disabledReason: String, userId: String },
  methods: {
    toggleFunction(value) {
      console.log(this.userId, value);
      this.$emit('updateUser', {
        id: this.userId,
        disabled: value,
        disabledReason: '',
      });
    },
  },
};
</script>
