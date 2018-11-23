<template>
  <div class="home-container">
    <mt-swipe  :auto="4000">
      <mt-swipe-item v-for="(item, index) in img" :key="item.sid">
          <img :src=" 'http://127.0.0.1:3003/' + item.img_url" class="ban" />
      </mt-swipe-item>
    </mt-swipe>  

    <!-- maomao -->
    <div class="jd-maomao">
      <div class="mao-box">
        <img src="http://127.0.0.1:3003/cardImg/topGIF.gif" alt="">
        <ul class="products-pic">
          <li>
            <img src="http://127.0.0.1:3003/cardImg/iphonexs.jpg" alt="">
          </li>
           <li>
            <img src="http://127.0.0.1:3003/cardImg/camera.jpg" alt="">
          </li>
           <li>
            <img src="http://127.0.0.1:3003/cardImg/mi.jpg" alt="">
          </li>
        </ul>
      </div>
    </div>

    <!-- cards -->
    <div class="jd-cards">
      <div class="cards-box">
        <div class="cards-bg">
          <img src="http://127.0.0.1:3003/cardImg/bg.jpg" alt="">
        </div>
        <div class="cards-items">
          <a href="#" v-for="(item, index) in cards" :key="item.jid">
            <img :src="host + item.img_url " alt="">
            <span v-text="item.title"></span>
          </a>
        </div>
      </div>
    </div>

    <!-- floor 3 -->
    <div class="miao">
      <a href="#" class="miaosha">
        <img :src="host + '/cardImg/jd-miaosha.jpg'" alt="">
      </a>
      <div class="dd">
        <ul>
          <li>
            <a href="#">
              <span class="hot">HOT</span>
              <span class="content">为啥女生洗澡要一个小时，男生只要15分钟。</span>
            </a>
          </li>
        </ul>
      </div>
      <a href="#" class="more">更多</a>
    </div>

    <!-- floor 4 -->
    <div class="fl4">
      <div>
        <a href="#">
          <img :src="host + '/cardImg/choujiang.jpg'" alt="">
        </a>
        <a href="#">
          <img :src="host + '/cardImg/99baoyou.jpg'" alt="">
        </a>
        <a href="#">
          <img :src="host + '/cardImg/fuli.jpg'" alt="">
        </a>
      </div>
    </div>

    <!-- floor 5 -->
    <div class="fl5">
      <div>
        <div class="top">
          <strong class="m">京东秒杀</strong>
          <strong class="t">20点场</strong>
          <div class="timebox">
            <div class="time">
              20
            </div>
            <span>
              :
            </span>
            <div class="time">
              00
            </div>
            <span>
              :
            </span>
            <div class="time">
              00
            </div>
          </div>
          <div class="more-kill">
            <a href="#">
              更多秒杀
            </a>
            <i></i>
          </div>
        </div>
        <div class="bottom swiper-container">
          <ul class="mySwiper-ul swiper-wrapper">
            <li class="mySwiper-li swiper-slide" v-for="(item, index) in seckill" :key="item.gid">
              <div>
                <img :src="host + item.img_url" alt="">
                <p class="new">
                  <span>￥</span>
                  <span v-text="item.product_price_new"></span>
                </p>
                <p class="old">
                  <span>￥</span>
                  <span v-text="item.product_price_old"></span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- floor 6 -->
    <div class="fl6" ev="d">
      <div>
        <a href="#">
          <img :src="host + '/fl6/jijie.gif'" alt="">
        </a>
      </div>
    </div>

    <!-- floor7 -->
    <div class="fl7">
      <div>
        <a href="#">
          <img :src="host + '/fl6/shijianzhou.jpg'" alt="">
        </a>
      </div>
    </div>

    

  </div>   
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper'
import JdHeader from '../body/Header'
import JdFooter from '../body/Footer'
export default {
  data() {
    return {
      host: "http://127.0.0.1:3003",
      img: {},
      // cards
      cards: {},
      // seckill
      seckill: {}
    };
  },
  methods: {
    // 京东秒杀图片
    getSeckillImg() {
      this.$http.get(this.host + '/seckill')
          .then(function (result) {
            this.seckill = result.body
          })
    },
    // cards 图片
    getCardsImg() {
      this.$http.get("http://127.0.0.1:3003/cards").then(function(result) {
        this.cards = result.body;
        // console.log(this.cards);
      });
    },

    // 获取轮播图图片
    getImg() {
      this.$http.get("http://127.0.0.1:3003/ss").then(function(result) {
        let img = result.body;
        this.img = img;
      });
    }
  },
  created() {
    this.getImg();
    this.getCardsImg();
    this.getSeckillImg()
  },

  mounted() {
    var mySwiper = new Swiper('.swiper-container', {
        // slidesPerGroup: 1,
        freeMode: true,
        freeModeMomentum: true
    }) 
  },
  components: {
     JdHeader,
    JdFooter
  }
};
</script>

<style scored>
@import '../../../static/css/swiper.css';
</style>
