<!-- jolt-dashboard/src/components/event/PostEvent.vue -->

<template>
  <b-container>

    <b-row class="mt-5">
      <b-col cols="12">
        <h3 class="">Post Events for {{ merchant.name }}</h3>
      </b-col>
    </b-row>

    <div class="">
      <b-form action="" @submit.prevent="addEvent">
        <div class="text-danger mb-3" v-if="error">{{ error }}</div>

        <b-row>
          <b-col sm="12" md="6">
            <b-form-group
              id="input-group-event-start"
              label-cols-sm="4"
              label-cols-lg="2"
              label-align="left"
              label="Start time"
              label-for="event_start"
              class="mt-5 mb-5"
            >
              <datetime type="datetime" v-model="newEvent.start" use12-hour required></datetime>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="6">
            <b-form-group
              id="input-group-event-end"
              label-cols-sm="4"
              label-cols-lg="2"
              label-align="left"
              label="End time"
              label-for="event_end"
              class="mt-5 mb-5"
            >
              <datetime type="datetime" v-model="newEvent.end" use12-hour required></datetime>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="6">
            <b-form-group
              id="input-group-event-description"
              label-align="left"
              label="Description"
              label-for="description"
              class="mt-3 mb-5"
            >
              <b-form-textarea
                id="description"
                v-model="newEvent.description"
                autofocus autocomplete="off"
                placeholder="Enter description."
                rows="4"
                required
              ></b-form-textarea>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="6">
            <b-form-group
              id="input-group-offer"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Offer"
              label-for="event_offer"
              class="mt-5 mb-5"
            >
              <b-form-select id="offer" class="select" v-model="newEvent.offer">
                <option disabled value="">Offer</option>
                <option :value="offer.id" v-for="offer in offers" :key="offer.id">{{ offer.title }}</option>
              </b-form-select>

              <b-button pill type="submit" value="Post" class="mt-3">Post</b-button>
            </b-form-group>
          </b-col>

          <b-col sm="3"></b-col>
        </b-row>
      </b-form>
    </div>

    <b-list-group class="mb-5">
      <b-list-group-item v-for="event in events" :key="event.id" :event="event" class="mt-3 p-0">

        <div class="bg-light">
          <img src="../../assets/bolt-black.svg" class="small-icon mt-3">

          <b-row>
            <b-col cols="12">
              <h4 class="mt-4 mb-4">
                {{ event.description }} &mdash; {{ getOffer(event) }}
              </h4>
            </b-col>
          </b-row>

          <b-row class="text-break text-left ml-5">
            <b-col cols="4">
              <p class=""><b>Belongs to:</b>&nbsp; {{ getOffer(event) }}</p>
            </b-col>
            <b-col cols="4">
              <p class=""><b>Start time:</b>&nbsp; {{ event.start_time }}</p>
            </b-col>
            <b-col cols="4">
              <p class=""><b>End time:</b>&nbsp; {{ event.end_time }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" class="mt-3 mb-4">
              <b-button pill
              @click.prevent="editEvent(event)">Edit</b-button>

              <b-button pill class="bg-danger"
              @click.prevent="confirmDelete(event)">Delete</b-button>
            </b-col>
          </b-row>
        </div>

        <div v-if="event == editedEvent">
          <b-form action="" @submit.prevent="updateEvent(event)">
            <div class="text-danger mb-3" v-if="error">{{ error }}</div>

            <b-row class="ml-4 mr-4">
              <b-col sm="12" md="6">
                <b-form-group
                  id="input-group-event-start"
                  label-cols-sm="4"
                  label-cols-lg="2"
                  label-align="left"
                  label="Start time"
                  label-for="event_start"
                  class="mt-5 mb-5"
                >
                  <datetime type="datetime" v-model="event.start_time" use12-hour></datetime>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="6">
                <b-form-group
                  id="input-group-event-end"
                  label-cols-sm="4"
                  label-cols-lg="2"
                  label-align="left"
                  label="End time"
                  label-for="event_end"
                  class="mt-5 mb-5"
                >
                  <datetime type="datetime" v-model="event.end_time" use12-hour></datetime>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="6">
                <b-form-group
                  id="input-group-event-description"
                  label-align="left"
                  label="Description"
                  label-for="description"
                  class="mt-3 mb-5"
                >
                  <b-form-textarea
                    id="description"
                    v-model="newEvent.description"
                    autofocus autocomplete="off"
                    placeholder="Enter description."
                    rows="4"
                    required
                  ></b-form-textarea>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="6">
                <b-form-group
                  id="input-group-offer"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label-align="left"
                  label="Offer"
                  label-for="event_offer"
                  class="mt-5 mb-5"
                >
                  <b-form-select id="offer" class="select" v-model="event.offer">
                    <option disabled value="">Offer</option>
                    <option :value="offer.id" v-for="offer in offers" :key="offer.id">{{ offer.title }}</option>
                  </b-form-select>

                  <b-button pill type="submit" value="Post" class="mt-3">Post</b-button>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" class="mb-3">
                <b-button pill type="submit" value="Update">Update</b-button>
                <b-button pill type="button" value="Cancel" class="bg-danger"
                @click.prevent="closeForm(event)">Cancel</b-button>
              </b-col>
            </b-row>
          </b-form>
        </div>

      </b-list-group-item>
    </b-list-group>

  </b-container>
</template>

<script>
import { Datetime } from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

export default {
  name: 'PostEvent',
  components: {
    datetime: Datetime
  },
  data () {
    return {
      merchant: '',
      events: [],
      offers: [],
      newEvent: [],
      error: '',
      toastCount: 0
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      var merchantId = this.$route.params.merchant_id
      this.$http.secured.get('/api/v1/merchants/' + merchantId + '/events')
        .then(response => { this.events = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))

      this.$http.secured.get('/api/v1/merchants/' + merchantId)
        .then(response => { this.merchant = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))

      this.$http.secured.get('/api/v1/events')
        .then(response => { this.events = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))

      this.$http.secured.get(`/api/v1/offers`)
        .then(response => { this.offers = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addEvent () {
      const value = this.newEvent
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/events/', {
        event: {
          start_time: this.newEvent.start,
          end_time: this.newEvent.end,
          description: this.newEvent.description,
          offer_id: this.newEvent.offer
        }
      })
        .then(response => {
          this.events.push(response.data)
          this.newEvent = ''
          this.toastCount++
          this.$bvToast.toast(`Thanks for your event!`, {
            title: 'Success!',
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'success'
          })
        })
        .catch(error => this.setError(error, 'Failed to send event'))
    },
    getOffer (event) {
      const eventOfferValues = this.offers.filter(offer => offer.id === event.offer_id)
      let offer

      eventOfferValues.forEach(function (element) {
        offer = element.title
      })

      return offer
    },
    removeEvent (event) {
      this.$http.secured.delete(`/api/v1/events/${event.id}`)
        .then(response => {
          this.events.splice(this.events.indexOf(event), 1)
        })
        .catch(error => this.setError(error, 'Failed to delete event'))
    },
    confirmDelete (event) {
      this.boxOne = ''
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this event?', {
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
            this.removeEvent(event)
          }
        })
    },
    editEvent (event) {
      this.editedEvent = event
    },
    updateEvent (event) {
      this.editedEvent = ''
      this.$http.secured.patch(`/api/v1/events/${event.id}`, {
        event: {
          description: event.description,
          start_time: event.start_time,
          end_time: event.end_time,
          offer_id: event.offer.id
        }
      })
        .catch(error => this.setError(error, 'Failed to update event'))
    },
    closeForm (event) {
      this.editedEvent = ''
    }
  }
}
</script>
