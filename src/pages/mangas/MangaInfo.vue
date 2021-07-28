<template>
  <va-card style="overflow-x: auto;">
    <div class="row">
      <div class="flex xs12">
        <va-tabs v-model="tabValue" style="width: 100%; min-width: 250px;">
          <va-tab v-for="tab in tabs" :key="tab.title">
            {{ tab.title }}
          </va-tab>
        </va-tabs>
        <manga-details ref="mangaDetails" v-if="tabValue === 0" />
        <chapters ref="chapters" v-if="tabValue === 1" />
        <scrapers ref="scrapers" v-else-if="tabValue === 2" />
      </div>
    </div>
  </va-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import MangaDetails from './MangaDetails';
import Chapters from './Chapters';
import Scrapers from './Scrapers';

export default {
  name: 'manga-info',
  components: { MangaDetails, Chapters, Scrapers },
  data() {
    return {
      tabs: [
        {
          title: 'Manga Info',
          component: MangaDetails,
        },
        {
          title: 'Chapters',
          component: Chapters,
        },
        {
          title: 'Scrapers',
          component: Scrapers,
        },
      ],
      tabValue: 0,
    };
  },
  computed: {
    ...mapGetters(['selectedMangaId', 'isMangaSaved', 'isChapterSaved']),
  },
  created() {
    const mode = this.$route.name === 'view-manga' ? 'view' : 'edit';
    this.setSelectedManga({ id: this.$route.params.id, mode });

    // Load default tab from localstorage
    if (localStorage.getItem(this.selectedMangaId) === null) {
      localStorage.setItem(this.selectedMangaId, this.tabValue);
    }
    this.tabValue = parseInt(localStorage.getItem(this.selectedMangaId));
  },
  watch: {
    tabValue(newVal) {
      localStorage.setItem(this.selectedMangaId, newVal);
    },
  },
  methods: {
    ...mapMutations(['setSelectedManga']),
  },
  beforeRouteLeave(to, from, next) {
    // Check if any of the ref is present
    if (!this.isMangaSaved || !this.isChapterSaved) {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!',
      );
      if (answer) {
        localStorage.removeItem(this.selectedMangaId);
        next();
      }
    } else {
      localStorage.removeItem(this.selectedMangaId);
      next();
    }
  },
};
</script>
