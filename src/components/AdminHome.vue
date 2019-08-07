<!-- CREATE MERCHANTS & ICONS AND SEARCH PLACEHOLDER -->
<!-- merchant-dashboard-frontend/src/components/AdminHome.vue -->

<template>
  <b-container fluid>
    <b-row class="mt-5">
      <b-col cols="12">
        <h3 class="mb-4">Welcome, NAME</h3>
        <img src="../assets/user.svg" class="welcome-avatar">
      </b-col>
    </b-row>

    <div class="half-colour-bg">
      <b-row class="mt-5">
        <b-col cols="6 mt-3" class="border-right border-dark">
          <router-link to="/merchants" class="text-dark text-decoration-none">
            <img src="../assets/plus.svg" class="welcome-icon">
            <p class="mt-3">ADD MERCHANT</p>
          </router-link>
        </b-col>

        <b-col cols="6 mt-3">
          <img src="../assets/search.svg" class="welcome-icon">
          <p class="mt-3">SEARCH MERCHANT</p>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      // user name
    }
  }
}
</script>
