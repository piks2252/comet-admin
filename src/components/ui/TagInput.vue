<template>
  <va-input-wrapper>
    <vue-tags-input
      v-model="tagText"
      :tags="tagsLocal"
      @tags-changed="newTags => (tagsLocal = newTags)"
      :placeholder="placeholder"
    />
    <div slot="append" class="flex-center" @click="clearTags">
      <va-icon name="fa fa-window-close" class="pointer" />
    </div>
  </va-input-wrapper>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
export default {
  name: 'tag-input',
  props: {
    tags: {
      type: Array,
    },
    placeholder: {
      type: String,
    },
  },
  model: {
    prop: 'tags',
    event: 'tagschange',
  },
  components: { VueTagsInput },
  computed: {
    tagsLocal: {
      get: function() {
        return this.tags;
      },
      set: function(value) {
        this.$emit(
          'tagschange',
          value.map(t => t.text)
        );
      },
    },
  },
  data() {
    return {
      tagText: '',
    };
  },
  methods: {
    clearTags() {
      this.$emit(
        'tagschange',
        [].map(t => t.text)
      );
    },
  },
};
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
</style>
