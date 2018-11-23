<template>
  <div class="pin">
    <top-head>
      <span slot="title">拼购11.11</span>
    </top-head>

    <div class="wrapper">
      <div class="bigImg">
        <div class="head-map">
          <span class="head-map-l">

          </span>
          <ul class="head-txt">
            <li class="a">
              <div>10.25拼购日</div>
              <div>好货1元拼</div>
            </li>
            <li class="a">
              <div>11.1-11.9</div>
              <div>2折买大牌</div>
            </li>
            <li>
              <div>11.10-11.15</div>
              <div>福利狂欢</div>
            </li>
          </ul>
          <span class="more">
            更多攻略
          </span>
        </div>

        <div class="head-yuyue">
          <ul>
            <li>
              <a href="#">电动牙刷低至￥9.9</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="nav-bar" v-fixed="390">
        <div class="bb" :style="{height: rotate ? 'auto' : '2rem'}">
          <div class="scrollX">
            <div class="inner" :style="{height: (rotate ? 'auto': ''), whiteSpace: (rotate ? 'normal': 'nowrap')}">                      
                <div class="skill">
                  攻略
                </div>             
              <a href="#top"  class="one">
                今日必拼
              </a>
              <a href="#cate3">
                工厂直销
              </a>
              <a href="#">
                1元拼
              </a>
              <a href="#">
                爆款好货
              </a>
              <a href="#">
                名牌特卖
              </a>
              <a href="#">
                9.9元拼
              </a>
              <a href="#">
                好物种草
              </a>
              <a href="#">
                热销会场
              </a>
              <a href="#">
                精选大牌
              </a>
              <a href="#">
                人气团
              </a>
            </div>
          </div>
          <a href="javascript:;" class="jian" :class="{ro: rotate}" @click="rotate = !rotate"></a>
        </div>
      </div>

      <div class="cate1">
        <div class="box">
          <div class="mask"></div>
          <div class="top" id="top">
            <h3>11.11热销榜单</h3>
            <p>人气TOP必囤清单</p>
          </div>
          <ul class="bom">
            <li v-for="(item, index) in pin" :key="index" @click.prevent="$router.push('/product?id=' + item.pid)">
              <a href="#">
                <div class="img-box">
                  <img :src="'http://127.0.0.1:3003' + item.img_url" alt="">
                </div>

                <div class="txt-box">
                  <div class="txt">
                    {{ item.details }}
                  </div>
                  <div class="price">
                    <div class="new">
                      2人拼 ￥ <span>{{ item.new_price }}</span>.90
                    </div>
                    <div class="old">
                      {{ item.old_price.toFixed(2) }}
                    </div>
                    <div class="go">
                      去开团
                    </div>
                  </div>
                  
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="cate2">
        <ul>
          <li>
            <a href="#">
              <img src="../../assets/img/pin/5be84bc7Nba2c18f5.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="#">
              <img src="../../assets/img/pin/1faff97b20515f37.jpg" alt="">
            </a>
          </li>
        </ul>
      </div>

      <div class="cate3">
        <div id="cate3">
          <div class="cate3-g">
            <span>工厂直供</span>
          </div>
          <div class="cate3-y">优质工厂 商家源头让利</div>
        </div>
      </div>

      <div class="cate4">
        <div v-for="item in gc">
          <div class="details">
            <div class="tit">
              {{ item[0].title }}
            </div>
            <div class="det">{{ item[0].details }}</div>
          </div>
          <ul class="pro">
            <li v-for="items in item[1]">
              <a href="#">
                <div class="pics">
                  
                  <img :src="items.img_url" alt="">
                </div>
                <div class="data">
                  <p class="data_d">
                    {{ items.goods_det }}
                  </p>
                  <p class="data_new">
                    2人拼 ￥ {{ items.price_new }}
                  </p>
                  <p class="data_old">
                    ¥{{ items.price_old }}
                  </p>
                </div>
              </a>
            </li>
            
          </ul>
        </div>
      </div>

      <div class="cate5 cate2">
        <ul>
          <li>
            <a href="#">
               <img src="../../assets/img/pin/1faff97b20515f37.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="#">
               <img src="../../assets/img/pin/5be84bc7Nba2c18f5.jpg" alt="">
            </a>
          </li>
        </ul>  
      </div>

    </div>
    
  </div>
</template>

