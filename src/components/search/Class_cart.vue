<template>
  <div class="jd-store">
    <tophead class="bg">
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
              <router-link :to="store ? '/myjd' :'/login'">
                <span></span>
                <strong>我的京东</strong>
              </router-link>
            </li>
            <li>
              <router-link to="">
                <span></span>
                <strong @click="logout" v-text="store ? '退出登录' : '浏览记录'"></strong>
              </router-link>
            </li>
          </ul> 
      </a>

      <router-link :to="{path: '/classify'}" class="icon-logo"  slot="goHome">
        <img src="http://127.0.0.1:3003/img/leftj.png" alt="">
      </router-link>

      <i class="jd-quan jd_quan" slot="jd_quan" ></i>

      <input type="text" :class="'jd_input'"  placeholder="京东超级品牌日 超级狂欢GO" slot="jd_input">
    </tophead>
    <!-- <h1>商店</h1> -->

    <div class="pro-filter-wrap" v-fixed='120'>
      <div class="inner">

        <div class="pro">
          <div class="items">
            <a href="#" @click.prevent="zonghe">
              <span>
                综合
                <i :class="{ro: rotate}"></i>
              </span>
            </a>
            <a href="#">
              <span>
                销量
                <i></i>
              </span>
            </a>
            <a href="#" @click.prevent="fuwu">
              <span>
                服务
                <i :class="{ro: rotate2}"></i>
              </span>
            </a>
            <a href="#" @click.prevent="popupVisible = !popupVisible">
              <span>
                筛选
                <i></i>
              </span>
            </a>
          </div>
          <div class="options">
            <ul  ref="zong" >
              <li>
                服务
              </li>
              <li>
                最新上架
              </li>
              <li>
                价格最低
              </li>
              <li>
                价格最高
              </li>
              <li>
                评价最多
              </li>
            </ul>

            <ul class="fuwu" ref="fuwu">
              <li v-for="(item, index) in listItems" :key="index" @click.prevent="checkImg(index)" >
                <span></span>
                {{ item }}
              </li>   
            </ul>
          </div>
        </div>

        <div class="pro2">
          <ul >
            <li>
              <a href="#">
                <img src="http://127.0.0.1:3003/classify/1111.png" alt="">
              </a>
            </li>
            <li>
              <a href="#">
                新品
              </a>
            </li>
            <li>
              <a href="#">
                品牌
              </a>
            </li>
            <li>
              <a href="#">
                分类
              </a>
            </li>
          </ul>

          
        </div>
      </div>
    </div>

    <div class="floor2">

      <div class="wrap" v-for="(item, index) in data" @click="$router.push('/ClassDetails?pr_id='+item.pr_id+'&good_name='+item.good_name + '&idd=' + item.idd + '&id=' + item.id)">
        <div class="wrap-box">
            <div class="img">
              <img :src="'http://127.0.0.1:3003' + item.img_url" alt="">
            </div>
            <div class="txt">
              
              <div class="details">
                <img src="http://127.0.0.1:3003/classify/r1111.png" alt="">               
                 {{ item.sup_title }}
              </div>
              <div class="big">
                <span v-for="items in (item.storage ? item.storage.split('|') : '')">
                  {{ items }}
                </span>
                
              </div>
              <div class="price">
                <span>￥<strong>{{ item.price }}</strong>.00</span>
              </div>
              <div class="other">
                <span>自营</span>
                <span>{{ item.sub_title }}万+评论</span>
                <span>查看同款二手</span>
              </div>
            </div>
        </div>
      </div>

    </div>

    <!-- <div class="ms"></div> -->
    <mt-popup v-model="popupVisible" position="right"  popup-transition="">
      <div class="mode">
        <ul class="mode-1">
          <li>
            <div class="line">
              <div class="p">配送至</div>
              <div class="d">北京-朝阳区-三环到四环之间</div>
            </div>
          </li>
        </ul>

        <ul class="section clearFix">
          <li v-for="item in listItems">
            <a href="#">{{ item }}</a>
          </li>
        </ul>

        <ul class="mode-1">
          <li>
            <div class="line">
              <div class="p">分类</div>
              <div class="d">全部分类</div>
            </div>
          </li>
        </ul>
        <ul class="mode-1">
          <li>
            <div class="line">
              <div class="p">价格</div>
              
            </div>
          </li>
          <li>
            <div>

            </div>
            <div class="line">
              <div class="ping">
                <div>199-949</div>
                <div>26%选择</div>
              </div>
              <div class="ping">
                <div>949-1859</div>
                <div>39%选择</div>
              </div>
              <div class="ping">
                <div>1859-4036</div>
                <div>16%选择</div>
              </div>
            </div>
          </li>
        </ul>
        <ul class="mode-1">
          <li>
            <div class="line">
              <div class="p">品牌</div>
              
            </div>
          </li>
       
            <div class="section clearFix" style="margin-top: 0;padding-top: 0">
              <li v-for="item in ping">
                <a href="#">{{ item }}</a>
              </li>
            </div>
          
        </ul>
        <ul class="mode-1">
          <li>
            <div class="line">
              <div class="p">材质</div>
              
            </div>
          </li>
       
            <div class="section clearFix" style="margin-top: 0;padding-top: 0">
              <li v-for="item in cai">
                <a href="#">{{ item }}</a>
              </li>
            </div>
          
        </ul>
        <ul class="mode-1">
          <li>
            <div class="line">
              <div class="p">适用人群</div>
              
            </div>
          </li>
       
            <div class="section clearFix" style="margin-top: 0;padding-top: 0">
              <li v-for="item in man">
                <a href="#">{{ item }}</a>
              </li>
            </div>
          
        </ul>
        <ul class="mode-1">
          <li>
            <div class="line">
              <div class="p">分类</div>
              
            </div>
          </li>
       
            <div class="section clearFix" style="margin-top: 0;padding-top: 0">
              <li v-for="item in categroy">
                <a href="#">{{ item }}</a>
              </li>
            </div>
          
        </ul>
        <ul class="mode-1">
          <li>
            <div class="line">
              <div class="p">类型</div>
              
            </div>
          </li>
       
            <div class="section clearFix" style="margin-top: 0;padding-top: 0">
              <li v-for="item in lei">
                <a href="#">{{ item }}</a>
              </li>
            </div>
          
        </ul>
        <ul class="mode-1">
          <li>
            <div class="line">
              <div class="p">适用场景</div>      
            </div>
          </li>
       
            <div class="section clearFix" style="margin-top: 0;padding-top: 0">
              <li v-for="item in scene">
                <a href="#">{{ item }}</a>
              </li>
            </div>
          
        </ul>
        <ul class="mode-1">
          <li>
            <div class="line">
              <div class="p">屏幕尺寸</div>      
            </div>
          </li>
       
            <div class="section clearFix" style="margin-top: 0;padding-top: 0">
              <li v-for="item in size">
                <a href="#">{{ item }}</a>
              </li>
            </div>
          
        </ul>
        <ul class="mode-1">
          <li>
            <div class="line">
              <div class="p">系统</div>      
            </div>
          </li>
       
            <div class="section clearFix" style="margin-top: 0;padding-top: 0">
              <li v-for="item in system">
                <a href="#">{{ item }}</a>
              </li>
            </div>
          
        </ul>
         <ul class="mode-1">
          <li>
            <div class="line">
              <div class="p">分辨率</div>      
            </div>
          </li>
       
            <div class="section clearFix" style="margin-top: 0;padding-top: 0">
              <li v-for="item in dpi">
                <a href="#">{{ item }}</a>
              </li>
            </div>
          
        </ul>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import tophead from '../body/Header.vue'
