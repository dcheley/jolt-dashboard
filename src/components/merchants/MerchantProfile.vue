<!-- jolt-dashboard/src/components/merchants/MerchantProfile.vue -->

<template>
  <b-container>
    <b-row>
      <b-col cols="12">

        <h3 class="mt-3 mb-5">{{ merchant.name }}</h3>
        <div>
          <b-card
            title={{ merchant.name }}
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2"
          >
            <b-card-text>
              {{ merchant.description }}
            </b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </div>

      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" class="mb-4">
        <star-rating v-model="rating"
                     v-bind:increment="0.5"
                     v-bind:show-rating="false"
                     @rating-selected="setRating"
        ></star-rating>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <h3 class="mb-5">ADD PHOTO</h3>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <p class="border border-dark mb-5">Add Logo</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="0" md="1"></b-col>
      <b-col sm="4" md="2">
        <b-link v-bind:href="'/merchants/' + merchant.id + '/offers'" class="custom-purple text-decoration-none">
          <div class="border border-dark pt-3">
            <b-img :src="require('../../assets/calendar.svg')" class="small-icon"></b-img>
            <p class="mt-2">SCHEDULING</p>
          </div>
        </b-link>
      </b-col>
      <b-col sm="4" md="2">
        <b-link v-bind:href="'/merchants/' + merchant.id + '/analytics'" class="custom-purple text-decoration-none">
          <div class="border border-dark pt-3">
            <b-img :src="require('../../assets/line-chart.svg')" class="small-icon"></b-img>
            <p class="mt-2">ANALYTICS</p>
          </div>
        </b-link>
      </b-col>
      <b-col sm="4" md="2">
        <b-link v-bind:href="'/merchants/' + merchant.id + '/advertisements'" class="custom-purple text-decoration-none">
          <div class="border border-dark pt-3">
            <b-img :src="require('../../assets/megaphone.svg')" class="small-icon"></b-img>
            <p class="mt-2">ADVERTISEMENTS</p>
          </div>
        </b-link>
      </b-col>
      <b-col sm="4" md="2">
        <b-link v-bind:href="'/merchants/' + merchant.id + '/billing'" class="custom-purple text-decoration-none">
          <div class="border border-dark pt-3">
            <b-img :src="require('../../assets/money.svg')" class="small-icon"></b-img>
            <p class="mt-2">BILLING</p>
          </div>
        </b-link>
      </b-col>
      <b-col sm="4" md="2">
        <b-link href="/view-feedback" class="custom-purple text-decoration-none">
          <div class="border border-dark pt-3">
            <b-img :src="require('../../assets/feedback.svg')" class="small-icon"></b-img>
            <p class="mt-2">FEEDBACK</p>
          </div>
        </b-link>
      </b-col>
      <b-col sm="0" md="1"></b-col>
    </b-row>

  </b-container>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: 'MerchantProfile',
  components: {
    StarRating
  },
  data () {
    return {
      merchant: '',
      rating: 0,
      error: '',
      editedMerchant: '',
      toastCount: 0
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      var merchantId = this.$route.params.id
      this.$http.secured.get('/api/v1/merchants/' + merchantId)
        .then(response => { this.merchant = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    editMerchant (merchant) {
      this.editedMerchant = merchant
    },
    updateMerchant (merchant) {
      this.editedMerchant = ''
      this.$http.secured.patch(`/api/v1/merchants/${merchant.id}`, { merchant: { name: merchant.name, description: merchant.description, address: merchant.address, phone: merchant.phone, postal_code: merchant.postal_code, category: merchant.category } })
        .catch(error => this.setError(error, 'Failed to update merchant'))
    },
    setRating (rating) {
      this.rating = rating
    }
  }
}
</script>
