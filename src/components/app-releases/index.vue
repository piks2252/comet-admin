<template>
  <div class="timelines">
    <div class="row">
      <div class="flex md4 xs12">
        <va-card no-padding-v title="App releases">
          <va-timeline vertical style="height: 550px; overflow-y: scroll;">
            <va-timeline-item active>
              <span
                slot="before"
                class="title va-timeline-item__text"
                :style="{ color: $themes.primary }"
              >
                Feb 2018
              </span>
              <va-card slot="after" stripe="success" class="mb-0">
                <template slot="title">{{ titleFirst }}</template>
                {{ contentFirst }}
              </va-card>
            </va-timeline-item>
            <va-timeline-item active>
              <span
                slot="before"
                class="title va-timeline-item__text"
                :style="{ color: $themes.primary }"
              >
                Apr 2018
              </span>
              <va-card slot="after" stripe="success" class="mb-0">
                <template slot="title">{{ titleSecond }}</template>
                {{ contentFirst }}
              </va-card>
            </va-timeline-item>
            <va-timeline-item>
              <span
                class="title title--gray va-timeline-item__text"
                slot="before"
              >
                Jun 2018
              </span>
              <va-card slot="after" stripe="success">
                <template slot="title">{{ titleSecond }}</template>
                {{ contentFirst }}
              </va-card>
            </va-timeline-item>
          </va-timeline>
        </va-card>
      </div>
      <div class="flex md8 xs12">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timelines',
  data() {
    return {
      dateFirst: '',
      titleFirst: 'Make design',
      titleSecond: 'Develop an app',
      titleThird: 'Submit an app',
      horizontalSimpleContentFirst: 'Pre-sail rate: 50%',
      dateSecond: 'May 22 10:00',
      horizontalSimpleContentSecond: 'Pre-sail rate: 40%',
      dateThird: 'July 19 17:45',
      horizontalSimpleContentThird: 'Pre-sail rate: 20%',
      contentFirst:
        'The unique stripes of zebras make them one of the animals most familiar to people.',
      contentSecond:
        'They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands.',
      contentThird:
        'However, various anthropogenic factors have had a severe impact on zebra populations',
    };
  },
};
</script>
