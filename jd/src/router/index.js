import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from "@/views/HomeView";
import AboutView from '@/views/AboutView'
import ProductDetails from '@/views/ProductDetails'
import Erro from '@/views/ErroView'
import shoppingCarView from "@/views/shoppingCarView";
import BillingView from "@/views/BillingView";
import PayView from "@/views/PayView";
import OrderManagement from "@/views/OrderManagement"
import ForgotPassword from  "@/views/ForgotPassword"
import RegistrationPassword from "@/views/RegistrationPassword";
const routes = [
  {
    path: '/',
    name: 'about',
    redirect:'/home',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
  ,
  {
    path: '/home',
    name: 'home',
    component:HomeView,
    meta:{
      gorouter:true
    }
  },
  {
    path: '/ProductDetails',
    name: 'ProductDetails',
    component:ProductDetails,
    meta:{
      gorouter:true
    }
  },
  {
    path: '/Erro',
    name: 'Erro',
    component: Erro,
    meta:{
      gorouter:true
    }
  },
  {
    path:'/shoppingCar',
    name: 'shoppingCar',
    component: shoppingCarView,
    meta:{
      gorouter:true
    }
  },
  {
    path: '/billing',
    name: 'billing',
    component: BillingView,
    meta:{
      gorouter:true
    }
  },
  {
    path: '/pay',
    name:'pay',
    component: PayView,
    meta:{
      gorouter:true
    }
  },
  {
    path: '/OrderManagement',
    name:'OrderManagement',
    component: OrderManagement,
    meta:{
      gorouter:true
    }
  },
  {
    path: '/ForgotPassword',
    name:'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/RegistrationPassword',
    name:'RegistrationPassword',
    component: RegistrationPassword
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,


})

router.beforeEach((to, from, next) => {
  if (to.path==='/login' || to.path==='/ForgotPassword' ||to.path==='/RegistrationPassword') return next()

  var token=window.localStorage.getItem('token_jzh')

  console.log(token)
if (to.meta.gorouter){
  if (token==''){
    return next('/login')
  }else {
    next()
  }
}
 // console.log(token)


})


export default router
