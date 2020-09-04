<template>
  <div class="reg3">
    <HeaderBar />
    <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <img :src="src" style="width: 100%;height: 100%" />
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
    <el-dialog :title="tips" :visible.sync="dialogVisible1" width="80%" :before-close="handleClose">
      <span v-html="xieyitips"></span>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
    <div class="section">
      <div class="sectionTitle">|&nbsp;&nbsp;&nbsp;经营信息</div>
      <div class="reg-item">
        <div class="reg-title">店铺名称：</div>
        <el-input v-model="name" placeholder="请输入店铺名称" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-tip">
        <div>命名规则</div>
        <div>一、水果类</div>
        <div style="text-indent: 2em">1、**+品类+果园 如：萌萌橘子果园园</div>
        <div style="text-indent: 2em">2、**+果园 如：萌萌果园</div>
        <div style="text-indent: 4em">条件：需是果园主（果园归属权所有者) ,拥有农业种植相关资质法人公司(不接受个人入驻) 或者拥有果园主授权公司</div>
        <div style="text-indent: 2em">3、**+原产地+品类+果园 如：萌萌石门橘子果园园</div>
        <div style="text-indent: 4em">条件：满足前面3项条件、具有地理品牌商标（共用）</div>
        <br />
        <div>二、水产瓜果畜牧综合类</div>
        <div style="text-indent: 2em">**+农场. 如：萌萌农场</div>
        <div style="text-indent: 4em">条件：</div>
        <div style="text-indent: 6em">1、农场主（农场归属权所有者），</div>
        <div style="text-indent: 6em">2、种植相关资质法人公司（不接受个人入驻）</div>
        <div style="text-indent: 6em">3、农场授权公司</div>
        <div style="text-indent: 6em">4、具有综合种养植基地</div>
        <br />
        <div>三、品质厂家命名</div>
        <div style="text-indent: 2em">某某品牌+品类+工匠店 如：王麻子剪刀工匠店</div>
        <div style="text-indent: 2em">条件：商标需是工作室或者公司，拥有相关资质法人公司（不接受个人入驻）或者拥有主体司独占授权</div>
        <br />
        <div>四、其他产品命名</div>
        <div style="text-indent: 2em">**品牌+品类+旗舰店</div>
        <div style="text-indent: 2em">**品牌+旗舰店</div>
      </div>
      <div class="reg-item">
        <div class="reg-title" style="vertical-align: top;">店铺图标：</div>
        <div style="display: inline-block">
          <div style="display:inline-block;margin-right: 20px">
            <div style="display:inline-block">
              <imgUpload :kind="1" :typekind="3" @demo1="demo1" :imageUrl="logo_url"></imgUpload>
            </div>
            <span class="redstars">*</span>
          </div>

          <div
            style="display: inline-block;background-color: #F7F7F7;width: 240px;height: 150px;position: relative"
          >
            <img src="../assets/storelogo.png" style="width: 100%;height: 100%" />
            <button
              class="cover_bg"
              @click="showlogoimg()"
              style="position: absolute;bottom: 0px;left: 0px;right: 0px;height: 30px;width: 100%;background-color: #3d3d3d;color: white;border-width: 0px;opacity: 100%;outline: none"
            >示例图(点击查看)</button>
          </div>
        </div>
      </div>
      <div class="reg-tip">
        <div>注：正方形图片（尺寸为300*300），大小不超过2M，请务必使用自己的店铺logo出现以下几类logo，审核时将会被驳回</div>
        <div style="text-indent: 2em">1.含有二维码、网址、微信号或其他联系方式</div>
        <div style="text-indent: 2em">2.出现广告语</div>
        <div style="text-indent: 2em">3.使用未经授权的他人品牌</div>
        <div style="text-indent: 2em">4.出现第三方电商平台信息</div>
      </div>
      <div class="reg-item">
        <div class="reg-title" style="vertical-align: top">店铺详情：</div>
        <el-input v-model="content" maxlength="300" placeholder="请输入店铺详情" class="reg-inp" type="textarea" :rows="8"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-tip">
        <div>1.个人店铺不能出现厂家直营、直销、批发零售、涉及品牌、个人联系方式或者第三方平台的信息</div>
        <div>2.企业店铺不能出现批发零售、个人联系方式或者第三方平台的信息</div>
        <div>3.详情不超过300字</div>
      </div>
    </div>

    <div class="section">
      <div class="reg-item">
        <div class="sectionTitle">|&nbsp;&nbsp;&nbsp;主营类目</div>
        <div class="reg-title">主营类目：</div>
        <el-cascader class="reg-inp" v-model="main_camp_id" :props="optionProps" :options="options"></el-cascader>
        <span class="redstars">*</span>
      </div>
      <div class="reg-tip">
        <div>1、不同的店铺性质与主营类目，将关系到上传商品的种类和您所交保证金的金额，您可以在入驻后以销售货款（可提现金额）转充店铺保证金，</div>
        <div>但应在提现或报名平台活动前缴足，详情请查看《保证金规则》；</div>
        <div>2、经营食品需要上传食品经营许可证（食品流通许可证）；经营酒类需另行上传酒类流通许可证或酒类流通备案登记表，因当地主管部门规定</div>
        <div>无需办理前述证照的，应上传申明书，申明书模板见《入驻手册》，详询商家支持。</div>
      </div>
      <div class="reg-item">
        <div class="reg-title" style="vertical-align: top;">上传附件：</div>
        <div style="display: inline-block">
          <div style="display:inline-block;margin-right: 20px">
            <div style="display:inline-block">
              <imgUpload :kind="2" :typekind="3" @demo2="demo2" :imageUrl="enclosure"></imgUpload>
            </div>
            <span class="redstars">*</span>
          </div>

          <div
            style="display: inline-block;background-color: #F7F7F7;width: 240px;height: 150px;position: relative"
          >
            <img src="../assets/attach.png" style="width: 100%;height: 100%" />
            <button
              class="cover_bg"
              @click="showattachimg()"
              style="position: absolute;bottom: 0px;left: 0px;right: 0px;height: 30px;width: 100%;background-color: #3d3d3d;color: white;border-width: 0px;opacity: 100%;outline: none"
            >示例图(点击查看)</button>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="sectionTitle">|&nbsp;&nbsp;&nbsp;售后信息</div>
      <div class="reg-item">
        <div class="reg-title">售后电话：</div>
        <el-input v-model="shop_remind_tel" placeholder="请输入售后电话" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">退货收件人：</div>
        <el-input v-model="refund_addressee" placeholder="请输入退货收件人" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">退货地址：</div>
        <el-cascader
          style="width: 250px"
          :options="regions"
          v-model="a_id2"
          :placeholder="refund_location?refund_location:'请选择城市'"
          @change="handleChange"
        ></el-cascader>
        <el-input
          style="margin-left: 10px"
          v-model="refund_full_address"
          placeholder="请填写公司具体地址"
          class="reg-inp"
        ></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">退货手机号：</div>
        <el-input v-model="refund_cell_phone" placeholder="请输入退货手机号码" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">退货电话：</div>
        <el-input v-model="refund_phone" placeholder="请输入退货电话号码" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-tip">
        <div>注：退货手机号码和退货电话号码必须填写其中一个</div>
      </div>
    </div>

    <div class="section">
      <div class="sectionTitle">|&nbsp;&nbsp;&nbsp;入驻协议</div>
      <div class="reg-item" style="display: flex;align-items: center;">
        <div class="reg-title">入驻协议：</div>
        <div
          @click="changeAgree()"
          :style="{borderColor:agreement=='0'?'#dddddd':'#3d3d3d'}"
          style="display: inline-block;width: 100px;height:35px;position: relative;border-width: 1px;border-style: solid;border-radius: 3px;"
        >
          <el-radio
            onclick="return false;"
            style="left: 50%;top: 50%;position: absolute;transform: translate(-50%, -50%);line-height: 35px"
            v-model="agreement"
            label="1"
          >同意</el-radio>
        </div>
        <div style="display: flex;align-items:center;height: 40px;margin-left: 20px">
          <div style="display: inline-block;color: #3d3d3d">请仔细阅读入驻协议</div>
          <span style="color: #FFD300" class="xieyibt" @click="showxieyibt()">《入驻协议》</span>
        </div>
      </div>
    </div>

    <div class="reg-bottom">
      <span style="background-color: #CCCCCC" @click="goUpstep()">上一步</span>
      <span @click="goNext()">下一步</span>
    </div>
  </div>
