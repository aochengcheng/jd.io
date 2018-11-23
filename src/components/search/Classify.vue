<template>
    <div class="jd-classify">
      <c-header>
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

      <router-link :to="{path: '/home'}" class="icon-logo"  slot="goHome">
        <img src="http://127.0.0.1:3003/img/leftj.png" alt="">
      </router-link>

      <i class="jd-quan jd_quan" slot="jd_quan" ></i>

      <input type="text" :class="'jd_input'"  placeholder="京东超级品牌日 超级狂欢GO" slot="jd_input">
      </c-header>
      <!-- category 分类 -->
      <div class="category clearFix" :style="{height: height}">
        <!-- rootList -->
        <div class="rootList">
          <div class="root-box">
            <ul>
              <li v-for="(item, index) in hotTxt" :key="item.id" :rid="item.id" :intro="item.category_name" @click="getAll(item.id)" >
                <a href="#" v-text="item.category_name" @click="handleClick(index)" :class="{red: current == index}"></a>
              </li>
            </ul>
          </div>
        </div>

        <div class="category-content">
          <div class="content-box">
            <div class="content-scroll">

               <div v-for="k of cate">
                 <h4>{{ k }}</h4>
                 <ul class="clearFix">
                   <li v-for="(item, index) in hotGoods" :key="index" :title="item.title" @click.prevent="$router.push('/ClassCart?pr_id=' + (index+1) + '&title=' + (item.title ? item.title : ''))">
                     <a href="#">
                       <img :src="'http://127.0.0.1:3003' + item.img_url" alt="">
                       <span v-text="item.brand_name"></span>
                     </a>
                   </li>
                 </ul>    
               </div>
               
            </div>
          </div>
        </div>


      </div>

      <c-footer>
        <img src="http://127.0.0.1:3003/myjd/index.png" alt="" slot="page">

        <img src="http://127.0.0.1:3003/classify/fenlei.png" alt="" slot="fenlei">

        <img src="http://127.0.0.1:3003/myjd/pingo.png" alt="" slot="vv">

        <img src="http://127.0.0.1:3003/img/login.png" alt="" slot="me">
      </c-footer>

    </div>
</template>

<script>
  import CHeader from '../body/Header' 
  import CFooter from '../body/Footer' 
  export default {
    data() {
      return {
        host: 'http://127.0.0.1:3003',
        dian: '',
        hotTxt: [],
        hotGoods: [],
        cate: [],
        current: 0,
        // category 的高度
        height: '',
        show: false,
        store: this.$store.state.isLogin,
      }
    },
    props: ['tb'],
    components: {
      CHeader,
      CFooter
    },
    methods: {  
      logout() {
        this.$store.commit('isLogin', '')
        location.href = '/home'
      }, 
      getAll(rid) {
        this.cate = []
        if (rid == this.current + 1) {
           this.$http.post(this.host + '/Mobile', {
             id: rid
           },{
             headers: {
               token: 'abccc'
             }
           }).then(function (result) {
             this.hotGoods = result.body

              for(var k of result.body) {
                if (k.cate !== null) {
                  this.cate.push(k.cate)                
                }
              }
           })


        }    
      },


      getHotGoods() {
        this.$http.get(this.host + '/hotGoods')
            .then(function (result) {
              this.hotGoods = result.body
            })
      },
      getCategory() {
        this.$http.get(this.host + '/category')
            .then(function (result) {
              this.hotTxt = result.body
            })
      },
      //  点击变红
      handleClick(i) {
        this.current = i
      },
      // 获取高度.
      getHeight() {
        this.height = (window.innerHeight - 94) + 'px'
      },
      getInfo() {
        // this.$store.state.lo
      }
    },
    created() {
      this.getCategory()
      this.getHeight()
      this.getHotGoods()
      this.getAll(1)
      // this.$emit('userSign')
    },
  
  }
</script>

<style >
.red {
  color: red;
}

.jd-classify {
  margin-top: 50px;
}
.jd_quan {
    left: 1px !important;
  }
  .jd_input {
    padding-left: 30px !important;
  }

  .category {
    overflow: hidden;
     height: 500px;
  }
  .category .rootList {
    width: 86px;
    background-color: #f8f8f8;
    float: left;
    min-width: 76px;
    height: 100%;
  }
  .category .rootList .root-box {
    overflow-y: auto;
     height: 100%;  
  }

  .category .rootList .root-box ul li {
    text-align: center;
  }
  .category .rootList .root-box ul li a {
    display: block;
    height: 46px;
    line-height: 46px;
  }

  .category-content {
    width: 100%;
    height: 100%;
  }
  .category-content .content-box {
    margin-left: 86px;
    overflow-y: auto;
    height: 100%;
  }
  .category-content .content-box .content-scroll {
    overflow: hidden;
    margin: 17px 7px 0;
  }
  .category-content .content-box .content-scroll div:not(:first-child) {
    margin-top: 13px;
  }
    .category-content .content-box .content-scroll h4 {
      margin-bottom: 15px;
    }
   .category-content .content-box .content-scroll ul {}
   .category-content .content-box .content-scroll ul li {
     width: 32.8%;
     text-align: center;
     float: left;
     margin-bottom: 10px;
   }
   .category-content .content-box .content-scroll ul li a {
     display: block;
     width: 100%;
     height: 100%;
   }
   .category-content .content-box .content-scroll ul li a img {
     display: block;
     height: 70px;
     width: 70px;
     margin: 0 auto;
   }
   .category-content .content-box .content-scroll ul li a span {
     font-size: 12px
   }

   
</style>
