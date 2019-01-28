import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

// import TravelMode from './views/travelMode.vue'
// import AreaData from './views/areaData.vue';
// import Source from './views/source.vue';
// import ObjectType from './views/objectType.vue';

import AgencyDesk from './views/agencyDesk.vue'
import GuideDesk from './views/guideDesk.vue'

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
    // {
    //   path: '/travel_mode',
    //   name: 'TravelMode',
    //   component: TravelMode
    // },
    // {
    //   path: '/area_data',
    //   name: 'AreaData',
    //   component: AreaData
    // },
    // {
    //   path: '/source',
    //   name: 'Source',
    //   component: Source
    // },
    // {
    //   path: '/object_type',
    //   name: 'ObjectType',
    //   component: ObjectType
    // },
    {
      path: '/agency_desk',
      name: 'AgencyDesk',
      component: AgencyDesk
    },
    {
      path: '/guide_desk',
      name: 'GuideDesk',
      component: GuideDesk
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
