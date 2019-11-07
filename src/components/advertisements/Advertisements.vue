<!-- jolt-dashboard/src/components/advertisements/Advertisements.vue -->

<template>
  <b-container>
    <div v-if="advertisements.length">
      <h3 class="mt-5">{{ merchant.name }}'s Advertisements</h3>

      <hooper :itemsToShow="3" :infiniteScroll="true" class="mt-5 mb-5">
        <slide v-for="(advertisementSlide, indx) in advertisements" :key="indx" :index="indx" class="bg-light border-left border-right border-white">
          <h5 class="mt-4">{{ advertisementSlide.title }}</h5>
          <p><b>$</b>{{ advertisementSlide.dollar_value }}0</p>
          <p><b>Category:</b> {{ advertisementSlide.category }}</p>
          <p><b>Expires:</b> {{ advertisementSlide.expiry_date }}</p>
        </slide>
      </hooper>
    </div>

    <b-row class="mt-5">
      <b-col cols="12">
        <h3 class="">Add a new Advertisement</h3>
      </b-col>
    </b-row>

    <div class="">
      <b-form action="" @submit.prevent="addAdvertisement">
        <div class="text-danger mb-3" v-if="error">{{ error }}</div>
        <b-row>
          <b-col cols="6">
            <b-form-group
              id="input-group-titlez"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Title"
              label-for="advertisement_title"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="advertisement_titlez"
                v-model="newAdvertisement.title"
                required
                type="text"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-dollar"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Dollar Value"
              label-for="advertisement_dollar_value"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="advertisement_dollar_value"
                v-model="newAdvertisement.dollar_value"
                type="number"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group
              id="input-group-expiry"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Expiary Date"
              label-for="advertisement_expiry_date"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="advertisement_expiry_date"
                v-model="newAdvertisement.expiry_date"
                type="date"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-category"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Category"
              label-for="advertisement_category"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="advertisement_category"
                v-model="newAdvertisement.category"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-button pill type="submit" value="Add" class="mb-5">Add</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>

    <h3>Manage {{ merchant.name }}'s Advertisements</h3>

    <b-list-group class="mb-5">
      <b-list-group-item v-for="advertisement in advertisements" :key="advertisement.id" :advertisement="advertisement" class="mt-3 p-0">

        <div class="bg-light">
          <img src="../../assets/bolt-black.svg" class="small-icon mt-3">

          <b-row>
            <b-col cols="12">
              <h4 class="mt-4 mb-4">
                {{ advertisement.title }}
              </h4>
            </b-col>
          </b-row>

          <b-row class="text-break text-left ml-5">
            <b-col cols="4">
              <p class=""><b>Category:</b>&nbsp; {{ advertisement.category }}</p>
            </b-col>
            <b-col cols="4">
              <p class=""><b>$</b>{{ advertisement.dollar_value }}0</p>
            </b-col>
            <b-col cols="4">
              <p class=""><b>Expires:</b>&nbsp; {{ advertisement.expiry_date }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" class="mt-3 mb-4">
              <b-button pill
              @click.prevent="editAdvertisement(advertisement)">Edit</b-button>

              <b-button pill class="bg-danger"
              @click.prevent="confirmDelete(advertisement)">Delete</b-button>
            </b-col>
          </b-row>
        </div>

        <div v-if="advertisement == editedAdvertisement">
          <b-form action="" @submit.prevent="updateAdvertisement(advertisement)">
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
                    v-model="advertisement.title"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="update-group-expiry"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label-align="left"
                  label="Expiary Date"
                  label-for="expiry_date"
                  class="mt-5 mb-5"
                >
                  <b-form-input
                    id="update_expiry_date"
                    v-model="advertisement.expiry_date"
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
                    v-model="advertisement.dollar_value"
                    type="number"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="update-group-category"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label-align="left"
                  label="Category"
                  label-for="advertisement_category"
                  class="mt-5 mb-5"
                >
                  <b-form-input
                    id="update_category"
                    v-model="advertisement.category"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" class="mb-3">
                <b-button pill type="submit" value="Update">Update</b-button>
                <b-button pill type="button" value="Cancel" class="bg-danger"
                @click.prevent="closeForm(advertisement)">Cancel</b-button>
              </b-col>
            </b-row>
          </b-form>
        </div>

      </b-list-group-item>
    </b-list-group>

  </b-container>
</template>

<script>
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  name: 'Advertisements',
  components: {
    Hooper,
    Slide
  },
  data () {
    return {
      merchant: '',
      advertisements: [],
      newAdvertisement: [],
      error: '',
      editedAdvertisement: '',
      toastCount: 0,
      hooperSettings: {
        itemsToShow: 3,
        centerMode: true
      }
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      var merchantId = this.$route.params.id
      this.$http.secured.get('/api/v1/merchants/' + merchantId + '/advertisements')
        .then(response => { this.advertisements = response.data })
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
    addAdvertisement () {
      const value = this.newAdvertisement
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/advertisements/', {
        advertisement: {
          title: this.newAdvertisement.title,
          dollar_value: this.newAdvertisement.dollar_value,
          expiry_date: this.newAdvertisement.expiry_date,
          category: this.newAdvertisement.category,
          merchant_id: this.newAdvertisement.merchant
        }
      })
        .then(response => {
          this.advertisements.push(response.data)
          this.newAdvertisement = ''
          this.toastCount++
          this.$bvToast.toast(`Scroll down to view Advertisement's details`, {
            title: 'Success!',
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'success'
          })
        })
        .catch(error => this.setError(error, 'Failed to create advertisement'))
    },
    removeAdvertisement (advertisement) {
      this.$http.secured.delete(`/api/v1/advertisements/${advertisement.id}`)
        .then(response => {
          this.advertisements.splice(this.advertisements.indexOf(advertisement), 1)
        })
        .catch(error => this.setError(error, 'Failed to delete advertisement'))
    },
    confirmDelete (advertisement) {
      this.boxOne = ''
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this advertisement?', {
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
            this.removeAdvertisement(advertisement)
          }
        })
    },
    editAdvertisement (advertisement) {
      this.editedAdvertisement = advertisement
    },
    updateAdvertisement (advertisement) {
      this.editedAdvertisement = ''
      this.$http.secured.patch(`/api/v1/advertisements/${advertisement.id}`, {
        advertisement: {
          title: advertisement.title,
          dollar_value: advertisement.dollar_value,
          expiry_date: advertisement.expiry_date,
          category: advertisement.category,
          merchant_id: advertisement.merchant
        }
      })
        .catch(error => this.setError(error, 'Failed to update advertisement'))
    },
    closeForm (advertisement) {
      this.editedAdvertisement = ''
    }
  }
}
</script>
