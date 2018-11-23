<template>
  <div class="jd-cart">
    <cart-head>
      <span slot="title">购物车</span>
    </cart-head>
    <div class="cart-login">
      <div class="login-wrap" v-if="empty">
        <img src="../../assets/img/cart/5a93c51cN3bb5e37b.png" alt="">
        <div class="txt" v-text="store ? '购物车空空如也，去逛逛吧~' : '登录后可同步购物车中商品'"></div>
        <div class="lg" @click="goLogin" v-if="!store">       
            登录
        </div>
      </div>

      <div class="good-items" v-show="!empty">
        <div class="g-head">
          <i class="g-ico"></i>
          <i class="g-jd"></i>
          <span class="g-z">京东自营</span>
          <span class="g-mian">以免运费</span>
        </div>

        <div class="g-content" ref="box" v-for="(item, index) of goods"  :idd="item.uid">
          <a href="#" class="c-txt">
            <span class="c-l">换购</span>
            <span class="c-c">已购满1件，可用优惠价换购商品</span>
            <span class="c-r">换购商品</span>
          </a>

          <div class="c-all">
            <i class="g-ico" @click="open($event)" ref="right"></i>
            <img :src="'http://127.0.0.1:3003' + item.img_url" alt="">

            <div class="c-guige">
              <div class="name">
                {{ item.sup_title }}
              </div>
              <div class="goods-line">
                <p>￥<strong>{{ item.price }}</strong>.00</p>
                <div>
                  <span class="left" @click="sub(item.uid)"></span>
                  <input type="text" v-model="item.count" ref="input" :vs="item.count">
                  <span class="left top" @click="add(item.uid)"></span>
                </div>
              </div>

              <div class="goods-sub">
                <span>移入关注</span>
                <span>删除</span>
              </div>
            </div>
            
            <div class=""></div>
          </div>
        </div>
      </div>

      <div class="cart-bag">
        <div class="bag-top">
          <div>
              恭喜获得<span></span>专属优惠礼包
          </div>
          <a href="#">一键领取</a>
        </div>

        <div class="bag-bottom">
          <div>
            <div class="top">
              <div class="price">
                <span class="price_l">￥</span>
                <span class="price_r">8</span>
              </div>
              <div class="all">全部类可用</div>
            </div>
            <div class="bom">
              满120元可用
            </div>
          </div>
          <div>
            <div class="top">
              <div class="price">
                <span class="price_l">￥</span>
                <span class="price_r">12</span>
              </div>
              <div class="all">全部类可用</div>
            </div>
            <div class="bom">
              满150元可用
            </div>
          </div>
          <div>
            <div class="top">
              <div class="price">
                <span class="price_l">￥</span>
                <span class="price_r">8</span>
              </div>
              <div class="all">全部类可用</div>
            </div>
            <div class="bom">
              满120元可用
            </div>
          </div>

        
        </div>
      </div>
    </div>

    <!-- 结算 -->
      <div class="pay">
        <i @click="all" ref="quan">全选</i>
        <div class="pay-r">
          <div class="pay-price">
            <p>总计: <strong>￥{{ sum }}.00</strong></p>
            <p>总额￥2499.00 立减￥0.00</p>
          </div>
          <div class="pay-ok">
            去结算 <small>{{ shul }}件</small>
          </div>
        </div>
      </div>
  </div>
</template>

