<!-- merchant-dashboard-frontend/src/components/Signup.vue -->

<template>
  <b-container>
    <b-row class="mt-5 mb-5">
      <b-col cols="12">
        <img src="../assets/jolt-logo.png">
      </b-col>
    </b-row>

    <b-row class="mb-5">
      <b-col cols="3"></b-col>
      <b-col cols="6">
        <div class="mt-5">
          <b-form @submit.prevent="signup">
            <div class="text-danger mb-3" v-if="error">{{ error }}</div>

            <b-form-group
              id="input-group-email"
              label-cols="4"
              label-align="left"
              label="Email"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-password"
              label-cols="4"
              label-align="left"
              label="Password"
              label-for="password"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-password"
              label-cols="4"
              label-align="left"
              label="Confirm Password"
              label-for="password"
              class="mt-5 mb-5"
            >
              <b-form-input
                id="password_confirmation"
                v-model="password_confirmation"
                size="md"
                type="password"
                required
              ></b-form-input>
            </b-form-group>

            <b-button pill type="submit" class="mb-3">Sign Up</b-button>
          </b-form>
        </div>
      </b-col>
      <b-col cols="3"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain.post('/signup', { email: this.email, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/admin-home')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/admin-home')
      }
    }
  }
}
</script>

<style>
</style>
