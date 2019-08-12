<!-- jolt-dashboard/src/components/merchants/SearchMerchants.vue -->

<template>
  <b-container>
    <div class="mt-5">
      <b-row>
        <b-col cols="6">
          <b-input-group>
            <b-input-group-prepend>
              <b-img :src="require('../../assets/search.svg')" class="search-icon"></b-img>
            </b-input-group-prepend>
            <b-form-input class="rounded-pill" placeholder=""></b-form-input>
            <!-- <b-button class="" type="submit"
            @click=seachMerchants(`param`)>Search</b-button> -->
          </b-input-group>
        </b-col>
      </b-row>
    </div>

    <div class="mt-5">
      <b-table :merchants="merchants" :fields="fields"></b-table>
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
          sortable: true
        },
        {
          key: 'description',
          sortable: true
        },
        {
          key: 'merchant_type',
          sortable: true
        },
        {
          key: 'year_joined',
          sortable: true
        },
        {
          key: 'address',
          sortable: true
        },
        {
          key: 'postal_code',
          sortable: true
        },
        {
          key: 'phone',
          sortable: true
        },
        {
          key: 'users',
          sortable: true
        }
      ],
      merchants: []
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get(`/api/v1/search_merchants`)
        .then(response => { this.merchants = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    searchMerchants (param) {
      this.$http.secured.get(`/api/v1/search_merchants?search=${param}`)
        .then(response => { this.merchants = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  }
}
</script>
