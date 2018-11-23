<template>
    <!-- 顶部功能 -->
    <header class="jd-search">
        <div class="jd-search-box">
          <a href="#" class="icon-logo" @click.prevent="goClassify" >
           <img src="http://127.0.0.1:3003/img/menu.png" alt="">
          </a>
          <slot name="goHome"></slot>

          <form action="#" class="jd-search-form">
            
            <slot name="jd_logo"></slot>

  
            <slot name="jd_quan" :ys="tb"></slot>


            <slot name="jd_input"></slot>
          </form>

          <a href="#" class="login" v-show="uname" @click.prevent="$router.push('/login')">
            登录
          </a>
          <a href="#" class="login" v-show="!uname" @click.prevent="$router.push('/myjd')">
            <img src="../../../static/image/m.png" alt="">
          </a>

      
          <slot name="search"></slot>
          

          <a href="#" class="userin">
            <img src="http://127.0.0.1:3003/login/userin.png" alt="">
          </a>

          
          <slot name="search_icon"></slot>

          <a href="#" class="login diandian" @click.prevent="dian = false">
            <img src="http://127.0.0.1:3003/img/diandian.png" alt="">
          </a>

        </div>
    </header>
</template>

<script>
export default {
  data() {
    return {
     dian: false,
     tb: true,
     uname: true
    };
  },
   methods: {
    goLogin() {
      this.$router.push('/login')
      this.tb = false
    },
    goClassify() {
      this.$router.push('/classify')
      this.show = true
      this.dian = true
    },
    goSearch() {
      this.$router.push({
        path: '/search',
        name: 'search'
      })
    },
    getInfo() {
      if (this.$store.state.isLogin) {
        var a = this.$store.state.isLogin.userName
        if (a) {
          this.uname = false
        }
      }
    }   
  },
  mounted() {
    this.getInfo()
  }
};
</script>
<style scored>
@import '../../../static/css/header.css';

</style>
