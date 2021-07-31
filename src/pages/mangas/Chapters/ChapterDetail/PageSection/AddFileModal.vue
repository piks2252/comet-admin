<template>
  <div style="display: inline-block;">
    <va-button-group flat color="secondary">
      <va-button small @click="showAddPagesModal = true">
        Add zip file</va-button
        >
      <va-button small @click="showAddZipModal = true"> Add pages</va-button>
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
      showAddZipModal: false,
    };
  },
};
</script>
