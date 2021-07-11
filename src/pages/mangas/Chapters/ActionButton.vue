<template>
  <div class="grid__container flex-center chapter-actions">
    <va-icon name="fa fa-eye" :size="21" class="action-icon pointer" />
    <va-icon name="fa fa-edit" :size="21" class="action-icon pointer" />
    <va-icon name="fa fa-trash-o" :size="21" class="action-icon pointer" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.chapter-actions {
  border-left: 2px dashed #5b656c;
}

.chapter-actions > * {
  margin: 5px;
  padding: 2px;

  &:hover {
    border: 1px solid #6a7277;
    border-radius: 4px;
  }
}
</style>
