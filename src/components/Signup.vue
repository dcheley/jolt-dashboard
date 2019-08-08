<!-- jolt-dashboard/src/components/Signup.vue -->

<template>
  <b-container>
    <b-row class="mt-5 mb-5">
      <b-col cols="12">
        <b-img :src="require('../assets/jolt-logo.png')"></b-img>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3"></b-col>
      <b-col cols="6">
        <div class="mt-3">
          <b-form @submit.prevent="signup">
            <div class="text-danger mb-3" v-if="error">{{ error }}</div>

            <b-form-group
              id="input-group-first_name"
              label-cols="4"
              label-align="left"
              label="First name"
              label-for="first_name"
              class="mt-4 mb-4"
            >
              <b-form-input
                id="first_name"
                v-model="first_name"
                required
                autocomplete="true"
                placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-last_name"
              label-cols="4"
              label-align="left"
              label="Last name"
              label-for="last_name"
              class="mt-4 mb-4"
            >
              <b-form-input
                id="last_name"
                v-model="last_name"
                required
                autocomplete="true"
                placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-email"
              label-cols="4"
              label-align="left"
              label="Email"
              label-for="email"
              class="mt-4 mb-4"
            >
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                required
                autocomplete="true"
                placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-password"
              label-cols="4"
              label-align="left"
              label="Password"
              label-for="password"
              class="mt-4 mb-4"
            >
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                autocomplete="true"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-password"
              label-cols="4"
              label-align="left"
              label="Confirm Password"
              label-for="password"
              class="mt-4 mb-4"
            >
              <b-form-input
                id="password_confirmation"
                v-model="password_confirmation"
                size="md"
                type="password"
                autocomplete="true"
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
      first_name: '',
      last_name: '',
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
      this.$http.plain.post('/signup', { first_name: this.first_name, last_name: this.last_name, email: this.email, password: this.password, password_confirmation: this.password_confirmation, role: 1 })
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
      localStorage.userId = response.data.user_id
      this.error = ''
      this.$router.replace('/admin-home')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
      delete localStorage.userId
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
