<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Jolt</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->

          <b-navbar-nav>
            <b-nav-item to="/" class="" v-if="!signedIn()">Sign In</b-nav-item>
            <b-nav-item to="/signup" class="" v-if="!signedIn()">Sign Up</b-nav-item>
            <b-nav-item to="/admin-home" class="" v-if="signedIn()">Home</b-nav-item>
            <b-nav-item to="/merchants" class="" v-if="signedIn()">Merchants</b-nav-item>
            <b-nav-item to="/promotions" class="" v-if="signedIn()">Promotions</b-nav-item>
            <b-nav-item to="#" @click.prevent="signOut" class="" v-if="signedIn()">Sign Out</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  created () {
    this.signedIn()
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
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
