<template>
  <div class="reg1">
    <HeaderBar />
    <div class="section">
      <div class="sectionTitle">
        |&nbsp;&nbsp;&nbsp;店铺类型
        <span class="redstars">*</span>
      </div>
      <el-radio v-model="shop_type" label="1">品牌方</el-radio>
      <el-radio v-model="shop_type" label="2">农场主</el-radio>
      <el-radio v-model="shop_type" label="3">工厂店</el-radio>
    </div>
    <div class="section">
      <div class="sectionTitle">|&nbsp;&nbsp;&nbsp;店铺管理人信息</div>
      <div class="reg-item">
        <div class="reg-title">管理人姓名：</div>
        <el-input v-model="custodian_name" placeholder="请输入管理人姓名" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">管理人证件号码：</div>
        <el-input v-model="custodian_number" placeholder="请输入管理人身份证号码" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">管理人手机号码：</div>
        <el-input
          v-model="custodian_phone"
          placeholder="请输入管理人手机号码"
          class="reg-inp"
          @input="custodian_phone=custodian_phone.replace(/[^\d]/g, '')"
        ></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">管理人邮箱：</div>
        <el-input v-model="custodian_email" placeholder="请输入管理员邮箱，方便联系 " class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <el-divider></el-divider>
      <div class="reg-item">
        <div class="reg-title">紧急联系人名称：</div>
        <el-input v-model="custodian_urgent" placeholder="请输入紧急联系人名称" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">联系人手机：</div>
        <el-input
          v-model="custodian_urgent_phone"
          placeholder="请输入紧急联系人手机号码"
          class="reg-inp"
          @input="custodian_urgent_phone=custodian_urgent_phone.replace(/[^\d]/g, '')"
        ></el-input>
        <span class="redstars">*</span>
      </div>
    </div>

    <div class="section">
      <div class="sectionTitle">|&nbsp;&nbsp;&nbsp;入驻企业信息</div>
      <div class="reg-item">
        <div class="reg-title">企业法人姓名：</div>
        <el-input v-model="legal_person" placeholder="请输入企业法人姓名" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">企业法人证件号码：</div>
        <el-input v-model="legal_person_number" placeholder="请输入企业法人身份证号码" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">企业法人手机：</div>
        <el-input v-model="legal_person_phone" placeholder="请输入企业法人手机号码" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">企业法人邮箱：</div>
        <el-input v-model="legal_person_email" placeholder="请输入企业法人邮箱" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <el-divider></el-divider>
      <div class="reg-item">
        <div class="reg-title">公司名称：</div>
        <el-input v-model="company_name" placeholder="请输入公司名称" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title">公司所在地：</div>
        <el-cascader
          :options="regions"
          v-model="a_id"
          :placeholder="company_location?company_location:'请选择公司省市区地址'"
          @change="handleChange"
        ></el-cascader>
        <el-input
          style="margin-left: 10px"
          v-model="company_address"
          placeholder="请填写公司具体地址"
          class="reg-inp"
        ></el-input>
        <span class="redstars">*</span>
      </div>
      <div class="reg-item">
        <div class="reg-title" style="position:relative;top: 10px">是否国内证件：</div>
        <div
          :style="{borderColor:is_papers==1?'#3d3d3d':'#dddddd'}"
          style="margin-right: 15px;display: inline-block;width: 80px;height:35px;position: relative;border-width: 1px;border-style: solid;border-radius: 3px;"
        >
          <div style="margin: auto 0px;display: inline-block">
            <el-radio
              style="left: 50%;top: 50%;position: absolute;transform: translate(-50%, -50%);line-height: 35px"
              v-model="is_papers"
              label="1"
            >是</el-radio>
          </div>
        </div>
        <div
          :style="{borderColor:is_papers==0?'#3d3d3d':'#dddddd'}"
          style="display: inline-block;width: 80px;height:35px;position: relative;border-width: 1px;border-style: solid;border-radius: 3px;"
        >
          <div style="margin: auto 0px;display: inline-block">
            <el-radio
              style="left: 50%;top: 50%;position: absolute;transform: translate(-50%, -50%);line-height: 35px"
              v-model="is_papers"
              label="0"
            >否</el-radio>
          </div>
        </div>
      </div>
      <div class="reg-item">
        <div class="reg-title" style="position:relative;top: 10px">是否三证合一：</div>
        <div
          :style="{borderColor:is_merge==1?'#3d3d3d':'#dddddd'}"
          style="margin-right: 15px;display: inline-block;width: 80px;height:35px;position: relative;border-width: 1px;border-style: solid;border-radius: 3px;"
        >
          <div style="margin: auto 0px;display: inline-block">
            <el-radio
              style="left: 50%;top: 50%;position: absolute;transform: translate(-50%, -50%);line-height: 35px"
              v-model="is_merge"
              label="1"
            >是</el-radio>
          </div>
        </div>
        <div
          :style="{borderColor:is_merge==0?'#3d3d3d':'#dddddd'}"
          style="display: inline-block;width: 80px;height:35px;position: relative;border-width: 1px;border-style: solid;border-radius: 3px;"
        >
          <div style="margin: auto 0px;display: inline-block">
            <el-radio
              style="left: 50%;top: 50%;position: absolute;transform: translate(-50%, -50%);line-height: 35px"
              v-model="is_merge"
              label="0"
            >否</el-radio>
          </div>
        </div>
      </div>
      <div class="reg-item">
        <div class="reg-title">统一社会信用代码：</div>
        <el-input v-model="social_security" placeholder="请输入统一社会信用代码" class="reg-inp"></el-input>
        <span class="redstars">*</span>
      </div>
    </div>

    <div class="reg-bottom">
      <span @click="goNext()">下一步</span>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { regionData, CodeToText } from "element-china-area-data";
