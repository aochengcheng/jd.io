<template>
  <div class="jd-details">
    <top-head>
      <span slot="title">京东拼购</span>
    </top-head>
    <div id="vw" @click="fill">
      <mt-swipe :auto="0" class="" ref="big">  
        <mt-swipe-item :id="addClass ? 'small':''" class="item" v-for="(item, index) in imgs" :key="index" >
            <img :src=" 'http://127.0.0.1:3003/' + item " class="ban" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="time">
      <div>
        <div class="pin">
          2人拼
        </div>
        <div class="price">
          <span class="new">￥<em>{{ data.price_new }}</em>.90</span>
          <span class="old">￥{{ data.price_old }}.00</span>
        </div>
        <div>

        </div>
      </div>
    </div>

    <div class="all">
      <div class="wrap">
        <h1>
          <div class="txt">
            <i><img src="http://127.0.0.1:3003/product/5bc5d965N0ed0a8ef.png" alt=""></i>
              {{ data.details }}
          </div>
          <a href="#" class="guanzhu" @click.prevent="guan" ref="guan">{{ focus ? '已关注' : '关注' }}</a>
        </h1>

        <div class="disc">
          <a href="#">
            2件9折,3件8折【热卖网红爆品,八万人好评】一抹就顺 烫染受损 毛躁修护 柔顺亮泽！
          </a>
        </div>

      </div>
      <div class="pay">
        <span>支付</span>
        <div>【京东支付】拼购立减8.9元</div>
      </div>
       <!-- 白条  -->
      <div class="whiteBar"></div>
      <div class="check">
        <div>
          <span>已选</span>
          <div>香奈儿香型,1件</div>
        </div>
      </div>
    </div>

    <div class="jiezhang">
      <div class="jie">
        <div class="auto">
          <img src="http://127.0.0.1:3003/product/lian.png" alt="">
          <span>练习客服</span>
        </div>
        <div class="auto">
          <img src="http://127.0.0.1:3003/product/f.png" alt="">
          <span>进店</span>
        </div>
        <div class="tuan">
          <div class="tuan_l" @click="show">
            <p>￥<span>79</span>.90</p>
            <p>单独购买</p>
          </div>
          <div class="tuan_r">
            <p>￥<span>17</span>.90</p>
            <p>我要开团</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mask" ref="mask" @click="out">
      
    </div>
    <div class="stan">
        <div class="header">
          <img :src="'http://127.0.0.1:3003' + imgs[0]" alt="">
          <p class="t">
            单买价￥ <em>{{ data.price_new }}</em>.00
          </p>
          <p class="b">
            <span>已选</span>
             女款粉色,{{ size[current] }},{{ count }}件
          </p>
        </div>
        <div class="body">
          <div class="ku-c">
            颜色
          </div>
          <div class="more clearFix">
            <span >女款粉色</span>
            <span>男款藏青色</span>
            <span>男款酒红色</span>
            <span>女款酒红色</span>
            <span>男款棕色条纹</span>
            <span>男款灰色</span>
            <span>男款沙宗红</span>
          </div>
          <div class="ku-c">
            尺码
          </div>
          <div class="chi clearFix">
            <span v-for="(s, index) of size" :key="index" @click="red(index)" :class="{txtRed: current == index}">
              {{ s }}
            </span>
          </div>

          <div class="count">
            <div class="count_a">
              <span @click="sub">
                 <i></i>
              </span>
              <input type="text" v-model="count">
              <span @click="add">
                <i></i>
              </span>
            </div>
            <p>数量</p>
          </div>

          <div class="o">确认</div>
        </div>      
      </div>
  </div>
