import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Lock',
      component: () => import('./views/LockScreen')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('./views/Home')
    },
    {
      path: '/receive',
      name: 'Receive',
      component: () => import('./views/Receive')
    },
    {
      path: '/send',
      name: 'Send',
      component: () => import('./views/Send')
    },
    {
      path: '/accounts',
      name: 'Accounts',
      component: () => import('./views/Accounts')
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import('./views/Setting')
    },
    {
      path: '/setting/general',
      name: 'General',
      component: () => import('./views/General')
    },
    {
      path: '/setting/networks',
      name: 'Networks',
      component: () => import('./views/Networks')
    },
    {
      path: '/setting/advanced',
      name: 'Advanced',
      component: () => import('./views/Advanced')
    }
  ]
})
