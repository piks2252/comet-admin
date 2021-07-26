<template>
  <div>
    <va-button outline color="success" small @click="editAuthor">
      Edit
    </va-button>
    <va-modal
      v-model="showModal"
      title="Update Author"
      :okText="$t('modal.confirm')"
      :cancelText="$t('modal.cancel')"
      @ok="updateAuthorFromLocal"
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
          v-model="newAuthor.name"
          label="Author Name"
          placeholder="Author name"
        />
        <va-input
          v-model="newAuthor.twitter"
          label="Twitter"
          placeholder="Author twitter handle"
        />
        <va-input
          v-model="newAuthor.instagram"
          label="Instagram"
          placeholder="Author instagram handle"
        />
        <va-input
          v-model="newAuthor.patreon"
          label="Patreon"
          placeholder="Author patreon page"
        />
        <va-input
          v-model="newAuthor.website"
          label="Website"
          placeholder="Author website"
        />
      </div>
    </va-modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { NEW_AUTHOR } from '../../constants/defaultValues';
import { updateAuthor } from '../../apollo/api/authors';
import { authorPicFilter } from '../../mixins/filters';

export default {
  name: 'author-actions',
  props: { author: Object },
  data() {
    return {
      newAuthor: NEW_AUTHOR,
      showModal: false,
    };
  },
  computed: {
    getPeoplePic() {
      if (
        typeof this.newAuthor.picture === 'object' &&
        this.newAuthor.picture !== null
      ) {
        return URL.createObjectURL(this.newAuthor.picture);
      }
      return authorPicFilter(this.author.picture);
    },
  },
  methods: {
    ...mapMutations(['setBackgroundLoading']),
    resetForm() {
      this.newAuthor = { ...this.author, picture: null };
    },
    editAuthor() {
      this.resetForm();
      this.showModal = true;
    },
    async uploadThumbnail({ target: { files = [] } }) {
      if (!files.length) {
        return;
      }
      this.newAuthor.picture = files[0];
    },
    async updateAuthorFromLocal() {
      this.setBackgroundLoading(true);
      try {
        const { updatePeople } = await updateAuthor(
          this.author.id,
          this.newAuthor,
        );

        this.$emit('updateAuthor', updatePeople.people);
        this.showToast('Author updated successfully', {
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

<style lang="scss">
.author-pic {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  border: 3px solid crimson;
  margin: auto;
  align-items: center;

  img {
    width: 98%;
    height: 98%;
    border-radius: 50%;
  }
}
</style>
