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

    <va-data-table
      :fields="fields"
      :data="filteredData"
      :per-page="parseInt(perPage)"
    >
      <template slot="cover" slot-scope="props">
        <img class="manga-row-thumb" :src="props.rowData.cover" />
      </template>
      <template slot="status" slot-scope="props">
        <va-select
          :options="statusOptions"
          :value="getSelectedOption(props.rowData.status)"
          clearable="false"
          @input="toggleMangaStatus(props.rowData.id)"
        />
      </template>
      <template slot="enabled" slot-scope="props">
        <va-toggle
          :value="props.rowData.enabled"
          small
          :color="props.rowData.enabled ? 'success' : 'danger'"
          @input="toggleEnableManga(props.rowData.id)"
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

const DUMMY_ROWS = [
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },

  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
  {
    id: 'adada',
    title: 'Naruto',
    cover: 'http://fmcdn.mfcdn.net/store/manga/27105/cover.jpg',
    enabled: true,
    status: 1,
  },
];

export default {
  components: {},
  data() {
    return {
      term: null,
      perPage: '20',
      perPageOptions: ['10', '20', '30', '40'],
      mangas: DUMMY_ROWS,
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
          name: '__slot:enabled',
          title: 'Enabled',
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
    statusOptions() {
      return [
        { id: 1, text: 'On going' },
        { id: 2, text: 'Completed' },
        { id: 3, text: 'Dropped' },
      ];
    },
  },
  methods: {
    search: debounce(function(term) {
      this.term = term;
    }, 400),
    getSelectedOption(status_id) {
      const val = this.statusOptions.find(e => e.id === status_id);
      return val;
    },
    toggleEnableManga(manga_id) {
      console.log('manga id ', manga_id);
    },
    toggleMangaStatus(manga_id) {
      console.log('manga id ', manga_id);
    },
    navigateToAddManga() {
      this.$router.push({ name: 'add-manga' });
    },
    navigateToEditManga(manga_id) {
      this.$router.push({ name: 'edit-manga', params: { id: manga_id } });
    },
    navigateToViewManga(manga_id) {
      this.$router.push({ name: 'view-manga', params: { id: manga_id } });
    },
    deleteManga(manga_id) {},
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
