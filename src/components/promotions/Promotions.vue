<!-- jolt-dashboard/src/components/promotions/Promotions.vue -->

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
              id="input-group-category"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Expiary Date"
              label-for="promotion_category"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="promotion_category"
                v-model="newPromotion.category"
                type="date"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-col cols="12">
          <b-button pill type="submit" value="Add Promotion" class="mb-5">Add Promotion</b-button>
        </b-col>
      </b-form>
    </div>

    <h3>{{ merchant.name }}'s Promotions</h3>

    <b-list-group class="mb-5">
      <b-list-group-item v-for="promotion in promotions" :key="promotion.id" :promotion="promotion" class="mt-3 p-0">

        <div class="bg-light">
          <img src="../../assets/bolt-black.svg" class="small-icon mt-3">

          <b-row>
            <b-col cols="12">
              <h4 class="mt-4 mb-4">
                {{ promotion.title }}
              </h4>
            </b-col>
          </b-row>

          <b-row class="text-break text-left ml-5">
            <b-col cols="4">
              <p class=""><b>Category:</b>&nbsp; {{ promotion.category }}</p>
            </b-col>
            <b-col cols="4">
              <p class=""><b>$</b>{{ promotion.dollar_value }}0</p>
            </b-col>
            <b-col cols="4">
              <p class=""><b>Expires:</b>&nbsp; {{ promotion.expiary_date }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" class="mt-3 mb-4">
              <b-button pill
              @click.prevent="editPromotion(promotion)">Edit</b-button>

              <b-button pill class="bg-danger"
              @click.prevent="confirmDelete(promotion)">Delete</b-button>
            </b-col>
          </b-row>
        </div>

        <div v-if="promotion == editedPromotion">
          <b-form action="" @submit.prevent="updatePromotion(promotion)">
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
                    v-model="promotion.dollar_value"
                    type="number"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="update-group-category"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label-align="left"
                  label="Category"
                  label-for="promotion_category"
                  class="mt-5 mb-5"
                >
                  <b-form-input
                    id="update_category"
                    v-model="promotion.category"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" class="mb-3">
                <b-button pill type="submit" value="Update">Update</b-button>
                <b-button pill type="button" value="Cancel" class="bg-danger"
                @click.prevent="closeForm(promotion)">Cancel</b-button>
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
      merchant: '',
      promotions: [],
      newPromotion: [],
      error: '',
      editedPromotion: '',
      toastCount: 0,
      boxOne: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      var merchantId = this.$route.params.id
      this.$http.secured.get('/api/v1/merchants/' + merchantId + '/promotions')
        .then(response => { this.promotions = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))

      this.$http.secured.get('/api/v1/merchants/' + merchantId)
        .then(response => { this.merchant = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addPromotion () {
      const value = this.newPromotion
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/promotions/', { promotion: { title: this.newPromotion.title, dollar_value: this.newPromotion.dollar_value, expiary_date: this.newPromotion.expiary_date, category: this.newPromotion.category, merchant_id: this.newPromotion.merchant } })
        .then(response => {
          this.promotions.push(response.data)
          this.newPromotion = ''
          this.toastCount++
          this.$bvToast.toast(`Scroll down to view Promotion's details`, {
            title: 'Success!',
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'success'
          })
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
    confirmDelete (promotion) {
      this.boxOne = ''
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this promotion?', {
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
            this.removePromotion(promotion)
          }
        })
    },
    editPromotion (promotion) {
      this.editedPromotion = promotion
    },
    updatePromotion (promotion) {
      this.editedPromotion = ''
      this.$http.secured.patch(`/api/v1/promotions/${promotion.id}`, { promotion: { title: promotion.title, dollar_value: promotion.dollar_value, expiary_date: promotion.expiary_date, category: promotion.category, merchant_id: promotion.merchant } })
        .catch(error => this.setError(error, 'Cannot update promotion'))
    },
    closeForm (promotion) {
      this.editedPromotion = ''
    }
  }
}
</script>
