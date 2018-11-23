<template>
  <div class="jd-login">
      <div class="header">
        <a href="#" class="back" @click.prevent="goHome"></a>
        <span class="jd-go">京东登录</span>
      </div>

      <div class="wrap">
        <div class="input-container">
          <input name="uname" type="text" placeholder="用户名/邮箱/已验证手机" v-model="uname" @keyup="keydown"  @focus.stop="focus()" @blur.stop="blur" autocomplete>
          <i class="close" v-show="close" @click="uname=''"></i>
        </div>
        <div class="input-container">
          <input name="upwd" v-model="upwd"  :type="typeStyle ? 'password': 'text'" @keyup="keydown" placeholder="请输入密码" class="pwd" @focus="close2 = !close2" @blur="close2 = !close2">
          <i class="close two" v-show="close2" @click="upwd=''"></i>
          <label for="off" class="checkbox">
            <input type="checkbox" id="off" @click="type">
            <div class="checkbtn" :style="typeStyle?' background: url(http://127.0.0.1:3003/login/eys.png) no-repeat center / 100% auto;':' background: url(http://127.0.0.1:3003/login/open.png) no-repeat center / 100% auto;'"></div>
          </label>
          <button class="forget">忘记密码</button>
        </div>

        <div class="goin">
          <div class="error" v-show="false">
            账号或密码错误
          </div>
          <a href="#" class="com t" :style="linear ? 'background-image:linear-gradient(90deg,#f10000,#ff2000 73%,#ff4f18)': 'background-image:linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba)'" @click.prevent="login(); ">
            登录
          </a>
          <a href="#" class="com b" @click.prevent="">
            一键注册
          </a>

          <div class="quick">
            <a href="#">
              短信验证码登录
            </a>
            <a href="#">
              手机快速注册
            </a>
          </div>
        </div>

      </div>

      
  </div>  
</template>

<script>
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        host: 'http://127.0.0.1:3003',
        typeStyle: true,
        close: false,
        close2: false, 
        uname: '',
        upwd: '',
        linear: false,
        font: 'active'
      }
    },
    methods: {
      login() {  
        if (this.linear) {
          var that = this
          this.$http.post(this.host + '/login', {
            uname: this.uname,
            upwd: this.upwd
          }, {
            headers: {
              token: 'dac', 
            }
          }).then(function (result) {
            console.log(result)

            this.$store.commit('isLogin', result.body)
            var data = result.body
            if (data.err_code == 1) {
              Toast('登录成功.')            
              setTimeout( () => { 
                this.$router.push('/myjd')
              },2000)
            } else {
              Toast('账号或密码错误.')
            }
          })
        }
      },
      keydown() {
        if (this.uname && this.upwd) {
          this.linear = true
        } else {
          this.linear = false
        }
      },
      focus() {
        this.close = !this.close
      },
      blur() {
        this.close = !this.close 
      },

      type() {
        this.typeStyle = !this.typeStyle 
      },
      goHome() {
        this.$router.push('/home')
        
      }
    },

    created() {
      // this.$emit('public_header', false);   
      // this.$emit('public_header', false)
      
       document.querySelector('html').style.fontSize = '100px'
    },
    beforeDestory() {
       
    },

    destroyed() {
      document.querySelector('html').style.fontSize = ''
    },
    
  }
</script>

<style scopedSlots>
.jd-login {
    position: absolute;
    background: #fff;
    max-width: 640px;
    width: 100%;
    height: 100%;
    z-index: 1000;
}
.jd-login .header {
  height: .44rem;
  line-height: .44rem;
  font-size: .17rem;
  background-color: #fff;
  text-align: center;
  position: relative;
}
.jd-login .jd-go {
  font-size: .17rem;
}
.jd-login .back {
  position: absolute;
  left: 10px;
  top: 10px;
  background: url(http://127.0.0.1:3003/login/left.png) no-repeat;
  background-size: .25rem;
  width: .24rem;
  height: .24rem;
  top: .1rem
}

.jd-login .wrap {
  padding: 0 .25rem .25rem;
  width: 100%;
}
.jd-login .input-container {
  width: 100%;
  height: .5rem;
  padding: .1rem 0;
  margin-top: .2rem;
  background-color: #fff;
  border-bottom: .01rem solid #efefef;
  position: relative;
}
.jd-login .input-container input {
  padding-right: .3rem;
  color: #222;
  font-size: .16rem;
  height: 100%;
  width: 100%;
}
.jd-login .input-container input.pwd {
  padding-right: 1.5rem
}
.jd-login .input-container i {
  position: absolute;
  width: .24rem;
  height: .24rem;
  background-repeat: no-repeat;
  background-size: 100%;
  right: 0;
  top: 13px;
}
.jd-login .input-container i.close {
  background-image: url(http://127.0.0.1:3003/login/close.png);
}
.jd-login .input-container i.close.two {
  right: 1.256rem
}


.jd-login .input-container .checkbox {
  position: absolute;
  right: .9rem;
  top: .13rem;
  width: .24rem;
  height: .24rem;
  overflow: hidden;
  z-index: 99;
}
.jd-login .input-container .checkbtn {
  position: relative;
  width: .24rem;
  height: .24rem;
}

.jd-login .input-container #off {
  display: none;
}
.jd-login .input-container #off:checked+.checkbtn {
  background: url(http://127.0.0.1:3003/login/open.png) no-repeat center / 100% auto;
}
.jd-login .input-container .forget {
  outline: none;
  border: none;
  position: absolute;
  right: 0;
  top: .16rem;
  background: transparent;
  padding: 0 0 0 .16rem;
  border-left: 1px solid #ccc
}

.jd-login .goin {
  padding-top: .05rem;
  margin-top: .5rem;
}
.jd-login .goin .error {
  color: #f23030;
  margin-top: .07rem;
  margin-bottom: .11rem;
}

.jd-login .goin .com {
  display: block;
  width: 100%;
  height: .5rem;
  line-height: .5rem;
  text-align: center;
  border-radius: .25rem;
  background-image: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba);
  font-size: .16rem;
  color: #fff;
  margin-bottom: .15rem;
}
.jd-login .goin .com.b {
  border: 1px solid #f23030;
  color: #f23030;
  background: #fff;
}

.jd-login .goin .quick {
  margin-top: .2rem;
}
.jd-login .goin .quick a {
  color: #999;
}
.jd-login .goin .quick a:first-child {
  float: left;
}
.jd-login .goin .quick a:first-child {
  float: right;
}
</style>
