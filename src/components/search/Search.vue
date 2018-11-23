<template>
  
  <div class="jd-search-in">
    <my-search>
      <a href="#" class="login redTxt" @click.prevent="" slot="search">
        <span>
           搜索
        </span>
      </a>

      <router-link :to="{path: '/home'}" class="icon-logo"  slot="goHome">
        <img src="http://127.0.0.1:3003/img/leftj.png" alt="">
      </router-link>

      <i class="jd-quan jd_quan" slot="jd_quan"></i>

      <input type="text" :class="'jd_input'"  placeholder="京东超级品牌日 超级狂欢GO" slot="jd_input">
    </my-search>
    <div>
      <div class="zuijin">
        <span>最近搜索</span>
        <i></i>
      </div>
      <div class="goods">
        <a href="#">兰蔻</a>
        <a href="#">女装</a>
        <a href="#">服饰</a>
      </div>
    </div>

    <div class="hot">
      <div class="hot-search">
        <span>热门搜索</span>
      </div>
      <div>
        <span v-for="(item, index) in goods" :key="item.key" :gid="item.gid">
          <a v-text="item.key" href="#">
            
          </a>
        </span>
      </div>
    </div>
  </div>  
</template>

<script>

  import MySearch from '../body/Header'

  export default {
    data() {
      return {
        goods: {},
  
      }
    },
    methods: {
      getJson() {
        this.$http.get('http://127.0.0.1:3003/goods.json')
          .then(function (result) {
            this.goods = result.body
          })
      }
    },
    created() {
      this.getJson() 
    },
    components: {
      MySearch
    },
    destoryed() {
 
    }
  }
</script>
<style>
  .jd_quan {
    left: 1px !important;
  }
  .jd_input {
    padding-left: 30px !important;
  }


  .jd-search-in {
    height: 100%;
    width: 100%;
    background-color: #fff;
    position: relative;
    z-index: 1111;
    top: 43px;
    border-top: 1px solid #ccc;
    padding-left: .6rem;
  }

  .zuijin {
    margin-top: .5rem;
    font-size: 16px;
    padding-bottom: .3rem;
    position: relative;
  }
  .zuijin i {
    float: right;
    width: 15px;
    height: 15px;
    background: url(http://127.0.0.1:3003/img/search-sprites.png) no-repeat;
    background-position: 0 -35px;
    background-size: 50px 50px;
    position: absolute;
    top: 2px;
    right: 14px
  }
  .goods a {
    padding: 0 13px;
    color: #686868;
    background-color: #f0f2f5;
    line-height: 25px;
    
  }
  .hot {
    margin-top: 1.5rem;
    overflow: hidden;
  }
  .hot-search {
    overflow: hidden;
    margin-bottom: .5rem;
    font-size: 16px
  }
  .hot span {
    margin: 0 .3rem .4rem 0;
    float: left;
  }
  .hot span a {
    padding: 0 13px;
    color: #686868;
    background-color: #f0f2f5;
    line-height: 25px;
  }
</style>
