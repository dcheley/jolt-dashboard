<!-- jolt-dashboard/src/components/offers/Offers.vue -->

<template>
  <b-container>
    <b-row class="mt-5">
      <b-col cols="12">
        <h3 class="">Add a new offer</h3>
      </b-col>
    </b-row>

    <div class="">
      <b-form action="" @submit.prevent="addOffer">
        <div class="text-danger mb-3" v-if="error">{{ error }}</div>
        
        <b-row>
          <b-col cols="6">
            <b-form-group
              id="input-group-title"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Title"
              label-for="offer_title"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="offer_title"
                v-model="newOffer.title"
                autofocus autocomplete="off"
                placeholder="Type a offer title"
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
                id="offer_dollar_value"
                v-model="newOffer.dollar_value"
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
              label-for="offer_expiary_date"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="offer_expiary_date"
                v-model="newOffer.expiary_date"
                type="date"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-merchant"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Merchant"
              label-for="offer_merchant"
              class="mt-5 mb-5"
            >
              <b-form-select id="merchant" class="select" v-model="newOffer.merchant">
                <option disabled value="">Select a merchant</option>
                <option :value="merchant.id" v-for="merchant in merchants" :key="merchant.id">{{ merchant.name }}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <p class="">Don't see a merchant? <router-link class="purple text-decoration-none" to="/merchants">Create one.</router-link></p>
            <b-button pill type="submit" value="Add Offer" class="mb-5">Add Offer</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>

    <b-list-group class="mb-5">
      <b-list-group-item v-for="offer in offers" :key="offer.id" :offer="offer" class="mt-3 p-0">
        <div class="bg-light">
          <img src="../../assets/bolt-black.svg" class="small-icon mt-3">

          <b-row>
            <b-col cols="12" class="pl-5">
              <star-rating v-model="rating"
                           v-bind:increment="0.5"
                           v-bind:show-rating="false"
                           @rating-selected="setRating"
              ></star-rating>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12">
              <h4 class="mt-4 mb-4">
                {{ offer.title }} &mdash; {{ getMerchant(offer) }}
              </h4>
            </b-col>
          </b-row>

          <b-row class="text-break text-left ml-5">
            <b-col cols="4">
              <p class=""><b>Belongs to:</b>&nbsp; {{ getMerchant(offer) }}</p>
            </b-col>
            <b-col cols="4">
              <p class=""><b>$</b>{{ offer.dollar_value }}0</p>
            </b-col>
            <b-col cols="4">
              <p class=""><b>Expires:</b>&nbsp; {{ offer.expiary_date }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" class="mt-3 mb-4">
              <b-button pill
              @click.prevent="editOffer(offer)">Edit</b-button>

              <b-button pill class="bg-danger"
              @click.prevent="confirmDelete(offer)">Delete</b-button>
            </b-col>
          </b-row>
        </div>

        <div v-if="offer == editedOffer">
          <b-form action="" @submit.prevent="updateOffer(offer)">
            <div class="text-danger mb-3" v-if="error">{{ error }}</div>

            <b-row class="ml-4 mr-4">
              <b-col cols="6">
                <b-form-group
                  id="update-group-title"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label-align="left"
                  label="Title"
                  label-for="title"
                  class="mt-5 mb-5"
                >
                  <b-form-input
                    id="update_title"
                    v-model="offer.title"
                    required
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
                    v-model="offer.expiary_date"
                    type="date"
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
                    v-model="offer.dollar_value"
                    type="number"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="update-group-merchant"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label-align="left"
                  label="Merchant"
                  label-for="offer_merchant"
                  class="mt-5 mb-5"
                >
                  <b-form-select id="merchant" class="select" v-model="offer.merchant">
                    <option disabled value="">Select a merchant</option>
                    <option :value="merchant.id" v-for="merchant in merchants" :key="merchant.id">{{ merchant.name }}</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" class="mb-3">
                <b-button pill type="submit" value="Update">Update</b-button>
                <b-button pill type="button" value="Cancel" class="bg-danger"
                @click.prevent="closeForm(offer)">Cancel</b-button>
              </b-col>
            </b-row>
          </b-form>
        </div>

      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: 'Offers',
  components: {
    StarRating
  },
  data () {
    return {
      merchants: [],
      offers: [],
      newOffer: [],
      rating: 0,
      error: '',
      editedOffer: '',
      toastCount: 0
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/offers')
        .then(response => { this.offers = response.data })
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
    getMerchant (offer) {
      const offerMerchantValues = this.merchants.filter(merchant => merchant.id === offer.merchant_id)
      let merchant

      offerMerchantValues.forEach(function (element) {
        merchant = element.name
      })

      return merchant
    },
    addOffer () {
      const value = this.newOffer
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/offers/', { offer: { title: this.newOffer.title, dollar_value: this.newOffer.dollar_value, expiary_date: this.newOffer.expiary_date, merchant_id: this.newOffer.merchant } })
        .then(response => {
          this.offers.push(response.data)
          this.newOffer = ''
          this.toastCount++
          this.$bvToast.toast(`Scroll down to view Offer's details`, {
            title: 'Success!',
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'success'
          })
        })
        .catch(error => this.setError(error, 'Failed to create offer'))
    },
    removeOffer (offer) {
      this.$http.secured.delete(`/api/v1/offers/${offer.id}`)
        .then(response => {
          this.offers.splice(this.offers.indexOf(offer), 1)
        })
        .catch(error => this.setError(error, 'Failed to delete offer'))
    },
    confirmDelete (offer) {
      this.boxOne = ''
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this offer?', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          this.boxOne = value
          if (this.boxOne === true) {
            this.removeOffer(offer)
          }
        })
    },
    editOffer (offer) {
      this.editedOffer = offer
    },
    updateOffer (offer) {
      this.editedOffer = ''
      this.$http.secured.patch(`/api/v1/offers/${offer.id}`, { offer: { title: offer.title, dollar_value: offer.dollar_value, expiary_date: offer.expiary_date, merchant_id: offer.merchant } })
        .catch(error => this.setError(error, 'Failed to update offer'))
    },
    closeForm (offer) {
      this.editedOffer = ''
    },
    setRating (rating) {
      this.rating = rating
    }
  }
}
</script>
