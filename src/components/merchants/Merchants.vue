<!-- jolt-dashboard/src/components/merchants/Merchants.vue -->

<template>
  <b-container>
    <div class="mt-4">
      <b-form @submit.prevent="addMerchant">
        <div class="text-danger mb-3" v-if="error">{{ error }}</div>
        <b-row>
          <b-col cols="3"></b-col>
          <b-col cols="6">
            <b-form-group
              id="input-group-name"
              label="NAME OF INSTITUION"
              label-for="name"
              class="mt-3 mb-5"
            >
              <b-form-input
                id="name"
                v-model="newMerchant.name"
                autofocus autocomplete="off"
                placeholder="Type a merchant name"
                required
              ></b-form-input>
            </b-form-group>

            <h3 class="mb-5">ADD PHOTO</h3>

            <p class="border border-dark mb-5">Add Logo</p>
          </b-col>
          <b-col cols="3"></b-col>
        </b-row>

        <b-row>
          <b-col cols="4">
            <b-form-group
              id="input-group-description"
              label-align="left"
              label="Description"
              label-for="description"
              class="mt-3 mb-5"
            >
              <b-form-textarea
                id="description"
                v-model="newMerchant.description"
                autofocus autocomplete="off"
                placeholder="Enter description."
                rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>

          <b-col cols="4">
            <b-form-group
              id="input-group-address"
              label-align="left"
              label="Address"
              label-for="address"
              class="mt-3 mb-5"
            >
              <!-- <b-form-input
                id="address"
                v-model="newMerchant.address"
                autofocus autocomplete="off"
                placeholder=""
              ></b-form-input> -->
              <vue-google-autocomplete
                id="map"
                v-model="newMerchant.address"
                class=""
                placeholder=""
                v-on:placechanged="getAddressData"
              >
              </vue-google-autocomplete>
            </b-form-group>

            <b-form-group
              id="input-group-phone"
              label-align="left"
              label="Phone Number"
              label-for="phone"
              class="mt-3 mb-5"
            >
              <b-form-input
                id="phone"
                v-model="newMerchant.phone"
                autofocus autocomplete="off"
                placeholder=""
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="4">
            <b-form-group
              id="input-group-postal-code"
              label-align="left"
              label="Postal Code"
              label-for="postal-code"
              class="mt-3 mb-5"
            >
              <b-form-input
                id="postal-code"
                v-model="newMerchant.postal_code"
                autofocus autocomplete="off"
                placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-category"
              label-align="left"
              label="Type"
              label-for="category"
              class="mt-3 mb-5"
            >
              <b-form-input
                id="category"
                v-model="newMerchant.category"
                autofocus autocomplete="off"
                placeholder=""
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-button pill type="submit" value="Add Merchant" class="mb-4">Add Merchant</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>

    <b-list-group class="mb-5">
      <b-list-group-item v-for="merchant in merchants" :key="merchant.id" :merchant="merchant" class="mt-3 p-0">
        <div class="bg-light">
          <img src="../../assets/bolt-black.svg" class="small-icon mt-3">

          <b-row>
            <b-col cols="12">
              <h4 class="mt-4 mb-4">
                {{ merchant.name }}
              </h4>
            </b-col>
          </b-row>

          <b-row class="text-break text-left ml-4">
            <b-col cols="4" >
              <p>{{ merchant.description }}</p>
            </b-col>
            <b-col cols="4">
              <p class="ml-4">{{ merchant.address }}</p>
              <p class="ml-4">{{ merchant.phone }}</p>
            </b-col>
            <b-col cols="4">
              <p>{{ merchant.postal_code }}</p>
              <p>{{ merchant.category }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" class="mt-3 mb-4">
              <b-link v-bind:href="'/merchants/' + merchant.id"><img src="../../assets/purple-info.svg" class="button-icon"></b-link>

              <b-button pill
              @click.prevent="editMerchant(merchant)">Edit</b-button>

              <b-button pill class="bg-danger"
              @click.prevent="confirmDelete(merchant)">Delete</b-button>
            </b-col>
          </b-row>
        </div>

        <div v-if="merchant == editedMerchant" class="mt-4">
          <b-form action="" @submit.prevent="updateMerchant(merchant)">
            <div class="text-danger mb-3" v-if="error">{{ error }}</div>

            <b-row>
              <b-col cols="3"></b-col>
              <b-col cols="6">
                <b-form-group
                  id="update-merchant-name"
                >
                  <b-form-input
                    id="update-name"
                    v-model="merchant.name"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="3"></b-col>
            </b-row>

            <b-row class="ml-4 mr-4">
              <b-col cols="4">
                <b-form-group
                  id="update-merchant-description"
                  label-align="left"
                  label="Description"
                  label-for="description"
                  class="mt-3 mb-5"
                >
                  <b-form-textarea
                    id="update-description"
                    v-model="merchant.description"
                    rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>

              <b-col cols="4">
                <b-form-group
                  id="update-merchant-address"
                  label-align="left"
                  label="Address"
                  label-for="address"
                  class="mt-3 mb-5"
                >
                  <b-form-input
                    id="update-address"
                    v-model="merchant.address"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="update-merchant-phone"
                  label-align="left"
                  label="Phone Number"
                  label-for="phone"
                  class="mt-3 mb-5"
                >
                  <b-form-input
                    id="update-phone"
                    v-model="merchant.phone"
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="4">
                <b-form-group
                  id="update-merchant-postal-code"
                  label-align="left"
                  label="Postal Code"
                  label-for="postal-code"
                  class="mt-3 mb-5"
                >
                  <b-form-input
                    id="update-postal-code"
                    v-model="merchant.postal_code"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="update-merchant-category"
                  label-align="left"
                  label="Type"
                  label-for="category"
                  class="mt-3 mb-5"
                >
                  <b-form-input
                    id="update-category"
                    v-model="merchant.category"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" class="mb-4">
                <b-button pill type="submit" value="Update">Update</b-button>
                <b-button pill type="button" value="Cancel" class="bg-danger"
                @click.prevent="closeForm(merchant)">Cancel</b-button>
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
  name: 'Merchants',
  data () {
    return {
      merchants: [],
      newMerchant: [],
      error: '',
      editedMerchant: '',
      toastCount: 0,
      boxOne: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/merchants')
        .then(response => { this.merchants = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addMerchant () {
      const value = this.newMerchant
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/merchants/', {
        merchant: {
          name: this.newMerchant.name,
          description: this.newMerchant.description,
          address: this.newMerchant.address,
          phone: this.newMerchant.phone,
          postal_code: this.newMerchant.postal_code,
          category: this.newMerchant.category
        }
      })
        .then(response => {
          this.merchants.push(response.data)
          this.newMerchant = ''
          this.toastCount++
          this.$bvToast.toast(`Scroll down to view Merchant's details`, {
            title: 'Success!',
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'success'
          })
        })
        .catch(error => this.setError(error, 'Failed to create merchant'))
    },
    removeMerchant (merchant) {
      this.$http.secured.delete(`/api/v1/merchants/${merchant.id}`)
        .then(response => {
          this.merchants.splice(this.merchants.indexOf(merchant), 1)
        })
        .catch(error => this.setError(error, 'Failed to delete merchant'))
    },
    confirmDelete (merchant) {
      this.boxOne = ''
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this merchant?', {
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
            this.removeMerchant(merchant)
          }
        })
    },
    editMerchant (merchant) {
      this.editedMerchant = merchant
    },
    updateMerchant (merchant) {
      this.editedMerchant = ''
      this.$http.secured.patch(`/api/v1/merchants/${merchant.id}`, {
        merchant: {
          name: merchant.name,
          description: merchant.description,
          address: merchant.address,
          phone: merchant.phone,
          postal_code: merchant.postal_code,
          category: merchant.category
        }
      })
        .catch(error => this.setError(error, 'Failed to update merchant'))
    },
    closeForm (merchant) {
      this.editedMerchant = ''
    },
    getAddressData (addressData, placeResultData, id) {
      this.address = addressData
    }
  }
}
</script>