</template>
<script>
// import {TimeStap,TimeString} from '@/utils/index'

import Vue from "vue";
import HeaderBar from "./../components/RegHeader.vue";
import { mapActions, mapState, mapMutations } from "vuex";
import imgUpload from "../components/imgUpload";
import imgsUp from "../components/imgsUp";
import { regionData, CodeToText } from "element-china-area-data";

import MyLoading from "./../utlis/loading.js";
let loadingInstance = new MyLoading();
export default {
  name: "regPart3",
  components: {
    [imgUpload.name]: imgUpload,
    [imgsUp.name]: imgsUp,
    HeaderBar
  },
  computed: {
    ...mapState(["myShop", "isSetUp", "token", "stepObj1", "stepObj2","stepObj3"])
  },
  data() {
    return {
      Obj: {},
      optionProps: {
        value: "id",
        label: "name",
        children: "pidList"
      },
      title: "", //大屏
      src: "", //大屏
      dialogVisible: false, //大屏的开启和关闭
      platform_url: "",
      regions: regionData,
      a_id2: "",
      refund_addressee: "", //退货收件人：
      refund_cell_phone: "", //退货手机号码
      refund_phone: "", //退货电话
      agreement: "0", //是否同意协议
      tips: "",
      dialogVisible1: false,
      xieyitips: "",
      name: "", //店铺名称
      main_camp_id: "",
      content: "", //店铺详情：
      options: [], //主要类目
      logo_url: "", //店铺图标：
      enclosure: "", //上传附件：
      shop_remind_tel: "", //售后电话：
      refund_location: "", //退货城市：
      refund_full_address: "", //退货地址详情
      imgArr: [],
      value: "",
      shopType: "",
      input: "",
      value1: "",
      is_query: false
    };
  },
  created() {
    this.getMainCate();
    if (Object.keys(this.stepObj3).length === 0){
      
      if(this.isSetUp){
          this.getAllMsg(this.myShop);
      }
    }
    else{
      this.getAllMsg(this.stepObj3)
    }
  },
  mounted() {
    this.is_query = false;
  },
  methods: {
    ...mapActions(["mainCate", "xieyi", "storeApply", "changeDetail"]),
    ...mapMutations(["changeStepObj3", "changeStep","changeReason","changeResult"]),
    changeAgree() {
      //是否阅读了协议
      const self = this;
      if (self.agreement == "0") {
        self.agreement = "1";
      } else {
        self.agreement = "0";
      }
      event.stopPropagation();
    },
    handleChange(value) {
 
      this.refund_location =
        "" + CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]];
    },
    handleClose(done) {
      //隐藏弹框
      done();
    },
    showxieyibt() {
      this.tips = "入驻协议";
      let self = this;
      this.xieyi({
        type: 9
      }).then(res => {
        self.xieyitips = res.data.data.content;
        self.dialogVisible1 = true;
      });
    },
    goUpstep() {
      // 上一步
      this.changeStep(2);
    },
    showlogoimg() {
      this.title = "LOGO";
      this.src = require("../assets/storelogo.png");
      this.dialogVisible = true;
    },
    showattachimg() {
      this.title = "附件";
      this.src = require("../assets/attach.png");
      this.dialogVisible = true;
    },
    getMainCate() {
      const self = this;
      this.mainCate({
        start_page: "0",
        pages: "999"
      })
        .then(d => {
          let ddd = d.data.data.list;
          ddd.forEach((v, i, a) => {
            v.pidList.forEach((vv, ii, aa) => {
              delete vv.pidList;
            });
          });
          self.options = ddd;
        })
        .catch(d => {});
    },
    getAllMsg(obj) {
      this.name = obj.name;
      this.logo_url = obj.logo_url;
      this.content = obj.content;
      this.options.forEach((v, i, a) => {
        v.pidList.forEach((vv, ii, aa) => {
          if (vv.id == obj.main_camp_id) {
            self.main_camp_id = [v.id, obj.main_camp_id];
          }
        });
      });
     // this.main_camp_id=this.myShop.main_camp_id
      this.enclosure =obj.enclosure;
      this.shop_remind_tel = obj.shop_remind_tel;
      this.refund_addressee = obj.refund_addressee;
      this.refund_location = obj.refund_location;
      this.refund_full_address =obj.refund_full_address;
      this.refund_cell_phone = obj.refund_cell_phone;
      this.refund_phone = obj.refund_phone;
      this.agreement =obj.agreement;
    },
    goNext() {
     
      const self = this;
      if (!this.name.trim()) {
        Vue.prototype.$message({ message: "请输入店铺名称", type: "warning" });
        return false;
      }
      if (!this.logo_url) {
        Vue.prototype.$message({ message: "请上传店铺LOGO", type: "warning" });
        return false;
      }
      if (!this.content.trim()) {
        Vue.prototype.$message({ message: "请输入店铺详情", type: "warning" });
        return false;
      }
      if (!this.main_camp_id) {
        Vue.prototype.$message({ message: "请选择主营类目", type: "warning" });
        return false;
      }
      if (!this.enclosure) {
        Vue.prototype.$message({ message: "请上传附件", type: "warning" });
        return false;
      }
      if (!this.shop_remind_tel.trim()) {
        Vue.prototype.$message({ message: "请输入售后电话", type: "warning" });
        return false;
      }
      if (!this.refund_addressee.trim()) {
        Vue.prototype.$message({
          message: "请输入退货收件人姓名",
          type: "warning"
        });
        return false;
      }
      if (!this.refund_location) {
        Vue.prototype.$message({ message: "请选择省市区", type: "warning" });
        return false;
      }
      if (!this.refund_full_address.trim()) {
        Vue.prototype.$message({
          message: "请输入退货详细地址",
          type: "warning"
        });
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.refund_cell_phone)) {
        if (!this.refund_phone.trim()) {
          Vue.prototype.$message({
            message: "请输入退货手机号",
            type: "warning"
          });
          return false;
        } else {
          this.refund_cell_phone = this.refund_phone;
        }
      }
      if (!this.refund_phone) {
        if (!this.refund_cell_phone) {
          Vue.prototype.$message({
            message: "请输入退货电话",
            type: "warning"
          });
          return false;
        } else {
          this.refund_phone = this.refund_cell_phone;
        }
      }
      if (this.agreement != 1) {
        Vue.prototype.$message({
          message: "请选择入驻协议是否同意",
          type: "warning"
        });
        return false;
      }

      this.changeStepObj3({
        name: self.name,
        logo_url: self.logo_url,
        content: self.content,
        main_camp_id: self.main_camp_id[1],
        enclosure: self.enclosure,
        shop_remind_tel: self.shop_remind_tel,
        refund_addressee: self.refund_addressee,
        refund_location: self.refund_location,
        refund_full_address: self.refund_full_address,
        refund_cell_phone: self.refund_cell_phone,
        refund_phone: self.refund_phone,
        agreement: self.agreement
      });
      //在此处提交信息

      Object.assign(this.Obj, this.stepObj1);
      Object.assign(this.Obj, this.stepObj2);
      Object.assign(this.Obj, {
        name: self.name,
        logo_url: self.logo_url,
        content: self.content,
        main_camp_id: self.main_camp_id[1],
        enclosure: self.enclosure,
        shop_remind_tel: self.shop_remind_tel,
        refund_addressee: self.refund_addressee,
        refund_location: self.refund_location,
        refund_full_address: self.refund_full_address,
        refund_cell_phone: self.refund_cell_phone,
        refund_phone: self.refund_phone,
        agreement: self.agreement
      });
      Object.assign(this.Obj, { token: this.token });

      if (self.is_query) {
        return;
      }
      self.is_query = true;
      loadingInstance.open(self.$refs.nextBtn);
      if (self.isSetUp) {
        this.changeDetail(self.Obj)
          .then(res => {
          
            let d = res.data;
            loadingInstance.close();
            if (d.errcode == 0) {
              Vue.prototype.$message({ message: "修改成功", type: "success" });
                self.changeResult(1)
         
              self.changeStep(4);
            } else {
              Vue.prototype.$message({ message: d.errmsg, type: "warning" });
            }
          })
          .catch(d => {
            loadingInstance.close();
            Vue.prototype.$message({ message: d.errmsg, type: "warning" });
          });
      } else {
        this.storeApply(self.Obj)
          .then(res => {
            let d = res.data;
          
            loadingInstance.close();
            if (d.errcode == 0) {
              Vue.prototype.$message({ message: "提交成功", type: "success" });
              // setTimeout(() => {
              //   window.location.reload();
              // }, 500);
                self.changeResult(1)
              self.changeStep(4);
            
              
            } else {
              Vue.prototype.$message({ message: d.errmsg, type: "warning" });
            }
          })
          .catch(d => {
            loadingInstance.close();
            self.is_query=false
            Vue.prototype.$message({ message: d.errmsg, type: "warning" });
          });
      }
      // this.changeStep(4);
    },
    demo1(d) {
      this.logo_url = d;
    },
    demo2(d) {
      this.enclosure = d;
    },
    imgs2(d) {

      let arr = [];
      d.forEach(function(v, i, a) {
        arr.push(v.response.data.url);
      });
      this.brand_prove_url = arr;
    }
  }
};
</script>
<style scoped>
.reg3 {
  background: rgba(249, 249, 249, 1);
}

