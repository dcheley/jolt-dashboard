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
  }
}
</script>