<script scoped>
import CartHead from "../common/TopHead";
export default {
  data() {
    return {
      store: this.$store.state.isLogin,
      empty: true,
      goods: [],
      count: '',
      idd: '',
      price: '',
      sum: 0,  // 总价
      shul: 0,   // 数量
      opens: true, // 选择
      check: true,

      closeall: false
    }
  },
  methods: {
    // 全选
    all() {
      // if (this.closeall) {
      //   return
      // }
      this.$refs.quan.classList.toggle('all')
      // this.check = !this.check
      for (var k of this.$refs.right) {
        k.classList.toggle('open')
  
      }
    },
    open(i) {
      i.target.classList.toggle('open')
      for (var s of this.$refs.right) {
        console.log(s)
        if (s.classList.contains('open')) {
          this.$refs.quan.classList.add('all')
          return 
        } 
        if (!s.classList.contains('open')) {
          this.$refs.quan.classList.remove('all')
        }
      }
    },
    add(id) {
      for (var k of this.goods) {
        if (k.uid == id) {
          this.idd = k.uid
          if (k.count < 999) {
            k.count ++
          }
          this.price = k.price
          this.count = k.count
        }
      }

      this.update()
    },
    sub(id) {
      for (var k of this.goods) {
        if (k.uid == id) {
          this.idd = k.uid
          if (k.count > 1) {
            k.count --
          }
          this.price = k.price
          this.count = k.count
        }
      }
      this.update()
    },
    update() {
      this.$http.get('http://127.0.0.1:3003/product/update', {
        params: {
          id: this.idd,
          count: this.count,
          total: this.count * this.price
        }
      }).then(function (result) {
        var sum = result.body
        console.log(sum)
        this.sum = sum[0].s
        this.shul = sum[0].c
      })
    },
    findGoods() {
      this.$http.post('http://127.0.0.1:3003/product/findGoods')
          .then(function (result) {
            console.log(result.body)
            if (result.body.length > 0) {
              this.empty = false
              this.goods = result.body
              for (var s of result.body) {
                this.sum += Number(s.total)
                this.shul += Number(s.count)
              }
              // this.sum = result.body[0].s
            } else {
              this.empty = true
              this.goods = []
            }
          })
    },
    goLogin() {
      this.$router.push('/login')
    }
  },
  components: {
    CartHead
  },
  created() {
    this.findGoods()
  },
  mounted() {
    // console.log(sessionStorage.getItem('count'))
  },
}
</script>

<style scoped>

.jd-cart {}
.jd-cart .cart-login .login-wrap {
  padding: 30px 0 15px;
  text-align: center;
  /* display: none; */
}
.jd-cart .cart-login .login-wrap img {
  width: 90px;
  height: 90px;
}
.jd-cart .cart-login .login-wrap .txt {
  color: rgba(51,51,51,.66);
  margin: 11px 0;
  font-size: 16px;
  line-height: 20px;
}
.jd-cart .cart-login .login-wrap .lg {
  width: 60px;
  height: 30px;
  border: 1px solid #e4393c;
  color: #e4393c;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
  line-height: 27px;
  margin: 0 auto 15px;;
}

