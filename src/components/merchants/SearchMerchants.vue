<!-- jolt-dashboard/src/components/merchants/SearchMerchants.vue -->

<template>
  <b-container>
    <div class="mt-5">
      <b-row>
        <b-col sm="12" md="8">
          <b-input-group>
            <span class="rounded-pill"><b-img :src="require('../../assets/search.svg')" class="search-icon"></b-img></span>
            <b-form-input v-model="param" class="rounded-pill"/>
            <b-button pill class="ml-1" type="submit" @click=searchMerchants()>Search</b-button>
          </b-input-group>
        </b-col>
      </b-row>

      <div class="text-danger mt-4 mb-3" v-if="error">{{ error }}</div>
    </div>

    <div class="mt-5 text-left">
      <b-table :items="merchants" :fields="fields"></b-table>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'SearchMerchants',
  data () {
    return {
      fields: [
        {
          key: 'name',
          sortable: true,
          class: 'table-col'
        },
        {
          key: 'description',
          sortable: true,
          class: 'table-col'
        },
        {
          key: 'merchant_type',
          sortable: true,
          class: 'table-col'
        },
        {
          key: 'year_joined',
          sortable: true,
          class: 'table-col'
        },
        {
          key: 'address',
          sortable: true,
          class: 'table-col'
        },
        {
          key: 'postal_code',
          sortable: true,
          class: 'table-col'
        },
        {
          key: 'phone',
          sortable: true,
          class: 'table-col'
        },
        {
          key: 'users',
          sortable: true,
          class: 'table-col'
        }
      ],
      merchants: [],
      param: '',
      error: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/search_merchants')
        .then(response => { this.merchants = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    searchMerchants () {
      console.log(this.param)
      this.$http.secured.get('/api/v1/search_merchants?search=' + this.param)
        .then(response => { this.merchants = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  }
}
</script>
