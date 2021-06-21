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
    <va-modal
      v-model="showModal"
      size="small"
      title="Disable user"
      :okText="$t('modal.confirm')"
      :cancelText="$t('modal.cancel')"
      @ok="disableUser"
      @cancel="resetForm"
    >
      <va-input v-model="userDisableReason" removable />
    </va-modal>
  </div>
</template>

<script>
export default {
  name: 'disable-toggle',
  props: { disabled: Boolean, disabledReason: String, userId: String },
  data() {
    return {
      showModal: false,
      userDisableReason: '',
    };
  },
  methods: {
    resetForm() {
      this.showModal = false;
      this.userDisableReason = '';
    },
    disableUser() {
      console.log('Disabling user:', this.userId, this.userDisableReason);
      this.$emit('updateUser', {
        id: this.userId,
        disabled: true,
        disabledReason: this.userDisableReason,
      });
    },
    toggleFunction(value) {
      if (value) {
        this.resetForm();
        this.showModal = true;
      } else {
        // TODO: Enable user here
        // Send new user update to the parent component
        this.$emit('updateUser', {
          id: this.userId,
          disabled: value,
          disabledReason: this.userDisableReason,
        });
      }
    },
  },
};
</script>
