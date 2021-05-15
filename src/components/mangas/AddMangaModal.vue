<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card title="New Manga">
          <form>
            <div class="row">
              <div class="flex md5 sm4 xs4">
                <img
                  src="http://fmcdn.mfcdn.net/store/manga/24095/cover.jpg"
                  class="manga-thumb"
                  @click="echoSystem()"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <p class="display-5">Manga Info</p>
                <br />
                <va-input v-model="manga.title" placeholder="Title" />
                <br />
                <p class="title">Alternative titles</p>
                <tag-input
                  v-model="manga.alternativeTitles"
                  placeholder="Alternative titles"
                />
                <br />
                <p class="title">Authors</p>
                <tag-input v-model="manga.authors" placeholder="Authors" />
                <br />
                <p class="title">Artists</p>
                <tag-input v-model="manga.artists" placeholder="Artists" />
                <br />
                <p class="title">Manga status</p>
                <toggle-switch
                  :options="toggleSwitchOptions"
                  @change="updateMangaState($event)"
                  @selected="selectedMangaState()"
                  :value="toggleSwitchOptions.items"
                />
              </div>
              <div class="flex md3 sm6 xs12">
                <p class="display-6">Other sources</p>
                <br />
                <va-input v-model="manga.anilistID" placeholder="Anilist ID" />
                <va-input v-model="manga.anilistID" placeholder="MAL ID" />
                <va-input v-model="manga.anilistID" placeholder="MangaDex ID" />
              </div>
              <div class="flex md4 sm6 xs12"></div>
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

      <div class="flex xs12">
        <va-card :title="$t('forms.dateTimePicker.title')">
          <form>
            <div class="row overflow--hidden">
              <div class="flex md8">
                <div class="row row-inside">
                  <div class="flex xs12 sm6">
                    <va-date-picker
                      :label="$t('forms.dateTimePicker.basic')"
                      v-model="datepicker.simple"
                    />
                  </div>
                  <div class="flex xs12 sm6">
                    <va-date-picker
                      :label="$t('forms.dateTimePicker.time')"
                      :config="{ enableTime: true }"
                      v-model="datepicker.time"
                    />
                  </div>
                  <div class="flex xs12 sm6">
                    <va-date-picker
                      :label="$t('forms.dateTimePicker.customFirstDay')"
                      :config="{ locale: { firstDayOfWeek: 1 } }"
                      v-model="datepicker.customFirstDay"
                      weekDays
                    />
                  </div>
                  <div class="flex xs12 sm6">
                    <va-date-picker
                      :label="$t('forms.dateTimePicker.disabled')"
                      disabled
                      v-model="datepicker.disabled"
                    />
                  </div>
                  <div class="flex xs12 sm6">
                    <va-date-picker
                      :label="$t('forms.dateTimePicker.multiple')"
                      :config="{ mode: 'multiple' }"
                      v-model="datepicker.multiple"
                    />
                  </div>
                  <div class="flex xs12 sm6">
                    <va-date-picker
                      :label="$t('forms.dateTimePicker.customDateFormat')"
                      :config="{ dateFormat: 'Y-M-d' }"
                      v-model="datepicker.customDate"
                    />
                  </div>
                </div>
              </div>

              <div class="flex xs12 md4">
                <va-date-picker
                  :label="$t('forms.dateTimePicker.range')"
                  :config="{ mode: 'range', inline: true }"
                  v-model="datepicker.range"
                />
              </div>
            </div>
          </form>
        </va-card>
      </div>

      <div class="flex xs12">
        <va-card :title="$t('forms.selects.title')">
          <form>
            <div class="row">
              <div class="flex md6 xs12">
                <va-select
                  :label="$t('forms.selects.simple')"
                  v-model="simpleSelectModel"
                  textBy="description"
                  :options="simpleOptions"
                />
              </div>
              <div class="flex md6 xs12">
                <va-select
                  :label="$t('forms.selects.multi')"
                  v-model="multiSelectModel"
                  textBy="description"
                  multiple
                  :options="simpleOptions"
                />
              </div>
              <div class="flex md6 xs12">
                <va-select
                  :label="$t('forms.selects.country')"
                  v-model="chosenCountry"
                  :options="countriesList"
                />
              </div>
              <div class="flex md6 xs12">
                <va-select
                  :label="$t('forms.selects.countryMulti')"
                  v-model="multiSelectCountriesModel"
                  multiple
                  :options="countriesList"
                />
              </div>
              <div class="flex md6 xs12">
                <va-select
                  :label="$t('forms.selects.searchable')"
                  v-model="searchableSelectModel"
                  searchable
                  textBy="description"
                  :options="simpleOptions"
                />
              </div>
              <div class="flex md6 xs12">
                <va-select
                  :label="$t('forms.selects.searchableMulti')"
                  v-model="multiSearchableSelectModel"
                  textBy="description"
                  searchable
                  multiple
                  :options="countriesList"
                />
              </div>
            </div>
          </form>
        </va-card>
      </div>

      <div class="flex xs12">
        <va-card :title="$t('forms.controls.title')">
          <form>
            <div class="row">
              <div class="flex md3">
                <fieldset>
                  <va-checkbox
                    :label="$t('forms.controls.unselected')"
                    v-model="checkbox.unselected"
                  />
                  <va-checkbox
                    :label="$t('forms.controls.selected')"
                    v-model="checkbox.selected"
                  />
                  <va-checkbox
                    :label="$t('forms.controls.readonly')"
                    v-model="checkbox.readonly"
                    :readonly="true"
                  />
                  <va-checkbox
                    :label="$t('forms.controls.disabled')"
                    :disabled="true"
                    v-model="checkbox.disabled"
                  />
                  <va-checkbox
                    :label="$t('forms.controls.error')"
                    error
                    v-model="checkbox.error"
                  />
                  <va-checkbox
                    :label="$t('forms.controls.errorMessage')"
                    :error-messages="errorMessages"
                    :errorCount="2"
                    v-model="checkbox.errorMessages"
                  />
                </fieldset>
              </div>
              <div class="flex md3">
                <fieldset>
                  <va-radio-button
                    option="option1"
                    v-model="radioSelectedOption"
                    label="Radio"
                  />
                  <va-radio-button
                    option="option2"
                    v-model="radioSelectedOption"
                    label="Radio"
                  />
                </fieldset>
                <fieldset>
                  <va-radio-button
                    option="option1"
                    disabled
                    v-model="radioSelectedDisableOption"
                    label="Disabled Radio"
                  />
                  <va-radio-button
                    option="option2"
                    disabled
                    v-model="radioSelectedDisableOption"
                    label="Disabled Radio"
                  />
                </fieldset>
              </div>
              <div class="flex mb3">
                <fieldset>
                  <va-toggle
                    v-model="toggles.selected"
                    label="Selected toggle"
                  />
                  <va-toggle
                    v-model="toggles.unselected"
                    label="Unselected toggle"
                  />
                  <va-toggle
                    v-model="toggles.disabled"
                    disable
                    label="Disabled toggle"
                  />
                  <va-toggle
                    v-model="toggles.disabled"
                    small
                    label="Small toggle"
                  />
                  <va-toggle
                    v-model="toggles.disabled"
                    large
                    label="Large toggle"
                  />
                </fieldset>
              </div>
            </div>
          </form>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import TagInput from '../ui/TagInput';
