<!-- jolt-dashboard/src/components/Header.vue -->

<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Jolt</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item to="/" v-if="!signedIn()">Sign In</b-nav-item>
            <b-nav-item to="/signup" v-if="!signedIn()">Sign Up</b-nav-item>
            <b-nav-item to="/admin-home" v-if="signedIn()">Home</b-nav-item>
            <b-nav-item to="/merchants" v-if="signedIn()">Merchants</b-nav-item>
            <b-nav-item-dropdown text="Profiles" v-if="signedIn()">
              <b-dropdown-item v-for="merchant in merchants"
                :key="merchant.id"
                :merchant="merchant"
                v-bind:to="'/merchants/' + merchant.id"
              >
                {{ merchant.name }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item to="/search-merchants" v-if="signedIn()">Search</b-nav-item>
            <b-nav-item to="/category-merchants" v-if="signedIn()">Categories</b-nav-item>
            <b-nav-item to="/offers" v-if="signedIn()">Offers</b-nav-item>
            <b-nav-item to="/events" v-if="signedIn()">Events</b-nav-item>
            <b-nav-item to="/post-feedback" v-if="signedIn()">Feedback</b-nav-item>
            <b-nav-item to="#" @click.prevent="signOut" v-if="signedIn()">Sign Out</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      merchants: [],
      error: ''
    }
  },
  created () {
    this.signedIn()
    if (this.signedIn()) {
      this.$http.secured.get('/api/v1/merchants')
        .then(response => { this.merchants = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      return localStorage.signedIn
    },
    signOut () {
      this.$http.secured.delete('/signout')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          delete localStorage.userId
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Failed to sign out'))
    }
  }
}
</script>
