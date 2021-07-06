<template>
  <va-card style="overflow-x: auto;">
    <div class="row">
      <div class="flex xs12">
        <va-tabs v-model="tabValue" style="width: 100%; min-width: 250px;">
          <va-tab v-for="tab in tabs" :key="tab.title">
            {{ tab.title }}
          </va-tab>
        </va-tabs>
        <manga-details
          ref="mangaDetails"
          v-if="tabValue === 0"
          :mangaId="mangaId"
          :view="view"
        />
        <chapters
          ref="chapters"
          v-if="tabValue === 1"
          :mangaId="mangaId"
          :view="view"
        />
        <scrapers
          ref="scrapers"
          v-else-if="tabValue === 2"
          :mangaId="mangaId"
          :view="view"
        />
      </div>
    </div>
  </va-card>
</template>

<script>
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
      mangaId:
        this.$route.params.id && this.$route.params.id !== ''
          ? this.$route.params.id
          : null,
      view: this.$route.name === 'view-manga',
    };
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
