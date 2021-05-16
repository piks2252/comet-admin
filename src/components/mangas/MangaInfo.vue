<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="manga_id ? manga.title : 'New Manga'">
          <form>
            <div class="row">
              <div class="flex xs12 button-container">
                <div class="flex mb3" v-if="!view">
                  <va-button color="danger" @click="resetForm">
                    Reset</va-button
                  >
                  <va-button color="success" @click="submitForm">
                    Add manga</va-button
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <div class="flex md5 sm4 xs4">
                <img
                  src="http://fmcdn.mfcdn.net/store/manga/24095/cover.jpg"
                  class="manga-thumb"
                />
                <va-file-upload
                  type="gallery"
                  file-types=".png, .jpg, .jpeg"
                  v-model="tempFiles"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <p class="display-5">Manga Info</p>
                <br />
                <va-input
                  v-model="manga.title"
                  placeholder="Title"
                  :disabled="view"
                />
                <br />
                <p class="title">Alternative titles</p>
                <tag-input
                  v-model="manga.alternative_titles"
                  placeholder="Alternative titles"
                  :disabled="view"
                />
                <br />
                <p class="title">Authors</p>
                <tag-input
                  v-model="manga.authors"
                  placeholder="Authors"
                  :disabled="view"
                />
                <br />
                <p class="title">Artists</p>
                <tag-input
                  v-model="manga.artists"
                  placeholder="Artists"
                  :disabled="view"
                />
                <br />
                <p class="title">Manga status</p>
                <toggle-switch
                  :options="toggleSwitchOptions"
                  @change="updateMangaState($event)"
                  :value="selectedMangaState()"
                  :disabled="view"
                />
                <br />
                <p class="title">Description</p>
                <textarea
                  class="manga-description"
                  v-model="manga.description"
                  :disabled="view"
                />
                <p class="title">Tags</p>
                <tag-input
                  v-model="manga.tags"
                  placeholder="Tags"
                  :disabled="view"
                />
              </div>
              <div class="flex md3 sm6 xs12">
                <va-toggle
                  v-model="manga.enabled"
                  :label="manga.enabled ? 'Disable manga' : 'Enable manga'"
                  v-if="!view"
                />
                <p class="display-6">Other sources</p>
                <br />
                <va-input
                  v-model="manga.other_sources.isbn_code"
                  placeholder="ISBN code"
                  :disabled="view"
                />
                <va-input
                  v-model="manga.other_sources.anilist_id"
                  placeholder="Anilist ID"
                  :disabled="view"
                />
                <va-input
                  v-model="manga.other_sources.mal_id"
                  placeholder="MAL ID"
                  :disabled="view"
                />
                <va-input
                  v-model="manga.other_sources.mangadex_id"
                  placeholder="Mangadex ID"
                  :disabled="view"
                />
                <br />
                <p class="title">Publishing date</p>
                <va-date-picker
                  v-model="manga.published_date"
                  :disabled="view"
                />
                <br />
                <p class="display-6">Genres and Demographics</p>
                <br />
                <p class="title">Hentai and adult</p>
                <va-checkbox
                  label="Hentai"
                  v-model="manga.hentai"
                  :disabled="view"
                />
                <va-checkbox
                  label="Adult"
                  v-model="manga.is_adult"
                  :disabled="view"
                />
                <br />
                <p class="title">Select theme</p>
                <tag-input
                  v-model="manga.themes"
                  placeholder="Themes"
                  :disabled="view"
                />
                <p class="title">Select genres</p>
                <tag-input
                  v-model="manga.genres"
                  placeholder="Genres"
                  :disabled="view"
                />
                <p class="title">Select demographics</p>
                <tag-input
                  v-model="manga.demographics"
                  placeholder="Demographics"
                  :disabled="view"
                />
              </div>
            </div>
          </form>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import TagInput from '../ui/TagInput';
import ToggleSwitch from 'vuejs-toggle-switch';

const DEFAULT_MANGA = {
  title: '',
  alternative_titles: [],
  cover: null,
  enabled: true,
  description: '',
  published_date: new Date().getUTCDate(),
  authors: [],
  artists: [],
  status: 1,
  hentai: false,
  is_adult: false,
  other_sources: {
    isbn_code: '',
    anilist_id: '',
    mal_id: '',
    mangadex_id: '',
  },
  genres: [],
  demographics: [],
  themes: [],
  tags: [],
};

export default {
  name: 'manga-info',
  components: { TagInput, ToggleSwitch },
  data() {
    return {
      manga_id:
        this.$route.params.id && this.$route.params.id != ''
          ? this.$route.params.id
          : null,
      manga: DEFAULT_MANGA,
      toggleSwitchOptions: {
        layout: {
          color: 'black',
          backgroundColor: this.$themes.secondary,
          selectedColor: 'white',
          borderColor: this.$themes.gray,
          squareCorners: false,
          noBorder: false,
          fontFamily: 'Arial',
          fontWeight: 'normal',
          fontWeightSelected: 'bold',
        },
        size: {
          fontSize: 1,
          height: 2,
          width: 20,
        },
        items: {
          preSelected: 'unknown',
          disabled: this.$route.name === 'view-manga',
          labels: [
            {
              name: 'On going',
              color: 'white',
              backgroundColor: this.$themes.success,
            },
            {
              name: 'Completed',
              color: 'white',
              backgroundColor: this.$themes.info,
            },
            {
              name: 'Dropped',
              color: 'white',
              backgroundColor: this.$themes.gray,
            },
          ],
        },
      },
      tempFiles: [],
      view: this.$route.name === 'view-manga',
      apiLoading: false,
    };
  },
  mounted() {
    if (this.manga_id) {
      console.log('Refreshing api here');
    }
  },
  methods: {
    resetForm() {
      this.manga = DEFAULT_MANGA;
    },
    async submitForm() {
      console.log(this.tempFiles);
      console.log('Submitting form');
    },
    updateMangaState(val) {
      switch (val.toLowerCase()) {
        case 'on going':
          this.manga.status = 1;
          break;
        case 'completed':
          this.manga.status = 2;
          break;
        case 'dropped':
          this.manga.status = 3;
          break;
      }
    },
    selectedMangaState() {
      switch (this.manga.status) {
        case 1:
          return 'On going';
        case 2:
          return 'Completed';
        case 3:
          return 'Dropped';
      }
    },
  },
};
</script>

<style lang="scss">
.button-container {
  text-align: right;
}

.manga-thumb {
  width: 100%;
  border: 1px solid #e8e5e5;
  border-radius: 10px;
  transition: 100ms;
}

.row.row-inside {
  max-width: none;
}

.manga-description {
  flex: 1;
  width: 100%;
  border: 1px solid gray;
  border-radius: 10px;
  height: 150px;
  max-height: 150px;
  padding: 2px;
}
</style>
