import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)


import Swiper from './components/home/Swiper.vue'
import Search from './components/search/Search'
import Classify from './components/search/Classify'
import Login from './components/home/Login'
import Myjd from './components/home/My_jd'
import Pin from './components/home/Pin'
import Cart from './components/home/Cart'
import Product from './components/product/Product'
import Class_cart from './components/search/Class_cart'
import Class_details from './components/search/Class_details'
import NotFound from './components/common/NotFound'


export default new Router({
  mode: 'history',    // 路由模式  改变加载的方式为 history   默认为 hash模式 '#'
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', name:'home', component: Swiper, meta: {index: 5, showFooter: true,showHeader: true, title: 'home'}},  //meta {index}  设置层级来控制公共组件 显示与隐藏
    {path: '/search', component: Search, name: 'search', meta: {index: 1, showFooter: false, showHeader: false, title: 'search'}},
    {path: '/classify', component: Classify, name: 'classify', meta: {index:5, showFooter: false, title: 'classify'}},
    {path: '/login', name:'login', component: Login, meta: {title: 'login'}},
    {path: '/myjd', name:'myjd', component: Myjd, meta: {
      requireAuth: true, title: 'myjd'
    }},
    {path: '/pin', name: 'pin', component: Pin, meta: {title: 'pin'}},
    {path: '/cart', name: 'cart', component: Cart, meta: {title: 'cart'}},
    {path: '/product', name: 'product', component: Product, meta: {title: 'product'}},
    {path: '/ClassCart', name: 'ClassCart', component: Class_cart, meta: {title: 'classCart'}},
    {path: '/ClassDetails', name: 'ClassDetails', component: Class_details, meta: {title: 'classDetails'}},
    {path: '/*', component: NotFound},
  ]
})
