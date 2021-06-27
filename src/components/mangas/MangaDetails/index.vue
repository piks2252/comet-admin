<template>
  <div class="row">
    <div class="flex xs12">
      <loader v-if="apiLoading" />
      <div v-else>
        <div class="row">
          <div class="flex md5 sm4 xs4">
            <img
              :src="getMangaCoverImage"
              class="manga-thumb"
              @click="$refs[`${mangaId}_cover`].click()"
            />
            <input
              type="file"
              :ref="`${mangaId}_cover`"
              style="display: none;"
              accept="image/*"
              @change="uploadCover"
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
              v-model="manga.alternativeTitles"
              placeholder="Alternative titles"
              :disabled="view"
            />
            <br />
            <p class="title">Authors</p>
            <tag-input
              v-model="manga.authors"
              textKey="name"
              placeholder="Authors"
              :ajaxFunction="getAuthorsArray"
              :disabled="view"
            />
            <br />
            <p class="title">Artists</p>
            <tag-input
              v-model="manga.artists"
              placeholder="Artists"
              textKey="name"
              :ajaxFunction="getArtistsArray"
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
            <p class="display-6">Other sources</p>
            <br />
            <va-input
              v-model="manga.otherSources.isbnCode"
              placeholder="ISBN code"
              :disabled="view"
            />
            <va-input
              v-model="manga.otherSources.anilistId"
              placeholder="Anilist ID"
              :disabled="view"
            />
            <va-input
              v-model="manga.otherSources.malId"
              placeholder="MAL ID"
              :disabled="view"
            />

            <br />
            <p class="title">Publishing date</p>
            <va-date-picker v-model="manga.releaseDate" :disabled="view" />
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
              v-model="manga.isAdult"
              :disabled="view"
            />
            <br />
            <p class="title">Select Format</p>
            <va-select
              :options="formatTypes"
              :value="manga.type.name"
              @input="updateMangaType"
            />
            <p class="title">Select theme</p>
            <tag-input
              v-model="manga.themes"
              textKey="name"
              placeholder="Themes"
              :ajaxFunction="getThemesArray"
              :disabled="view"
            />
            <p class="title">Select genres</p>
            <tag-input
              v-model="manga.genres"
              textKey="name"
              placeholder="Genres"
              :ajaxFunction="getGenresArray"
              :disabled="view"
            />
            <p class="title">Select demographics</p>
            <tag-input
              v-model="manga.demographics"
              textKey="name"
              placeholder="Demographics"
              :ajaxFunction="getDemographicsArray"
              :disabled="view"
            />
            <div class="manga-controls" v-if="!view">
              <va-toggle
                v-model="manga.disabled"
                :label="manga.disabled ? 'Enable manga' : 'Disable manga'"
                small
              />
              <va-button outline color="success" small @click="submitChanges()">
                Save Manga
              </va-button>
              <va-button outline color="danger" small @click="cancelEditing">
                Cancel
              </va-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { fetchManga, updateManga } from '../../../apollo/api/mangas';
import { fetchAuthors } from '../../../apollo/api/authors';
import { fetchGenres } from '../../../apollo/api/genres';
import ToggleSwitch from 'vuejs-toggle-switch';
import TagInput from '../../ui/TagInput';
import Loader from '../../ui/Loader';

const DEFAULT_MANGA = {
  title: '',
  alternativeTitles: [],
  status: 1,
  authors: [],
  artists: [],
  cover: null,
  description: '',
  hentai: false,
  isAdult: false,
  type: null,
  genres: [],
  demographics: [],
  themes: [],
  tags: [],
  releaseDate: new Date(),
  disabled: false,
  otherSources: {
    isbnCode: '',
    anilistId: '',
    malId: '',
  },
};

