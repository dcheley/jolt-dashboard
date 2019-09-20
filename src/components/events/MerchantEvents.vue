<!-- jolt-dashboard/src/components/events/MerchantEvents.vue -->

<template>
  <kendo-scheduler :data-source="events"
                   :height="600"
                   :timezone="'Etc/UTC'"
                   @change="onChange"
                   @edit="onEdit"
                   @add="onAdd"
                   @cancel="onCancel"
                   @dataBound="onDataBound"
                   @move="onMove"
                   @navigate="onNavigate"
                   @resize="onResize"
                   @save="onSave">
    <kendo-scheduler-view :type="'day'"></kendo-scheduler-view>
    <kendo-scheduler-view :type="'week'"></kendo-scheduler-view>
    <kendo-scheduler-view :type="'month'" :selected="true"></kendo-scheduler-view>
    <kendo-scheduler-view :type="'agenda'"></kendo-scheduler-view>
  </kendo-scheduler>
</template>

<script>
export default {
  data () {
    return {
      events: [],
      merchant: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      var merchantId = this.$route.params.id
      this.$http.secured.get('/api/v1/merchants/' + merchantId)
        .then(response => { this.merchant = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
      this.$http.secured.get('/api/v1/merchants/' + merchantId + '/events')
        .then(response => { this.events = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    onChange: function (ev) {
      console.log('Event :: change')
    },
    onEdit: function (ev) {
      console.log('Event :: edit')
    },
    onAdd: function (ev) {
      console.log('Event :: add')
    },
    onCancel: function (ev) {
      console.log('Event :: cancel')
    },
    onDataBound: function (ev) {
      console.log('Event :: dataBound')
    },
    onMove: function (ev) {
      console.log('Event :: move')
    },
    onNavigate: function (ev) {
      console.log('Event :: navigate')
    },
    onResize: function (ev) {
      console.log('Event :: resize')
    },
    onSave: function (ev) {
      console.log('Event :: save')
    }
  }
}
</script>
