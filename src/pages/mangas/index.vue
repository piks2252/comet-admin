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
          v-model="term"
          :placeholder="$t('tables.searchByName')"
          @keydown="searchManga"
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
    <loader v-if="isLoading" />
    <data-table
      :fields="fields"
      :data="mangas"
      :per-page="pagination.limit"
      :total-pages="pagination.pages"
      :currentPage="pagination.currentPage"
      :api-mode="true"
      :loading="apiLoading"
      @page-selected="loadMangas"
      v-else
    >
      <template slot="cover" slot-scope="props">
        <img class="thumb-pic" :src="props.rowData.cover" />
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
    </data-table>
  </va-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { fetchMangas } from '../../apollo/api/mangas';
import DataTable from '../../components/DataTable';
import MangaDisabled from './MangaDisabled';
import MangaStatus from './MangaStatus';
import Loader from '../../components/Loader';

export default {
  components: {
    DataTable,
    MangaDisabled,
    MangaStatus,
    Loader,
  },
  data() {
    return {
      term: '',
      apiLoading: false,
      showModal: false,
      mangas: [],
      perPageOptions: ['10', '20', '30', '40'],
      perPage: '20',
      pagination: {
        limit: 20,
        currentPage: 1,
        pages: 0,
        total: 0,
      },
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
    ...mapGetters(['isLoading']),
  },
  watch: {
    perPage: function(newVal) {
      this.pagination.limit = parseInt(newVal);
      this.loadMangas();
    },
    term: function(newVal, oldVal) {
      if (oldVal.length > 0 && newVal.length === 0) {
        this.loadMangas();
      }
    },
  },
  async mounted() {
    await this.loadMangas(1);
  },
  methods: {
    ...mapMutations(['setLoading']),
    async loadMangas(page = 1) {
      if (this.isLoading) return;
      this.setLoading(true);

      try {
        const { mangasList } = await fetchMangas(
          this.term,
          this.pagination.limit,
          page,
        );
        this.mangas = mangasList.mangas;
        this.pagination = {
          ...this.pagination,
          currentPage: mangasList.currentPage,
          pages: mangasList.pages,
          total: mangasList.total,
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
    async searchManga(e) {
      if (e.key === 'Enter') {
        await this.loadMangas();
      }
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
.action-icon {
  margin: 5px;
  color: 'black';
}
</style>
