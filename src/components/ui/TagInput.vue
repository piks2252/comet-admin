<template>
  <va-input-wrapper>
    <vue-tags-input
      v-model="tagText"
      :tags="tagsLocal"
      @tags-changed="newTags => (tagsLocal = newTags)"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <div slot="append" class="flex-center" @click="clearTags" v-if="!disabled">
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
    disabled: {
      type: Boolean,
    },
    textKey: {
      type: String,
      default: 'text',
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
        if (typeof this.tags[0] === 'string') {
          return this.tags;
        } else {
          return this.tags.map(t => {
            return {
              id: t.id,
              text: t[this.textKey],
            };
          });
        }
      },
      set: function(value) {
        let newTagsValue = value;
        if (typeof this.tags[0] !== 'string') {
          newTagsValue = value.map(t => {
            const row = { ...t };
            row[this.textKey] = t.text;
            return row;
          });
        }
        this.$emit('tagschange', newTagsValue);
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
      this.$emit('tagschange', []);
    },
  },
};
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
</style>
