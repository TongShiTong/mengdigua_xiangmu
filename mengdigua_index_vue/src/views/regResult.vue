<template>
  <div class="rR-root">
    <HeaderBar />
    <div class="rR">
      <div class="rR-con">
        <div class="rR-c" v-if="result?result=='1':true">
          <img class="rR-con-img1" src="../../src/assets/ing.png" alt />
          <div class="rR-con-tip1">
            正在审核，预计7个工作日内完成审核，请耐心等待……
            <b @click="goChange()" style="color: #F8483A">修改资料</b>
          </div>
          <div class="rR-con-tip2">若有疑问，请联系客服{{pingtaiData.liemi_intel_tel}}</div>
        </div>

        <div class="rR-c" v-if="result=='3'">
          <img class="rR-con-img1" src="../../src/assets/fail.png" alt />
          <div class="rR-con-tip1">
            审核不通过，请重新填写并提交资料！
            <b @click="goChange()" style="color: #F8483A">修改资料</b>
          </div>
          <div
            class="rR-con-tip2"
            style="font-size: 16px;color: #3d3d3d;font-weight: bold"
          >拒绝理由：{{reason}}</div>
          <div class="rR-con-tip2">若有疑问，请联系客服{{pingtaiData.liemi_intel_tel}}</div>
        </div>

        <div class="rR-c" v-if="result=='2'">
          <img class="rR-con-img1" src="../../src/assets/pass.png" alt />
          <div class="rR-con-tip1">审核通过，去经营店铺吧！</div>
          <div class="rR-con-tip3s">
            <div class="rR-con-tip3">
              店铺网址：
              <a
                target="_blank"
                href="http://admin.mengdigua.cn/site/login"
                style="text-decoration: underline;color: #3D3D3D"
              >http://admin.mengdigua.cn/site/login</a>
            </div>
            <div class="rR-con-tip3">登录账号：{{myShop.username}}</div>
            <div class="rR-con-tip3">
              初始密码：{{myShop.password}}&nbsp;&nbsp;
              <span style="color: #F8483A">(初始密码请及时修改)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import HeaderBar from "./../components/RegHeader.vue";
export default {
  name: "regResult",
  components: {
    HeaderBar
  },
  computed: {
    ...mapState(["reason", "result", "myShop"])
  },

  data() {
    return {
      pingtaiData: ""
    };
  },
  created() {
   
    const self = this;
    this.pingtaiMsg({}).then(res => {
    
      self.pingtaiData = res.data.data;
    });
  },
  methods: {
    ...mapMutations(["changeStep","changeIsSet"]),
    ...mapActions(["pingtaiMsg"]),
    goChange() {
      this.changeStep(1);
      this.changeIsSet(true)
    }
  }
};
</script>
<style>
.rR-root {
  min-height: 100vh;
  background: rgba(249, 249, 249, 1);
}
.rR {
  width: 90%;
  max-width: 1300px;
  min-width: 1150px;
  padding: 20px 30px;
  box-sizing: border-box;
  background: white;
  margin-top: 20px;
  border-radius: 8px;
  margin: 0 auto;
}
.rR-tit {
  font-size: 20px;
}
.rR-con {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rR-con-img1 {
  width: 400px;
  height: 400px;
}
.rR-con-tip1 {
  font-size: 14px;
  font-weight: 600;
  color: #3d3d3d;
  margin-top: 30px;
}
.rR-con-tip1 b {
  cursor: pointer;
}
.rR-con-tip2 {
  font-size: 12px;
  color: #3d3d3d;
  margin-top: 25px;
}
.rR-con-tip3s {
  font-size: 12px;
  margin-top: 20px;
}
.rR-con-tip3 {
  font-size: 14px;
  color: rgba(65, 63, 63, 1);
  margin-top: 12px;
}
.rR-con-tip4 {
  margin-top: 20px;
  font-size: 14px;
  color: rgba(248, 72, 58, 1);
}
.rR-c {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rR-con-tip3:hover {
  cursor: pointer;
}
</style>


