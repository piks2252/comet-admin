<template>
  <div>
    <va-button @click="showModal = true">Add Author</va-button>
    <va-modal
      v-model="showModal"
      title="Create Author"
      :okText="$t('modal.confirm')"
      :cancelText="$t('modal.cancel')"
      @ok="submitNewAuthor"
      @cancel="resetForm"
    >
      <div class="author-pic">
        <img :src="getPeoplePic" @click="$refs[`${author.id}_thumb`].click()" />
        <input
          :ref="`${author.id}_thumb`"
          type="file"
          style="display: none;"
          v-on:change="uploadThumbnail"
        />
      </div>
      <div>
        <va-input
          v-model="author.name"
          label="Author Name"
          placeholder="Author name"
        />
        <va-input
          v-model="author.twitter"
          label="Twitter"
          placeholder="Author twitter handle"
        />
        <va-input
          v-model="author.instagram"
          label="Instagram"
          placeholder="Author instagram handle"
        />
        <va-input
          v-model="author.patreon"
          label="Patreon"
          placeholder="Author patreon page"
        />
        <va-input
          v-model="author.website"
          label="Website"
          placeholder="Author website"
        />
      </div>
    </va-modal>
  </div>
</template>

<script>
import { NEW_AUTHOR } from '../../constants/defaultValues';
import { createAuthor } from '../../apollo/api/authors';
import { authorPicFilter } from '../../mixins/filters';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'add-author-modal',
  data() {
    return {
      author: NEW_AUTHOR,
      showModal: false,
    };
  },
  computed: {
    getPeoplePic() {
      if (
        typeof this.author.picture === 'object' &&
        this.author.picture !== null
      ) {
        return URL.createObjectURL(this.author.picture);
      }
      return authorPicFilter(this.author.picture);
    },
  },
  methods: {
    ...mapMutations(['setBackgroundLoading']),
    resetForm() {
      this.author = NEW_AUTHOR;
    },
    async uploadThumbnail({ target: { files = [] } }) {
      if (!files.length) {
        return;
      }
      this.author.picture = files[0];
    },
    async submitNewAuthor() {
      this.setBackgroundLoading(true);
      try {
        const { createPeople } = await createAuthor(this.author);

        this.$emit('updateAuthor', createPeople.people);
        this.showToast('Author added successfully', {
          position: 'top-right',
          duration: 800,
          fullWidth: false,
        });
        this.resetForm();
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.setBackgroundLoading(false);
    },
  },
};
</script>