import { Popup } from 'mint-ui';
export default {
  data() {
    return {
      popupVisible: false,
      show: false,
      store: this.$store.state.isLogin,
      rotate: false,
      rotate2: false,
      listItems: ['京东物流','有货优先','货到付款','全球购商品','PLUS专享价','促销产品'],
      ping: ['360','小米（MI）','长虹（CHANGHONG）','夏普（SHARP）','联想（Lenovo）','十月稻田','燕之坊','天地粮人'],
      cai: ['硅胶','金属','塑料','木质','PVC','铝合金','ABS&PC','铝镁合金'],
      man: ['通用','青少年','儿童','中年','男士','女士','老人'],
      categroy: ['轻薄本','游戏本','智能摄像头','小米','登机箱','智能家庭套装','常规笔记本','智能音箱'],
      lei: ['平衡车/思维车','电动滑板车','1080p','云台机','实时对讲','无污染光','车载配件','远程开/关',''],
      scene: ['桌面','户外运动','卧室','旅行','广场舞','客厅','出差','婚庆'],
      size: ['0.8英寸以下','0.8-1.0英寸','1.0-1.2英寸','1.2英寸以上','3.0英寸及以下','5.0-4.6英寸','5.5-5.1英寸','5.6英寸及以上'],
      system: ['安卓（Android）','苹果（IOS）','Windows 10'],
      dpi: ['全高清FHD','超清FHD以上','高清HD','标清SD','4k超高清（3840×2160）','全高清（1920×1080）','全高清屏（1920×1080）','高清（1366×768）'],
      i: '',

      // 获取 pr_id
      params: {
        pr_id: this.$route.query.pr_id,
        good_name: this.$route.query.title,
      },
      data: {},
    }
  },
  methods: {
    // 获取数据
    getGoods() {
        if (this.params.pr_id && this.params.good_name) {
        var {pr_id, good_name} = this.params
        this.$http.get('http://127.0.0.1:3003/product/getDetails', {
          params: {
            pr_id,
            good_name
          }
        }).then(function (result) {
          this.data = result.body
          localStorage.setItem('product', JSON.stringify(result.body))
        })
      }
    },

    checkImg(i) {
      this.i = i
    },
    fuwu() {
      this.$refs.zong.classList.remove('zong')
      this.$refs.fuwu.classList.toggle('addfuwu')
      this.rotate2 = !this.rotate2
    },
    zonghe() {
      this.$refs.fuwu.classList.remove('addfuwu')
      this.$refs.zong.classList.toggle('zong')
      this.rotate = !this.rotate
    },
    logout() {
            this.$store.commit('isLogin', '')
            location.href = '/home'
          }, 
  },
  components: {
    tophead 
  },
  created() {
    this.getGoods()
  },
}
</script>
<style scopedSlots>

