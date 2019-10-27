<!-- jolt-dashboard/src/components/merchants/CategoryMerchants.vue -->

<template>
  <b-container>
    <div class="mt-5">
      <b-row>
        <b-col sm="1"></b-col>
        <b-col sm="2">
          <b-button pill variant="outline" type="submit"
          @click=searchMerchants(activity) class="custom-purple-btn">Activities</b-button>
        </b-col>
        <b-col sm="2">
          <b-button pill variant="outline" type="submit"
          @click=searchMerchants(food) class="custom-purple-btn">Food & Drinks</b-button>
        </b-col>
        <b-col sm="2">
          <b-button pill variant="outline" type="submit"
          @click=searchMerchants(screenings) class="custom-purple-btn">Screenings</b-button>
        </b-col>
        <b-col sm="2">
          <b-button pill variant="outline" type="submit"
          @click=searchMerchants(shows) class="custom-purple-btn">Shows</b-button>
        </b-col>
        <b-col sm="2">
          <b-button pill variant="outline" type="submit"
          @click=searchMerchants(fitness) class="custom-purple-btn">Fitness/Outdoor Activities</b-button>
        </b-col>
        <b-col sm="1"></b-col>
      </b-row>

      <div class="text-danger mt-4 mb-3" v-if="error">{{ error }}</div>
    </div>

    <div class="mt-5 text-left">
      <b-table :items="merchants" :fields="fields">
        <template v-for="field in fields" :slot="field.key" slot-scope="data">
          <div v-if="field.key === 'name'">
            <b-link v-bind:href="'/merchants/' + data.item.id" class="custom-purple text-decoration-none">{{ data.item.name }}</b-link>
          </div>
          <div v-else>
            <p>{{ data.value }}</p>
          </div>
        </template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'CategoryMerchants',
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
          key: 'category',
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
      activity: 'Activities',
      food: 'Food and Drinks',
      screenings: 'Screenings',
      shows: 'Shows',
      fitness: 'Fitness/Outdoor Activities',
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
    searchMerchants (category) {
      this.$http.secured.get('/api/v1/search_merchants?category=' + category)
        .then(response => { this.merchants = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  }
}
</script>
