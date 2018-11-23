<template>
  <div class="my-jd">
    <top-head>
      <span slot="title">我的京东</span>
    </top-head>

    
    <div class="wrapper">
<!-- 用户信息 -->
      <div class="user-info">
        <div class="user-box">
          <div>
            <div class="head">
              <div class="">
                <img src="http://127.0.0.1:3003/myjd/head.png" alt="">
              </div>
              <span>待实名认证</span>
            </div>       
            <div class="user-txt">
                <div class="my-header-msg">
                  <span>{{ userPhone }}</span>
                  <a href="#"></a>
                </div>
                <div class="my-header-pin">
                  用户名：{{ userName }}
                </div>
                <div class="my-header-info">
                    <a href="#">
                      京享值201
                    </a>
                    <a href="#">
                      小白信用60.3
                    </a>
                    <a href="#" class="vip">
                      <div>
                        尊享8大特权
                      </div>
                    </a>
                </div>           
            </div>
             <a href="#"></a>
          </div>
        </div>

      </div>

      <!-- 订单信息 -->
      <section class="my-section">
        <div class="my-f">
          <a href="#">
            <span>待付款</span>
          </a>
          <a href="#">
            <span>待收货</span>
          </a>
          <a href="#">
            <span>退款/售后</span>
          </a>
          <a href="#">
            <span>全部订单</span>
          </a>
        </div>
      </section>

      <!-- 我的钱包 -->
      <section class="my-section">
        <div class="my-p">
          <a href="#">
            <p class="jd-hot">0张</p>
            <p>京东券</p>
          </a>
          <a href="#">
            <p class="jd-hot no">开箱有礼</p>
            <p>白条</p>
          </a>
          <a href="#">
            <p class="jd-hot">0个</p>
            <p>京豆</p>
          </a>
          <a href="#">
            <p class="jd-hot">0张</p>
            <p>礼品卡</p>
          </a>
          <a href="#">
            <!-- <p>0张</p> -->
            <p>全部资产</p>
          </a>
        </div>
      </section>
      <!-- 关注的 -->
      <section class="my-section">
        <div class="my-focus">
          <a href="#">
            <span>0</span>
            关注的商店
          </a>
          <a href="#">
            <span>0</span>
            关注的店铺
          </a>
          <a href="#">
            <span>5</span>
            我的足迹
          </a>
        </div>
      </section>

      <!-- 应用推荐 -->
      <section class="my-section">
        <ul class="my-y clearFix">
          
          <li>
            <a href="#">
              <span>
                <img src="http://127.0.0.1:3003/myjd/fuli.png" alt="">
              </span>
              <span>用户福利</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <img src="http://127.0.0.1:3003/myjd/huoche.png" alt="">
              </span>
              <span>京东火车票</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <img src="http://127.0.0.1:3003/myjd/yuyue.png" alt="">
              </span>
              <span>我的预约</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <img src="http://127.0.0.1:3003/myjd/tuijian.png" alt="">
              </span>
              <span>应用推荐</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <img src="http://127.0.0.1:3003/myjd/huafei.png" alt="">
              </span>
              <span>京东通信营业厅</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <img src="http://127.0.0.1:3003/myjd/jipiao.png" alt="">
              </span>
              <span>京东机票</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <img src="http://127.0.0.1:3003/myjd/jiudian.png" alt="">
              </span>
              <span>京东酒店</span>
            </a>
          </li>
        </ul>
      </section>

      <!-- 客户服务 -->
      <section class="my-section">
        <a href="#" class="kehu">
          <span>客户服务</span>
          <i></i>
        </a>
      </section>

    </div>


    <jd-footer :img_url="img_url" :mt="mt" >
      <img src="http://127.0.0.1:3003/myjd/index.png" alt="" slot="page">

      <img src="http://127.0.0.1:3003/img/fenlei.png" alt="" slot="fenlei">

      <img :src="img_url" alt="" slot="vv">

      <img :src="me" alt="" slot="me">
    </jd-footer>
  </div>
</template>

<script>
import TopHead from '../common/TopHead'
import JdFooter from '../body/Footer'
export default {
  data() {
    return {
      img_url: 'http://127.0.0.1:3003/myjd/pingo.png',
      mt: false,
      me:'http://127.0.0.1:3003/myjd/me.png',
      userName: '',
      userPhone: ''
    }
  },
  methods: {
    signIn() {
        this.$http.get('http://127.0.0.1:3003/userin')
            .then(function (result) {
              console.log(result)
              
            })
      },
     checkLogin() {
        this.$http.get('http://127.0.0.1:3003/checkLogin')
          .then(function (result) {
            console.log(result)
          })
      },
      getInfo() {
        console.log(this.$store.state.isLogin)
          var {userName, userPhone} = this.$store.state.isLogin
          this.userName = userName
          this.userPhone = userPhone
      }
  },
  created() {  
  },
  mounted() {
    this.signIn()
    this.getInfo()
  },
  components: {
      JdFooter,
      TopHead
  }
}
</script>

<style scoped>
  @import '../../../static/css/myjd.css';
</style>
