import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

import TravelMode from './views/travelMode.vue'
import AreaData from './views/areaData.vue';

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/travel_mode',
      name: 'TravelMode',
      component: TravelMode
    },
    {
      path: '/area_data',
      name: 'AreaData',
      component: AreaData
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
