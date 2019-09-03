<!-- jolt-dashboard/src/components/feedback/ViewFeedback.vue -->

<template>
  <b-container>

    <b-row class="mt-5">
      <b-col cols="12">
        <h3 class="">Feedback</h3>
      </b-col>
    </b-row>

    <b-list-group class="mb-5">
      <b-list-group-item v-for="feedback in feedback_messages" :key="feedback.id" :offer="feedback" class="mt-3 p-0">
        <div class="bg-light">
          <img src="../../assets/bolt-black.svg" class="small-icon mt-3">

          <b-row class="text-break text-left mt-4 ml-5">
            <b-col sm="12" md="6">
              <p class=""><b>Directed to:</b>&nbsp; {{ getMerchant(feedback) }}</p>
            </b-col>
            <b-col sm="12" md="6">
              <p class=""><b>From:</b>&nbsp; {{ getUser(feedback) }}</p>
            </b-col>
          </b-row>

          <b-row class="text-break text-left ml-5">
            <b-col cols="12">
              <p class="">{{ feedback.message }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" class="mt-3 mb-4">
              <b-button pill class="bg-danger"
              @click.prevent="confirmDelete(feedback)">Delete</b-button>
            </b-col>
          </b-row>
        </div>

      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
export default {
  name: 'ViewFeedback',
  data () {
    return {
      feedback_messages: [],
      merchants: [],
      users: [],
      error: '',
      toastCount: 0,
      boxOne: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/feedbacks')
        .then(response => { this.feedback_messages = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))

      this.$http.secured.get('/api/v1/merchants')
        .then(response => { this.merchants = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))

      this.$http.secured.get('/api/v1/users')
        .then(response => { this.users = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getMerchant (feedback) {
      const feedbackMerchantValues = this.merchants.filter(merchant => merchant.id === feedback.merchant_id)
      let merchant

      feedbackMerchantValues.forEach(function (element) {
        merchant = element.name
      })

      return merchant
    },
    getUser (feedback) {
      const feedbackUserValues = this.users.filter(user => user.id === feedback.user_id)
      let user

      feedbackUserValues.forEach(function (element) {
        user = element.first_name + ' ' + element.last_name
      })

      return user
    },
    removeFeedback (feedback) {
      this.$http.secured.delete(`/api/v1/feedbacks/${feedback.id}`)
        .then(response => {
          this.feedback_messages.splice(this.feedback_messages.indexOf(feedback), 1)
        })
        .catch(error => this.setError(error, 'Failed to delete feedback message'))
    },
    confirmDelete (feedback) {
      this.boxOne = ''
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this feedback message?', {
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
            this.removeFeedback(feedback)
          }
        })
    }
  }
}
</script>
