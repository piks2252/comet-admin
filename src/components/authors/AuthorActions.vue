<template>
  <div>
    <va-button outline color="success" small @click="editGenre">
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
        <img
          :src="newAuthor.picture | authorImage"
          @click="$refs[`${author.id}_thumb`].click()"
        />
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
import { updateAuthor } from '../../apollo/api/authors';

export default {
  name: 'author-actions',
  props: { author: Object },
  filters: {
    authorImage(value) {
      return 'https://scontent.famd4-1.fna.fbcdn.net/v/t1.6435-9/37778102_426542904533479_7450313514482139136_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=85a577&_nc_ohc=gs6t5aVBRpEAX-5Nt1-&_nc_ht=scontent.famd4-1.fna&oh=a5114e9dfa47adbae7fe18ac94a98539&oe=60D715B2';
      if (!value) {
        return 'https://cdn.comet.shivy.co.in/images/authors/default.png';
      }
      return `https://cdn.comet.shivy.co.in/images/authors/${value}`;
    },
  },
  data() {
    return {
      newAuthor: {
        name: '',
        twitter: '',
        instagram: '',
        patreon: '',
        website: '',
        picture: null,
      },
      showModal: false,
    };
  },
  methods: {
    resetForm() {
      this.newAuthor = { ...this.author, picture: null };
    },
    editGenre() {
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
        console.log(e);
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
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