export default {
  name: 'manga-details',
  components: { TagInput, Loader, ToggleSwitch },
  props: {
    mangaId: {
      type: String,
    },
    view: {
      type: Boolean,
    },
  },
  data() {
    return {
      apiLoading: false,
      manga: DEFAULT_MANGA,
      loadedManga: DEFAULT_MANGA,
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
      mangaFormats: [],
      coverImage: null,
    };
  },
  computed: {
    formatTypes() {
      return this.mangaFormats.map(e => e.name);
    },
    getMangaCoverImage() {
      if (this.coverImage !== null) return URL.createObjectURL(this.coverImage);
      return this.manga.cover;
    },
  },
  async mounted() {
    await this.getFormatArray();
    if (this.mangaId) {
      await this.loadMangaDetails();
    }
  },
  methods: {
    async loadMangaDetails() {
      this.apiLoading = true;
      try {
        const { mangaInfo } = await fetchManga(this.mangaId);
        this.manga = { ...DEFAULT_MANGA, ...mangaInfo };
        this.loadedManga = { ...DEFAULT_MANGA, ...mangaInfo };
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.apiLoading = false;
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
    isSaved() {
      return _.isEqual(this.manga, this.loadedManga);
    },
    updateMangaType(formatName) {
      const selectedFormat = this.mangaFormats.find(e => e.name === formatName);
      if (selectedFormat) {
        this.manga.type = selectedFormat;
      } else {
        alert('Invalid format selected');
      }
    },
    uploadCover({ target: { files = [] } }) {
      if (!files.length) {
        return;
      }
      this.coverImage = files[0];
    },
    async getAuthorsArray(authorPattern = '') {
      const { peopleList } = await fetchAuthors(authorPattern, 1, 5);
      return peopleList.map(p => {
        return {
          id: p.id,
          text: p.name,
        };
      });
    },
    async getArtistsArray(artistPattern = '') {
      const { peopleList } = await fetchAuthors(artistPattern, 2, 5);
      return peopleList.map(p => {
        return {
          id: p.id,
          text: p.name,
        };
      });
    },
    async getFormatArray() {
      const { genresList } = await fetchGenres('', 'format', 10);
      this.mangaFormats = genresList.map(g => {
        return {
          id: g.id,
          name: g.name,
        };
      });
    },
    async getGenresArray(genrePattern = '') {
      const { genresList } = await fetchGenres(genrePattern, '', 5);
      return genresList.map(p => {
        return {
          id: p.id,
          text: p.name,
        };
      });
    },
    async getThemesArray(genrePattern = '') {
      const { genresList } = await fetchGenres(genrePattern, 'theme', 5);
      return genresList.map(p => {
        return {
          id: p.id,
          text: p.name,
        };
      });
    },
    async getDemographicsArray(genrePattern = '') {
      const { genresList } = await fetchGenres(genrePattern, 'demographics', 5);
      return genresList.map(p => {
        return {
          id: p.id,
          text: p.name,
        };
      });
    },
    processInput(mangaInfo) {
      const manga = { ...mangaInfo };
      manga.authors = mangaInfo.authors.map(e => e.id);
      manga.artists = mangaInfo.artists.map(e => e.id);
      manga.genres = mangaInfo.genres.map(e => e.id);
      manga.type = mangaInfo.type.id;
      manga.demographics = mangaInfo.demographics.map(e => e.id);
      manga.themes = mangaInfo.themes.map(e => e.id);
      return manga;
    },
    async submitChanges() {
      const updatedManga = this.processInput(this.manga);
      this.apiLoading = true;
      try {
        const { updateManga: response } = await updateManga(
          this.mangaId,
          updatedManga,
          this.coverImage,
        );
        this.loadedManga = { ...DEFAULT_MANGA, ...response.manga };
        this.manga = { ...DEFAULT_MANGA, ...response.manga };
        this.showToast('Manga updated successfully', {
          position: 'top-right',
          duration: 800,
          fullWidth: false,
        });
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.apiLoading = false;
    },
    cancelEditing() {
      if (!this.isSaved()) {
        const answer = window.confirm(
          'Do you really want to leave? you have unsaved changes!',
        );
        if (answer) {
          this.$router.push('/mangas/');
        }
      } else {
        this.$router.push('/mangas/');
      }
    },
  },
  beforeDestroy() {
    if (this.view === false && !this.isSaved()) {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!',
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    }
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

.manga-controls {
  border: 2px dashed #e8e5e5;
  border-radius: 25px;
  margin-bottom: 10px;
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