.jd-cart .cart-login  .good-items {
  margin-bottom: 15px;
  background-color: #fff;
  position: relative;
}
.jd-cart .cart-login  .good-items .g-head {
  min-height: 40px;
  padding: 5px 10px 5px 42px;
  display: flex;
  align-items: center;
  position: relative;
}
.jd-cart .cart-login .good-items .g-head::after {
  content: "";
  position: absolute;
  z-index: 1;
  pointer-events: none;
  background-color: #e5e5e5;
  height: 1px;
  left: 0;
  right: 0;
  bottom: 0;
  transform: scaleY(.5)
}
.jd-cart .cart-login  .good-items .g-ico {
  position: absolute;
  width: 42px;
  height: 100%;
  left: 0;
  top: 0;
  background: url(http://127.0.0.1:3003/cart/dui.png) no-repeat;
  background-size: 20px;
  background-position: 11px 11px;
}
.jd-cart .cart-login .good-items .g-ico.open {
   background-image: url(http://127.0.0.1:3003/cart/quan.png) !important;
   background-size: 20px;
   background-position: 11px 11px;
}
.jd-cart .cart-login  .good-items .g-jd {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: url(http://127.0.0.1:3003/cart/s.png) no-repeat -35px -35px / 60px;
}
.jd-cart .cart-login  .good-items .g-z {
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  margin-right: 10px;
  flex: 1;
}
.jd-cart .cart-login .good-items .g-mian {
  color: #999;
  font-size: 12px;
  line-height: 18px;
  position: relative;
  padding-left: 10px;
}
.jd-cart .cart-login  .good-items .g-mian::after {
  content: '';
  position: absolute;
  left: -4px;
  top: 4px;
  width: 10px;
  height: 10px;
  background: url(http://127.0.0.1:3003/cart/tan.png);
  background-size: 10px
}


.jd-cart .cart-login .good-items .g-content {

}

.jd-cart .cart-login .good-items .g-content .c-txt {
  display: flex;
  align-items: center;
  padding: 10px 10px 0 0;
  min-height: 30px;
}
.jd-cart .cart-login .good-items .g-content .c-txt .c-l {
  border-radius: 3px;
  margin: 2px 5px 0 10px;
  height: 15px;
  line-height: 15px;
  color: #fff;
  background-color: #e4393c;
  display: inline-block;
  position: relative;
  font-size: 10px;
  padding: 0 5px;
  align-self: flex-start;
}
.jd-cart .cart-login .good-items .g-content .c-txt .c-l::after {
  content: '';
  position: absolute;
  border: 4px solid transparent;
  border-top-color: #e4393c; 
  top: 15px;
  left: 7px;
}
.jd-cart .cart-login .good-items .g-content .c-txt .c-c {
  font-size: 10px;
  flex: 1;
}
.jd-cart .cart-login .good-items .g-content .c-txt .c-r {
  font-size: 10px;
  color: #999;
}

.jd-cart .cart-login .good-items .g-content .c-all {
  background-color: #fff;
  padding: 5px 10px 15px 128px;
  position: relative;
}
.jd-cart .cart-login .good-items .g-content .c-all .g-ico {
  left: 0;
  width: 63px;
  height: 100%;
}
.jd-cart .cart-login .good-items .g-content .c-all img {
  position: absolute;
  width: 75px;
  height: 75px;
  left: 43px;
}
.jd-cart .cart-login .good-items .g-content .c-all .c-guige {}
.jd-cart .cart-login .good-items .g-content .c-all .c-guige .name {
  margin-bottom: 5px;
  font-size: 14px;
}
.jd-cart .cart-login .good-items .g-content .c-all .c-guige .goods-line {
  margin-top: 15px;
  display: flex;
}
.jd-cart .cart-login .good-items .g-content .c-all .c-guige .goods-line p {
  color: #e4393c;
  font-size: 10px;
  line-height: 16px;
  flex: 1;
  align-self: center;
}
.jd-cart .cart-login .good-items .g-content .c-all .c-guige .goods-line p strong {
  font-size: 16px;
}
.jd-cart .cart-login .good-items .g-content .c-all .c-guige .goods-line div {
  font-size: 0;
  background-color: #f7f7f7;
  display: flex;
}
.jd-cart .cart-login .good-items .g-content .c-all .c-guige .goods-line div .left {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: relative;
}
.jd-cart .cart-login .good-items .g-content .c-all .c-guige .goods-line div .left::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 2px;
  margin: -1px 0 0 -8px;
  background-color: #999;
  top: 50%;
  left: 50%;
  border-radius: 1px;
} 
.jd-cart .cart-login .good-items .g-content .c-all .c-guige .goods-line div .top {}
.jd-cart .cart-login .good-items .g-content .c-all .c-guige .goods-line div .top::before {
  content: '';
  position: absolute;
  width: 2px;
  height: 16px;
  top: 28%;
  left: 72%;
  background-color: #999;
   margin: -1px 0 0 -8px;
}
.jd-cart .cart-login .good-items .g-content .c-all .c-guige .goods-line div input {
  font-size: 12px;
  width: 45px;
  text-align: center;
  border: none;
  color: #999;
}

.jd-cart .cart-login .good-items .g-content .c-all .c-guige .goods-sub {
  color: #999;
  margin: 5px 0;
  text-align: right;
}
.jd-cart .cart-login .good-items .g-content .c-all .c-guige .goods-sub span {
  padding: 0px 10px;
  line-height: 10px;
  font-size: 12px;
}

 /* 结算 */
 .jd-cart .pay {
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   height: 50px;
   max-width: 540px;
   margin: 0 auto;
   font-size: 14px;
   background-color: hsla(0,0%,100%,.95);
 }
 .jd-cart .pay::before {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   border-top: 1px solid #ddd;
 }
 .jd-cart .pay i {
   width: 40px;
   padding-top: 32px;
   position: absolute;
   left: 0;
   top: 0;
   font-size: 10px;
   color: #999;
   text-align: center;
   font-style: normal
 }
 .jd-cart .pay i.all::after {
    background: url(http://127.0.0.1:3003/cart/yuan.png) no-repeat;
    background-size: 20px;
 }
 .jd-cart .pay i::after {
   content: '';
   position: absolute;
   width: 20px;
   height: 20px;
   top: 9px;
   left: 11px;
   background: url(http://127.0.0.1:3003/cart/dui.png) no-repeat;
   background-size: 20px;
 }
 .jd-cart .pay .pay-r {
   position: absolute;
   right: 0;
   top: 0;
 }
 .jd-cart .pay .pay-r>div {
   float: left;
 }
 .jd-cart .pay .pay-r .pay-price {
    padding-top: 10px;
    font-weight: 700;
    line-height: 1em;
    height: 50px;
    text-align: right;
    float: left;
    font-size: 16px;
 }
 .jd-cart .pay .pay-r .pay-price p:first-child strong {
   color: #e4393c;
 }
 .jd-cart .pay .pay-r .pay-price p:last-child {
   padding-top: 2px;
    display: block;
    font-size: 10px;
    color: #999;
    font-weight: 400;
 }
 .jd-cart .pay .pay-r .pay-ok {
    float: right;
    display: block;
    width: 110px;
    height: 50px;
    margin-left: 10px;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    font-weight: 700;
    background-color: #e4393c;
    color: #fff;
 }


.jd-cart .cart-login .cart-bag {
  padding: 15px 10px;
}
.jd-cart .cart-login .cart-bag .bag-top {
  /* display: flex; */

}
.jd-cart .cart-login .cart-bag .bag-top div {
  line-height: 30px;
  color: #333;
  font-size: 16px;
  position: relative;
  padding: 0 15px;
  display: inline-block;
}
.jd-cart .cart-login .cart-bag .bag-top div span {
  display: inline-block;
  width: 20px;
  height: 15px;
  text-align: center;
  line-height: 4px;
  vertical-align: middle;
}
.jd-cart .cart-login .cart-bag .bag-top div span::after {
  content: '';
  width: 3px;
  height: 3px;
  background-color: #000;
  display: inline-block;
}
.jd-cart .cart-login .cart-bag .bag-top div::after,
.jd-cart .cart-login .cart-bag .bag-top div::before {
  content: '';
  position: absolute;
  top: 5px;
  width: 12px;
  height: 17px;
  background: url(../../assets/img/cart/bian.png) no-repeat center / 12px;
}
.jd-cart .cart-login .cart-bag .bag-top div::before {
  left: 0;
  transform: rotate(180deg)
}
.jd-cart .cart-login .cart-bag .bag-top div::after {
  right: 0;
  margin-left: 6px;
}
.jd-cart .cart-login .cart-bag .bag-top a {
  float: right;
  color: #fff;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  background-image: linear-gradient(-90deg,#e93b3d,#ff9574);
  border-radius: 15px;
  padding: 0 15px
}

.jd-cart .cart-login .cart-bag .bag-bottom {
  height: 64px;
  margin-top: 12px;
  display: flex;
  width: 100%;
}
.jd-cart .cart-login .cart-bag .bag-bottom>div {
  width: 33.33%;
  height: 64px;
  margin-right: 1px;
  position: relative;
}
.jd-cart .cart-login .cart-bag .bag-bottom>div:last-child .top .price {
  color: #7ea7ce;
}
.jd-cart .cart-login .cart-bag .bag-bottom>div:last-child .bom{
  background-image: linear-gradient(-180deg,#7da7ce,#5f92c2 98%);
}
.jd-cart .cart-login .cart-bag .bag-bottom>div::after,
.jd-cart .cart-login .cart-bag .bag-bottom>div::before {
  content: '';
  position: absolute;
  top: 3px;
  width: 3px;
  height: 64px;
}
.jd-cart .cart-login .cart-bag .bag-bottom>div::before {
  left: 0;
  background: url(../../assets/img/cart/left.png) no-repeat center / 3px 64px;
}
.jd-cart .cart-login .cart-bag .bag-bottom>div::after {
  right: 0;
  background: url(../../assets/img/cart/right.png) no-repeat center / 3px 64px;
}

.jd-cart .cart-login .cart-bag .bag-bottom div .top {
  border: 1px solid #f7f7f7;
  height: 40px;
  padding: 0 8px;
  display: flex;
  width: 100%;
}

.jd-cart .cart-login .cart-bag .bag-bottom div .top .price {
  color: #6ed1d3;
  position: relative;

}
.jd-cart .cart-login .cart-bag .bag-bottom div .top .price_l {
  font-size: 12px;
  position: absolute;
  left: 0;
  top: 14px;
}
.jd-cart .cart-login .cart-bag .bag-bottom div .top .price_r {
  padding-left: 10px;
  position: relative;
  top: 14px;
  font-weight: bold;
  font-size: 24px;
}
.jd-cart .cart-login .cart-bag .bag-bottom div .top .all {
  position:relative;
  height: 12px;
  margin-top: 23px;
  color: #999;
  font-size: 10px;
  padding-left: 3px;
  white-space: nowrap;
}
.jd-cart .cart-login .cart-bag .bag-bottom div .bom {
  color: #fff;
  padding-left: 10px;
  line-height: 24px;
  background-image: linear-gradient(-179deg,#73d2d4 2%,#53c7ca 99%);
  margin-top: 3px;
}
</style>
