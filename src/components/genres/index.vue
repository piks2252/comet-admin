<template>
  <va-card>
    <div class="row align--center">
      <div class="flex xs12 md6">
        <add-genre-modal />
      </div>
      <div class="flex xs12 md3 offset--md3">
        <va-input
          :value="term"
          :placeholder="$t('tables.searchByName')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
    </div>

    <loader v-if="apiLoading" />
    <va-data-table :fields="fields" :data="filteredData" :per-page="100" v-else>
      <template slot="thumbnail" slot-scope="props">
        <genre-thumbnail
          :genreId="props.rowData.id"
          :thumbnail="props.rowData.thumbnail"
        />
      </template>
      <template slot="genreGroup" slot-scope="props">
        <genre-group
          :genreGroup="props.rowData.groupType"
          :genreId="props.rowData.id"
          @updateGenre="updateGenreArray"
        />
      </template>
      <template slot="actions" slot-scope="props">
        <genre-actions
          :genreName="props.rowData.name"
          :genreId="props.rowData.id"
          @updateGenre="updateGenreArray"
        />
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import { debounce } from 'lodash';
import { fetchGenres } from '../../apollo/api/genres';
import GenreGroup from './GenreGroup';
import GenreThumbnail from './GenreThumbnail';
import GenreActions from './GenreActions';
import AddGenreModal from './AddGenreModal';
import Loader from '../ui/Loader';

export default {
  components: {
    GenreGroup,
    GenreThumbnail,
    GenreActions,
    AddGenreModal,
    Loader,
  },
  data() {
    return {
      apiLoading: false,
      term: null,
      genres: [],
    };
  },
  computed: {
    fields() {
      return [
        {
          name: '__slot:thumbnail',
          width: '30px',
          height: '45px',
          dataClass: 'text-center',
        },
        {
          name: 'name',
          title: this.$t('tables.headings.name'),
          width: '30%',
        },
        {
          name: '__slot:genreGroup',
          title: 'Group',
          width: '20%',
        },
        {
          name: '__slot:actions',
          title: 'Action',
          width: '20%',
          dataClass: 'text-right',
        },
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.genres;
      }

      return this.genres.filter(item => {
        return item.name.toLowerCase().startsWith(this.term.toLowerCase());
      });
    },
  },
  async mounted() {
    await this.loadGenres();
  },
  methods: {
    async loadGenres() {
      this.apiLoading = true;
      try {
        const { genresList } = await fetchGenres();
        this.genres = genresList;
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.apiLoading = false;
    },
    updateGenreArray(genre) {
      const newGenres = this.genres.map(g => {
        if (g.id === genre.id) {
          return { ...g, ...genre };
        }
        return g;
      });
      this.genres = newGenres;
    },
    search: debounce(function(term) {
      this.term = term;
    }, 400),
  },
};
</script>

<style lang="scss">
.genre-pic {
  width: 40px;
  height: 40px;
  border: 1px solid #efefef;
  border-radius: 24px;
}
</style>
