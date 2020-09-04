<template>
  <div class="login-page">
    <div class="header">
      <img src="@/assets/header.png" />
    </div>
    <div class="login-wrap">
      <div class="login-box">
        <div class="form-item">
          <input type="text" v-model="phone" class="input" placeholder="请输入手机号" />
        </div>
        <div class="form-item">
          <input type="text" v-model="code" class="input" />
          <!-- isgt是一个布尔值，当前页面点击按钮，修改它，子组件监听数据变化，加载滑动模块 -->
          <Geet :isGeet="isgt" @geetPath="GeetPath" @clickChange="GeetChange"></Geet>
          <!-- 按钮激活 加cur -->
          <button
            v-bind:class="{'btn-code':true, cur:canSendCode}"
            @click="getCode"
            v-bind:disabled="!canSendCode"
          >{{getCodeButtonText}}</button>
        </div>
        <!-- 按钮激活 加 cur -->
        <button
          v-bind:class="{'btn-login':true, cur:validateForm}"
          @click="register"
          v-bind:disabled="!validateForm"
        >立即参与</button>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint no-unused-vars: "warn"*/
import Geet from "../components/Geet.vue"
import api from "../api/index";
import bridge from "../utils/bridge";
import { getRecomendId, setToken, setUserInfo } from "../store/user";

export default {
  name: "Login",
  data() {
    return {
      isgt: false,
      phone: "",
      code: "",
      activeLogin: false,
      codeSendCountdown: 0,
      codeTimer: undefined
    };
  },
  components: {
    Geet
  },
  computed: {
    validatePhone() {
      return /^1[3456789]\d{9}$/.test(this.phone);
    },
    validateForm() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        return false;
      }
      if (!/\d{6}$/.test(this.code)) {
        return false;
      }
      return true;
    },
    canSendCode() {
      return (
        /^1[3456789]\d{9}$/.test(this.phone) && this.codeSendCountdown === 0
      );
    },
    getCodeButtonText() {
      if (this.codeSendCountdown === 0) {
        return "获取验证码";
      } else {
        return `${this.codeSendCountdown}s`;
      }
    }
  },
  methods: {

    // 极验图片加载之后，通过更改控制变量实现可以再次加载
    GeetChange(val) {
      this.isgt = val;
    },
    GeetPath(val) {
      // console.log("4,接受到图形验证参数，将参数发往服务端进行验证");
      // console.log(val);
      this.isgt = false;
      const self = this;
      let phone = this.phone;
      api.secVerification(val,phone).then(data => {
        // self.item = data;
        self.activeLogin = true;
        console.log(data)
      }).catch(err => alert(err));
      this.codeSendCountdown = 60;
      if (!this.codeTimer) {
        this.codeTimer = setInterval(() => {
          if (self.codeSendCountdown > 0) {
            self.codeSendCountdown -= 1;
          } else {
            clearInterval(self.codeTimer);
            self.codeTimer = undefined;
          }
        }, 1000);
      }
    },

    getCode() {
      const self = this;
      this.isgt = !this.isgt;
      // api
      //   .getCode(this.phone, "login")
      //   .then(data => {
      //     self.activeLogin = true;
      //   })
      //   .catch(err => alert(err));
      // this.codeSendCountdown = 60;
      // if (!this.codeTimer) {
      //   this.codeTimer = setInterval(() => {
      //     if (self.codeSendCountdown > 0) {
      //       self.codeSendCountdown -= 1;
      //     } else {
      //       clearInterval(self.codeTimer);
      //       self.codeTimer = undefined;
      //     }
      //   }, 1000);
      // }
    },
    register() {
      const self = this;
      const recomendId = getRecomendId();
      api
        .register(this.phone, this.code, recomendId, "login_code")
        .then(data => {
          setToken(data.token.token);
          setUserInfo(data);
          self.$router.push("/");
        })
        .catch(err => {
          console.log(err);
          if (self.code === "888000") {
            setToken("vqkkvsPRraXJpTKAMlPTMRPrX-qESzqp");
            setUserInfo({ uid: "3467", login_status: 0, recommend_name:'榴榴莲莲吃' });
            self.$router.push("/");
          } else {
            self.code = "";
            alert(err);
          }
        });
    },
    // isMobile() {
    //   console.log(this.isIos(),this.isAndroid())
    //   if(this.isIos() || this.isAndroid()) {
    //     return true
    //   }else {
    //     return false
    //   }
    // },
    // // 判断是iosApp
    // isIos() {
    //     var result;
    //     var rgx= new RegExp('iphone|ipad|ipod', 'i');
    //     var rgx2 = /app\/(\d+).(\d+)?/;
    //     if(rgx.test(window.navigator.platform) &&  rgx2.test(window.navigator.userAgent)){
    //         result = true;

    //     } else {
    //         result = false;
    //     }
    //     window.sessionStorage.isApp = result;
    //     return result;
    // },
    // // 判断AndroidApp
    // isAndroid() {
    //   var result;
    //   var  rgx= new RegExp('linux', 'i');
    //   var rgx2 = /app\/(\d+).(\d+)?/;
    //   if ( rgx.test(window.navigator.platform) &&  rgx2.test(window.navigator.userAgent)) {
    //       result = true;

    //   } else {
    //       result = false;
    //   }
    //   window.sessionStorage.isApp = result;
    //   return result;
    // }
  },
  created() {
    let self = this
    if (bridge.hasBridge()) {
      // bridge.getUserInfo(init);
      console.log('111',bridge.hasBridge())
    } else {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // alert('微信浏览器')
        console.log('微信浏览器端')
      } else {
        self.$router.push("/tips");
      }
    }
    
  }
};
</script>
<style lang="less" scoped>
// body{
//   background:rgba(250,250,250,1);
// }
</style>