import HeaderBar from "./../components/RegHeader.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "regPart1",
  components: {
    HeaderBar
  },
  computed: {
    ...mapState(["myShop","isSetUp","stepObj1"])
  },

  data() {
    return {
      shop_type: "", //店铺类型
      custodian_name: "", //管理人姓名：
      custodian_email: "", //管理人邮箱：
      custodian_phone: "", //管理人手机号码：
      custodian_number: "", //管理人证件号码：
      custodian_urgent: "", //紧急联系人：
      custodian_urgent_phone: "", //联系人手机：
      legal_person: "", //企业法人姓名：
      legal_person_phone: "", //企业法人手机：
      legal_person_email: "", //企业法人邮箱：
      legal_person_number: "", //企业法人证件号码：
      company_name: "", //公司名称
      regions: regionData,
      a_id: "", //公司所在地
      company_location: "",
      is_merge: "1", //是否三证合一：
      is_papers: "1", //是否国内证件：
      social_security: "", //统一社会信用代码
      company_address: ""
    };
  },
  created() {

   
    if (Object.keys(this.stepObj1).length === 0){
    
      if(this.isSetUp){
          this.getAllMsg(this.myShop);
  
      }
    }
    else{
      this.getAllMsg(this.stepObj1)
    }
 
    
  },
  methods: {
    ...mapMutations([,"changeStepObj1","changeStep"]),
    getAllMsg(obj) {
      this.shop_type = obj.shop_type + "";
      this.custodian_name = obj.custodian_name;
      this.custodian_number = obj.custodian_number;
      this.custodian_phone = obj.custodian_phone;
      this.custodian_email = obj.custodian_email;
      this.custodian_urgent = obj.custodian_urgent;
      this.custodian_urgent_phone =obj.custodian_urgent_phone;

      this.legal_person = obj.legal_person;
      this.legal_person_number =obj.legal_person_number;
      this.legal_person_phone = obj.legal_person_phone;
      this.legal_person_email = obj.legal_person_email;
this.company_location=obj.company_location;
      this.company_name =obj.company_name;
    
      this.a_id = obj.a_id;
      this.company_address =obj.company_address;
      this.is_papers =obj.is_papers;
      this.is_merge = obj.is_merge;
      this.social_security =obj.social_security;
    },
    goNext() {
      const self = this;
      if (!this.shop_type) {
        Vue.prototype.$message({ message: "请选择店铺类型", type: "warning" });
        return false;
      }
      if (!this.custodian_name.trim()) {
        Vue.prototype.$message({
          message: "请输入管理人姓名",
          type: "warning"
        });
        return false;
      }
      if (!this.custodian_number.trim()) {
        Vue.prototype.$message({
          message: "请输入管理人有效证件号码",
          type: "warning"
        });
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(self.custodian_phone)) {
        Vue.prototype.$message({
          message: "请输入正确的管理员手机号",
          type: "warning"
        });
        return false;
      }
      if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          self.custodian_email
        )
      ) {
        Vue.prototype.$message({
          message: "请输入正确的管理员邮箱",
          type: "warning"
        });
        return false;
      }
      if (!this.custodian_urgent.trim()) {
        Vue.prototype.$message({
          message: "请输入紧急联系人名称",
          type: "warning"
        });
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(self.custodian_urgent_phone)) {
        Vue.prototype.$message({
          message: "请输入正确的紧急联系人手机号码",
          type: "warning"
        });
        return false;
      }
      if (!this.legal_person.trim()) {
        Vue.prototype.$message({
          message: "请输入法定代表人名称",
          type: "warning"
        });
        return false;
      }
      if (!this.legal_person_number.trim()) {
        Vue.prototype.$message({
          message: "请输入法定代表人有效证件号码",
          type: "warning"
        });
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(self.legal_person_phone)) {
        Vue.prototype.$message({
          message: "请输入正确的法定代表人手机",
          type: "warning"
        });
        return false;
      }
      if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          self.legal_person_email
        )
      ) {
        Vue.prototype.$message({
          message: "请输入正确的法定代表人邮箱",
          type: "warning"
        });
        return false;
      }
      if(!this.company_name.trim()){
         Vue.prototype.$message({
          message: "请输入正确的公司名称",
          type: "warning"
        });
        return false;
      }
      if (!this.company_location) {
        Vue.prototype.$message({
          message: "请选择公司所在地",
          type: "warning"
        });
        return false;
      }
      if (!this.company_address.trim()) {
        Vue.prototype.$message({
          message: "请输入公司详细地址",
          type: "warning"
        });
        return false;
      }
      if (this.is_papers === "") {
        Vue.prototype.$message({
          message: "请选择是否国内证件",
          type: "warning"
        });
        return false;
      }
      if (this.is_merge === "") {
        Vue.prototype.$message({
          message: "请选择是否三证合一",
          type: "warning"
        });
        return false;
      }
      if (!this.social_security.trim()) {
        Vue.prototype.$message({
          message: "请输入统一社会信用代码",
          type: "warning"
        });
        return false;
      }
      self.changeStepObj1({

        shop_type: self.shop_type,
        custodian_name: self.custodian_name,
        custodian_number: self.custodian_number,
        custodian_phone: self.custodian_phone,
        custodian_email: self.custodian_email,
        custodian_urgent: self.custodian_urgent,
        custodian_urgent_phone: self.custodian_urgent_phone,
        legal_person: self.legal_person,
        legal_person_number: self.legal_person_number,
        legal_person_phone: self.legal_person_phone,
        legal_person_email: self.legal_person_email,
        company_name: self.company_name,
        a_id: self.a_id,
        company_address: self.company_address,
        is_papers: self.is_papers,
        is_merge: self.is_merge,
        social_security: self.social_security,
        company_location: self.company_location
      });
      self.changeStep(2)
    },
    handleChange(value) {
 
      // 选择地址
      this.company_location =
        "" + CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]];
      
    }
  }
};
</script>
<style>
.reg1 .el-radio__inner {
  border-color: #3d3d3d;
  width: 20px;
  height: 20px;
  position: relative;
  top: -2px;
}
.reg1 .el-radio__input.is-checked .el-radio__inner {
  background-color: #ffd300;
  border-color: #3d3d3d;
  position: relative;
  top: -2px;
}
.reg1 .el-radio__inner::after {
  width: 10px;
  height: 10px;
  background-color: #ffd300;
  background-image: url("../assets/check.png");
  background-size: 10px 10px;
}
.reg1 .el-radio__input.is-checked + .el-radio__label {
  color: #3d3d3d;
  font-weight: 700;
}
.reg1 .el-radio__label {
  font-size: 16px;
  font-weight: 500;
}
.reg1 .el-radio {
  margin-right: 120px;
}
.reg1 .el-input__inner {
  background-color: #f7f7f7;
}
.reg1 .el-input__inner:focus {
  border-style: solid;
  border-color: #ffd300;
}
.reg1 .el-cascader .el-input .el-input__inner:focus,
.el-cascader .el-input.is-focus .el-input__inner {
  border-color: #ffd300;
}
.reg1 .el-divider--horizontal {
  width: 95%;
}
</style>

<style scoped>
.reg1 {
  background: rgba(249, 249, 249, 1);
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
  font-weight: 700;
}
.sectionTitle {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  line-height: 27px;
  color: rgba(61, 61, 61, 1);
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
.reg-item {
  margin-bottom: 10px;
  padding: 5px;
}

.reg-title {
  display: inline-block;
  width: 163px;
  text-align: right;
  color: #3d3d3d;
  font-size: 18px;

  font-weight: 400;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.8);
}

.reg-inp {
  display: inline-block;
  width: 40%;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.5);
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
}
</style>


