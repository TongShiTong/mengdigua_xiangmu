<template>
  <div class="reg2">
    <HeaderBar />
    <!-- 大屏 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <img :src="src" style="width: 100%;height: 100%" />
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>

    <div class="section">
      <div class="sectionTitle">|&nbsp;&nbsp;&nbsp;法人证照及其他信息</div>
      <div class="reg-item">
        <div class="reg-title" style="vertical-align: top;">法人身份证：</div>
        <div style="display: inline-block">
          <div style="display:inline-block;margin-right: 20px">
            <div style="display:inline-block">
              <imgUpload :kind="1" :typekind="1" @demo1="demo1" :imageUrl="front_card_url"></imgUpload>
            </div>
            <span class="redstars">*</span>
          </div>

          <div style="display:inline-block;margin-right: 20px">
            <div style="display:inline-block">
              <imgUpload :kind="2" :typekind="2" @demo2="demo2" :imageUrl="back_card_url"></imgUpload>
            </div>
            <span class="redstars">*</span>
          </div>

          <div
            style="display: inline-block;background-color: #F7F7F7;width: 240px;height: 150px;position: relative"
          >
            <img src="../assets/idcard.png" style="width: 100%;height: 100%" />
            <button
              class="cover_bg"
              @click="showImg()"
              style="position: absolute;bottom: 0px;left: 0px;right: 0px;height: 30px;width: 100%;background-color: #3d3d3d;color: white;border-width: 0px;opacity: 100%;outline: none"
            >示例图(点击查看)</button>
          </div>
        </div>
      </div>
      <div class="reg-item">
        <div class="reg-title">身份证有效期：</div>
        <div style="display: inline-block">
          <el-date-picker
            v-model="id_start_time"
            align="right"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择开始时间"
          ></el-date-picker>&nbsp;&nbsp;至&nbsp;&nbsp;
          <el-date-picker
            v-model="id_end_time"
            align="right"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择结束时间"
          ></el-date-picker>
        </div>
        <span class="redstars">*</span>
      </div>
    </div>

    <div class="section">
      <div class="sectionTitle">|&nbsp;&nbsp;&nbsp;商标/品牌证照及其他信息</div>
      <div class="reg-item">
        <div class="reg-title" style="vertical-align: top;">营业执照：</div>
        <div style="display: inline-block">
          <div style="display:inline-block;margin-right: 20px">
            <div style="display:inline-block">
              <imgUpload :kind="3" :typekind="3" @demo3="demo3" :imageUrl="license_url"></imgUpload>
            </div>
            <span class="redstars">*</span>
          </div>

          <div
            style="display: inline-block;background-color: #F7F7F7;width: 240px;height: 150px;position: relative"
          >
            <img src="../assets/shopID.png" style="width: 100%;height: 100%" />
            <button
              class="cover_bg"
              @click="showShopID()"
              style="position: absolute;bottom: 0px;left: 0px;right: 0px;height: 30px;width: 100%;background-color: #3d3d3d;color: white;border-width: 0px;opacity: 100%;outline: none"
            >示例图(点击查看)</button>
          </div>
        </div>
      </div>

      <div class="reg-item">
        <div class="reg-title" style="position:relative;top: 10px">是否长期：</div>
        <div
          :style="{borderColor:is_long_term==1?'#3d3d3d':'#dddddd'}"
          style="margin-right: 15px;display: inline-block;width: 80px;height:35px;position: relative;border-width: 1px;border-style: solid;border-radius: 3px;"
        >
          <div style="margin: auto 0px;display: inline-block">
            <el-radio
              style="left: 50%;top: 50%;position: absolute;transform: translate(-50%, -50%);line-height: 35px"
              v-model="is_long_term"
              label="1"
            >是</el-radio>
          </div>
        </div>
        <div
          :style="{borderColor:is_long_term==0?'#3d3d3d':'#dddddd'}"
          style="display: inline-block;width: 80px;height:35px;position: relative;border-width: 1px;border-style: solid;border-radius: 3px;"
        >
          <div style="margin: auto 0px;display: inline-block">
            <el-radio
              style="left: 50%;top: 50%;position: absolute;transform: translate(-50%, -50%);line-height: 35px"
              v-model="is_long_term"
              label="0"
            >否</el-radio>
          </div>
        </div>
      </div>

      <div class="reg-item">
        <div class="reg-title" style="vertical-align: top;">开户许可：</div>
        <div style="display: inline-block">
          <div style="display:inline-block;margin-right: 20px">
            <div style="display:inline-block">
              <imgUpload :kind="4" :typekind="3" @demo4="demo4" :imageUrl="opening_permit_url"></imgUpload>
            </div>
            <span class="redstars">*</span>
          </div>

          <div
            style="display: inline-block;background-color: #F7F7F7;width: 240px;height: 150px;position: relative"
          >
            <img src="../assets/account.png" style="width: 100%;height: 100%" />
            <button
              class="cover_bg"
              @click="showAccount()"
              style="position: absolute;bottom: 0px;left: 0px;right: 0px;height: 30px;width: 100%;background-color: #3d3d3d;color: white;border-width: 0px;opacity: 100%;outline: none"
            >示例图(点击查看)</button>
          </div>
        </div>
      </div>

      <div class="reg-item">
        <div class="reg-title" style="vertical-align: top;">质检报告：</div>
        <div style="display: inline-block">
          <div style="display:inline-block;margin-right: 20px">
            <div style="display:inline-block">
              <imgUpload :kind="5" :typekind="3" @demo5="demo5" :imageUrl="inspect_url"></imgUpload>
            </div>
            <span class="redstars">*</span>
          </div>

          <div
            style="display: inline-block;background-color: #F7F7F7;width: 240px;height: 150px;position: relative"
          >
            <img src="../assets/report.png" style="width: 100%;height: 100%" />
            <button
              class="cover_bg"
              @click="showReport()"
              style="position: absolute;bottom: 0px;left: 0px;right: 0px;height: 30px;width: 100%;background-color: #3d3d3d;color: white;border-width: 0px;opacity: 100%;outline: none"
            >示例图(点击查看)</button>
          </div>
        </div>
      </div>
      <el-divider></el-divider>

      <div class="reg-item">
        <div class="reg-title" style="position:relative;top: 10px">商标类型：</div>
        <div
          :style="{borderColor:brand_type==1?'#3d3d3d':'#dddddd'}"
          style="margin-right: 15px;display: inline-block;width: 140px;height:35px;position: relative;border-width: 1px;border-style: solid;border-radius: 3px;"
        >
          <div style="margin: auto 0px;display: inline-block">
            <el-radio
              style="left: 50%;top: 50%;position: absolute;transform: translate(-50%, -50%);line-height: 35px"
              v-model="brand_type"
              label="1"
            >自有商标</el-radio>
          </div>
        </div>
        <div
          :style="{borderColor:brand_type==0?'#3d3d3d':'#dddddd'}"
          style="display: inline-block;width: 140px;height:35px;position: relative;border-width: 1px;border-style: solid;border-radius: 3px;"
        >
          <div style="margin: auto 0px;display: inline-block">
            <el-radio
              style="left: 50%;top: 50%;position: absolute;transform: translate(-50%, -50%);line-height: 35px"
              v-model="brand_type"
              label="0"
            >授权商标</el-radio>
          </div>
        </div>
      </div>

      <div class="reg-item">
        <div class="reg-title">品牌名称：</div>
        <el-input v-model="brand_name" placeholder="请输入品牌名称" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">品牌英文名称：</div>
        <el-input v-model="brand_english" placeholder="请输入品牌英文名称" class="reg-inp"></el-input>
      </div>
      <!-- <div class="reg-item">
        <div class="reg-title">第三方平台销售连接：</div>
        <el-input v-model="platform_url" placeholder="请输入连接" class="reg-inp"></el-input>
      </div>-->
      <div
        style="color: #3d3d3d;font-size: 12px;margin-left: 145px;opacity: 60%;margin-top: 10px;margin-bottom: 10px"
      >注：请提供品牌在第三方平台的单品销售链接</div>

      <div class="reg-item">
        <div class="reg-title">商标注册号：</div>
        <el-input v-model="brand_number" placeholder="请输入商标注册号" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>

      <div class="reg-item">
        <div class="reg-title" style="vertical-align: top;">商标注册证明：</div>
        <div style="width: 530px;display: inline-block">
          <div style="display:inline-block;margin-right: 10px">
            <div style="display:inline-block">
              <imgUpload :kind="6" :typekind="3" @demo6="demo6" :imageUrl="brand_prove_url"></imgUpload>
            </div>
            <span class="redstars">*</span>
          </div>

          <div
            style="display: inline-block;background-color: #F7F7F7;width: 240px;height: 150px;position: relative"
          >
            <img src="../assets/prove.png" style="width: 100%;height: 100%" />
            <button
              class="cover_bg"
              @click="showProve()"
              style="position: absolute;bottom: 0px;left: 0px;right: 0px;height: 30px;width: 100%;background-color: #3d3d3d;color: white;border-width: 0px;opacity: 100%;outline: none"
            >示例图(点击查看)</button>
          </div>
        </div>
        <div
          style="color: #3D3D3D;display: inline-block;font-size: 12px;margin-left: 20px;opacity: 60%;vertical-align: top;margin-top: 20px"
        >
          <div style="height: 20px">1、需提供有效期内的商标注册证（R标）或商标受理通知书（TM标）；</div>
          <div style="height: 20px">2、若办理过变更、转让、续展，请一并提供商标总局颁发</div>
          <div style="height: 20px">对应证明或受理通 知书（商标受理通知书的有效期为18个月）。</div>
        </div>
      </div>

      <div
        style="color: #3D3D3D;font-size: 12px;margin-left: 140px;opacity: 60%;vertical-align: top;margin-top: 20px"
      >
        <div style="height: 20px">1、请上传《商标注册证》或《注册申请受理通知书》</div>
        <div style="height: 20px">2、变更中的商标请同时上传《变更受理通知书》和《注册申请受理通知书》</div>
        <div style="height: 20px">3、转入/已转让的商标需上传《转让受理通知书》或者《转让证明》</div>
        <div style="height: 20px">4、《商标注册证》续证完成，而原《商标注册证》已经过期，需同时上传《核准续展注册证明》</div>
        <div style="height: 20px">5、若是授权商标，请上传商标授权书</div>
      </div>
    </div>

    <div class="reg-bottom">
      <span style="background-color: #CCCCCC" @click="goUpstep()">上一步</span>
      <span @click="goNext()">下一步</span>
    </div>
  </div>
