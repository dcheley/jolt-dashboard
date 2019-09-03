<!-- jolt-dashboard/src/components/feedback/PostFeedback.vue -->

<template>
  <b-container>

    <b-row class="mt-5">
      <b-col cols="12">
        <h3 class="">Post Feedback</h3>
      </b-col>
    </b-row>

    <div class="">
      <b-form action="" @submit.prevent="addFeedback">
        <div class="text-danger mb-3" v-if="error">{{ error }}</div>

        <b-row>
          <b-col sm="12" md="8">
            <b-form-group
              id="input-group-message"
              label-align="left"
              label=""
              label-for="feedback_message"
              class="mt-5 mb-5"
            >
              <b-form-textarea
                id="feedback_message"
                v-model="newFeedback.message"
                autofocus autocomplete="off"
                required
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="4">
            <b-form-group
              id="input-group-merchant"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Merchant"
              label-for="feedback_merchant"
              class="mt-5 mb-5"
            >
              <b-form-select id="merchant" class="select" v-model="newFeedback.merchant">
                <option disabled value="">Merchant (optional)</option>
                <option :value="merchant.id" v-for="merchant in merchants" :key="merchant.id">{{ merchant.name }}</option>
              </b-form-select>

              <b-button pill type="submit" value="Post" class="mt-3">Post</b-button>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </div>

  </b-container>
</template>

<script>
export default {
  name: 'PostFeedback',
  data () {
    return {
      feedback_messages: [],
      merchants: [],
      newFeedback: [],
      error: '',
      toastCount: 0
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/merchants')
        .then(response => { this.merchants = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))

      this.$http.secured.get(`/api/v1/users/${localStorage.userId}`)
        .then(response => { this.user = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addFeedback () {
      const value = this.newFeedback
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/feedbacks/', { feedback: { message: this.newFeedback.message, user_id: this.user.id, merchant_id: this.newFeedback.merchant } })
        .then(response => {
          this.feedback_messages.push(response.data)
          this.newFeedback = ''
          this.toastCount++
          this.$bvToast.toast(`Thanks for your feedback!`, {
            title: 'Success!',
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'success'
          })
        })
        .catch(error => this.setError(error, 'Failed to send feedback'))
    }
  }
}
</script>
