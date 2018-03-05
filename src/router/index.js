import Vue from 'vue'
import Router from 'vue-router'
const dytt = () => import('./../components/dytt.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dytt',
      component: dytt
    }
  ]
})
