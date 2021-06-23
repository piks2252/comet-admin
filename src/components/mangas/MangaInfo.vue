<template>
  <div class="row">
    <div class="flex xs12">
      <loader v-if="apiLoading" />
      <va-card v-else>
        <form>
          <div class="row">
            <div class="flex md5 sm4 xs4">
              <img :src="manga.cover" class="manga-thumb" />
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
                :disabled="view"
              />
              <br />
              <p class="title">Artists</p>
              <tag-input
                v-model="manga.artists"
                placeholder="Artists"
                textKey="name"
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
                v-model="manga.disabled"
                :label="manga.disabled ? 'Enable manga' : 'Disable manga'"
                v-if="!view"
              />
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
              <p class="title">Select theme</p>
              <tag-input
                v-model="manga.themes"
                textKey="name"
                placeholder="Themes"
                :disabled="view"
              />
              <p class="title">Select genres</p>
              <tag-input
                v-model="manga.genres"
                textKey="name"
                placeholder="Genres"
                :disabled="view"
              />
              <p class="title">Select demographics</p>
              <tag-input
                v-model="manga.demographics"
                textKey="name"
                placeholder="Demographics"
                :disabled="view"
              />
            </div>
          </div>
        </form>
        <div class="row" v-if="manga_id">
          <h3>Here chapters will be displayed</h3>
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
import TagInput from '../ui/TagInput';
import { fetchManga } from '../../apollo/api/mangas';
import Loader from '../ui/Loader';

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
  name: 'manga-info',
  components: { TagInput, Loader },
  data() {
    return {
      apiLoading: false,
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
      view: this.$route.name === 'view-manga',
    };
  },
  async mounted() {
    if (this.manga_id) {
      await this.loadMangaDetails();
    }
  },
  methods: {
    async loadMangaDetails() {
      this.apiLoading = true;
      try {
        const { mangaInfo } = await fetchManga(this.manga_id);
        this.manga = { ...this.manga, ...mangaInfo };
      } catch (e) {}
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
