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
        name: 'orderview'
      }, {
        path: 'onlineview',
        component: OnlineView,
        name: 'onlineview'
      }, {
        path: 'contactview',
        component: ContactView,
        name: 'contactview'
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

export default router
