<template>
  <va-card>
    <div class="row align--center">
      <div class="flex xs12 md6">
        <add-genre-modal />
      </div>
      <div class="flex xs12 md3 offset--md3">
        <va-input
          v-model="term"
          :placeholder="$t('tables.searchByName')"
          @keydown="searchGenre"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
    </div>

    <loader v-if="isLoading" />
    <data-table
      :fields="fields"
      :data="genres"
      :per-page="pagination.limit"
      :total-pages="pagination.pages"
      :currentPage="pagination.currentPage"
      :api-mode="true"
      @page-selected="loadGenres"
      v-else
    >
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
    </data-table>
  </va-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { fetchGenres } from '../../apollo/api/genres';
import { GENRES_TABLE_FIELD } from '../../constants/tableFields';
import DataTable from '../../components/DataTable';
import GenreGroup from './GenreGroup';
import GenreThumbnail from './GenreThumbnail';
import GenreActions from './GenreActions';
import AddGenreModal from './AddGenreModal';
import Loader from '../../components/Loader';

export default {
  components: {
    DataTable,
    GenreGroup,
    GenreThumbnail,
    GenreActions,
    AddGenreModal,
    Loader,
  },
  data() {
    return {
      term: '',
      genres: [],
      pagination: {
        limit: 50,
        currentPage: 1,
        pages: 0,
        total: 0,
      },
    };
  },
  computed: {
    fields() {
      return GENRES_TABLE_FIELD;
    },
    ...mapGetters(['isLoading']),
  },
  watch: {
    term: function(newVal, oldVal) {
      if (oldVal.length > 0 && newVal.length === 0) {
        this.loadGenres();
      }
    },
  },
  async mounted() {
    await this.loadGenres(1);
  },
  methods: {
    ...mapMutations(['setLoading']),
    async loadGenres(page = 1) {
      this.setLoading(true);
      try {
        const { genresList } = await fetchGenres(
          this.term,
          '',
          this.pagination.limit,
          page,
        );
        this.genres = genresList.genres;
        this.pagination = {
          ...this.pagination,
          currentPage: genresList.currentPage,
          pages: genresList.pages,
          total: genresList.total,
        };
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.setLoading(false);
    },
    async searchGenre(e) {
      if (e.key === 'Enter') {
        await this.loadGenres();
      }
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
  },
};
</script>
