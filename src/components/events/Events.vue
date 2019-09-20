<template>
  <VueCtkDateTimePicker v-model="events"
                        :inline="true"
  />
  <!-- Make a custom submit button to send info to api -->
</template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
  name: 'Events',
  components: {
    VueCtkDateTimePicker
  },
  data () {
    return {
      events: [],
      merchants: [],
      error: '',
      toastCount: 0
    }
  },
  created () {
    this.events[0] = this.formatDate()
  },
  methods: {
    formatDate () {
      let today = new Date(),
          month = '' + (today.getMonth() + 1),
          day = '' + today.getDate(),
          year = '' + today.getFullYear()
      if (month.legnth < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      return [year, month, day].join('-')
    }
  }
}
</script>