<script>
import TopHead from "../common/TopHead";
import axios from 'axios'
export default {
  data() {
    return {
      pin: {},
      gc: {},
      rotate: false,
      show: false
    };
  },
  components: {
    TopHead
  },
  methods: {
    getJson() {
      this.$http.get('../../../static/pin.json')
        .then(function (result) {
          this.gc = result.body
          console.log(this.gc)
        })
    },

    getImg() {
      this.$http.get('http://127.0.0.1:3003/pingo')
        .then(function (result) {
          this.pin = result.body
        })
    }
  },
  mounted() {
    this.getImg()
    this.getJson()
  },
  // directives: {
  //   fixed: {
  //     inserted: function (el) {
  //       // window.onscroll = function () {
  //       //   var top = document.documentElement.scrollTop
  //       //   if (top > 390) {
  //       //     el.style.cssText = `position:fixed;top:0;left:0;z-index:1111`
  //       //     el.classList.add('in')
  //       //   } else {
  //       //     el.style.position = 'relative'
  //       //     el.classList.remove('in')
  //       //   }
  //       // }
  //     }
  //   }
    
  // }
};
</script>

<style>

 html {
  font-size: 5.3333vw;
}
@media (min-width: 640px) {
  html {
    font-size: 34px;
  }
}
.pin .wrapper {
  background: #ff492a;
}
@media (max-width: 320px) {
  html {
    font-size: 17px;
  }
}
.pin .wrapper .bigImg {
  height: 15.15rem;
  width: 100%;
  background: url(../../assets/img/pin/b7686f53915e1bc1.jpg) no-repeat center /
    cover;
  position: relative;
}

.pin .wrapper .bigImg .head-map {
  background: #ef6367;
  display: flex;
  width: 17.75rem;
  height: 1.85rem;
  margin: 0 auto;
  justify-content: space-between;
}
.pin .wrapper .bigImg .head-map .head-map-l {
  width: 1.85rem;
  height: 1.85rem;
  display: inline-block;
  background: url(../../assets/img/pin/5bbf7f2fNe5afcae5.jpg) no-repeat center /
    cover;
}

.pin .wrapper .bigImg .head-map .head-txt {
  max-width: 12.6rem;
  display: inline-block;
}
.pin .wrapper .bigImg .head-map .head-txt li {
  display: inline-block;
  color: #fff;
  font-size: 0.6rem;
  padding: 0 0.35rem;
  height: 1.85rem;
  text-align: center;
  position: relative;
}
.pin .wrapper .bigImg .head-map .head-txt li.a::after {
  content: "";
  width: 0.4rem;
  height: 0.65rem;
  position: absolute;
  right: -0.2rem;
  top: 0.5rem;
  background: url(../../assets/img/pin/5bb03b20Nf9b7dc3c.png) no-repeat -11px -5px;
  margin-left: 0.15rem;
}
.pin .wrapper .bigImg .head-map .more {
  display: inline-block;
  background-color: #c43255;
  color: #fff;
  height: 1.625rem;
  font-size: 0.55rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.7rem;
  border-radius: 20px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin-top: 0.15rem;
  padding: 0 0.6rem 0 0.2rem;
}
.pin .wrapper .bigImg .head-map .more::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0.46rem;
  background: url(../../assets/img/pin/5bb03b20Nf9b7dc3c.png) no-repeat -11px -5px;
  width: 0.4rem;
  height: 0.65rem;
}
.pin .wrapper .bigImg .head-yuyue {
  width: 14rem;
  height: 1.9rem;
  position: absolute;
  top: 11.9rem;
  left: 50%;
  margin-left: -7rem;
  background: url(../../assets/img/pin/5baf6ebeNa088e810.png) no-repeat;
  background-size: 100% 100%;
  text-align: center;
}

.pin .wrapper .bigImg .head-yuyue a {
  font-size: 0.85rem;
  text-align: center;
  line-height: 1.8rem;
  font-weight: 700;
}

