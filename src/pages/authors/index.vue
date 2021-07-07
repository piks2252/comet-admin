<template>
  <va-card>
    <div class="row align--center">
      <div class="flex xs12 md6">
        <add-author-modal />
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
        <img :src="props.rowData.picture | authorImage" class="genre-pic" />
      </template>
      <template slot="actions" slot-scope="props">
        <author-actions
          :author="props.rowData"
          @updateAuthor="updateAuthorArray"
        />
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import { debounce } from 'lodash';
import { fetchAuthors } from '../../apollo/api/authors';
import AuthorActions from './AuthorActions';
import AddAuthorModal from './AddAuthorModal';
import Loader from '../../components/Loader';

export default {
  components: {
    AuthorActions,
    AddAuthorModal,
    Loader,
  },
  data() {
    return {
      term: null,
      apiLoading: false,
      authors: [],
      showModal: false,
    };
  },
  filters: {
    authorImage(value) {
      if (!value) {
        return 'https://cdn.comet.shivy.co.in/images/authors/default.png';
      }
      return `https://cdn.comet.shivy.co.in/images/authors/${value}`;
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
          name: '__slot:actions',
          title: 'Action',
          width: '20%',
          dataClass: 'text-right',
        },
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.authors;
      }

      return this.authors.filter(item => {
        return item.name.toLowerCase().startsWith(this.term.toLowerCase());
      });
    },
  },
  async mounted() {
    await this.loadAuthors();
  },
  methods: {
    async loadAuthors() {
      this.apiLoading = true;
      try {
        const { peopleList } = await fetchAuthors();
        this.authors = peopleList;
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.apiLoading = false;
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
    search: debounce(function(term) {
      this.term = term;
    }, 400),
  },
};
</script>
