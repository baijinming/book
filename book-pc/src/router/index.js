import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
  login: () => import('@/views/login/login'),
  layout: () => import('@/views/layout/layout'),
  index: () => import('@/views/layout/index'),

  admin: () => import('@/views/admin/admin'),
  addAdmin: () => import('@/views/admin/addAdmin'),
  editAdmin: () => import('@/views/admin/editAdmin'),

  editUser: () => import('@/views/users/editUser'),
  changePass: () => import('@/views/users/changePass'),

  sort: ()=> import('@/views/sort/sort'),
  addSort: () => import('@/views/sort/addSort'),
  redactSort: () => import('@/views/sort/redactSort'),
  oneSort: () => import('@/views/sort/oneSort'),

  books: () => import('@/views/books/books'),
  redactBook: () => import('@/views/books/redactBook'),
  addBook: () => import('@/views/books/addBook'),

  carousel: () => import('@/views/carousel/carousel'),
  addCarousel: () => import('@/views/carousel/addCarousel'),
  redactCarousel: () => import('@/views/carousel/redactCarousel'),
  oneBook: () => import('@/views/carousel/oneBook'),
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      meta: {
        title: '后台登录页面'
      },
      component(resolve){
        require(['@/views/login/login'],resolve)
      }
    },
    {
      path: '/layout',
      meta: {
        title: '后台管理页面'
      },
      redirect: '/layout/index',
      component: components.layout,
      children: [
        {
          path: 'index',
          component: components.index
        },
        {
          path: 'admin',
          meta: {
            title: '管理员列表'
          },
          component: components.admin
        },
        {
          path: 'addAdmin',
          meta: {
            title: '添加管理员'
          },
          component: components.addAdmin
        },
        {
          path: 'editAdmin',
          meta: {
            title: '修改管理员信息'
          },
          component: components.editAdmin
        },
        {
          path: 'editUser',
          meta: {
            title: '修改个人信息'
          },
          component: components.editUser
        },
        {
          path: 'changePass',
          meta: {
            title: '修改密码'
          },
          component: components.changePass
        },
        {
          path: 'sort',
          meta: {
            title: '分类列表'
          },
          component: components.sort
        },
        {
          path: 'addSort',
          meta: {
            title: '添加分类'
          },
          component: components.addSort
        },
        {
          path: 'redactSort',
          name: 'redactSort',
          meta: {
            title: '分类修改'
          },
          component: components.redactSort
        },
        {
          path: 'oneSort',
          name: 'oneSort',
          meta: {
            title: '分类书籍'
          },
          component: components.oneSort
        },
        {
          path: 'books',
          meta: {
            title: '图书列表'
          },
          component: components.books
        },
        {
          path: 'redactBook',
          name: 'redactBook',
          meta: {
            title: '图书修改'
          },
          component: components.redactBook
        },
        {
          path: 'addBook',
          meta: {
            title: '添加图书'
          },
          component: components.addBook
        },
        {
          path: 'carousel',
          meta: {
            title: '轮播图列表'
          },
          component: components.carousel
        },
        {
          path: 'addCarousel',
          meta: {
            title: '添加轮播图'
          },
          component: components.addCarousel
        },
        {
          path: 'redactCarousel',
          meta: {
            title: '修改轮播图'
          },
          component: components.redactCarousel
        },
        {
          path: 'oneBook',
          meta: {
            title: '查看对应书籍'
          },
          component: components.oneBook
        },
      ]
    }
  ]
})

router.beforeEach((to,from,next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

export default router;
