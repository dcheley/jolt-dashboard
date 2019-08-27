import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin.vue'
import Signup from '@/components/Signup.vue'
import Merchants from '@/components/merchants/Merchants.vue'
import Offers from '@/components/offers/Offers.vue'
import AdminHome from '@/components/AdminHome.vue'
import SearchMerchants from '@/components/merchants/SearchMerchants.vue'
import MerchantProfile from '@/components/merchants/MerchantProfile.vue'
import MerchantAnalytics from '@/components/merchants/MerchantAnalytics.vue'
import MerchantOffers from '@/components/merchants/MerchantOffers.vue'

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
      path: '/offers',
      name: 'Offers',
      component: Offers
    },
    {
      path: '/admin-home',
      name: 'AdminHome',
      component: AdminHome
    },
    {
      path: '/search-merchants',
      name: 'SearchMerchants',
      component: SearchMerchants
    },
    {
      path: '/merchants/:id',
      name: 'MerchantProfile',
      component: MerchantProfile
    },
    {
      path: '/merchants/:id/analytics',
      name: 'MerchantAnalytics',
      component: MerchantAnalytics
    },
    {
      path: '/merchants/:id/offers',
      name: 'MerchantOffers',
      component: MerchantOffers
    }
  ]
})

const DEFAULT_TITLE = 'Jolt Dashboard'
router.afterEach((to, from) => {
  document.title = DEFAULT_TITLE
})

export default router
