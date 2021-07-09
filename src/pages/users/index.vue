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
    <loader v-if="apiLoading" />
    <va-data-table
      :fields="fields"
      :data="filteredData"
      :per-page="parseInt(perPage)"
      v-else
    >
      <template slot="profile" slot-scope="props">
        <img
          :src="props.rowData.profilePic | profilePicFilter"
          class="profile-pic"
        />
      </template>

      <template slot="subscription" slot-scope="props">
        <subscription-level
          :level="props.rowData.subscribedLevel"
          :userId="props.rowData.id"
          @updateUser="updateUserArray"
        />
      </template>
      <template slot="verification" slot-scope="props">
        <va-badge :color="props.rowData.verified ? 'green' : 'red'">
          {{ props.rowData.verified ? 'Verified' : 'Unverified' }}
        </va-badge>
      </template>
      <template slot="status" slot-scope="props">
        <disable-toggle
          :disabled="props.rowData.disabled"
          :disabledReason="props.rowData.disabledReason"
          :userId="props.rowData.id"
          @updateUser="updateUserArray"
        />
      </template>
      <template slot="createdAt" slot-scope="props">
        {{ new Date(props.rowData.createdAt) | moment('DD-MM-YYYY HH:mm:ss') }}
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import { debounce } from 'lodash';
import { fetchUsers } from '../../apollo/api/users';
import DisableToggle from './DisableToggle';
import SubscriptionLevel from './SubscriptionLevel';
import Loader from '../../components/Loader';
import { profilePicFilter } from '../../mixins/filters';

export default {
  components: {
    DisableToggle,
    SubscriptionLevel,
    Loader,
  },
  data() {
    return {
      term: null,
      apiLoading: false,
      perPage: '20',
      perPageOptions: ['20', '30', '40', '50'],
      showModal: false,
      users: [],
    };
  },
  filters: {
    profilePicFilter,
  },
  computed: {
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
  async mounted() {
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      this.apiLoading = true;
      try {
        const { readersList } = await fetchUsers();
        this.users = readersList;
      } catch (e) {
        this.showToast(e, {
          position: 'top-right',
          duration: 1200,
          fullWidth: false,
        });
      }
      this.apiLoading = false;
    },
    updateUserArray(user) {
      const newUsers = this.users.map(u => {
        if (u.id === user.id) {
          return { ...u, ...user };
        }
        return u;
      });
      this.users = newUsers;
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
