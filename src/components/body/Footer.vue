<template>
     <footer class="jd-foot">
      <router-link to="/home">
        <div>
          <!-- <img src="http://127.0.0.1:3003/img/index.png" alt=""> -->
          <slot name="page"></slot>
        </div>
      </router-link>
      <router-link to="/classify" >
        <div>
          <!-- <img src="http://127.0.0.1:3003/img/fenlei.png" alt=""> -->
          <slot name="fenlei"></slot>
        </div>
      </router-link>
      <router-link to="/pin">
        <div :class="{z: mt}">
          <!-- <img :src="img_url" alt="" width="80%"> -->
          <slot name="vv"></slot>
        </div>
      </router-link>
      <router-link to="/cart">
        <div>
          <img src="http://127.0.0.1:3003/img/cart.png" alt="">
        </div>
      </router-link>
      <router-link :to="userName ? '/myjd' : '/login'" @click="">
        <div>
          <img :src="userName ? 'http://127.0.0.1:3003/img/5aa10cf6Nee5122a5.png':'http://127.0.0.1:3003/img/login.png'" alt="">
          <!-- <slot name="me" v-show="userName = !userName"></slot> -->
        </div>
      </router-link>
    </footer>
</template>

<script>
export default {
  data() {
    return {
      userName: false
    }
  },
  props: ['img_url','mt','me'],
  methods: {
    c() {
      console.log(this.img_url)
    },
    getInfo() {
      if (this.$store.state.isLogin) {
        var {userName} = this.$store.state.isLogin
        if (userName) {
          this.userName = true
        } else {
          this.userName = false
        }
      }
    }
  },
  created() {
    this.getInfo()
  },
}
</script>

<style>
/* 底部 */
.jd-foot {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: #fff;
  z-index: 100
}
.jd-foot a {
  width: 20%;
}
.jd-foot img {
  display: block;
  width: 4.6em;
  margin: 0 auto;
}
.jd-foot .z {
  margin-top: -20px;
}
</style>