.pin .nav-bar {
  width: 100%;
}
.pin .nav-bar .bb {
  position: relative;
  width: 18.75rem;
  height: 2rem;
  background-color: #ffffff;
  font-size: 0;
  left: 50%;
  top: 0;
  margin-left: -9.375rem;
  overflow: hidden;
  transition: all .5s;
}
.pin .nav-bar .scrollX {
  position: relative;
  width: 18.75rem;
  overflow: scroll;
}
.pin .nav-bar .jian {
  display: block;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
}
.ro {

}
.pin .nav-bar .jian.ro::after {
    transform: rotate(180deg)
}
.pin .nav-bar .jian::after {
  content: "";
  display: block;
  width: 0.65rem;
  height: 0.375rem;
  transition: all 0.2s linear;
  background: url(../../assets/img/pin/a74480a3af6c684f.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 42%;
  left: 38%;
    transform-origin: center center;
}
.pin .nav-bar .scrollX .inner {
  height: 40px;
  white-space: nowrap;
}
.v-enter,
.v-leave-to {
  width: 0;
}
.v-enter-active,
.v-leave-active {
  width: 3rem;
}
.pin .nav-bar .scrollX .inner .skill {
  width: 0rem;
  height: 2rem;
  line-height: 2rem;
  color: #fff;
  text-align: center;
  font-weight: bold;
  background: url(../../assets/img/pin/5bc5bffdN80792c82.png) no-repeat center / cover;
  display: inline-block;
  vertical-align: top;
  font-size: .8rem;
  transition: all .5s
}
.pin .nav-bar.in .scrollX .inner .skill {
  width: 3rem;
}
.pin .nav-bar .scrollX .inner a {
  position: relative;
  font-size: 14px;
  width: 4rem;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #3d3d3d;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}
.pin .nav-bar .scrollX .inner .one {
  color: #fb6030;
  padding-left: 1rem;
  background: url(../../assets/img/pin/13a199f471cb72a1.png) 0.4rem 0.4rem
    no-repeat;
  background-size: 0.5rem;
}
.pin .nav-bar .scrollX .inner .one::before {
  content: "";
  position: absolute;
  background: url(../../assets/img/pin/cd965a78405493fb.png);
  background-size: 100% 100%;
  line-height: 10px;
  width: 1rem;
  height: 0.7rem;
  top: 0;
  right: 0;
}
.pin .nav-bar .scrollX .inner a:last-child {
  margin-right: 50px;
}

.pin .cate1 .box {
  width: 18.75rem;
  background: url(../../assets/img/pin/b7ecfc81b4492150.png),url(../../assets/img/pin/5badc8ecNfa3ec97a.png);
  background-repeat: no-repeat no-repeat;
  background-size: 18.75rem 5.75rem, 18.75rem 2.375rem;
  background-position: 0 0, bottom center;
  padding-bottom: 2rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.25rem;
}
.pin .cate1 .box .mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.5rem;
  z-index: -1;
  background-color: #fff;
}
.pin .cate1 .box .top {
  width: 12.25rem;
  height: 4.5rem;
  margin: 0 auto;
  text-align: center;
  background: url(../../assets/img/pin/5bada1adN38f6c46e.png) 0 1.8rem no-repeat;
  background-size: 12.25rem 2.5rem;
  position: relative;
}

.pin .cate1 .box .top h3 {
  font-size: 0.9rem;
  height: 3rem;
  line-height: 4.7rem;
  font-weight: 700;
  color: #e96728;
  display: block;
}
.pin .cate1 .box .top p {
  font-size: 0.7rem;
  color: #999999;
  font-weight: 700;
  display: block;
}

.pin .cate1 .box .bom {
  width: 17.6rem;
  margin: 0.3rem auto 0;
  background-color: #ffede7;
}
.pin .cate1 .box li {
  display: inline-block;
  margin-bottom: 2rem;
  vertical-align: top;
  width: 7.5rem;
  position: relative;
}
.pin .cate1 .box li:nth-child(2n + 1) {
  margin-left: 0.75rem;
  margin-right: 1rem;
}
.pin .cate1 .box li:nth-child(2n + 1)::after {
  content: '';
  width: 18.75rem;
  height: 0.45rem;
  position: absolute;
  bottom: -1.2rem;
  left: -1.2rem;
  background: url(../../assets/img/pin/5bade192Need578b2.png) no-repeat;
  background-size: 100% 100%;
}
.pin .cate1 .box li:nth-last-child(2)::after {
  content: '';
  width: 0;
  height: 0;
  background: '';
}
.pin .cate1 .box li:nth-last-child(2),
.pin .cate1 .box li:nth-last-child(1) {
  margin-bottom: 0;
}
.pin .cate1 .box li a {
}
.pin .cate1 .box li a .img-box {
  height: 7.5rem;
  width: 7.5rem;
}
.pin .cate1 .box li a .img-box img {
  width: 100%;
  display: block;
}
.pin .cate1 .box li a .txt-box {
  width: 7rem;
  margin: 0.5rem auto 0;
  position: relative;
}
.pin .cate1 .box li a .txt-box .txt {
  font-size: 0.6rem;
  min-height: 1.6rem;
  color: #000000;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
}
.pin .cate1 .box li a .txt-box .price {
}
.pin .cate1 .box li a .txt-box .new {
  color: #ff1111;
  font-size: 0.55rem;
  margin: 0.2rem 0;
}
.pin .cate1 .box li a .txt-box .old {
  font-size: 0.5rem;
  color: #aaaaaa;
  margin-left: 0.4rem;
  text-decoration: line-through;
}
.pin .cate1 .box li a .txt-box .go {
  width: 2.9rem;
  height: 1.25rem;
  border-radius: 50px;
  background-color: #ff521d;
  color: #ffffff;
  text-align: center;
  line-height: 1.3rem;
  position: absolute;
  right: 0;
  bottom: 0.1rem;
}

.pin .cate2 ul {
  margin: 0 auto .25rem;
  width: 17.75rem;
  font-size: 0
}
.pin .cate2 ul li {
  display: inline-block;
  width: 8.75rem;
  height: 5rem;
  margin-right: .25rem;
  margin-bottom: .25rem;
}
.pin .cate2 ul li:last-child {
  margin-right: 0;
}
.pin .cate2 ul li a {
  display: block;
  width: 100%;
}
.pin .cate2 ul li a img {
  display: block;
  width: 100%;
}

.pin .cate3>div {
  height: 3.75rem;
  background: url(../../assets/img/pin/5bada1adN38f6c46e.png) no-repeat center / 12.25rem 2.5rem;
}
.pin .cate3>div .cate3-g {
  text-align: center;
  font-size: .9rem;
  font-weight: 700;
  letter-spacing: .1rem;
}
.pin .cate3>div .cate3-g span {
  color: #ffe98f;
  margin-top: 1rem;
  display: inline-block;
}
.pin .cate3>div .cate3-y {
  color: #ffba6c;
  text-align: center;
  font-size: .6rem;
  margin-top: .1rem;
  letter-spacing: .1rem
}

.pin .cate4>div {
  width: 17.75rem;
  background-color: #f7f7f7;
  margin: 0 auto .25rem;
  border-radius: 15px;
}
.pin .cate4>div .details {
  width: 16.75rem;
  height: 3.1rem;
  margin: 0 auto;
  overflow: hidden;
}
.pin .cate4>div .details .tit {
  width: 4.5rem;
  height: 1.45rem;
  color: #fff;
  font-size: .9rem;
  font-weight: 700;
  text-align: center;
  background: url(../../assets/img/pin/gongchang/5bae08c5Nde8fbba6.png) no-repeat center / cover;
  margin-top: 1rem;
  margin-left: .3rem;
  float: left;
}
.pin .cate4>div .details .det {
  float: left;
  width: 10.75rem;
  font-size: .6rem;
  color: #808080;
  margin-top: .9rem;
  margin-left: .8rem;
}
.pin .cate4>div .pro {
  width: 17rem;
  margin-left: .65rem;
}

.pin .cate4>div .pro li {
  width: 5.25rem;
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  margin-right: 0.4rem;
  margin-bottom: 0.24rem;
  position: relative;
}
.pin .cate4>div .pro li img {
  width: 100%;
  display: block;
}
.pin .cate4>div .pro .pics {
  border-radius: 10px;
  width: 5.25rem;
  height: 5.25rem;
  overflow: hidden;
}

.pin .cate4>div .pro .data {
  width: 4.75rem;
  margin: .25rem auto;
}
.pin .cate4>div .pro .data_d {
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: .6rem;
  height: .9rem;
  color: #000;
  white-space: nowrap;
}
.pin .cate4>div .pro .data_old {
 text-decoration: line-through;
 color: #aaaaaa;
 font-size: .55rem;
 margin-left: .12rem;
}
.pin .cate4>div .pro .data_new {
  font-size: .55rem;
  color: #ff1111;
  margin-left: .12rem;
}
</style>

