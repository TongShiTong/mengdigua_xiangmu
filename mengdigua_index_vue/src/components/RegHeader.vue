<template>
  <div class="header-root">
    <div class="nav-header flex-b-c">
      <div class="nav-left">
        <img src="./../assets/home/nav-logo.png" alt="加载异常" class="nav-logo" />
        <div class="nav-vertical-line"></div>
        <div class="nav-tip">商家入驻</div>
      </div>
      <div class="nav-right flex-c-c">
        <p class="username">您好，{{phone}}</p>
        <button class="exit" @click="goLogin">退出登录</button>
      </div>
    </div>
    <div class="step flex-c-c">
      <div class="step-item flex-c-c">
        <div class="step-box" :style="step>=1?'background:rgba(255,211,0,1);opacity:1;':''">1</div>店铺/企业信息
      </div>
      <div class="step-line"></div>
      <div class="step-item flex-c-c">
        <div class="step-box" :style="step>=2?'background:rgba(255,211,0,1);opacity:1;':''">2</div>证照及其他
      </div>
      <div class="step-line"></div>
      <div class="step-item flex-c-c">
        <div class="step-box" :style="step>=3?'background:rgba(255,211,0,1);opacity:1;':''">3</div>经营售后
      </div>
      <div class="step-line"></div>
      <div class="step-item flex-c-c">
        <div class="step-box" :style="step>=4?'background:rgba(255,211,0,1);opacity:1;':''">4</div>店铺审核
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "header-root",
  data() {
    return {};
  },
  computed: {
    ...mapState(["step", "phone"])
  },
  methods: {
    ...mapMutations(["exit"]),
    goLogin() {
      this.exit();
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.step {
  width: 90%;
  max-width: 1300px;
  min-width: 1150px;
  height: 100px;
  background: rgba(255, 255, 255, 1);
  margin: 40px auto;
  border-radius: 8px;
}
.step-box {
  width: 50px;
  height: 50px;
  background: rgba(61, 61, 61, 1);
  opacity: 0.2;
  border-radius: 50%;
  font-size: 24px;
  font-weight: 500;
  line-height: 50px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  margin-right: 5px;
}
.step-line {
  width: 60px;
  height: 1px;
  margin: 0 46px;
  border: 1px solid rgba(61, 61, 61, 1);
}
.step-item {
  font-size: 20px;
  font-weight: 500;
  line-height: 27px;
}
.nav-right {
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  margin-right: 18.9%;
  margin-left: 17px;
}
.exit {
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-left: 30px;
}
.nav-header {
  height: 96px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.08);
}
.nav-left {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 18.9%;
}
.nav-logo {
  width: 157px;
  margin-right: 16px;
}
.nav-vertical-line {
  width: 2px;
  height: 20px;
  background: rgba(0, 0, 0, 1);
}
.nav-tip {
  font-size: 20px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  opacity: 0.9;
  margin-left: 16px;
}
</style>