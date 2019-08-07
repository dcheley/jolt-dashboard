<!-- merchant-dashboard-frontend/src/components/promotions/Promotions.vue -->

<template>
  <b-container>
    <b-row class="mt-5">
      <b-col cols="12">
        <h3 class="">Add a new promotion</h3>
      </b-col>
    </b-row>

    <div class="">
      <b-form action="" @submit.prevent="addPromotion">
        <div class="text-danger mb-3" v-if="error">{{ error }}</div>
        <b-row>
          <b-col cols="6">
            <b-form-group
              id="input-group-title"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Title"
              label-for="promotion_title"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="promotion_title"
                v-model="newPromotion.title"
                autofocus autocomplete="off"
                placeholder="Type a promotion title"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-dollar"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Dollar Value"
              label-for="dollar_value"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="promotion_dollar_value"
                v-model="newPromotion.dollar_value"
                type="number"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group
              id="input-group-expiary"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Expiary Date"
              label-for="promotion_expiary_date"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="promotion_expiary_date"
                v-model="newPromotion.expiary_date"
                type="date"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-merchant"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Merchant"
              label-for="promotion_merchant"
              class="mt-5 mb-5"
            >
              <b-form-select id="merchant" class="select" v-model="newPromotion.merchant">
                <option disabled value="">Select a merchant</option>
                <option :value="merchant.id" v-for="merchant in merchants" :key="merchant.id">{{ merchant.name }}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <p class="">Don't see a merchant? <router-link class="" to="/merchants">Create one.</router-link></p>
            <b-button pill type="submit" value="Add Promotion" class="mb-5">Add Promotion</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>

    <b-list-group class="mb-5">
      <b-list-group-item v-for="promotion in promotions" :key="promotion.id" :promotion="promotion">

        <h4 class="mt-4 mb-4">
          <img src="../../assets/bolt-black.svg" class="small-icon">
          {{ promotion.title }} &mdash; {{ promotion.expiary_date }}
        </h4>

        <p class="">{{ getMerchant(promotion) }}</p>

        <b-button pill class="mb-4"
        @click.prevent="editPromotion(promotion)">Edit</b-button>

        <b-button pill class="mb-4 bg-danger"
        @click.prevent="removePromotion(promotion)">Delete</b-button>

        <div v-if="promotion == editedPromotion">
          <b-form action="" @submit.prevent="updatePromotion(promotion)">
            <div class="text-danger mb-3" v-if="error">{{ error }}</div>

            <b-row>
              <b-col cols="6">
                <b-form-group
                  id="update-group-title"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label-align="left"
                  label="Title"
                  label-for="title"
                  class="mt-5 mb-5"
                  required
                >
                  <b-form-input
                    id="update_title"
                    v-model="promotion.title"
                    type="title"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="update-group-expiary"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label-align="left"
                  label="Expiary Date"
                  label-for="expiary_date"
                  class="mt-5 mb-5"
                >
                  <b-form-input
                    id="update_expiary_date"
                    v-model="promotion.expiary_date"
                    type="expiary_date"
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group
                  id="update-group-dollar"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label-align="left"
                  label="Dollar Value"
                  label-for="dollar_value"
                  class="mt-5 mb-5"
                >
                  <b-form-input
                    id="update_dollar_value"
                    v-model="promotion.dollar_value"
                    type="number"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="update-group-merchant"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label-align="left"
                  label="Merchant"
                  label-for="promotion_merchant"
                  class="mt-5 mb-5"
                >
                  <b-form-select id="merchant" class="select" v-model="promotion.merchant">
                    <option disabled value="">Select a merchant</option>
                    <option :value="merchant.id" v-for="merchant in merchants" :key="merchant.id">{{ merchant.name }}</option>
                  </b-form-select>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-button pill type="submit" value="Update" class="mb-3"></b-button>
              </b-col>
            </b-row>
          </b-form>
        </div>

      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
export default {
  name: 'Promotions',
  data () {
    return {
      merchants: [],
      promotions: [],
      newPromotion: [],
      error: '',
      editedPromotion: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/promotions')
        .then(response => { this.promotions = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))

      this.$http.secured.get('/api/v1/merchants')
        .then(response => { this.merchants = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getMerchant (promotion) {
      const promotionMerchantValues = this.merchants.filter(merchant => merchant.id === promotion.merchant_id)
      let merchant

      promotionMerchantValues.forEach(function (element) {
        merchant = element.name
      })

      return merchant
    },
    addPromotion () {
      const value = this.newPromotion
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/promotions/', { promotion: { title: this.newPromotion.title, dollar_value: this.newPromotion.dollar_value, expiary_date: this.newPromotion.expiary_date, merchant_id: this.newPromotion.merchant } })
        .then(response => {
          this.promotions.push(response.data)
          this.newPromotion = ''
        })
        .catch(error => this.setError(error, 'Cannot create promotion'))
    },
    removePromotion (promotion) {
      this.$http.secured.delete(`/api/v1/promotions/${promotion.id}`)
        .then(response => {
          this.promotions.splice(this.promotions.indexOf(promotion), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete promotion'))
    },
    editPromotion (promotion) {
      this.editedPromotion = promotion
    },
    updatePromotion (promotion) {
      this.editedPromotion = ''
      this.$http.secured.patch(`/api/v1/promotions/${promotion.id}`, { promotion: { title: promotion.title, dollar_value: promotion.dollar_value, expiary_date: promotion.expiary_date, merchant_id: promotion.merchant } })
        .catch(error => this.setError(error, 'Cannot update promotion'))
    }
  }
}
</script>