</template>
<script>
import TopHead from '../common/TopHead.vue'
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      pid: this.$route.query.id,
      data: {},
      imgs: [],
      focus: false,
      addClass: false,
      count: 1,
      size: ['M', 'L', 'XL', 'XXL', '3XL'],
      current: ''
    }
  },
  methods: {
    red(index) {
      this.current = index
    },
    add() {
      this.count < 200 && this.count ++
    },
    sub() {
      this.count > 1 && this.count --
    },
    fill() {
      this.$refs.big.$el.classList.toggle('block')
      this.addClass = !this.addClass
    },
    guan() {
      this.$refs.guan.classList.toggle('lo')
      this.focus = !this.focus
      if (this.focus) {
        Toast('关注成功')
      } else {
        Toast('取消成功')
      }
    },
    show() {
      this.$refs.mask.classList.add('in')
      this.$refs.mask.style.top = 0
    },
    out() {
      this.$refs.mask.style.top = '100%'
      this.$refs.mask.classList.remove('in')
    },
    getGoods() {
      this.$http.get('http://127.0.0.1:3003/product/pin', {
        params: {
          pid: this.pid
        }
      }).then(function (result) {
        this.data = result.body[0]
        console.log(this.data)
        this.imgs = (result.body[0].img_url).split('|')    
      })
    }
  },
  components: {
    TopHead
  },
  mounted() {
    this.getGoods()
  },
}
</script>
<style>
.txtRed {
  background-color: #e4393c !important;
  color: #fff !important;
}
.jd-details {
  height: 1000px;
}
.block {
  height: 100% !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: pink;
  z-index: 11
}
#vw {
  height: 100vw;
}
#small {
  top: 50%;
  margin-top: -50%;
  height: 56%;
}
.jd-details .ban {
  width: 100%;
}
#vw .mint-swipe {
  height: 100%;
}
.jd-details .time {
  background-image: linear-gradient(89deg,#f94c00,#fcc14e);
  height: 50px;
  color: #fff;
  display: flex;
  align-items: center;
}
.jd-details .time .pin {
  line-height: 12px;
  padding: 1px 1px 1px 4px;
  margin: 0 6.5px 2px 25px;
  color: #fff;
  border: 1px solid #fff;
  border-left: unset;
  border-radius: 2px;
  display: inline-block;
  font-size: 10px;
  position: relative;
}
.jd-details .time .pin::after {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 16px;
  height: 16px;
  background: url(http://127.0.0.1:3003/product/data_image.png) no-repeat center / cover;
}
.jd-details .time .price {
  display: inline-block;
  vertical-align: middle;
  line-height: 12px;
}
.jd-details .time .price .new {
  margin-right: 4px;
  font-weight: 700;
}
.jd-details .time .price .new em {
  font-size: 24px;
  font-style: normal;
}
.jd-details .time .price .old {
  font-size: 12px;
  opacity: .6;
  text-decoration: line-through;
}

.jd-details .all .wrap {
  padding: 10px;
}
.jd-details .all .wrap h1 {
  padding-right: 52px;
  line-height: 18px;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  position: relative;
}
.jd-details .all .wrap h1 .txt {

}
.jd-details .all .wrap h1 .txt i {
  display: inline-block;
  margin-top: 0;
  margin-left: 0;
  height: 15px;
  width: 35px;
}
.jd-details .all .wrap h1 .txt i img {
  width: 100%;
  display: block;
}

.jd-details .all .wrap h1 .guanzhu {
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  font-size: 10px;
  width: 50px;
  color: #333;
  line-height: 9px;
  padding-top: 26px;
  border-left: 1px solid #ddd;
}
.jd-details .all .wrap h1 .guanzhu.lo::after {
  background-position: -50px -25px;
}
.jd-details .all .wrap h1 .guanzhu::after {
  content: '';
  position: absolute;
  top: -2px;
  left: 14px;
  width: 22px;
  height: 21px;
  background-image: url(http://127.0.0.1:3003/product/cart_sprits_all_54ae802c.png);
  background-size: 100px;
  background-position: 50px -3px;
}
.jd-details .all .wrap .disc {
  padding-top: 5px;
  position: relative;

}
.jd-details .all .wrap .disc a {
  font-size: 10px;
  color: #e4393c;
  text-decoration: underline;
}
.jd-details .all  .pay {
  padding-left: 50px;
  position: relative;
}
.jd-details .all  .pay::after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #ddd;
}
.jd-details .all  .pay span {
  color: #999;
  font-size: 12px;
  position: absolute;
  left: 12px;
  top: 12px;
}
.jd-details .all  .pay div {
  padding: 12px 0;
  color: #333;
  font-size: 10px;
}

.jd-details .all  .whiteBar {
  padding-top: 10px;
  background-color: #e8e8ed;
}
.jd-details .all .check {
  padding: 12px 0 10px;
}
.jd-details .all .check>div {
  padding: 0 40px 0 33px;
  position: relative;
}
.jd-details .all .check>div::after {
  position: absolute;
  content: '';
  width: 15px;
  height: 3px;
  right: 17px;
  top: 7px;
  background-image: url(http://127.0.0.1:3003/product/dian.png);
  background-size: 15px;
}
.jd-details .all .check>div span {
  position: absolute;
  left: 10px;
  font-size: 10px;
  color: #999
}
.jd-details .all .check>div div {
  margin-left: 20px;
}

.jd-details .jiezhang {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
}
.jd-details .jie {
  width: 100%;
  display: flex;
}
.jd-details .jie .auto {
  width: 14%;
  text-align: center;
}
.jd-details .jie .auto img {
  width: 40%;
  display: block;
  margin: 10px auto 0;
}
.jd-details .jie .auto span {
  line-height: 20px;
  font-size: 10px;
  color: #666;
  display: block;
}
.jd-details .jie .tuan {
  display: flex;
  width: 72%;
  color: #fff;
}
.jd-details .jie .tuan .tuan_l {
  flex: 1;
  background-color: #ff8c42;
  text-align: center;
  
}
.jd-details .jie .tuan p:first-child {
  margin-top: 7px;
}
.jd-details .jie .tuan .tuan_r {
  flex: 1.9;
  background-color: #f94c00;
  text-align: center;
}

.jd-details .mask {
  position: fixed;
  top: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.7);
}
.jd-details .stan {
  min-height: 375px;
  max-height: 475px;
  position: fixed;
  bottom: 0;
  transform: translate3d(0, 495px, 0);
  transition: all .3s cubic-bezier(0,0,.25,1);
  width: 100%;
}
.jd-details .in+.stan {
  transform: none;
}
.jd-details .stan .header {
  height: 70px;
  padding: 0 0 10px 110px;
  position: relative;
  box-sizing: content-box;
  text-align: left;
}
.jd-details  .stan .header img {
  position: absolute;
  left: 10px;
  top: -20px;
  width: 90px;
  height: 90px;
  border-radius: 3px
}

.jd-details  .stan .header .t {
  color: #e4393c;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  font-size: 12px
}
.jd-details  .stan .header .t em {
  font-style: normal;
  font-size: 18px;
}
.jd-details .stan .header .b {
  font-size: 12px;
  color: #333;
  line-height: 1.4em;
}
.jd-details .stan .header .b span {
  color: #999;
}

.jd-details  .stan .body {
  background-color: #fff;
  padding-bottom: 100px;
}
.jd-details  .stan .body .ku-c {
    font-size: 12px;
    color: #999;
    margin: 0 10px;
    height: 33px;
    line-height: 33px;
}
.jd-details .stan .body .more span,
.jd-details .stan .body .chi span {
  display: inline-block;
    padding: 0 10px;
    min-width: 20px;
    max-width: 270px;
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    margin-left: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    color: #333;
    background-color: #f7f7f7;
    font-size: 14px;
}
.jd-details .stan .body .count {
  padding: 0 12px 13px;
  font-size: 12px;
}
.jd-details .stan .body .count p {
  height: 31px;
  line-height: 31px;
  color: #999;
}
.jd-details .stan .body .count .count_a {
  float: right;
}
.jd-details .stan .body .count .count_a  span {
  position: relative;
  width: 30px;
  height: 30px;
  background: #f7f7f7;
  display: inline-block;
}
.jd-details  .stan .body .count .count_a  span i {
  position: absolute;
  background: #ccc;
  width: 14px;
  height: 2px;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  margin-left: -7px;
  margin-top: -1px;
}
.jd-details  .stan .body .count .count_a input {
  background: #f7f7f7;
  width: 45px;
  color: #333;
  font-size: 12px;
  vertical-align: top;
  text-align: center;
  height: 30px;
}
.jd-details  .stan .body .o {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #e4393c;
  color: #fff;
  width: 100%;
  font-size: 16px;
}
</style>
