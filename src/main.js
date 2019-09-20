// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from './backend/axios'
import '@progress/kendo-ui/js/kendo.scheduler'
import { Scheduler, SchedulerInstaller } from '@progress/kendo-scheduler-vue-wrapper'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './custom.css'
import '@progress/kendo-theme-default/dist/all.css'


Vue.config.productionTip = false

Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

Vue.use(BootstrapVue)
Vue.use(SchedulerInstaller)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  components: {
    App,
    Scheduler
  },
  template: '<App/>'
})
