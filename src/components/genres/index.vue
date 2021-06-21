<template>
  <va-card>
    <div class="row align--center">
      <div class="flex xs12 md6">
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

    <va-data-table :fields="fields" :data="filteredData" :per-page="100">
      <template slot="thumbnail" slot-scope="props">
        <img :src="props.rowData.thumbnail | genreImage" class="genre-pic" />
      </template>
      <template slot="genreGroup" slot-scope="props">
        <genre-group
          :genreGroup="props.rowData.groupType"
          :genreId="props.rowData.id"
          @updateGenre="updateGenreArray"
        />
      </template>
      <template slot="genreGroup" slot-scope="props">
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
import GenreActions from './GenreActions';

export default {
  components: {
    GenreGroup,
    GenreActions,
  },
  data() {
    return {
      term: null,
      genres: [],
    };
  },
  filters: {
    genreImage: value => {
      if (!value) {
        return 'https://cdn.comet.shivy.co.in/images/genres/default.png';
      }
      return `https://cdn.comet.shivy.co.in/images/genres/${value}`;
    },
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
    },
    updateGenreArray(genre) {
      const newGenres = this.genres.map(g => {
        if (g.id === genre.id) {
          console.log(genre);
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
