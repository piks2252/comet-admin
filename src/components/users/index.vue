<template>
  <va-card>
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
      <template slot="profile" slot-scope="props">
        <img
          :src="props.rowData.profilePic | profileImage"
          class="profile-pic"
        />
      </template>

      <template slot="subscription" slot-scope="props">
        <va-select
          :options="getUserSubscriptionLevel"
          :value="selectedSubscriptionLevel(props.rowData.subscribedLevel)"
          @input="subscribedLevelChange(event, data)"
        />
      </template>
      <template slot="verification" slot-scope="props">
        <va-badge :color="props.rowData.color">
          {{ props.rowData.verified ? 'Verified' : 'Unverified' }}
        </va-badge>
      </template>
      <template slot="status" slot-scope="props">
        <va-toggle
          :value="props.rowData.disabled"
          @input="disableToggle(props.rowData.id)"
          small
        />
        <blockquote
          class="va-blockquote"
          :style="{ borderColor: $themes.primary }"
          v-if="props.rowData.disabled"
        >
          <p>
            {{ props.rowData.disabledReason }}
          </p>
        </blockquote>
      </template>
      <template slot="createdAt" slot-scope="props">
        {{ new Date(props.rowData.createdAt) | moment('DD-MM-YYYY HH:mm:ss') }}
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import { debounce } from 'lodash';

export default {
  data() {
    return {
      term: null,
      perPage: '20',
      perPageOptions: ['20', '30', '40', '50'],
      showModal: false,
      users: [],
    };
  },
  filters: {
    profileImage: value => {
      if (!value) {
        return 'https://cdn.comet.shivy.co.in/images/profile/default.png';
      }
      return `https://cdn.comet.shivy.co.in/images/profile/${value}`;
    },
  },
  computed: {
    getUserSubscriptionLevel() {
      return [0, 1, 2].map(e => {
        return {
          id: e,
          text: `Level ${e}`,
        };
      });
    },
    fields() {
      return [
        {
          name: '__slot:profile',
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
          name: '__slot:subscription',
          title: 'Subscribed Level',
          width: '20%',
        },
        {
          name: '__slot:verification',
          title: 'Verification',
          width: '20%',
        },
        {
          name: '__slot:status',
          title: 'Status',
          width: '10%',
        },
        {
          name: '__slot:createdAt',
          title: 'Created At',
          width: '30%',
          dataClass: 'text-right',
        },
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.users;
      }

      return this.users.filter(item => {
        return item.name.toLowerCase().startsWith(this.term.toLowerCase());
      });
    },
  },
  mounted() {
    // Load users here
  },
  methods: {
    getTrendIcon(user) {
      if (user.trend === 'up') {
        return 'fa fa-caret-up';
      }

      if (user.trend === 'down') {
        return 'fa fa-caret-down';
      }

      return 'fa fa-minus';
    },
    getTrendColor(user) {
      if (user.trend === 'up') {
        return 'primary';
      }

      if (user.trend === 'down') {
        return 'danger';
      }

      return 'grey';
    },
    selectedSubscriptionLevel(id) {
      return this.getUserSubscriptionLevel.find(e => e.id === id);
    },
    disableToggle(userId) {
      const currentUser = this.users.find(user.id === userId);
      if (currentUser.disabled === true) {
        // ENable user
      } else {
        // Ask for reason
        // Disable user
      }
      // Toggle user with given user id
      alert(userId);
    },
    subscribedLevelChange(event, data) {
      console.log(event);
    },
    showUser(user) {
      alert(JSON.stringify(user));
    },
    search: debounce(function(term) {
      this.term = term;
    }, 400),
  },
};
</script>

<style lang="scss">
.profile-pic {
  width: 40px;
  height: 40px;
  border: 1px solid #efefef;
  border-radius: 24px;
}
</style>
