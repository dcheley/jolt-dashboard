<!-- jolt-dashboard/src/components/feedback/Events.vue -->

<template>
  <kendo-scheduler :data-source="localDataSource"
                   :date="date"
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
      date: new Date('2013/6/6'),
      localDataSource: [
        {
          id: 1,
          start: new Date('2013/6/6 08:00 AM'),
          end: new Date('2013/6/6 09:00 AM'),
          title: 'Interview'
        },
        {
          id: 2,
          start: new Date('2013/6/6 08:00 AM'),
          end: new Date('2013/6/6 09:00 AM'),
          title: 'Meeting'
        }
      ]
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/events')
        .then(response => { this.events = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
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
