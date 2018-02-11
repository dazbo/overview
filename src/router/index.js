import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ManagePlayers from '@/components/admin/ManagePlayers'
import ProfileDetail from "@/components/ProfileDetail/ProfileDetail"

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'ManagePlayers',
      component: ManagePlayers
    },
    {
      path: '/profile/:battletag',
      name: 'ProfileDetail',
      component: ProfileDetail,
      props: true
    }
  ]
})
