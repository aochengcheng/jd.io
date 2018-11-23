<template>
  <div class="jd-details">
    <top-head class="d-fixed">

      <nav slot="title" class="d-nav" ref="nav">
        <a href="#" v-for="(item, index) of title" ref="big" :class="{di: index == num}" @click.prevent="sw(index)">
          <span>{{ item }}</span>
        </a>
      </nav>
    </top-head>
    <div id="vw" @click="fill">
      <mt-swipe  :auto="0" class="" ref="big">  
        <mt-swipe-item :id="addClass ? 'small':''" v-for="(item, index) in md" :key="index">
            <img :src="'http://127.0.0.1:3003' + item"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="two11">
      <img src="http://127.0.0.1:3003/classify/5bc5d951Nd6f1880e.png!q70.webp" alt="">
    </div>

    <div class="buy">

      <div class="b-wrap">
        <h1 class="d-txt">
          <div class="txt">
            <i class="txt-11">
              <img src="http://127.0.0.1:3003/classify/r1111.png" alt="">
            </i>
            <i class="txt-zi">
              <img src="http://127.0.0.1:3003/classify/5af16f73N5f0ce6d0.png" alt="">
            </i>
            {{ productInfo[params.idd - 1].sup_title }}
          </div>
          <a href="#" ref="guan" @click.prevent="guan">{{ focus ? '已关注' : '关注' }}</a>
        </h1>

        <div class="d-red">
          【爆品】 骁龙845，红外人脸解锁，AI变焦双摄
          <a href="#">
            小米11.11狂欢节，热爱升级！
          </a>
        </div>
      </div>

      <div class="b-price">
        <span>
          ￥<strong>{{ productInfo[params.idd - 1].price }}</strong>.00
        </span>
        <span>降价提醒</span>
      </div>

      <div class="b-fang">
        <i>
          <img src="http://127.0.0.1:3003/classify/ziy.png" alt="">
        </i>
        <p>&nbsp; · 发货延时补贴</p>
      </div>

      <div class="b-zhi">
        <span>支付</span>
        <div class="zhi-list">
          <div class="zhi-top">
            白条随机立减最高99（每个用户限用2次）
          </div>
          <div class="zhi-bom">
            【京东支付】首单随机立减3-99元
          </div>
        </div>
      </div>

      <div class="b-zhi two">
        <span>促销</span>
        <div class="zhi-list two">
          <div class="zhi-top">
            <i>换购</i>
            购买1件可优惠换购热销商品
          </div>
          <div class="zhi-bom">
            <i>优惠套装</i>
            该商品共有13款优惠套装
          </div>
        </div>
      </div>
      <!-- 隔条 -->
      <div class="b-bar"></div>   

      <div class="b-luo">
        <div>
          <h3>已选</h3>
          <span>
            白,6GB+64GB,裸机,1个
          </span>
        </div>
      </div>

      <div class="b-pei">
        <div class="pei-to">
          <span class="pei-s">送至</span>
          <div class="pei-d">
            <p class="t">湖南长沙市雨花区候家塘街道</p>
            <p class="b"><span>现货</span>23:00前下单,预计11月18日(周日)送达</p>
          </div>
        </div>
        <div class="pei-z">
          <span>重量</span>
          <p>1kg</p>
        </div>
      </div>
    </div>

    <div class="imgs" v-for="items of data">
      <div class="">
        <img :src="'http://127.0.0.1:3003' + items.lg" alt="">
      </div>
    </div>

    <div class="foot" ref="foot">
      <div>
        <div class="some">
          <i>
            <img src="http://127.0.0.1:3003/classify/l.png" alt="">
          </i>
          <span>练习客服</span>
        </div>
        <div class="some">
          <i>
            <img src="http://127.0.0.1:3003/classify/c.png" alt="">
          </i>
          <span>进店</span>
        </div>
        <div class="some">
          <em class="some-add">+1</em>
          <i class="some-count">
            <img src="http://127.0.0.1:3003/classify/r.png" alt="">
            <span>{{ addCount }}</span>
          </i>
          <span @click="$router.push('/cart')">购物车</span>
        </div>

        <div class="f-r">
          <div class="addcart" @click="addShow">
            加入购物车
          </div>
          <div>
            立即购买
          </div>
        </div>
      </div>
    </div>

    <!-- right提示框 -->
      <div class="right-box" v-show="addCart">
        <span></span>
        <p>加入购物车成功</p>
      </div>


  </div>
