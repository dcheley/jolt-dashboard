<!-- jolt-dashboard/src/components/Signin.vue -->

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
        <div class="mt-5">
          <b-form @submit.prevent="signin">
            <div class="text-danger mb-3" v-if="error">{{ error }}</div>
            <b-form-group
              id="input-group-email"
              label-cols-sm="4"
              label-cols-lg="3"
              label-align="left"
              label="Email"
              label-for="email"
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
              label-cols-sm="4"
              label-cols-lg="3"
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
                autocomplete="true"
              ></b-form-input>
            </b-form-group>

            <b-button pill type="submit" class="mb-3">Sign In</b-button>

            <div>
              <router-link to="/signup" class="link">Sign Up</router-link>
            </div>
          </b-form>
        </div>
      </b-col>
      <b-col cols="3"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
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
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      localStorage.userId = response.data.user_id
      localStorage.payload = response.data.payload
      this.error = ''
      this.$router.replace('/admin-home')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Sign in failed'
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
