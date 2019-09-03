<!-- jolt-dashboard/src/components/billing/Billing.vue -->

<template>
  <b-container>

    <b-row class="mt-5">
      <b-col cols="12">
        <h3 class="text-left">Billing Information</h3>
      </b-col>
    </b-row>

    <div class="">
      <b-form action="" @submit.prevent="addBilling">
        <div class="text-danger mb-3" v-if="error">{{ error }}</div>

        <b-row class="bg-light">
          <b-col sm="12" md="3">
            <b-form-group
              id="input-group-first_name"
              label-align="left"
              label="First Name"
              label-for="billing_first_name"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="billing_first_name"
                v-model="newBilling.first_name"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="3">
            <b-form-group
              id="input-group-last_name"
              label-align="left"
              label="Last Name"
              label-for="billing_last_name"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="billing_last_name"
                v-model="newBilling.last_name"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="3">
            <b-form-group
              id="input-group-institution"
              label-align="left"
              label="Name of Institution"
              label-for="billing_institution"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="billing_institution"
                v-model="newBilling.institution"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="3">
            <b-form-group
              id="input-group-address"
              label-align="left"
              label="Address"
              label-for="billing_address"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="billing_address"
                v-model="newBilling.address"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row class="bg-light">
          <b-col sm="12" md="3">
            <b-form-group
              id="input-group-city"
              label-align="left"
              label="City"
              label-for="billing_city"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="billing_city"
                v-model="newBilling.city"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="3">
            <b-form-group
              id="input-group-postal-code"
              label-align="left"
              label="Postal Code"
              label-for="billing_postal_code"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="billing_postal_code"
                v-model="newBilling.postal_code"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="3">
            <b-form-group
              id="input-group-province"
              label-align="left"
              label="Province"
              label-for="billing_province"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="billing_province"
                v-model="newBilling.province"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="3">
            <b-form-group
              id="input-group-phone"
              label-align="left"
              label="Phone Number"
              label-for="billing_phone"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="billing_phone"
                v-model="newBilling.phone"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col cols="12">
            <h3 class="text-left">Payment Information</h3>
          </b-col>
        </b-row>

        <b-row class="bg-light">
          <b-col sm="12" md="3">
            <b-form-group
              id="input-group-credit-card-number"
              label-align="left"
              label="Credit Card Number"
              label-for="billing_credit_card_number"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="billing_credit_card_number"
                v-model="newBilling.credit_card_number"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="3">
            <b-form-group
              id="input-group-credit-expiary-date"
              label-align="left"
              label="Expiary Date"
              label-for="billing_credit_expiary_date"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="billing-credit-expiary-date"
                v-model="newBilling.credit_expiary_date"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="3">
            <b-form-group
              id="input-group-cvv"
              label-align="left"
              label="CVV"
              label-for="billing_cvv"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="billing_province"
                v-model="newBilling.cvv"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="3"></b-col>
        </b-row>

        <b-row class="bg-light pb-3">
          <b-col cols="12">
            <b-button pill type="submit" value="Post" class="mt-3">Submit</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>

    <b-list-group class="mb-5">
      <b-list-group-item v-for="billing in billings" :key="billing.id" :billing="billing" class="mt-3 p-0">
        <div class="bg-light">
          <img src="../../assets/bolt-black.svg" class="small-icon mt-3">

          <b-row class="text-break text-left ml-5">
            <b-col cols="12">
              <p class=""><b>Belongs to:</b>&nbsp; {{ billing.first_name + ' ' + billing.last_name }}</p>
            </b-col>
            <b-col cols="12">
              <p class=""><b>Institution:</b>&nbsp; {{ billing.institution }}</p>
            </b-col>
            <b-col cols="12">
              <p class=""><b>Address:</b>&nbsp; {{ billing.address }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" class="mt-3 mb-4">
              <b-button pill
              @click.prevent="editBilling(billing)">Edit</b-button>

              <b-button pill class="bg-danger"
              @click.prevent="confirmDelete(billing)">Delete</b-button>
            </b-col>
          </b-row>
        </div>

        <div v-if="billing == editedBilling">
          <b-form action="" @submit.prevent="updateBilling(merchant, billing)">
            <div class="text-danger mb-3" v-if="error">{{ error }}</div>

            <b-row class="bg-light no-gutters">
              <b-col sm="12" md="3">
                <b-form-group
                  id="input-group-first_name"
                  label-align="left"
                  label="First Name"
                  label-for="billing_first_name"
                  class="mt-5 mb-5 mr-2 ml-2"
                >
                  <b-form-input
                    id="billing_first_name"
                    v-model="billing.first_name"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="3">
                <b-form-group
                  id="input-group-last_name"
                  label-align="left"
                  label="Last Name"
                  label-for="billing_last_name"
                  class="mt-5 mb-5 mr-2 ml-2"
                >
                  <b-form-input
                    id="billing_last_name"
                    v-model="billing.last_name"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="3">
                <b-form-group
                  id="input-group-institution"
                  label-align="left"
                  label="Name of Institution"
                  label-for="billing_institution"
                  class="mt-5 mb-5 mr-2 ml-2"
                >
                  <b-form-input
                    id="billing_institution"
                    v-model="billing.institution"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="3">
                <b-form-group
                  id="input-group-address"
                  label-align="left"
                  label="Address"
                  label-for="billing_address"
                  class="mt-5 mb-5 mr-2 ml-2"
                >
                  <b-form-input
                    id="billing_address"
                    v-model="billing.address"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="bg-light no-gutters">
              <b-col sm="12" md="3">
                <b-form-group
                  id="input-group-city"
                  label-align="left"
                  label="City"
                  label-for="billing_city"
                  class="mt-5 mb-5 mr-2 ml-2"
                >
                  <b-form-input
                    id="billing_city"
                    v-model="billing.city"
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="3">
                <b-form-group
                  id="input-group-postal-code"
                  label-align="left"
                  label="Postal Code"
                  label-for="billing_postal_code"
                  class="mt-5 mb-5 mr-2 ml-2"
                >
                  <b-form-input
                    id="billing_postal_code"
                    v-model="billing.postal_code"
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="3">
                <b-form-group
                  id="input-group-province"
                  label-align="left"
                  label="Province"
                  label-for="billing_province"
                  class="mt-5 mb-5 mr-2 ml-2"
                >
                  <b-form-input
                    id="billing_province"
                    v-model="billing.province"
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="3">
                <b-form-group
                  id="input-group-phone"
                  label-align="left"
                  label="Phone Number"
                  label-for="billing_phone"
                  class="mt-5 mb-5 mr-2 ml-2"
                >
                  <b-form-input
                    id="billing_phone"
                    v-model="billing.phone"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="bg-light no-gutters">
              <b-col sm="12" md="3">
                <b-form-group
                  id="input-group-credit-card-number"
                  label-align="left"
                  label="Credit Card Number"
                  label-for="billing_credit_card_number"
                  class="mt-5 mb-5 mr-2 ml-2"
                >
                  <b-form-input
                    id="billing_credit_card_number"
                    v-model="billing.credit_card_number"
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="3">
                <b-form-group
                  id="input-group-credit-expiary-date"
                  label-align="left"
                  label="Expiary Date"
                  label-for="billing_credit_expiary_date"
                  class="mt-5 mb-5 mr-2 ml-2"
                >
                  <b-form-input
                    id="billing-credit-expiary-date"
                    v-model="billing.credit_expiary_date"
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="3">
                <b-form-group
                  id="input-group-cvv"
                  label-align="left"
                  label="CVV"
                  label-for="billing_cvv"
                  class="mt-5 mb-5 mr-2 ml-2"
                >
                  <b-form-input
                    id="billing_province"
                    v-model="billing.cvv"
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="3"></b-col>
            </b-row>

            <b-row class="bg-light">
              <b-col cols="12" class="mb-3">
                <b-button pill type="submit" value="Update">Update</b-button>
                <b-button pill type="button" value="Cancel" class="bg-danger"
                @click.prevent="closeForm(billing)">Cancel</b-button>
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
  name: 'Billing',
  data () {
    return {
      merchant: '',
      billings: [],
      newBilling: [],
      error: '',
      editedBilling: '',
      toastCount: 0
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      var merchantId = this.$route.params.merchant_id
      this.$http.secured.get('/api/v1/merchants/' + merchantId + '/billings')
        .then(response => { this.billings = response.data })
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
    addBilling (merchant) {
      const value = this.newBilling
      if (!value) {
        return
      }
      this.$http.secured.post(`/api/v1/merchants/${merchant.id}/billings`,
        {
          billing:
          {
            first_name: this.newBilling.first_name,
            last_name: this.newBilling.last_name,
            institution: this.newBilling.institution,
            credit_card_number: this.newBilling.credit_card_number,
            credit_expiary_date: this.newBilling.credit_expiary_date,
            cvv: this.newBilling.cvv,
            address: this.newBilling.address,
            postal_code: this.newBilling.postal_code,
            phone: this.newBilling.phone,
            province: this.newBilling.province,
            city: this.newBilling.city,
            merchant_id: this.merchant.id
          }
        })
        .then(response => {
          this.billings.push(response.data)
          this.newBilling = ''
          this.toastCount++
          this.$bvToast.toast(`Scroll down to view billing details`, {
            title: 'Success!',
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'success'
          })
        })
        .catch(error => this.setError(error, 'Failed to create billing information'))
    },
    removeBilling (merchant, billing) {
      this.$http.secured.delete(`/api/v1/merchants/${merchant.id}/billings/${billing.id}`)
        .then(response => {
          this.billings.splice(this.billings.indexOf(billing), 1)
        })
        .catch(error => this.setError(error, 'Failed to delete billing information'))
    },
    confirmDelete (billing) {
      this.boxOne = ''
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete these billing details?', {
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
            this.removeBilling(billing)
          }
        })
    },
    editBilling (billing) {
      this.editedBilling = billing
    },
    updateBilling (merchant, billing) {
      this.editedBilling = ''
      this.$http.secured.patch(`/api/v1/merchants/${merchant.id}/billings/${billing.id}`,
        {
          billing:
          {
            first_name: billing.first_name,
            last_name: billing.last_name,
            institution: billing.institution,
            credit_card_number: billing.credit_card_number,
            credit_expiary_date: billing.credit_expiary_date,
            cvv: billing.cvv,
            address: billing.address,
            postal_code: billing.postal_code,
            phone: billing.phone,
            province: billing.province,
            city: billing.city,
            merchant_id: billing.merchant
          }
        })
        .catch(error => this.setError(error, 'Failed to update billing information'))
    },
    closeForm (billing) {
      this.editedBilling = ''
    }
  }
}
</script>