</template>
<script>
  import TopHead from "../common/TopHead";
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        title: ['商品','评价','详情','推荐'],
        num: '',
        addClass: false,
        focus: false,
        params: {
          pr_id: this.$route.query.pr_id,
          good_name: this.$route.query.good_name,
          idd: this.$route.query.idd,
          id: this.$route.query.id
        },

        data: {},  // 大数据
        md: [],  // 轮播图片
        addCart: false, // 添加购物车
        addCount: sessionStorage.getItem('count') || 0,

        productInfo: JSON.parse(localStorage.getItem('product')) || 0
      }
    },
    methods: {
      addShow() {
        this.addCount ++
       
        this.$http.post('http://127.0.0.1:3003/product/pullCart', {id: this.params.id, count: this.addCount})
            .then(function (result) {
              console.log(result)
            })
        this.addCart = true
        this.$refs.foot.classList.add('in')
        setTimeout(() => {
          this.$refs.foot.classList.remove('in')
          this.addCart = false
        }, 1000)
      },
      getGoods() {
        if (this.params.pr_id && this.params.good_name) {
          var {pr_id, good_name} = this.params
          this.$http.post('http://127.0.0.1:3003/product/getPics', {
            pr_id,
            good_name
          },{
            header: {
              token: 'data'
            }
          }).then(function (result) {
            this.data = result.body
            for (var k of result.body) {
              if (k.md != null) {
                this.md.push(k.md)
              }
            }
          })
        }
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
      fill() {
        this.$refs.big.$el.classList.toggle('block')
        this.addClass = !this.addClass
      },
      sw(i) {
        this.num = i
      }
    },
    components: {
      TopHead
    },
    created() {
      this.getGoods()
    },
    mounted() {
      this.$emit('userSign', '测试代码')
    },
  }
</script>
<style scoped>

  #vw {
    height: 100vw;
    margin-top: 44px;
  }
  #vw .mint-swipe {
  height: 100%;
}
  #small {
  top: 50%;
  margin-top: -50%;
  height: 56%;
}
.block {
  height: 100% !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: pink;
  z-index: 1111
}


  .jd-details .d-fixed {
    position:fixed; top:0;z-index:111;width:100%;
  }
  .jd-details .d-nav {
    height: 44px;
    display: flex;
    margin: 0 70px;
    font-size: 14px;
    color: #666;  
    /* height: 2000px; */
  }
  .jd-details .d-nav a {
    flex: 1;
    text-align: center;
  }
  .jd-details .d-nav a span {
    padding-left: 13px;
  }
  .jd-details .d-nav a.di {
    color: #e4393c
  }
  .jd-details .d-nav a.di span {
     background: url(http://127.0.0.1:3003/classify/di.png) no-repeat 0 4px;
     background-size: 8px;
  }

  .jd-details .mint-swipe {
    height: 100vw;
  }
  .jd-details .mint-swipe img {
    width: 100%
  }

  .jd-details .two11 img {
    width: 100%;
    display: block;
  }

  .jd-details .b-wrap {
    padding: 12px 10px 10px;
  }
  .jd-details .b-wrap .d-txt {
    padding-right: 52px;
    display: flex;
    font-size: 16px;
    color: #333;
    line-height: 18px;
    font-weight: 400;
    position: relative;
  }
  .jd-details .b-wrap .d-txt .txt {}
  .jd-details .b-wrap .d-txt .txt i {
    display: inline-block;
    vertical-align: middle;
    height: 15px;
  }
  .jd-details .b-wrap .d-txt .txt i img {
    height: 100%;
    display: block;
  }
  .jd-details .b-wrap .d-txt a.lo::before {
    background-position: -50px -25px ;
  }
  .jd-details .b-wrap .d-txt a {
    position: absolute;
    right: 0;
    top: 0;
    padding-top: 26px;
    margin-right: -10px;
    height: 10px;
    width: 50px;
    color: #333;
    text-align: center;
    line-height: 6px;
    font-size: 10px;
    box-sizing: content-box;
  }
  .jd-details .b-wrap .d-txt a::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;

    width: 1px;
    height: 100%;
    background-color: #ddd;
  }
