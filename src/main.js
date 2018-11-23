// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Login from './components/home/Login'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.config.productionTip = false


import 'mint-ui/lib/style.css'

import './lib/css/base.css'
// 导入mint-ui 
import mintUI from 'mint-ui'
Vue.use(mintUI)

// 发送 ajax 请求库   vue-resource
import VueResource from "vue-resource";
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;
// //#配置VueResource 服务器根目录
// Vue.http.options.root = "http://127.0.0.1:3003/"

Vue.use(Vuex)

// 全局指令
Vue.directive('fixed', {
  inserted (el, binding) {
    window.onscroll = function () {
      var top = document.documentElement.scrollTop
      // 390
      if (top > binding.value) {
        el.style.cssText = `position:fixed;top:0;left:0;z-index:1111`
        el.classList.add('in')
      } else {
        el.style.position = 'relative'
        el.classList.remove('in')
      }
    }
  }
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

function storeSessionStore (state) {
  window.sessionStorage.setItem("userMsg",JSON.stringify(state));
}

const store = new Vuex.Store({
  state: {
    isLogin: {},
    token: '',
    count: 0   // 商品数量
  },
  mutations: {
    increment: function (state) {
      state.count ++
    },
    reduct: function (state) {
      state.count --
    },
    isLogin: function (state, is) {
      state.isLogin = is
      // storeSessionStore (state)
    }
  }
})



/* eslint-disable no-new */
new Vue({
  
  router,
  store,
  render: h => h(App),
 
}).$mount('#app')
