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
      @ok="disableUserFromModal"
      @cancel="resetForm"
    >
      <va-input v-model="userDisableReason" removable />
    </va-modal>
  </div>
</template>

<script>
import { disableUser, enableUser } from '../../apollo/api/users';
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
    async disableUserFromModal() {
      try {
        await disableUser(this.userId, this.userDisableReason);
        await this.$emit('updateUser', {
          id: this.userId,
          disabled: true,
          disabledReason: this.userDisableReason,
        });
        this.showToast('User disbaled', {
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
    async toggleFunction(value) {
      if (value) {
        this.resetForm();
        this.showModal = true;
      } else {
        try {
          await enableUser(this.userId);
          // Send new user update to the parent component
          this.$emit('updateUser', {
            id: this.userId,
            disabled: value,
            disabledReason: this.userDisableReason,
          });
          this.showToast('User enabled', {
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
      }
    },
  },
};
</script>
