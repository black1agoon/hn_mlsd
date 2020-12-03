import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import TabsView from '../views/TabsView'
import OrderView from '../views/OrderView'
import OnlineView from '../views/OnlineView'
import ContactView from '../views/ContactView'
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
    component: TabsView,
    children: [
      {
        path: 'orderview',
        component: OrderView,
        name: 'orderview',
        meta: {
          title: '订单管理'
        }
      }, {
        path: 'onlineview',
        component: OnlineView,
        name: 'onlineview',
        meta: {
          title: '在线验厂'
        }
      }, {
        path: 'contactview',
        component: ContactView,
        name: 'contactview',
        meta: {
          title: '联系我们'
        }
      }
    ]
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
