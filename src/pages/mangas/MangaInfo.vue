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
  created() {
    const mode = this.$route.name === 'view-manga' ? 'view' : 'edit';
    this.setSelectedManga({ id: this.$route.params.id, mode });
  },
  methods: {
    ...mapMutations(['setSelectedManga']),
  },
  computed: {
    ...mapGetters(['isMangaSaved', 'isChapterSaved']),
  },
  beforeRouteLeave(to, from, next) {
    // Check if any of the ref is present
    let unsavedChanges = false;
    switch (this.tabValue) {
      case 0:
        unsavedChanges = !this.$refs.mangaDetails.isSaved();
        break;
      case 1:
        unsavedChanges = !this.$refs.chapters.isSaved();
        break;
      case 2:
        unsavedChanges = !this.$refs.scrapers.isSaved();
        break;
    }
    if (unsavedChanges && this.view === false) {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!',
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
};
</script>
