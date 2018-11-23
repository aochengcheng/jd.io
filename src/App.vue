<template>
  <div id="app" class="fillcontain">
    <!-- 顶部功能 -->

    <jd-header v-if="header_show" v-show="$route.meta.showHeader">
      <i class="jd-logo"  slot="jd_logo"></i>
      <i class="jd-quan" slot="jd_quan"></i>
      <input type="text" class="" @click="goSearch"   placeholder="京东超级品牌日 超级狂欢GO" slot="jd_input">
    </jd-header>


    <keep-alive>
      <transition mode="out-in">
         <router-view @userSign="userSign" class="ctx"></router-view>
      </transition>     
    </keep-alive>
    
    <!-- 底部功能 -->
    <jd-footer v-if="footer_show" v-show="$route.meta.showFooter" :mt="mt">
      <img src="http://127.0.0.1:3003/img/index.png" alt="" slot="page">
      <img src="http://127.0.0.1:3003/img/fenlei.png" alt="" slot="fenlei">
      <img :src="img_url" alt="" width="80%" slot="vv">
    </jd-footer>
  </div>
</template>

<script>
// import './assets/css/base.css'
import JdHeader from './components/body/Header'
import JdFooter from './components/body/Footer'
export default {
  name: 'App',

  data() {
    return {
      header_show: true,
      footer_show: true,
      // userName: sessionStorage.userName,
      img_url: 'http://127.0.0.1:3003/img/money.png',
      mt: true,
      userName: ''
    }
  },
  methods: {
    userSign(userName) {
      console.log('父组件的方法')
      // sessionStorage.userName = userName
      // this.userName = sessionStorage.userName
    },
    public_header: function (bool) {
      this.header_show = bool
    },
    public_footer: function (bool) {
      this.footer_show = bool
    },
    goSearch() {
      this.$router.push({
        path: '/search',
        name: 'search'
      })
    },
    
    scroll() {
      window.onscroll = function () {
            var opacity = 0
            var box = document.querySelector('.jd-search-box')
            var container = document.querySelector('.home-container').offsetHeight

            var top = document.documentElement.scrollTop || window.pageYOffset || window.scrollY
            if (top < container) {
              opacity = top / container * 0.85
            } else {
              opacity = 0.85
            }
            box.style.background = `rgba(201, 21, 35, ${opacity})`

          } 
    },

    userInfo() {
      // var store =
      // console.log(store)
    }
    
  },

  components: {
    JdHeader,
    JdFooter
  },
  created() {
        //在页面加载时读取localStorage里的状态信息
    sessionStorage.getItem("userMsg") && this.$store.replaceState(JSON.parse(sessionStorage.getItem("userMsg")));
    
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",() => {
        sessionStorage.setItem("userMsg",JSON.stringify(this.$store.state))
    })

  },
  mounted() {
     var a = this.$store.state.isLogin
  },
  destroyed() {
    this.scroll = null
  },
};
</script>

<style>
  .fillcontain {
    min-width: 320px;
    max-width: 640px;
    margin: 0 auto;
    /* overflow-x: hidden; */
  }

  .v-enter,
  .v-leave-to {
    opacity: 0;
    transform: translateX(100%)
  }
  .v-leave-to {
    opacity: 0;
    /* position: absolute; */
    /* z-index: inherit; */
    transform: translateX(-100%)
  }

  .v-enter-active,
  .v-leave-active {
    transition: all .5s  ease 
  }
</style>