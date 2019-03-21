import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import Gerentwo from './views/Gerentwo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
    	path: '/details',
      name: 'details',
      component: () => import(/* webpackChunkName: "about" */ './views/Details.vue')
    },
    {
    	path:'/pingdetail',
    	name:'pingdetail',
    	component: () => import(/* webpackChunkName: "about" */ './views/Pingdetail.vue')
    },
    {
    	path:'/geren',
    	name:'geren',
    	component: () => import(/* webpackChunkName: "about" */ './views/Geren.vue')
    },
    {
    	path:'/searchzhu',
    	name:'searchzhu',
    	component: () => import(/* webpackChunkName: "about" */ './views/Searchzhu.vue')
    },
    {
    	path:'/searchtwo',
    	name:'searchtwo',
    	component: () => import(/* webpackChunkName: "about" */ './views/Searchtwo.vue')
    },
    {
    	path:'/gerentwo',
    	name:'gerentwo',
    	component: Gerentwo
    },
  ]
})
