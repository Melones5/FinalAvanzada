import Vue from 'vue'
import Router from 'vue-router'
import PaginaPrincipal from '@/components/PaginaPrincipal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PaginaPrincipal',
      component: PaginaPrincipal
    }
  ]
})