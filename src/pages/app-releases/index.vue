<template>
  <div class="timelines">
    <div class="row">
      <div class="flex md4 xs12">
        <va-card no-padding-v title="App releases">
          <va-timeline vertical style="height: 550px; overflow-y: scroll;">
            <va-timeline-item
              active
              v-for="release in releases"
              :key="release.versionTag"
            >
              <span
                slot="before"
                class="title va-timeline-item__text"
                :style="{ color: $themes.primary }"
              >
                {{ release.date | moment('DD MMM, YYYY') }}
              </span>
              <va-card
                slot="after"
                stripe="success"
                class="mb-0"
                :title="release.versionTag"
              >
                <a :href="release.url" target="__blank">
                  {{ release.title }}
                </a>
              </va-card>
            </va-timeline-item>
          </va-timeline>
        </va-card>
      </div>
      <!-- <div class="flex md8 xs12">
        <va-card>
          <p class="display-2">Create new release</p>
          <br />
          <form>
            <div class="row">
              <div class="flex md4 sm6 xs12">
                <va-input v-model="simple" placeholder="Text Input" />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input v-model="withIcon" placeholder="Input With Icon">
                  <va-icon
                    slot="prepend"
                    color="gray"
                    name="fa fa-envelope-o"
                  />
                </va-input>
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input v-model="withButton" placeholder="Input With Button">
                  <va-button slot="append" style="margin-right: 0;" small>
                    UPLOAD
                  </va-button>
                </va-input>
              </div>
              <div class="flex md4 sm6 xs12">
                <fieldset>
                  <va-checkbox label="Post to reddit" />
                  <va-checkbox label="Update on discord channel" />
                  <va-checkbox label="Update on playstore" />
                </fieldset>
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  v-model="successfulEmail"
                  type="email"
                  label="Email (Validated with success)"
                  success
                >
                </va-input>
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  v-model="clearableText"
                  placeholder="Input With Clear Button"
                  removable
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  v-model="wrongEmail"
                  type="email"
                  label="Email (Validated)"
                  error
                  :error-messages="errorMessages"
                >
                </va-input>
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  v-model="withDescription"
                  placeholder="Text Input (with description)"
                  :messages="messages"
                />
              </div>
            </div>
          </form>
        </va-card>
      </div> -->
    </div>
  </div>
</template>

<script>
import { fetchReleases } from '../../apollo/api/releases';
export default {
  name: 'app-releases',
  data() {
    return {
      releases: [],
      newRelease: {},
      apiLoading: false,
    };
  },
  async mounted() {
    await this.loadReleases();
  },
  methods: {
    async loadReleases() {
      this.apiLoading = true;
      try {
        const { releasesList } = await fetchReleases();
        this.releases = releasesList;
        console.log(this.releases);
      } catch (e) {
        console.log(e);
      }
      this.apiLoading = false;
    },
  },
};
</script>
