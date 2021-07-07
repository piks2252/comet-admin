<template>
  <va-card>
    <div class="row align--center">
      <div class="flex xs4">
        <va-button @click="navigateToAddManga()">Add Manga</va-button>
      </div>
    </div>
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

      <div class="flex xs12 md3 offset--md3">
        <va-select
          v-model="perPage"
          :label="$t('tables.perPage')"
          :options="perPageOptions"
          noClear
        />
      </div>
    </div>
    <loader v-if="apiLoading" />
    <va-data-table
      :fields="fields"
      :data="filteredData"
      :per-page="parseInt(perPage)"
      v-else
    >
      <template slot="cover" slot-scope="props">
        <img class="manga-row-thumb" :src="props.rowData.cover" />
      </template>
      <template slot="status" slot-scope="props">
        <manga-status
          :status="props.rowData.status"
          :mangaId="props.rowData.id"
          @updateManga="updateMangaArray"
        />
      </template>
      <template slot="disabled" slot-scope="props">
        <manga-disabled
          :disabled="props.rowData.disabled"
          :mangaId="props.rowData.id"
          @updateManga="updateMangaArray"
        />
      </template>
      <template slot="actions" slot-scope="props">
        <a @click="navigateToViewManga(props.rowData.id)">
          <va-icon name="fa fa-eye" :size="21" class="action-icon pointer" />
        </a>
        <a @click="navigateToEditManga(props.rowData.id)">
          <va-icon
            name="fa fa-pencil-square-o"
            :size="21"
            class="action-icon pointer"
          />
        </a>
        <a @click="deleteManga(props.rowData.id)">
          <va-icon
            name="fa fa-trash-o"
            :size="21"
            class="action-icon pointer"
          />
        </a>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import { debounce } from 'lodash';
import { fetchMangas } from '../../apollo/api/mangas';
import MangaDisabled from './MangaDisabled';
import MangaStatus from './MangaStatus';
import Loader from '../../components/Loader';

export default {
  components: {
    MangaDisabled,
    MangaStatus,
    Loader,
  },
  data() {
    return {
      term: null,
      apiLoading: false,
      perPage: '20',
      perPageOptions: ['10', '20', '30', '40'],
      mangas: [],
      showModal: false,
    };
  },
  computed: {
    fields() {
      return [
        {
          name: '__slot:cover',
          width: '40px',
          height: '40px',
          dataClass: 'text-center',
        },
        {
          name: 'title',
          title: 'Title',
        },
        {
          name: '__slot:status',
          title: 'Status',
          width: '10%',
        },
        {
          name: '__slot:disabled',
          title: 'Disabled',
          width: '10%',
        },
        {
          name: '__slot:actions',
          title: 'Actions',
          width: '15%',
        },
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.mangas;
      }
      return this.mangas.filter(item => {
        return item.title.toLowerCase().startsWith(this.term.toLowerCase());
      });
    },
  },
  async mounted() {
    await this.loadMangas();
  },
  methods: {
    search: debounce(function(term) {
      this.term = term;
    }, 400),
    async loadMangas() {
      this.apiLoading = true;
      try {
        const { mangasList } = await fetchMangas();
        this.mangas = mangasList;
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.apiLoading = false;
    },
    updateMangaArray(manga) {
      const newMangas = this.mangas.map(m => {
        if (m.id === manga.id) {
          return { ...m, ...manga };
        }
        return m;
      });
      this.mangas = newMangas;
    },
    navigateToAddManga() {
      this.$router.push({ name: 'add-manga' });
    },
    navigateToEditManga(mangaId) {
      this.$router.push({ name: 'edit-manga', params: { id: mangaId } });
    },
    navigateToViewManga(mangaId) {
      this.$router.push({ name: 'view-manga', params: { id: mangaId } });
    },
  },
};
</script>

<style lang="scss">
.manga-row-thumb {
  width: 40px;
  height: 40px;
  border: 1px solid gray;
  border-radius: 50%;
}

.action-icon {
  margin: 5px;
  color: 'black';
}
</style>
