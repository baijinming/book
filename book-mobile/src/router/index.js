import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/views/layout'),
      redirect: '/layout/book',
      children: [
        {
          path: 'book',
          component: () => import('@/views/book')
        },
        {
          path: 'redactBook',
          name: 'redactBook',
          component: () => import('@/views/book/redactBook')
        },
        {
          path: 'category',
          component: () => import('@/views/category')
        },
        {
          path: 'redactCategory',
          name: 'redactCategory',
          component: () => import('@/views/category/redactCategory')
        },
        {
          path: 'user',
          component: () => import('@/views/user')
        }
      ]
    }
  ]
})
