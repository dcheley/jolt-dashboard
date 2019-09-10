<template>
  <v-app id="dayspan" v-cloak>
    <ds-calendar-app :calendar="calendar"></ds-calendar-app>
  </v-app>
</template>

<script>
import { Calendar } from 'dayspan'

export default {
  name: 'Events',
  data () {
    return {
      events: [],
      merchants: [],
      error: '',
      calendar: Calendar.months(),
      toastCount: 0
    }
  }
}
</script>
