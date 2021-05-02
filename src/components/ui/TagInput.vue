<template>
  <vue-tags-input
    v-model="tagText"
    :tags="tagsLocal"
    @tags-changed="newTags => (tagsLocal = newTags)"
  />
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
export default {
  name: 'tag-input',
  props: {
    tags: {
      type: Array,
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
};
</script>
