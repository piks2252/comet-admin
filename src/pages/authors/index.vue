<template>
  <va-card>
    <div class="row align--center">
      <div class="flex xs12 md6">
        <add-author-modal />
      </div>
      <div class="flex xs12 md3 offset--md3">
        <va-input
          v-model="term"
          :placeholder="$t('tables.searchByName')"
          @keydown="searchAuthor"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
    </div>
    <loader v-if="isLoading" />
    <data-table
      :fields="fields"
      :data="authors"
      :per-page="pagination.limit"
      :total-pages="pagination.pages"
      :currentPage="pagination.currentPage"
      :api-mode="true"
      @page-selected="loadAuthors"
      v-else
    >
      <template slot="thumbnail" slot-scope="props">
        <img :src="props.rowData.picture | authorPicFilter" class="thumb-pic" />
      </template>
      <template slot="actions" slot-scope="props">
        <author-actions
          :author="props.rowData"
          @updateAuthor="updateAuthorArray"
        />
      </template>
    </data-table>
  </va-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { fetchAuthors } from '../../apollo/api/authors';
import { AUTHORS_TABLE_FIELD } from '../../constants/tableFields';
import DataTable from '../../components/DataTable';
import AuthorActions from './AuthorActions';
import AddAuthorModal from './AddAuthorModal';
import Loader from '../../components/Loader';
import { authorPicFilter } from '../../mixins/filters';

export default {
  components: {
    DataTable,
    AuthorActions,
    AddAuthorModal,
    Loader,
  },
  data() {
    return {
      showModal: false,
      term: '',
      authors: [],
      pagination: {
        limit: 50,
        total: 0,
        currentPage: 1,
        pages: 0,
      },
    };
  },
  filters: {
    authorPicFilter,
  },
  computed: {
    fields() {
      return AUTHORS_TABLE_FIELD;
    },
    ...mapGetters(['isLoading']),
  },
  watch: {
    term: function(newVal, oldVal) {
      if (oldVal.length > 0 && newVal.length === 0) {
        this.loadAuthors();
      }
    },
  },
  async mounted() {
    await this.loadAuthors(1);
  },
  methods: {
    ...mapMutations(['setLoading']),
    async loadAuthors(page = 1) {
      this.setLoading(true);
      try {
        const { peopleList } = await fetchAuthors(
          this.term,
          this.pagination.limit,
          page,
        );
        this.authors = peopleList.people;
        this.pagination = {
          ...this.pagination,
          currentPage: peopleList.currentPage,
          pages: peopleList.pages,
          total: peopleList.total,
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
    async searchAuthor(e) {
      if (e.key === 'Enter') {
        await this.loadAuthors();
      }
    },
    updateAuthorArray(author) {
      const newAuthors = this.authors.map(g => {
        if (g.id === author.id) {
          return { ...g, ...author };
        }
        return g;
      });
      this.authors = newAuthors;
    },
  },
};
</script>