.section {
  font-size: 18px;

  font-weight: 400;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.8);
  max-width: 1300px;
  min-width: 1150px;
  width: 90%;
  padding: 24px 90px 40px;
  background: white;
  border-radius: 8px;
  margin: 0 auto;
  margin-bottom: 30px;
}

.sectionTitle {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  line-height: 27px;
  color: rgba(61, 61, 61, 1);
}

.redstars {
  display: inline-block;
  color: red;
  height: 40px;
  width: 40px;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  align-self: center;
  font-weight: bold;
  vertical-align: top;
}
.reg-item {
  margin-bottom: 10px;
  padding: 5px;
}

.reg-title {
  display: inline-block;
  width: 140px;
  text-align: right;
  color: #3d3d3d;
}

.reg-inp {
  display: inline-block;
  width: 40%;
}
.cover_bg:hover {
  opacity: 100%;
}

.cover_bg {
  cursor: pointer;
}

.reg-tip {
  margin-left: 150px;
  color: #3d3d3d;
  opacity: 0.6;
  margin-top: 20px;
  line-height: 18px;
  font-size: 12px;
  margin-bottom: 20px;
}

.reg-tip div {
  height: 20px;
}
.reg-bottom {
  width: 100%;

  margin-top: 50px;
  padding-bottom: 50px;
  text-align: center;
}
.reg-bottom span {
  display: inline-block;
  width: 180px;
  height: 40px;
  background: #3d3d3d;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
}
.xieyibt:hover {
  cursor: pointer;
}
</style>
<style>
/*修改默认组件样式*/
.reg3 .el-radio__inner {
  border-color: #3d3d3d;
  width: 20px;
  height: 20px;
}
.reg3 .el-textarea__inner {
  background-color: #f7f7f7;
}

