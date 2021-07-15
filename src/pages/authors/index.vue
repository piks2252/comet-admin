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
    <loader v-if="apiLoading" />
    <data-table
      :fields="fields"
      :data="authors"
      :per-page="pagination.limit"
      :total-pages="pagination.pages"
      :currentPage="pagination.currentPage"
      :api-mode="true"
      :loading="apiLoading"
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
import { fetchAuthors } from '../../apollo/api/authors';
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
      apiLoading: false,
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
          name: '__slot:actions',
          title: 'Action',
          width: '20%',
          dataClass: 'text-right',
        },
      ];
    },
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
    async loadAuthors(page = 1) {
      this.apiLoading = true;
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
      this.apiLoading = false;
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
