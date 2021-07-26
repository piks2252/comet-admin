<template>
  <va-card>
    <div class="row align--center">
      <div class="flex xs12 md6">
        <va-input
          :value="term"
          :placeholder="$t('tables.searchByName')"
          @keydown="searchUser"
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
      :data="users"
      :per-page="pagination.limit"
      :total-pages="pagination.pages"
      :currentPage="pagination.currentPage"
      :api-mode="true"
      @page-selected="loadUsers"
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
    </data-table>
  </va-card>
</template>

<script>
import { fetchUsers } from '../../apollo/api/users';
import { mapGetters, mapMutations } from 'vuex';
import { USERS_TABLE_FIELD } from '../../constants/tableFields';
import DataTable from '../../components/DataTable';
import DisableToggle from './DisableToggle';
import SubscriptionLevel from './SubscriptionLevel';
import Loader from '../../components/Loader';
import { profilePicFilter } from '../../mixins/filters';

export default {
  components: {
    DataTable,
    DisableToggle,
    SubscriptionLevel,
    Loader,
  },
  data() {
    return {
      term: '',
      perPage: '20',
      perPageOptions: ['20', '30', '40', '50'],
      showModal: false,
      users: [],
      pagination: {
        limit: 20,
        currentPage: 1,
        pages: 0,
        total: 0,
      },
    };
  },
  filters: {
    profilePicFilter,
  },
  computed: {
    fields() {
      return USERS_TABLE_FIELD;
    },
    ...mapGetters(['isLoading']),
  },
  watch: {
    perPage: function(newVal) {
      this.pagination.limit = parseInt(newVal);
      this.loadUsers();
    },
    term: function(newVal, oldVal) {
      if (oldVal.length > 0 && newVal.length === 0) {
        this.loadUsers();
      }
    },
  },
  async mounted() {
    await this.loadUsers(1);
  },
  methods: {
    ...mapMutations(['setLoading']),
    async loadUsers(page = 1) {
      this.setLoading(true);
      try {
        const { readersList } = await fetchUsers(
          this.term,
          this.pagination.limit,
          page,
        );
        this.users = readersList.readers;
        this.pagination = {
          ...this.pagination,
          currentPage: readersList.currentPage,
          pages: readersList.pages,
          total: readersList.total,
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
    async searchUser(e) {
      if (e.key === 'Enter') {
        await this.loadUsers();
      }
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