.jd-store .bg {
  background-color: #fff;
}

.mint-popup-right {
  height: 100%;
  width: 85%;
  z-index: 1111;
  overflow-y: scroll;
}
  .jd-store .mode {
    width: 100%;
    color: #333;
    background-color: #f7f7f7;
  }
  .jd-store .mode .mode-1 {
    margin-bottom: 15px;
    background-color: #fff;
  }
  .jd-store .mode .mode-1 li {
    padding: 10px 27px 10px 10px;
    line-height: 25px;
  }
  .jd-store .mode .mode-1 li .line {
    display: flex;
  }
  .jd-store .mode .mode-1 li .line .ping {
    flex: 1;
    margin-right: 10px;
    text-align: center;
  }
  .jd-store .mode .mode-1 li .line .ping div:first-child {
    font-size: 14px;
    color: #666;
  }
  .jd-store .mode .mode-1 li .line .ping div:last-child {
    margin-top: -1px;
    font-size: 12px;
    color: #999;
  }

  .jd-store .mode .mode-1 li .line .p {
    height: 25px;
    max-width: 250px;
    overflow: hidden;
    font-size: 16px;
    color: #333;
    text-overflow: ellipsis;
  }
  .jd-store .mode .mode-1 li .line .d {
    color: #e93b3d;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    margin-left: 5px;
    text-align: right;
    font-size: 12px;
  }

  .jd-store .section {
    margin: 15px 0;
    padding: 10px 0 0 10px;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
  }
  .jd-store .section li {
    box-sizing: border-box;
    float: left;
    width: 33.33%;
    padding-right: 10px;
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .jd-store .section li a {
    position: relative;
    display: block;
    padding: 0 5px;
    color: #666;
    background-color: #f7f7f7;
    border-radius: 4px;
  }


  /* 切换的样式 */
  .zong {
    display: block !important;
    z-index: 111;
  }
  .addfuwu {
    display: block !important;
    z-index: 111;
  }
  .ro {
    transform: rotate(180deg) !important;
  }
  .fuwu_d {
    background: url(http://127.0.0.1:3003/classify/dui.png) !important;
    background-size: 15px !important;;
  }

  .jd-store .pro-filter-wrap.in {
    margin-top: 0;
  }
  .jd-store .pro-filter-wrap {
    margin-top: 40px;
    position: relative;
    background-color: #fff;
    width: 100%;
  }
  .jd-store .pro-filter-wrap .inner {
    height: 40px;
  }
  .jd-store .pro-filter-wrap .inner .pro {
    height: 40px;
  }
  .jd-store .pro-filter-wrap .inner .pro .items {
    padding: 8px 0;
    height: 24px;
    line-height: 24px;
    display: flex;
    text-align: center;
    box-sizing: content-box;
  }
  .jd-store .pro-filter-wrap .inner .pro .items a {
    display: inline-block;
    padding: 0 5px;
    width: 100%;
  }
  .jd-store .pro-filter-wrap .inner .pro .items a:first-child {
    color: #e93b3d;
  }
  .jd-store .pro-filter-wrap .inner .pro .items a span {
    padding-right: 13px;
    position: relative;
  } 
  .jd-store .pro-filter-wrap .inner .pro .items a span i {
    width: 8px;
    height: 5px;
    position: absolute;
    top: 8px;
    right: 0;
  }
  .jd-store .pro-filter-wrap .inner .pro .items a:first-child span i {
     background: url(http://127.0.0.1:3003/classify/redb.png);
     background-size: 100%;
  }
  .jd-store .pro-filter-wrap .inner .pro .items a:nth-child(3) span i {
     background: url(http://127.0.0.1:3003/classify/grayb.png);
     background-size: 100%;
  }
  .jd-store .pro-filter-wrap .inner .pro .items a:nth-child(4) span i {
      top: 5px;
      right: -3px;
      width: 13px;
      height: 11px;
     background: url(http://127.0.0.1:3003/classify/top.png);
     background-size: 100%;
  }
  .jd-store .pro-filter-wrap .inner .pro .options {
    position: fixed;
    z-index: 111;
    background: #fff;
    width: 100%;
   
  }
  .jd-store .pro-filter-wrap .inner .pro .options ul {
    display: none;
  }
  .jd-store .pro-filter-wrap .inner .pro .options ul li {
    padding:  0 35px 0 10px;
    /* color: #e93b3d; */
    height: 45px;
    line-height: 45px;
    position: relative;
  }
  .jd-store .pro-filter-wrap .inner .pro .options ul li::after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background: #e5e5e5;
    transform: scaleY(.5)
  }
  .jd-store .pro-filter-wrap .inner .pro .options ul.fuwu li {
    padding: 0 10px 0 35px;
  }
  .jd-store .pro-filter-wrap .inner .pro .options ul.fuwu li span {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 16px;
    left: 11px;
    background: url(http://127.0.0.1:3003/classify/yuan.png);
    background-size: 100%;
  }


  .jd-store .pro-filter-wrap .pro2 {}
  .jd-store .pro-filter-wrap .pro2 ul {
    padding: 10px 5px 10px 15px;
    position: relative;
    height: 45px;
    display: flex;
    background-color: #fff;
  }
  .jd-store .pro-filter-wrap .pro2 ul li {
    padding-right: 10px;
    font-size: 12px;
    flex: 1;
    text-align: center;
  }

  .jd-store .pro-filter-wrap .pro2 ul li a {
    display: block;
    position: relative;
    padding: 0 5px;
    height: 25px;
    line-height: 25px;
    color: #666;
    background-color: #f2f2f7;
    border-radius: 2px;
    overflow: hidden;
  }
  .jd-store .pro-filter-wrap .pro2 ul li a img {
    display: block;
    width: 70%;
    margin: 3px auto 0;
  }
  .jd-store .floor2 {
    margin-top: 35px;
  }
  .jd-store .floor2 .wrap {
   padding: 3px 0 2px;
   position: relative;
  }
  .jd-store .floor2 .wrap-box {
     padding-left: 120px;
    position: relative;
  }

  .jd-store .floor2 .wrap-box .img {
    position: absolute;
    left: 0;
    top: 0;
    width: 120px;
    height: 120px;
  }
  .jd-store .floor2 .wrap-box .img img {
    display: block;
    width: 100%;
  }

  .jd-store .floor2 .wrap-box .txt {
    padding: 0 10px 8px;
    line-height: 1;
    overflow: hidden;
  }
  .jd-store .floor2 .wrap-box .txt .details {
    word-break: break-all;
    color: #333;
    line-height: 1.36;
    margin-top: 8px;

  }
   .jd-store .floor2 .wrap-box .txt .details img {
     height: 14px;
     vertical-align: middle;
   }
  .jd-store .floor2 .wrap-box .txt .big {
    margin: 3px 0 1px;
    height: 15px;
    overflow: hidden;
  }
  .jd-store .floor2 .wrap-box .txt .big span {
    font-size: 10px;
    height: 15px;
    line-height: 15px;
    color: #999;
    background: #f2f2f7;
    padding: 0 5px;
  }
  .jd-store .floor2 .wrap-box .txt .price {
    margin-top: 13px;
    color: #e93b3d;
    height: 18px;
  }
  .jd-store .floor2 .wrap-box .txt .price strong {
    font-weight: 400;
    font-size: 18px;
  }
  .jd-store .floor2 .wrap-box .txt .other {
    font-size: 12px;
    height: 20px;
    padding: 6px 30px 2px 0;
    box-sizing: border-box;
    overflow: hidden;
    line-height: 1.2;
    position: relative;
  }
  .jd-store .floor2 .wrap-box .txt .other span:nth-child(1) {
    color: #e93b3d;

  }
  .jd-store .floor2 .wrap-box .txt .other span:nth-child(2) {
    font-size: 12px;
    color: #999;
  }
  .jd-store .floor2 .wrap-box .txt .other span:nth-child(3) {
    position: absolute;
    right: -7px;
    top: 7px;
    font-size: 12px;
    padding-right: 13px;
    color: #666;
  }

</style>