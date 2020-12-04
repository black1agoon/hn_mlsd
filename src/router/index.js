import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import HomeView from '../views/HomeView'
import OrderDetailView from '../views/OrderDetailView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/home',
    component: HomeView
  }, {
    path: '/orderdetail/:id',
    name: 'OrderDetail',
    component: OrderDetailView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '龙仕达'
  }
  next()
})

export default router
