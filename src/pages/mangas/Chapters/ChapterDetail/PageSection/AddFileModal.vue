<template>
  <div style="display: inline-block;">
    <va-button-group flat color="secondary">
      <va-button @click="showAddPagesModal = true"> Add new page(s)</va-button>
    </va-button-group>
    <va-modal
      v-model="showAddPagesModal"
      position="top"
      :title="$t('modal.top')"
      :message="$t('modal.message')"
      :okText="$t('modal.confirm')"
      :cancelText="$t('modal.cancel')"
    />
  </div>
</template>

<script>
export default {
  name: 'modals',
  data() {
    return {
      showAddPagesModal: false,
    };
  },
};
</script>