.jd-details .b-wrap .d-txt a::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 14px;
    width: 22px;
    height: 21px;
    background-image: url(http://127.0.0.1:3003/product/cart_sprits_all_54ae802c.png);
    background-size: 100px;
    background-position: 50px -3px
  }
  .jd-details .b-wrap .d-red {
    font-size: 12px;
    max-height: 46px;
    color: #e4393c;
    padding-top: 5px;
    line-height: 1.3;
  }
  .jd-details .b-wrap .d-red a {
    text-decoration: line-through;
    color: #e4393c;
  }

  .jd-details .b-price {
    padding: 0 10px;
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 5px;
  }
  .jd-details .b-price span:first-child {
    font-size: 12px;
    color: #e4393c;
    line-height: 1.3;
    font-weight: 700;
  }
  .jd-details .b-price span:first-child strong {
    font-size: 18px;
  }
  .jd-details .b-price span:last-child {
    float: right;
    width: 60px;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    text-align: center;
    font-size: 12px;
    line-height: 18px;
  }
  .jd-details .b-fang {
    padding: 0 30px 0 10px;
    background-color: #fbf0fd;
    color: #e4393c;
    height: 35px;
    line-height: 35px;
    position: relative;
    overflow: hidden;
  }
  .jd-details .b-fang::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 15px;
    background: url(http://127.0.0.1:3003/classify/reddian.png);
    background-size: 15px;
    width: 15px;
    height: 3px;
  }
  .jd-details .b-fang i {
    width: 91px;
    height: 14px;
    display: inline-block;
    margin-right: 4px;
    vertical-align: middle;
  }
  .jd-details .b-fang i img {
    width: 100%;
    display: block;
  }
  .jd-details .b-fang p {
    display: inline-block;
  }

  .jd-details .b-zhi {
    padding-left: 50px;
    position: relative;
    overflow: hidden;
  }
  .jd-details .b-zhi::after {
    content: '';
    position: absolute;
    top: 0;
    left: 10px;
    width: 100%;
    height: 1px;
    background-color: #ddd;
  }
  .jd-details .b-zhi span {
    position: absolute;
    left: 11px;
    top: 11px;
    color: #999;
    font-size: 12px;
  }
  .jd-details .b-zhi .zhi-list {

  }
  .jd-details .b-zhi .zhi-list div {
    padding: 12px 35px 12px 0;
    color: #333;
    position: relative;
    font-size: 12px;
  }
  .jd-details .b-zhi .zhi-list .zhi-top {
    border-bottom: 1px solid #ddd;
  }
  .jd-details .b-zhi .zhi-list .zhi-top::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 19px;
    background: url(http://127.0.0.1:3003/classify/dian.png);
    background-size: 15px;
    width: 15px;
    height: 3px;
  }

  .jd-details .b-zhi.two .zhi-list.two {
    padding: 10px 0;
  }
  .jd-details .b-zhi.two .zhi-list.two div {
    padding: 0;
    margin: 5px 0;
  }
  .jd-details .b-zhi.two .zhi-list.two .zhi-top {
    border: 0;
  }
  .jd-details .b-zhi.two .zhi-list.two i {
    margin-right: 5px;
    color: #e4393c;
    background-color: #fff;
    padding: 0 3px;
    height: 15px;
    line-height: 15px;
    font-style: normal;
    border: 1px solid #e4393c;
  }

  /* 隔条 */
  .jd-details .b-bar {
    width: 100%;
    height: 10px;
    background-color: #e8e8ed;
  }

  .jd-details .b-luo {
    padding: 12px 0 12px 10px;
    color: #999;
    position: relative;
  }
  .jd-details .b-luo::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 19px;
    background: url(http://127.0.0.1:3003/classify/dian.png);
    background-size: 15px;
    width: 15px;
    height: 3px;
  }
  .jd-details .b-luo div {
    padding: 0 40px 0 33px;
    position: relative;
  }
  .jd-details .b-luo div h3 {
    position: absolute;
    left: 0;
    top: 3px;
    font-size: 12px;
  }
  .jd-details .b-luo div span {
    font-size: 14px;
    line-height: 22px;
    color: #333;
  }
  .jd-details .b-pei {
    padding: 13px 0 13px;
    position: relative;
  }
  .jd-details .b-pei .pei-to {
    position: relative;
    padding: 0 40px 0 10px;
    margin-bottom: 3px;
  }
  .jd-details .b-pei .pei-to::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 19px;
    background: url(http://127.0.0.1:3003/classify/dian.png);
    background-size: 15px;
    width: 15px;
    height: 3px;
  }
  .jd-details .b-pei .pei-s {
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    color: #999;
    width: 30px;
  }
  .jd-details .b-pei .pei-d {
    display: inline-block;
    line-height: 1.6;
  }
  .jd-details .b-pei .pei-d .b {
    font-size: 12px;
    color: #999;
  }
  .jd-details .b-pei .pei-d .b span {
    color: #e4393c;
    margin-right: 3px;
  }
  .jd-details .b-pei .pei-z {
    padding: 0 40px 0 10px;
    font-size: 12px;
  }
  .jd-details .b-pei .pei-z span {
    color: #999;
    margin-right: 5px;
  }
  .jd-details .b-pei .pei-z p {
    display: inline-block;
    font-size: 14px;
    margin-top: 3px;
  }

  .jd-details .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #fff;
  }
  .jd-details .foot>div {
    font-size: 0
  }
  .jd-details .foot .some {
    display: inline-block;
    width: 14%;
    text-align: center;
    vertical-align: top;
    margin-top: 2px;
    position: relative;
  }
  .jd-details .foot .some i {
    display: block;
    width: 20px;
    height: 25px;
    margin: 5px auto 0;
  }
  .jd-details .foot .some i img {
    display: block;
    width: 100%;
  }
  .jd-details .foot .some span {
    line-height: 14px;
    font-size: 10px;
    color: #666;
  }
  .jd-details .foot .some-count {
    position: relative;
  }
  .jd-details .foot .some-count span {
    position: absolute;
    top: -2px;
    left: 12px;
    color: #fff;
    background-color: #e4393c;
    line-height: 9px;
    padding: 1px 3px;
    border-radius: 10px;
    font-style: normal;
  }
  .jd-details .foot .some-add {
    position: absolute;
    padding: 2px 3px;
    color: #e4393c;
    font-weight: 700;
    font-size: 18px;
    left: 15px;
    top: -15px;
    font-style: normal;
    display: none;
    
  }
  .jd-details .foot.in .some-add {
    display: block;
    animation: add1 1s linear 1 forwards
  }
  @keyframes add1 {
    0% {transform: translateY();opacity: 1;display: block}
    80% {transform: translateY(-17px);opacity: 1;display: block}
    100% {transform: translateY(-20px);opacity: 0;}
  }

  .jd-details .foot .f-r {
    font-size: 0;
    display: inline-block;
    width: 58%;
  }
  .jd-details .foot .f-r div {
    width: 50%;
    text-align: center;
    line-height: 50px;
    display: inline-block;
    font-size: 14px;
    color: #fff;
  }
  .jd-details .foot .f-r div:first-child {
    background-color: #ff8c42;
  }
  .jd-details .foot .f-r div:last-child {
    background-color: #e4393c;
  }
  .jd-details .imgs {
    width: 100vw;
  }
  .jd-details .imgs img {
    width: 100%;
  }


  .jd-details  .right-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    text-align: center;
    box-shadow: 0 1px 10px rgba(0,0,0,.3);
    border-radius: 6px;
    background-color: rgba(0,0,0,.7);
  }
  .jd-details  .right-box span {
    display: block;
    width: 50px;
    height: 50px;
    margin: 5px auto 10px;
    background: url(http://127.0.0.1:3003/classify/right.png);
    background-size: 50px;
  }
  .jd-details  .right-box p {
    color: #fff;
  }
</style>