.reg3 .el-textarea__inner:focus {
  border-style: solid;
  border-color: #ffd300;
}

.reg3 .el-select .el-input.is-focus .el-input__inner {
  border-color: #ffd300;
}

.reg3 .el-textarea__inner::-webkit-input-placeholder {
  font-weight: bold;
  color: #3d3d3d;
  opacity: 0.5;
}

.reg3 .el-cascader .el-input .el-input__inner:focus,
.el-cascader .el-input.is-focus .el-input__inner {
  border-color: #ffd300;
}

.reg3
  .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled)
  .el-radio__inner {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.reg3 .el-radio__input.is-checked .el-radio__inner {
  background-color: #ffd300;
  border-color: #3d3d3d;
}
.reg3 .el-radio__inner::after {
  width: 10px;
  height: 10px;
  background-color: #ffd300;
  background-image: url("../assets/check.png");
  background-size: 10px 10px;
}
.reg3 .el-radio__input.is-checked + .el-radio__label {
  color: #3d3d3d;
  font-weight: 700;
}
.reg3 .el-radio__label {
  font-size: 16px;
  font-weight: 500;
}
.reg3 .el-radio {
  margin-right: 120px;
}
.reg3 .el-input__inner {
  background-color: #f7f7f7;
}

.reg3 .el-input__inner:focus {
  border-style: solid;
  border-color: #ffd300;
}

.reg3 .el-divider--horizontal {
  width: 95%;
}
</style>


