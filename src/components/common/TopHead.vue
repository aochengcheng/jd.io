<template>
  <div class="header">
      <!-- 根据 name属性 进行页面的跳转 -->
      <a href="#" class="back" @click.prevent="toHome"></a>  
      <span class="jd-go">
        <slot name="title"></slot>
      </span>
      <!-- <a href="#" class="dian" @click.prevent="">
        <img src="http://127.0.0.1:3003/myjd/dian.png" alt="">
      </a> -->
      <a href="#" class="login red" style="background: url(http://127.0.0.1:3003/img/diandian.png) no-repeat center / 20px" @click.prevent="" slot="search" @click="show = !show">  
          <ul class="smallCut" v-show="show">
            <li>
              <router-link to="/home">
                <span></span>
                <strong>首页</strong>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span></span>
                <strong>分类搜索</strong>
              </router-link>
            </li>
            <li>
              <router-link to="/cart">
                <span></span>
                <strong>购物车</strong>
              </router-link>
            </li>
            <li>
              <router-link :to="store ? '/myjd' : '/login'">
                <span></span>
                <strong>我的京东</strong>
              </router-link>
            </li>
            <li>
              <router-link to="">
                <span></span>
                <strong @click.prevent="logout" v-text="store ? '退出登录': '浏览记录'"></strong>
              </router-link>
            </li>
          </ul> 
      </a>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        show: false,
        store: this.$store.state.isLogin
      }
    },
    methods: {
      toHome() {
        location.href = '/home'
        // this.$router.go(-1)
      },
      logout() {
        console.log('退出登录')
        this.$store.commit('isLogin', '')
        location.href = '/home'
      }
    }
  }
</script>
<style>

.header {
height: 45px;
line-height: 45px;
font-size: 20px;
background-color: #fff;
text-align: center;
position: relative;
}
.jd-go {
font-size: 16px;
}
.back {
position: absolute;
left: 10px;
top: 13px;
background: url(http://127.0.0.1:3003/login/left.png) no-repeat;
background-size: 22px;
width: 28px;
height: 22px;
}

.dian {
position: absolute;
right: 0;
top: 0;
width: 20px;
height: 20px;
line-height: 10px;
margin: 10px;
}
.dian img {
width: 100%;
display: inline-block;
}
</style>