</template>
<script>
import HeaderBar from "./../components/RegHeader.vue";
import imgUpload from "./../components/imgUpload";
import imgsUp from "./../components/imgsUp";
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "regPart2",
  computed: {
    ...mapState(["myShop", "isSetUp", "stepObj2"])
  },
  components: {
    [imgUpload.name]: imgUpload,
    [imgsUp.name]: imgsUp,
    HeaderBar
  },
  data() {
    return {
      title: "", //大屏标题
      front_card_url: "", //立即上传（国徽面）
      back_card_url: "", //立即上传（人像面）
      license_url: "", //营业执照：
      opening_permit_url: "", //开户许可：
      inspect_url: "", //质检报告：
      src: "", //大屏src
      dialogVisible: false, //大屏
      id_start_time: "", //开始时间
      id_end_time: "", //结束时间
      is_long_term: "1", //是否长期有效
      brand_type: "1", //商标类型：
      brand_name: "", //品牌名称：
      brand_english: "", //品牌英文名称：
      // platform_url: "", //第三方平台销售链接：
      brand_number: "", //商标注册号：
      brand_prove_url: "" //商标注册证明
      // pickerOptions: {
      //     disabledDate(time) {
      //         return time.getTime() > Date.now();
      //     },
      //     shortcuts: [{
      //         text: '今天',
      //         onClick(picker) {
      //             picker.$emit('pick', new Date());
      //         }
      //     }, {
      //         text: '昨天',
      //         onClick(picker) {
      //             const date = new Date();
      //             date.setTime(date.getTime() - 3600 * 1000 * 24);
      //             picker.$emit('pick', date);
      //         }
      //     }, {
      //         text: '一周前',
      //         onClick(picker) {
      //             const date = new Date();
      //             date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      //             picker.$emit('pick', date);
      //         }
      //     }]
      // }
    };
  },
  created() {
    if (Object.keys(this.stepObj2).length === 0) {
    
      if (this.isSetUp) {
        this.getAllMsg(this.myShop);
      }
    } else {
      this.getAllMsg(this.stepObj2);
    }
  },
  mounted() {},
  methods: {
    ...mapMutations(["changeStep", "changeStepObj2"]),
    //   单张图片上传
    demo1(d) {
      this.front_card_url = d;
    },
    demo2(d) {
      this.back_card_url = d;
    },
    demo3(d) {
      this.license_url = d;
    },
    demo4(d) {
      this.opening_permit_url = d;
    },
    demo5(d) {
      this.inspect_url = d;
    },
    demo6(d) {
      this.brand_prove_url = d;
    },

    // 显示大屏
    showImg() {
      //显示示例图片';
      this.title = "法人身份证";
      this.src = require("../assets/idcard.png");
      this.dialogVisible = true;
    },
    showShopID() {
      this.title = "企业法人营业执照";
      this.src = require("../assets/shopID.png");
      this.dialogVisible = true;
    },
    showAccount() {
      this.title = "开户许可证";
      this.src = require("../assets/account.png");
      this.dialogVisible = true;
    },
    showReport() {
      this.title = "质检报告";
      this.src = require("../assets/report.png");
      this.dialogVisible = true;
    },
    showProve() {
      this.title = "商标注册证明";
      this.src = require("../assets/prove.png");
      this.dialogVisible = true;
    },
    handleClose(done) {
      //隐藏弹框
      done();
    },

    getAllMsg(obj) {
     
      this.front_card_url = obj.front_card_url;
      this.back_card_url = obj.back_card_url;
      this.id_start_time = obj.id_start_time;
      this.id_end_time = obj.id_end_time;
      this.license_url = obj.license_url;
      this.is_long_term = obj.is_long_term;
      this.opening_permit_url = obj.opening_permit_url;
      this.inspect_url = obj.inspect_url;
      this.brand_type = obj.brand_type;
      this.brand_name = obj.brand_name;
      this.brand_english = obj.brand_english;
      // this.platform_url = this.myShop.platform_url;
      this.brand_number = obj.brand_number;
      this.brand_prove_url = obj.brand_prove_url;
    },

    // 无用的
    // handleChange(value) {
    //   console.log(value);
    //   console.log(CodeToText[value[0]]);
    //   console.log(CodeToText[value[1]]);
    //   console.log(CodeToText[value[2]]);
    //   this.company_location =
    //     "" + CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]];
    // },

    goUpstep() {
      this.changeStep(1);
    },
    timeChange(a) {
      let arr = a.split("-").join("");
     
      return arr;
    },
    goNext() {
      const self = this;

      if (!this.front_card_url) {
        Vue.prototype.$message({
          message: "请上传法人身份证(国徽面)",
          type: "warning"
        });
        return false;
      }
      if (!this.back_card_url) {
        Vue.prototype.$message({
          message: "请上传法人身份证(人物面)",
          type: "warning"
        });
        return false;
      }
      if (!this.id_start_time) {
        Vue.prototype.$message({
          message: "请上传身份证有效期开始时间",
          type: "warning"
        });
        return false;
      }
      if (!this.id_end_time) {
        Vue.prototype.$message({
          message: "请上传身份证有效期结束时间",
          type: "warning"
        });
        return false;
      }
      if(this.timeChange(this.id_end_time)-this.timeChange(this.id_start_time)<0){
          Vue.prototype.$message({
          message: "请上传身份证正确的有效时间",
          type: "warning"
        });
        return false;
      }

      if (!this.brand_name.trim()) {
        Vue.prototype.$message({ message: "请输入品牌名称", type: "warning" });
        return false;
      }
      if (!this.license_url) {
        Vue.prototype.$message({ message: "请上传营业执照", type: "warning" });
        return false;
      }
      if (!this.is_long_term) {
        Vue.prototype.$message({
          message: "请选择执照是否长期",
          type: "warning"
        });
        return false;
      }
      if (!this.opening_permit_url) {
        Vue.prototype.$message({
          message: "请上传开户许可证",
          type: "warning"
        });
        return false;
      }
      if (!this.inspect_url) {
        Vue.prototype.$message({ message: "请上传质检报告", type: "warning" });
        return false;
      }
      if (this.brand_type === "") {
        Vue.prototype.$message({ message: "请选择商标类型", type: "warning" });
        return false;
      }

      if (!this.brand_name) {
        Vue.prototype.$message({ message: "请输入品牌名称", type: "warning" });
        return false;
      }

      if (!this.brand_number) {
        Vue.prototype.$message({
          message: "请输入商标注册号",
          type: "warning"
        });
        return false;
      }
      if (!this.brand_prove_url) {
        Vue.prototype.$message({
          message: "请上传商标注册证明",
          type: "warning"
        });
        return false;
      }

      this.changeStepObj2({
        front_card_url: self.front_card_url,
        back_card_url: self.back_card_url,
        id_start_time: self.id_start_time,
        id_end_time: self.id_end_time,
        license_url: self.license_url,
        is_long_term: self.is_long_term,
        opening_permit_url: self.opening_permit_url,
        inspect_url: self.inspect_url,
        brand_type: self.brand_type,
        brand_name: self.brand_name,
        brand_english: self.brand_english,
        // platform_url: self.platform_url,
        brand_number: self.brand_number,
        brand_prove_url: self.brand_prove_url
      });
      self.changeStep(3);
    }
  }
};
</script>
<style>
.reg2 .el-input__inner:focus {
  border-style: solid;
  border-color: #ffd300;
}
.reg2 .el-radio__inner {
  border-color: #3d3d3d;
  width: 20px;
  height: 20px;
  position: relative;
  top: -2px;
}
.reg2 .el-radio__input.is-checked .el-radio__inner {
  background-color: #ffd300;
  border-color: #3d3d3d;
  position: relative;
  top: -2px;
}
.reg2 .el-radio__inner::after {
  width: 10px;
  height: 10px;
  background-color: #ffd300;
  background-image: url("../assets/check.png");
  background-size: 10px 10px;
}
.reg2 .el-radio__input.is-checked + .el-radio__label {
  color: #3d3d3d;
  font-weight: 700;
}
.reg2 .el-radio__label {
  font-size: 16px;
  font-weight: 500;
}
.reg2 .el-radio {
  margin-right: 120px;
}

.reg2 .reg-item {
  margin-bottom: 10px;
  padding: 5px;
}

.reg2 .reg-title {
  display: inline-block;
  width: 140px;
  text-align: right;
  color: #3d3d3d;
}

.reg2 .reg-inp {
  display: inline-block;
  width: 40%;
}

.reg2 .el-input__inner {
  background-color: #f7f7f7;
}

.reg2 .el-input__inner:focus {
  border-style: solid;
  border-color: #ffd300;
}

.reg2 .redstars {
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

.reg2 .el-divider--horizontal {
  width: 95%;
}

.reg2 .reg-bottom {
  width: 100%;
  height: 52px;
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
}
.reg2 .reg-bottom span {
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

.reg2 .cover_bg:hover {
  opacity: 100%;
}

.reg2 .cover_bg {
  cursor: pointer;
}
</style>
<style scoped>
.reg2 {
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
</style>