import ToggleSwitch from 'vuejs-toggle-switch';

export default {
  name: 'add-manga-modal',
  props: ['showModal'],
  components: { TagInput, ToggleSwitch },
  data() {
    return {
      manga: {
        title: '',
        alternativeTitles: [],
        coverImage: null,
        description: '',
        artist: [],
        authors: [],
        status: 1,
        genres: [],
        demographics: [],
        themes: [],
        lastChapter: null,
        hentai: 0,
        isAdult: 0,
        otherLinks: [],
      },
      toggleSwitchOptions: {
        layout: {
          color: 'black',
          backgroundColor: this.$themes.secondary,
          selectedColor: 'white',
          borderColor: this.$themes.gray,
          squareCorners: false,
          noBorder: false,
          fontFamily: 'Arial',
          fontWeight: 'normal',
          fontWeightSelected: 'bold',
        },
        size: {
          fontSize: 1,
          height: 2,
          width: 18.5,
        },
        items: {
          preSelected: 'unknown',
          disabled: false,
          labels: [
            {
              name: 'On going',
              color: 'white',
              backgroundColor: this.$themes.success,
            },
            {
              name: 'Completed',
              color: 'white',
              backgroundColor: this.$themes.info,
            },
            {
              name: 'Dropped',
              color: 'white',
              backgroundColor: this.$themes.gray,
            },
          ],
        },
      },
      apiLoading: false,
      isMale: true,
      countriesList: [],
      chosenCountry: '',
      simple: '',
      withIcon: '',
      withButton: '',
      withDescription: '',
      clearableText: 'Vasili Savitski',
      successfulEmail: 'andrei@dreamsupport.io',
      wrongEmail: 'andrei@dreamsupport',
      messages: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua.',
      ],
      errorMessages: ['Field should contain a valid email'],
      simpleOptions: [
        {
          id: 1,
          description: 'First option',
        },
        {
          id: 2,
          description: 'Second option',
        },
        {
          id: 3,
          description: 'Third option',
        },
      ],
      simpleSelectModel: '',
      multiSelectModel: [],
      multiSelectCountriesModel: [],
      searchableSelectModel: '',
      multiSearchableSelectModel: [],
      radioSelectedOption: 'option1',
      radioSelectedDisableOption: 'option1',
      checkbox: {
        unselected: false,
        selected: true,
        readonly: true,
        disabled: true,
        error: false,
        errorMessages: true,
      },
      toggles: {
        unselected: false,
        selected: true,
        disabled: true,
        small: false,
        large: false,
      },
      datepicker: {
        simple: '2018-05-09',
        time: '2018-05-08 14:10',
        range: '2018-05-08 to 2018-05-23',
        disabled: '2018-05-09',
        multiple: '2018-04-25, 2018-04-27',
        customFirstDay: '2018-05-09',
        customDate: '2017-Dec-06',
      },
    };
  },
  methods: {
    echoSystem() {
      alert(JSON.stringify(this.manga));
    },
    updateMangaState(val) {
      switch (val.toLowercase()) {
        case 'on going':
          this.manga.status = 1;
          break;
        case 'completed':
          this.manga.status = 2;
          break;
        case 'dropped':
          this.manga.status = 3;
          break;
      }
    },
    selectedMangaState() {
      switch (this.manga.status) {
        case 1:
          return 'On going';
        case 2:
          return 'Completed';
        case 3:
          return 'Dropped';
      }
    },
  },
};
</script>

<style lang="scss">
.manga-thumb {
  width: 100%;
  border: 1px solid #e8e5e5;
  border-radius: 10px;
}

.row.row-inside {
  max-width: none;
}
</style>
