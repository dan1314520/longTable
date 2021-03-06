import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/longTable'
  },
  {
    path: '/longTable',
    component: () => import('@/views/longTable')
  }
]
export default new Router({
  routes
})
