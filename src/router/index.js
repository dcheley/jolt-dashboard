import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin.vue'
import Signup from '@/components/Signup.vue'
import Merchants from '@/components/merchants/Merchants.vue'
import Promotions from '@/components/promotions/Promotions.vue'
import AdminHome from '@/components/AdminHome.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/merchants',
      name: 'Merchants',
      component: Merchants
    },
    {
      path: '/promotions',
      name: 'Promotions',
      component: Promotions
    },
    {
      path: '/admin-home',
      name: 'AdminHome',
      component: AdminHome
    }
  ]
})

const DEFAULT_TITLE = 'Jolt Dashboard'
router.afterEach((to, from) => {
  document.title = DEFAULT_TITLE
})

export default router
