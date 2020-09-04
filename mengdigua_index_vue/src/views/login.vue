<template>
  <div class="login">
    <el-dialog :title="tips" :visible.sync="dialogVisible1" width="80%" :before-close="handleClose">
      <span v-html="xieyitips"></span>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
    <div :class="showTop? 'top1':'top'" v-on:mouseenter="visible(4)" @mouseleave="invisible(4)">
      <div class="tab">
        <div class="logo1">
          <img src="../assets/nav-logo1.png" alt="">
          <!-- <div>中央持股电商平台</div> -->
        </div>
        
        <ul class="tab-box">
          <li><a href="#process">入驻流程</a></li>
          <li><a href="#business">招商分类</a></li>
          <li><a href="#claim">资质要求</a></li>
          <li><a href="#normal">资费标准</a></li>
          <li><a href="#problem">常见问题</a></li>
          <div class="nav_line" ref="nav_line"></div>
        </ul>
        
      </div>
    </div>
    <div class="box-filter">
      <div class="filter" id="filter">
        <!-- <div class="login-left">
          <img src="./../assets/gather/login-img.png" alt="加载异常" class="login-img" />
          <div class="text">让你的劳动更有获得感</div>
        </div> -->
        <div style="min-width:300px"></div>
        <div class="login-right">
          <div class="header flex-c-c" v-if="loginType==1||loginType==2">
            <div
              class="header-left header-text"
              :style="loginType==2?'color:#353535;':''"
              @click="changeLoginType(2)"
            ><img class="shangjia" src="../assets/sjrz.png" alt=""> 商家入驻</div>
            <!-- <div
              class="header-text"
              :style="loginType==1?'color:rgba(255,220,0,1);':''"
              @click="changeLoginType(1)"
            >账户登录</div> -->
          </div>
          <div v-if="loginType==3" class="zuce">商家注册账号</div>
          <div v-if="loginType==4" class="zuce">重置密码</div>

          <div class="main">
            <!--  扫码登录-->

            <div v-show="loginType!=0" style="padding:0 25px">
              <!-- 手机号 -->
              <div class="margin">
                <div class="flex-c-c input-box" :style="phoneTip?'border-color: red;':''">
                  <label for="phone">
                    <!-- <img src="./../assets/gather/phone.png" alt="加载异常" class="img" /> -->
                  </label>

                  <input
                    type="text"
                    id="phone"
                    placeholder="请输入手机号"
                    v-model="phone"
                    @input="inputPhone"
                    class="input"
                    maxlength="11"
                    @blur="blurPhone"
                    style="background: transparent;padding-left: 20px;"
                  />
                </div>
                <p v-show="phoneTip" class="red">{{phoneTip}}</p>
              </div>
              <!-- 图片验证 -->
              <!-- <div class="margin" v-show="loginType>=2">
                <div class="flex-c-c img-box" :style="phoneTip?'border-color: red;':''">
                  <input
                    type="text"
                    placeholder="验证码"
                    v-model="imgCode"
                    @blur="blurImgCode"
                    class="img-input"
                    @input="inputImgCode"
                  />

                  <img :src="imgSrc" alt="加载异常" @click="getImgCode" class="img-code" />
                </div>
                <p v-show="imgCodeTip" class="red">{{imgCodeTip}}</p>
              </div> -->
              <!-- 短信登录 -->
              <div class="margin" v-show="loginType>=2">
                <div class="note-code-box flex-c-c">
                  <input
                    type="text"
                    :style="noteTip?'border-color: red;':''"
                    v-model="code"
                    class="code-input"
                    @input="inputCode"
                    @blur="blurCode"
                    placeholder="请输入短信验证码"
                  />
                  <button class="note-code" @click="getCode" ref="codeBtn">{{countDown}}</button>
                </div>
                <p v-show="noteTip" class="red">{{noteTip}}</p>
              </div>
              <!-- 账户密码 -->
              <div class="margin" v-show="loginType==1||loginType==3||loginType==4">
                <div class="flex-c-c input-box" :style="passwordTip?'border-color: red;':''">
                  <label for="password">
                    <img src="./../assets/gather/password.png" alt="加载异常" class="img" />
                  </label>
                  <input
                    type="password"
                    id="password"
                    :placeholder="loginType==1?'请输入密码':'密码由数字或字母组合'"
                    v-model="password"
                    @input="inputPassword"
                    class="input"
                    @blur="blurPassword"
                    maxlength="20"
                    style="  background: transparent;"
                  />
                </div>
                <p v-show="passwordTip" class="red">{{passwordTip}}</p>
              </div>
              <!--再次确认密码 -->
              <div class="margin" v-show="loginType>=3">
                <div class="flex-c-c input-box" :style="confirmTip?'border-color: red;':''">
                  <label for="password">
                    <img src="./../assets/gather/password.png" alt="加载异常" class="img" />
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="再次确认密码"
                    v-model="confirmPassword"
                    @input="inputConfirm"
                    class="input"
                    @blur="blurConfirm"
                    maxlength="20"
                  />
                </div>
                <p v-show="confirmTip" class="red">{{confirmTip}}</p>
              </div>

              <div class="useTips">
                <button class="note-login" v-show="loginType==1" @click="changeLoginType(4)">忘记密码</button>
              </div>
              <div
                class="login-btn"
                v-show="loginType==1||loginType==2"
                @click="loginUser"
                ref="loginBtn"
              >立即入驻</div>
              <div class="manual" @click="showxieyibt()">《入驻手册》</div>
              <div
                class="register-btn"
                v-show="loginType==3"
                @click="createUser"
                ref="registerBtn"
              >立即注册</div>
              <div class="register-btn" v-show="loginType==4" @click="resetPassword" ref="resetBtn">确定</div>
              <!-- <div class="foot flex-c-c">
                <button
                  class="foot-text"
                  v-show="loginType==1||loginType==2"
                  @click="changeLoginType(3)"
                >立即注册</button>
                <button class="foot-text" v-show="loginType==1||loginType==2" @click="goHome">商家入驻</button>
                <button class="foot-login-text" v-show="loginType==3">
                  已注册
                  <span style="color:rgba(255,220,0,1);" @click="changeLoginType(1)">直接登录</span>
                </button>
                <button class="foot-login-text" v-show="loginType==4">
                  已找回
                  <span style="color:rgba(255,220,0,1);" @click="changeLoginType(1)">直接登录</span>
                </button>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div id="process" ref="process">
      <div style="padding: 70px 0 30px 0"><img style="width:300px;height:90px" src="../assets/process.png" alt=""></div>
      <div class="process-box">
        <div class="process-info">
          <div>
            <div class="num">01</div>
            <div class="title">准备资料</div>
          </div>
          <p>1、点击客服查询入驻所需资料（不同的店铺类型、主营类目所需的入驻资质不同）；</p>
          <p>2、建议您事先准备齐全资料，一次性通过审核。</p>
        </div>
        <div class="process-info">
          <div>
            <div class="num">02</div>
            <div class="title">入驻申请</div>
          </div>
          <p>1、选择店铺类型、主营类目，填写品牌信息、企业信息；</p>
          <p>2、根据页面上的提示正确填写入驻信息，上传相关资质；</p> 
          <p>3、填写店铺名称。</p>
        </div>
        <div class="process-info">
          <div>
            <div class="num">03</div>
            <div class="title">提交审核</div>
          </div>
          <p>1、审核时效：3-5个工作日（以实际审核为准）；</p>
          <p>2、审核通知：审核结果会议短信、站内客服等方式通知。</p>
        </div>
        <div class="process-info">
          <div>
            <div class="num">04</div>
            <div class="title">入驻成功</div>
          </div>
          <p>1、前往商家后台激活账号、完成开店前相关任务、锁定保证金/缴纳年费；</p>
          <p>2、发布商品、完善店铺信息后开启您的致富之旅。   </p>
        </div>
      </div>
    </div>
    <div id="business" ref="business">
      <div style="padding: 77px 0 30px 0"><img style="width:300px;height:90px" src="../assets/business.png" alt=""></div>
      <div class="business-box">
        <div class="business-info" v-on:mouseenter="visible(2)" @mouseleave="invisible(2)">
          <img src="../assets/ncz.png" alt="">
          <div><img style="height:60px" src="../assets/mcz1.png" alt=""></div>
          <div class="line-dian"></div>
          <p>万千新农人选择的第三方零售平台， 没有中间商压价，直接触达消费者， 打开让农产品走向城市的“绿色通道”</p>
          <div v-show="showCode2" class="btn-box"><a href="#filter" class="btn-an">立即入驻</a></div>
        </div>
        <div class="business-info" v-on:mouseenter="visible(1)" @mouseleave="invisible(1)">
          <img src="../assets/ppd.png" alt="">
          <div><img style="height:60px" src="../assets/ppd1.png" alt=""></div>
          <div class="line-dian"></div>
          <p>海量用户快速触达，助力品牌腾飞,诚邀优质品牌入驻</p>
          <div v-show="showCode1" class="btn-box"><a href="#filter" class="btn-an">立即入驻</a></div>
        </div>
        <div class="business-info" v-on:mouseenter="visible(3)" @mouseleave="invisible(3)">
          <img src="../assets/gcd.png" alt="">
         <div><img style="height:60px" src="../assets/gcd1.png" alt=""></div>
          <div class="line-dian"></div>
          <p>推动商家持续提升发展,支持源头好货 优质工厂入驻</p>
          <div v-show="showCode3" class="btn-box"><a href="#filter" class="btn-an">立即入驻</a></div>
        </div>
      </div>
    </div>
    <div id="claim" ref="claim">
      <div style="padding: 94px 0 30px 0"><img style="width:300px;height:90px" src="../assets/claim.png" alt=""></div>
      <div class="claim-box" style="margin:0 auto">
        <div class="normal-box" style="margin:0 auto">
          <div style="width:1200px;margin:0 auto;">
            <!-- <div style="margin:0 auto;display: inline-block;"> -->
              <!-- <img style="box-shadow:0px 0px 10px rgba(0,0,0,0.1);" src="../assets/zizhi.png" alt=""> -->
              <table class="table-claim" cellpadding="0" cellspacing="0">
                <tr>
                  <th>资质列表</th>
                  <th><div>详情说明</div></th>
                </tr>
                <tr>
                  <td>企业营业执照</td>
                  <td><div>需确保未在企业经营异类名录中且所售商品在营业执照经营范围内</div></td>
                </tr>
                <tr>
                  <td>法定代表人身份证正反面</td>
                  <td><div>图片需清晰可辨</div></td>
                </tr>
                <tr>
                  <td>联系人身份证正反面</td>
                  <td><div>图片需清晰可辨</div></td>
                </tr>
                <!-- <tr>
                  <td>一般纳税人资质</td>
                  <td><div></div></td>
                </tr> -->
                <tr>
                  <td>商标注册证或商标注册申请受理通知书</td>
                  <td><div>若办理过变更、转让、续展，请一并提供变更、转让、续展证明或受理通知书；</div></td>
                </tr>
                <tr>
                  <td>独占授权书</td>
                  <td>
                    <div>1、若由权利人授权开设品牌店，需提供独占授权书（如果商标权人为自然人，则需同时提供其亲笔签名的身份证复印件）。 2、若商标权人为境内企业或个人，请下载中文版独占授权书。若商标权人为境外企业或 个人，可选择下载中文版或英文版独占授权书。（如果商标权人为境内自然人，则需同时 提供其亲笔签名的身份证复印件。如果商标权人为境外自然人，则需同时提供其亲笔签名 的护照复印件）。
                      <a style="color:#4A64E9;text-decoration: none;" href="/static/word/china-authorization.docx" download="china-authorization.docx"> 点此下载：中文版独占授权书模板</a>。
                      <a style="color:#4A64E9;text-decoration: none;" href="/static/word/english-authorization.doc" download="english-authorization.doc">点此下载：英文版独占授权书模板</a>。
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>特殊行业资质（如食品/药品/进口商品等）</td>
                  <td><div>特殊行业资质要求详询工作人员；</div></td>
                </tr>
              </table>
            <!-- </div> -->
          </div>
          <a href="#filter" class="btn-an1">立即入驻</a>
        </div>
      </div>
    </div>
    <div id="normal" ref="normal">
      <div style="padding: 96px 0 30px 0"><img style="width:300px;height:90px" src="../assets/normal.png" alt=""></div>
      <div style="width:1200px;margin:0 auto;">
        <div class="yiji-list">
          <div v-for="(item,index) in categotyList" :key="index" :ref="'line'+index" @click="handleClick(item.id,index)">{{item.name}}</div>
          <div class="tab_line" ref="tab_line" :style="{left:lineInit+'px'}"></div>
        </div>
        <table class="table-normal" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th></th>
            <th>保证金
              <span v-on:mouseenter="visible(5)" @mouseleave="invisible(5)">
                <img v-if="showBzj" style="width:20px;height:20px;vertical-align: middle;margin-bottom:4px;" src="../assets/tishi1.png" alt="">
                <img v-else style="width:20px;height:20px;vertical-align: middle;margin-bottom:4px;" src="../assets/tishi.png" alt="">
              </span>
            </th>
            <th style="position: relative;">软件服务年费
              <span v-on:mouseenter="visible(6)" @mouseleave="invisible(6)">
                <img v-if="showFwnf" style="width:20px;height:20px;vertical-align: middle;margin-bottom:4px;" src="../assets/tishi1.png" alt="">
                <img v-else style="width:20px;height:20px;vertical-align: middle;margin-bottom:4px;" src="../assets/tishi.png" alt="">
              </span>
              <span style="font-size:12px;font-weight:400;color:rgba(204,0,0,1);position: absolute;top: 48px;left: 60px;line-height: 1;">2020年入驻享受疫情减免补贴3000元</span>
            </th>
            <th>软件服务费
              <span v-on:mouseenter="visible(7)" @mouseleave="invisible(7)">
                <img v-if="showFwf" style="width:20px;height:20px;vertical-align: middle;margin-bottom:4px;" src="../assets/tishi1.png" alt="">
                <img v-else style="width:20px;height:20px;vertical-align: middle;margin-bottom:4px;" src="../assets/tishi.png" alt="">
              </span>
            </th>
          </tr>
          <div class="bzj-info" :style="showBzj?'display: block;transition: display 1s;':'display: none;transition: display 1s;'">
            商家在萌地瓜经营必须缴存保证金，保证金主要用于保证商家按照《萌地瓜服务协议》、萌地瓜规则经营，且在商家有违规行为时根据《萌地瓜服务协议》及相关规则规 定用于向萌地瓜及消费者支付违约金。续约商家须在当年续签要求的时间内一次性缴存次年保证金，新签商家在申请入驻审核通过后一次性缴存当年的保证金。
          </div>
          <div class="bzj-info1" :style="showFwnf?'display: block;transition: display 1s;':'display: none;transition: display 1s;'">
            商家在萌地瓜经营需缴纳年费。
          </div>
          <div class="bzj-info2" :style="showFwf?'display: block;transition: display 1s;':'display: none;transition: display 1s;'">
            商家在萌地瓜经营需要按照其销售额一定百分比（简称“费率”）交纳软件服务费。
          </div>

          <tr v-for="(item,index) in tableData" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.bond}}</td>
            <td>{{item.annual_fee}}</td>
            <td>{{item.cut_rate}}</td>
          </tr>
        </table>
      </div>
      <a href="#filter" class="btn-an1">立即入驻</a>
    </div>
    <div id="problem" ref="problem">
      <div style="padding: 83px 0 60px 0"><img style="width:300px;height:90px" src="../assets/problem.png" alt=""></div>
      <div class="problem-box">
        <div class="wenda">
          <p><span class="qa">Q1</span><span class="zi">农场主、品牌店、工厂店有什么区别？</span></p>
          <p><span class="qa" style="opacity:0">A</span><span class="zi" style="font-size: 18px;font-weight: 400;">入驻类型的不同将会体现在商品和店铺信息中加以区分。</span></p>
        </div>
        <div class="wenda">
          <p><span class="qa">Q2</span><span class="zi">经营的产品类目比较多，入驻时只能选择一个主营类目怎么办？</span></p>
          <p><span class="qa" style="opacity:0">A</span><span class="zi" style="font-size: 18px;font-weight: 400;">目前不支持一个店铺售卖多个主营类目，商家可以申请入驻另一家类目店铺（需更换手机号）。</span></p>
        </div>
        <div class="wenda">
          <p><span class="qa">Q3</span><span class="zi">提交了初步入驻信息，会在多久审核？</span></p>
          <p><span class="qa" style="opacity:0">A</span><span class="zi" style="font-size: 18px;font-weight: 400;">平台会在3个工作日内审核（周末、节假日顺延），如果通过审核，注册手机会收到平台发送的信息；如果不通过，回到告知需要补充或者修改的资料，烦请修改后可再次提交。</span></p>
        </div>
        <div class="wenda">
          <p><span class="qa">Q4</span><span class="zi">店铺保证金以后可以退吗？</span></p>
          <p><span class="qa" style="opacity:0">A</span><span class="zi" style="font-size: 18px;font-weight: 400;">商家退出萌地瓜平台时，店铺保证金会在退店后退还给商家。商家申请退店或平台关闭店铺的，平台将根据《萌地瓜退店规则》以及相关规定在公示30天后将店铺保证金余额退还至届时店铺提现账户。</span></p>
        </div>
        <!-- <div class="wenda">
          <p><span class="qa">Q</span><span class="zi">我是问题我是问题我是问题我是问题我是问题我是问题我是问题？</span></p>
          <p><span class="qa" style="opacity:0">A</span><span class="zi">我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答；</span></p>
        </div> -->
      </div>
    </div>
    <div class="contact-box">
      <div style="padding: 86px 0 54px 0;"><img style="width:300px;height:90px" src="../assets/contact.png" alt=""></div>
       <div class="contact">
        <div class="ewm-info">
          <div class="ewm-box">
            <img src="../assets/gzhewm.png" alt="">
            <p>微信扫描二维码关注 <br> “萌地瓜”公众号</p>
          </div>
          <div class="ewm-box" style="width: 120px;margin-left: 20px;">
            <img src="../assets/appewm.png" alt="">
            <p>扫描二维码下载 <br> 萌地瓜APP</p>
          </div>
        </div>
        <div class="zhangshi"></div>
        <div class="lx-us">
          <p>客服&举报电话：0571-81393630</p>
          <p>企业邮箱：mengdigua@126.com</p>
          <p>客服时间：工作日 9：00-18：00</p>
          <p>萌瓜（浙江）网络科技有限公司</p>
        </div>
      </div>
    </div>
   
    <Footer></Footer>
    
    <!-- <div class="kefu" @click="kefu" ref="kefu"> -->
    <div class="kefu" id="dragbtn" @click="kefu" @mousedown="move" ref="kefu">
      <!-- <img src="../assets/kefu.png" alt=""> -->
    </div>
   
    <div :class="showBackTop?'back-top':'back-top1'">
        <a href="#filter"><img src="../assets/backTop.png" alt=""></a>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";

import md5 from "js-md5";
import Cookies from "js-cookie";
import Vue from "vue";
import MyLoading from "./../utlis/loading.js";
import Footer from "./../components/footer.vue"
let loadingInstance = new MyLoading();

export default {
  name: "login",
  components: {
    Footer
  },
  data() {
    return {
      phone: "",
      password: "",
      phoneTip: "",
      passwordTip: "",
      loginType: 2, //logintype 1账号登录 2短信登录 3注册 4忘记密码
      confirmTip: "",
      confirmPassword: "",
      code: "",
      countDown: "获取验证码",
      times: 60,
      noteTip: "",
      is_query: false,
      timer: null,
      imgCode: "",
      imgCodeTip: "",
      imgSrc: "",
      imgSign: "",
      showBackTop: false,//返回顶部按钮
      showTop: false,//导航栏hover状态
      showCode1: false, //鼠标hover状态
      showCode2: false, //鼠标hover状态
      showCode3: false, //鼠标hover状态
      showBzj: false,
      showFwf: false,
      showFwnf: false,
      drag: false,//拖动不触发点击
      lineInit: 348,
      tips: "",
      xieyitips: "",
      dialogVisible1: false,
      tableData: [],
      categotyList: [],
      positionX: 0,//客服拖拽坐标
      positionY: 0,
    };
  },
  created() {
    this.yijiList()
  },
  beforeDestroy() {
    clearInterval(this.timer);
    window.removeEventListener('scroll', this.windowScroll)
  },
  mounted() {
    window.addEventListener('scroll', this.windowScroll)
  },
  methods: {
     windowScroll() {
      // 滚动条距离页面顶部的距离
      // 以下写法原生兼容
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // let height= this.$refs.element.offsetHeight;
      let process = this.$refs.process.offsetTop;
      let business = this.$refs.business.offsetTop-100;
      let claim = this.$refs.claim.offsetTop-100
      let normal = this.$refs.normal.offsetTop-100
      let problem = this.$refs.problem.offsetTop-100
      if(scrollTop>0) {
        this.showTop = true;
        this.showBackTop = true;
      }else {
        this.showTop = false;
        this.showBackTop = false;
      }
      if(scrollTop < business) {
        this.$refs.nav_line.style.left = 1 + 'px'
        this.$refs.nav_line.style.transition = 'left 0.5s'
      }else if(scrollTop > business && scrollTop < claim) {
        this.$refs.nav_line.style.left = 130 + 'px'
        this.$refs.nav_line.style.transition = 'left 0.5s'
      }else if(scrollTop > claim && scrollTop < normal) {
        this.$refs.nav_line.style.left = 260 + 'px'
        this.$refs.nav_line.style.transition = 'left 0.5s'
      }else if(scrollTop > normal && scrollTop < problem) {
        this.$refs.nav_line.style.left = 390 + 'px'
        this.$refs.nav_line.style.transition = 'left 0.5s'
      }else if(scrollTop > problem) {
        this.$refs.nav_line.style.left = 520 + 'px'
        this.$refs.nav_line.style.transition = 'left 0.5s'
      }else {

      }
    },
    // 客服拖拽
    move(e) {
      let odiv = e.target;
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onselectstart = function() { return false; };//解决拖拽选中文字
      document.getElementById('dragbtn').setAttribute('data-flag',false)//解决拖拽和点击事件冲突
      let firstTime = new Date().getTime();
      document.onmousemove = (e)=> {
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        this.positionX = top;
        this.positionY = left;
        // this.$refs.kefu.style.top = top + 'px';
        // this.$refs.kefu.style.left = left + 'px';
        odiv.style.left = left + 'px';
        odiv.style.top = top + 'px';
      };
      document.onmouseup = (e) => {
        // odiv.style.top = top + 'px';
        // odiv.style.left = 'unset';
        // this.$refs.kefu.style.right = 50 + 'px';//限制拖拽范围
        document.onmousemove = null;
        document.onmouseup = null
        document.onselectstart = function() { return true; };
        let lastTime = new Date().getTime();
        if( (lastTime - firstTime) < 200){
          document.getElementById('dragbtn').setAttribute('data-flag',true)//解决拖拽和点击事件冲突
        }
      }
    },
    // 客服服务
    kefu() {
      let isClick = document.getElementById('dragbtn').getAttribute('data-flag');//解决拖拽和点击事件冲突
      if(isClick !== 'true') {
        return false
      } 
      // window.location.href = "https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1wgUmxc&scene=SCE00007635";//不跳新窗口
      window.open("https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1wgUmxc&scene=SCE00007635", '_blank')//跳转新窗口
    },
    handleClose(done) {
      //隐藏弹框
      done();
    },
 
     handleClick(id,index) {
      let line = this.$refs['line' + index][0].offsetLeft + 40;
      this.$refs.tab_line.style.left = line + 'px'
      this.$refs.tab_line.style.transition = 'left 0.5s'
      this.erjiList(id)
    },
    // 资费标准一级类目
    yijiList() {
      let self = this;
      this.yiji({
        
      }).then(res => {
        let dataList = res.data.data;
        dataList.pop();
        self.categotyList = dataList;
        self.erjiList(self.categotyList[0].id)
      });
    },
    // 资费二级类目
    erjiList(id) {
      // console.log(123,id)
      let self = this;
      this.erji({
        pid: id
      }).then(res => {
        // console.log('123',res);
        self.tableData = res.data.data;
        let index = 0;
        this.lineInit = this.$refs['line' + index][0].offsetLeft + 40;
        // console.log(self.tableData)
      });
    },
    // 入驻手册
    showxieyibt() {
      this.tips = "入驻协议";
      let self = this;
      this.xieyi({
        type: 9
      }).then(res => {
        console.log(res)
        self.xieyitips = res.data.data.content;
        self.dialogVisible1 = true;
      });
    },
    ...mapMutations(["changeToken", "changePhone"]),
    ...mapActions([
      "zuce",
      "forCode",
      "login",
      "yiji",
      "erji",
      "queryImgCode",
      "shopDetail",
      "reset",
      "xieyi",
      "resetCode"
    ]),
    // goHome() {
    //   this.$router.push("/");
    // },
    changeLoginType(index) {
      let self = this;
      this.loginType = index;
      self.is_query = false;
      self.password = "";
      self.phoneTip = "";
      self.passwordTip = "";
      self.is_query = false;
      (this.confirmTip = ""),
        (this.confirmPassword = ""),
        clearInterval(this.timer);
      this.countDown = "获取验证码";
      this.code = "";
      this.noteTip = "";
      this.imgCode = "";
      this.imgCodeTip = "";
      if (this.loginType > 1) {
        this.getImgCode();
      }
    },
  
    visible:function(type){
      if(type==1) {
        this.showCode1 = true;
      }else if(type==2) {
        this.showCode2 = true;
      }else if(type==3) {
        this.showCode3 = true;
      }else if(type==4) {
        this.showTop = true;
      }else if(type==5) {
        this.showBzj = true;
      }else if(type==6) {
        this.showFwnf = true;
      }else if(type==7) {
        this.showFwf = true;
      }else {

      }
        
    },
    invisible:function(type){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(type==1) {
        this.showCode1 = false;
      }else if(type==2) {
        this.showCode2 = false;
      }else if(type==3) {
        this.showCode3 = false;
      }else if(type==4&&scrollTop==0){
        this.showTop = false;
      }else if(type==5) {
        this.showBzj = false;
      }else if(type==6) {
        this.showFwnf = false;
      }else if(type==7) {
        this.showFwf = false;
      }else {

      }
    },
    inputImgCode() {},
    blurImgCode() {},
    getImgCode() {
      let self = this;
      let type = "";
      if (self.loginType == 3) {
        type = "register";
      } else if (self.loginType == 2) {
        type = "login";
      } else {
        type = "reset";
      }
      this.queryImgCode({
        type: type
      }).then(res => {
        self.imgSrc = res.data.data.url;
        self.imgSign = res.data.data.sign;
      });
    },
    getCode() {
      let self = this;
      if (!self.phone) {
        Vue.prototype.$message({
          message: "手机号不能为空！",
          type: "warning"
        });
        return false;
      }
      if (!/^1[3456789]\d{9}/.test(self.phone)) {
        Vue.prototype.$message({
          message: "手机号码格式不正确！",
          type: "warning"
        });
        return false;
      }

      // if (!self.imgCode) {
      //   Vue.prototype.$message({
      //     message: "图片验证码",
      //     type: "warning"
      //   });
      //   return false;
      // }

      if (self.is_query) {
        return;
      }
      self.is_query = true;
      loadingInstance.open(self.$refs.codeBtn);
      let type = "";
      if (self.loginType == 3) {
        type = "register";
      } else if (self.loginType == 2) {
        type = "login";
      }
      // else {
      //   type = "reset";
      // }

      if (self.loginType != 4) {
        console.log(1111)
        self
          .forCode({
            phone: self.phone,
            type: 'login',
            // code: self.code,
            // sign: self.imgCode
          })
          .then(res => {
            let d = res.data;
            loadingInstance.close();
            self.is_query = false;
            if (d.errcode == 0) {
              self.makeTimer();
              Vue.prototype.$message({ message: d.errmsg, type: "success" });
            } else {
              self.is_query = false;
              Vue.prototype.$message({ message: d.errmsg, type: "warning" });
            }
          })
          .catch(err => {
            loadingInstance.close();
            self.is_query = false;
            Vue.prototype.$message({ message: err.errmsg, type: "warning" });
          });
      } else {
        self
          .resetCode({
            phone: self.phone,
            type: "reset",
            code: self.imgCode,
            sign: ""
          })
          .then(res => {
            let d = res.data;
            loadingInstance.close();
            self.is_query = false;
            if (d.errcode == 0) {
              self.makeTimer();
              Vue.prototype.$message({ message: d.errmsg, type: "success" });
            } else {
              self.is_query = false;
              Vue.prototype.$message({ message: d.errmsg, type: "warning" });
            }
          })
          .catch(err => {
            loadingInstance.close();
            self.is_query = false;
            Vue.prototype.$message({ message: err.errmsg, type: "warning" });
          });
      }
    },
    
    loginUser() {
      let self = this;
      if (!self.phone) {
        Vue.prototype.$message({
          message: "手机号不能为空！",
          type: "warning"
        });
        return false;
      }

      if (!/^1[3456789]\d{9}/.test(self.phone)) {
        Vue.prototype.$message({
          message: "手机号码格式不正确！",
          type: "warning"
        });
        return false;
      }
      if (self.loginType == 1) {
        if (!self.password) {
          Vue.prototype.$message({
            message: "密码不能为空！",
            type: "warning"
          });
          return false;
        }
        if (self.passwordTip != 0) {
          Vue.prototype.$message({
            message: self.passwordTip,
            type: "warning"
          });
          return false;
        }
      } else if (self.loginType == 2) {
        // if (!self.imgCode) {
        //   Vue.prototype.$message({
        //     message: "图片验证码",
        //     type: "warning"
        //   });
        //   return false;
        // }
        if (!self.code) {
          Vue.prototype.$message({
            message: "请输入手机验证码",
            type: "warning"
          });
          return false;
        }
      }
      if (self.is_query) {
        return;
      }

      self.is_query = true;
      loadingInstance.open(self.$refs.loginBtn);
      Cookies.set("moiToken", "", { expires: 60 });
      Cookies.set("phone", self.phone, { expires: 60 });

      self
        .login({
          phone: self.phone,
          // password: md5(self.password),
          // scenario: self.loginType == 1 ? "login_phone" : "login_code",
          code: self.code,
          scenario: 'login_code'
          
        })
        .then(res => {
          let d = res.data;

          loadingInstance.close();
          self.is_query = false;
          if (d.errcode == 0) {
            Cookies.set("moiToken", d.data.token.token, { expires: 60 });
            Cookies.set("phone", d.data.phone, { expires: 60 });
            self.password = "";
            Vue.prototype.$message({ message: "登录成功~", type: "success" });

            self.changeToken(d.data.token.token);
            /********************判断到哪一步************ */

            this.changePhone(d.data.phone);

            this.shopDetail();

            /********************************************/
          } else {
            Vue.prototype.$message({ message: d.errmsg, type: "warning" });
          }
        })
        .catch(err => {
          loadingInstance.close();
          self.is_query = false;
          Vue.prototype.$message({ message: err.errmsg, type: "warning" });
        });
    },
    makeTimer() {
      let self = this;
      self.times = 60;
      self.countDown = "已发送(" + 60 + "s)";
      self.timer = setInterval(() => {
        if (self.times > 0) {
          self.countDown = "已发送(" + (self.times - 1) + "s)";
          self.times = self.times - 1;
        } else {
          clearInterval(self.timer);
          self.countDown = "获取验证码";
          self.times = 60;
        }
      }, 1000);
    },
    resetPassword() {
      let self = this;
      if (!self.phone) {
        Vue.prototype.$message({
          message: "手机号不能为空！",
          type: "warning"
        });
        return false;
      }
      if (!/^1[3456789]\d{9}/.test(self.phone)) {
        Vue.prototype.$message({
          message: "手机号码格式不正确",
          type: "warning"
        });
        return false;
      }
      if (!self.password) {
        Vue.prototype.$message({
          message: "密码不能为空！",
          type: "warning"
        });
        return false;
      }
      if (self.passwordTip != 0) {
        Vue.prototype.$message({ message: self.passwordTip, type: "warning" });
        return false;
      }
      if (!self.confirmPassword) {
        Vue.prototype.$message({ message: "请再次输入密码", type: "warning" });
        return false;
      }
      if (self.password != self.confirmPassword) {
        Vue.prototype.$message({ message: "密码输入不一致", type: "warning" });
        return false;
      }
      if (!self.code) {
        Vue.prototype.$message({
          message: "请输入手机验证码",
          type: "warning"
        });
        return false;
      }
      if (self.is_query) {
        return;
      }
      self.is_query = true;
      loadingInstance.open(self.$refs.resetBtn);
      this.reset({
        phone: self.phone,
        code: self.code,
        password: md5(self.password),
        scenario: "reset",
        graphCode: self.imgCode
      })
        .then(res => {
          loadingInstance.close();

          if (res.data.errcode == 0) {
            Vue.prototype.$message({
              message: "修改成功，请登录",
              type: "success"
            });
            clearInterval(self.timer);

            self.code = "";
            self.is_query = false;

            self.countDown = "获取验证码";
            self.password = "";
            self.confirmPassword = "";
            self.times = 60;
          } else {
            self.is_query = false;
            Vue.prototype.$message({
              message: res.data.errmsg,
              type: "warning"
            });
          }
        })
        .catch(err => {
          loadingInstance.close();
          self.is_query = false;
          Vue.prototype.$message({ message: err.errmsg, type: "warning" });
        });
    },
    createUser() {
      let self = this;
      if (!self.phone) {
        Vue.prototype.$message({
          message: "手机号不能为空！",
          type: "warning"
        });
        return false;
      }
      if (!/^1[3456789]\d{9}/.test(self.phone)) {
        Vue.prototype.$message({
          message: "手机号码格式不正确",
          type: "warning"
        });
        return false;
      }
      if (!self.password) {
        Vue.prototype.$message({
          message: "密码不能为空！",
          type: "warning"
        });
        return false;
      }
      if (self.passwordTip != 0) {
        Vue.prototype.$message({ message: self.passwordTip, type: "warning" });
        return false;
      }
      if (!self.confirmPassword) {
        Vue.prototype.$message({ message: "请再次输入密码", type: "warning" });
        return false;
      }
      if (self.password != self.confirmPassword) {
        Vue.prototype.$message({ message: "密码输入不一致", type: "warning" });
        return false;
      }
      if (!self.code) {
        Vue.prototype.$message({
          message: "请输入手机验证码",
          type: "warning"
        });
        return false;
      }
      if (self.is_query) {
        return;
      }
      self.is_query = true;
      loadingInstance.open(self.$refs.registerBtn);

      this.zuce({
        phone: self.phone,
        code: self.code,
        password: md5(self.password),
        scenario: "register_phone"
      })
        .then(res => {
          loadingInstance.close();

          if (res.data.errcode == 0) {
            Vue.prototype.$message({
              message: "注册成功，请登录",
              type: "success"
            });
            clearInterval(self.timer);

            self.code = "";
            self.is_query = false;

            self.countDown = "获取验证码";
            self.password = "";
            self.confirmPassword = "";
            self.times = 60;
          } else {
            self.is_query = false;
            Vue.prototype.$message({
              message: res.data.errmsg,
              type: "warning"
            });
          }
        })
        .catch(err => {
          loadingInstance.close();

          self.is_query = false;
          Vue.prototype.$message({ message: err.errmsg, type: "warning" });
        });
    },
    inputPhone() {
      if (this.phone.trim()) {
        let strArr = /^1\d*/i.exec(this.phone.trim());

        if (!strArr) {
          this.phone = "";
        } else {
          if (this.phoneTip != "") {
            this.phoneTip = "";
          }

          this.phone = strArr[0];
        }
      } else {
        this.phone = "";
      }
    },
    inputPassword() {
      if (this.password.trim()) {
        let reg = /^[A-Za-z0-9]+/i;

        let bool = reg.exec(this.password.trim());
        if (!bool) {
          this.password = "";
        } else {
          this.password = bool[0];
        }

        if (this.passwordTip != "") {
          this.passwordTip = "";
        }
      } else {
        this.password = "";
      }
    },
    inputConfirm() {
      if (this.confirmTip) {
        this.confirmTip = "";
      }
    },
    inputCode() {
      if (this.noteTip) {
        this.noteTip = "";
      }
    },
    blurCode() {
      if (!this.code.trim()) {
        this.noteTip = "验证码不能为空";
      }
    },
    blurConfirm() {
      if (!this.confirmPassword.trim()) {
        this.confirmTip = "确认密码不能为空！";
        return;
      }
      if (this.confirmPassword != this.password) {
        this.confirmTip = "两次密码输入不一致";
        return;
      }
    },
    blurPhone() {
      if (!this.phone.trim()) {
        this.phoneTip = "手机号码不能为空";
      } else {
        let bool = /^1[3456789]\d{9}/.test(this.phone.trim());

        if (!bool) {
          this.phoneTip = "手机号码格式不正确！";
        }
      }
    },
    blurPassword() {
      if (!this.password.trim()) {
        this.passwordTip = "密码不能为空！";
      } else if (
        this.password.trim().length < 6 ||
        this.password.trim().length > 20
      ) {
        this.passwordTip = "密码长度应该在6-20之间";
      } else {
        let reg = /^[A-Za-z0-9]{6,20}$/i;
        if (!reg.test(this.password.trim())) {
          this.passwordTip = "密码格式不对！";
        }
      }
    }
  }
};
</script>
<style>
.login input:focus {
  outline: none;
}
.login .el-loading-spinner i {
  color: rgb(255, 255, 255);
}
</style>
<style scoped>
.login-img {
  width: 342px;
  margin: 0 auto;
}
.top {
  min-width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  /* background:rgba(172,217,255,0.77);
  opacity:  0.85; */
  background:rgba(255,255,255,0.69);
  box-shadow:0px 10px 20px 0px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
}
.top1 {
  min-width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  /* background:rgba(172,217,255,0.77);
  opacity:  0.85; */
  background:rgba(255,255,255,1);
  box-shadow:0px 10px 20px 0px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
}
.tab {
  min-width: 1200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo1 img {
    width: 200px;
    height: 80px;
}
.logo1 div {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 2px;
    color: #fff;
}
.tab-box {
  display: flex;
  align-items: center;
  position: relative;
}
.tab-box li {
  margin-right: 58px;
  list-style: none;
}
.tab-box li:last-child {
  margin-right: 0;
}
.tab-box li a {
  text-decoration: none;
  font-size:18px;
  color:rgba(0,0,0,1);
}
.box-filter {
  /* width: 1920px; */
  height: 550px;
  /* position: relative; */
  background: url("./../assets/gather/login-bg1.png") no-repeat;
  background-size: cover;
  background-position: center 0;
 
}
.filter {
  /* background: rgba(0, 0, 0, 0.2); */
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%); */
  width: 1200px;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 0;
  margin: 0 auto;
}
.zuce {
  height: 70px;
  font-size: 26px;
  /* padding-top: 18px; */
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);
  padding-left: 60px;
  font-weight: 500;
  line-height: 70px;
  color: rgba(0, 0, 0, 0.7);
}
.img-input {
  flex-grow: 1;
  height: 45px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding-left: 20px;
}
.img-code {
  height: 45px;
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  margin: 0 0 0 20px;
}
.register-btn {
  height: 50px;
  background: rgba(255, 220, 0, 1);
  border-radius: 6px;
  margin: 0 auto;
  font-size: 26px;
  font-weight: 500;
  line-height: 50px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  overflow: hidden;
}
.scan-tip-img {
  width: 18px;
  margin-right: 2px;
}
.scan-tip {
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0, 1);
  margin: 15px 0 20px;
}
.scan-img {
  width: 250px;
  height: 250px;
}

.scan-code {
  margin: 40px auto;
  width: 252px;
  height: 252px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.scan-box {
  border-bottom: 1px dashed rgba(0, 0, 0, 1);
}
.note-login {
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 20px;
}
.foot-login-text{
  border: none;
  margin: 0 10px;
  padding-bottom: 3px;
  border-left: none;
  border-right: none;
  border-top: none;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
  font-weight: 400;
  line-height: 24px;
}
.foot-login-text span{
 border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.foot-text {
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  margin: 0 10px;
  padding-bottom: 3px;
  border-left: none;
  border-right: none;
  border-top: none;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
  font-weight: 400;
  line-height: 24px;
}
.scan-foot {
  margin: 20px 0 20px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0, 1);
  min-width: 1200px;
}
.foot {
  margin-top: 50px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0, 1);
}
.login-btn {
  height: 44px;
  background:rgba(255,211,0,1);
  box-shadow:0px 0px 10px 0px rgba(227,188,0,1);
  border-radius:22px;
  margin: 0px auto 7px;
  font-size: 20px;
  line-height: 44px;
  text-align: center;
  color: #353535;
  overflow: hidden;
}
.manual {
  display: block;
  font-size: 16px;
  color: #2569D3;
  margin-bottom: 23px;
  cursor: pointer;
}
.note-code {
  width: 180px;
  height: 42px;
  border: none;
  overflow: hidden;
  /* background: rgba(0, 0, 0, 0.2); */
  background: #fff;
  /* border-radius: 6px; */
  font-size: 13px;
  font-weight: 400;
  line-height: 42px;
  color: #2569D3;
  outline: none;
  /* margin-left: 20px; */
}
.code-input {
  width: 195px;
  /* height: 45px; */
  border: none;
  /* opacity: 0.9; */
  border-radius: 6px;
  padding-left: 20px;
  font-size: 16px;
  /* flex-shrink: 1; */
  /* text-align: center; */
}
.note-code-box {
  height: 44px;
  /* box-shadow:0px 0px 15px rgba(0,0,0,0.15); */
  background: #fff;
  /* opacity: 0.9; */
  border-radius: 22px;
  overflow: hidden;
}
.input-box {
  height: 44px;
  /* border: 1px solid rgba(0, 0, 0, 0.15); */
  /* box-shadow:0px 0px 15px rgba(0,0,0,0.15); */
  background: #fff;
  /* opacity: 0.9; */
  border-radius: 22px;
  margin-top: 10px;
  overflow: hidden;
}
.useTips {
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.9);
}
.margin {
  height: 65px;
}
.red {
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  color: rgba(236, 44, 44, 1);
  margin-top: 2px;
  margin-left: 20px;
}
.img {
  height: 24px;
  margin: 0 3px 0 9px;
}
.input {
  flex-grow: 1;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0);
  border: none;
  height: 44px;
  box-shadow: inset 0 0 0 1000px #fff!important;
}
.header {
  padding: 30px 34px 16px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.7); */
  flex-grow: 1;
  /* text-align: center; */
  font-size: 24px;
  font-weight: 500;
  line-height: 35px;
  color: #707070;
}
.shangjia {
  width: 36px;
  height: 36px;
  margin-right: 6px;
}
.header-left {
  /* border-right: 1px solid rgba(0, 0, 0, 0.5); */
}
.header-text {
  display: flex;
  align-items: center;
  flex-grow: 1;
  font-size:28px;
  line-height: 1;
  font-weight: bold;
}
.login {
  min-height: 100vh;
  /* background: url("./../assets/gather/login-bg.png"); */
  background-size: cover;
  background-origin: 50% 50%;
  overflow-y: auto;
}
.login-left {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  flex-grow: 0;
  margin-right: 15.31%;
}
.text {
  font-size: 50px;
  margin-top: 40px;
  font-weight: 500;
}
.title {
  font-size: 120px;
  font-weight: 400;
}
.login-right {
  vertical-align: middle;
  display: inline-block;
  background:rgba(255,255,255,0.8);
  border-radius:12px;
  width: 340px;
  margin-right: 115px;
}
#process {
  min-width: 1200px;
  text-align: center;
  margin-bottom: 106px;
}
#process h2 {
  padding: 100px 0 20px;
  font-size: 36px;
  color: #707070;
  font-weight:400;
}
.process-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.process-info {
  width:260px;
  height:334px;
  background:rgba(255,255,255,1);
  box-shadow:0px 6px 23px 0px rgba(0,0,0,0.1);
  border-radius:12px;
  margin-right: 30px;
  padding: 25px;
  box-sizing: border-box;
  text-align: left;
}
.process-info:last-child {
  margin-right: 0;
}
.process-info .num {
  font-size:33px;
  /* font-family:AlibabaPuHuiTiH; */
  color:rgba(255,211,0,1);
  line-height:46px;
    font-weight: bold;
  /* margin-right: 10px; */
}
.process-info .title {
  font-size:27px;
  color:rgba(53,53,53,1);
  line-height:36px;
  font-weight: bold;
  margin: 5px auto 37px;
}
.process-info p {
  font-size:14px;
  color:rgba(53,53,53,1);
  line-height:19px;
  text-align: justify;
}
#business {
  min-width: 1200px;
  height: 700px;
  text-align: center;
  background: url(../assets/bg2x.png) no-repeat;
  background-size: cover;
  background-position: center 0;
}
#business h2 {
  padding: 100px 0 90px;
  font-size: 36px;
  color: #707070;
  font-weight:400;
}
.business-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.business-info {
  background:rgba(255,255,255,1);
  box-shadow:0px 10px 20px 0px rgba(0,0,0,0.6);
  border-radius:12px;
  width:358px;
  height:412px;
  margin-right: 28px;
  padding: 30px;
  box-sizing: border-box;
  /* text-align: center; */
  position: relative;
}
.business-info:last-child {
  margin-right: 0;
}
.business-info img {
  width: 128px;
  height: 128px;
}
.business-info h1 {
  font-weight: bold;
  margin: 10px 5px;
  font-size:43px;
  /* font-family:AlibabaPuHuiTiB; */
  color:rgba(53,53,53,1);
  line-height:59px;
}
.line-dian {
  width:128px;
  height:4px;
  background:rgba(255,211,0,1);
  border-radius:2px;
  margin: 0 auto;
}

.business-info p {
  font-size:17px;
  color:rgba(53,53,53,1);
  line-height:25px;
  margin-top: 26px;
  text-align: left;
}
.btn-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background:rgba(255,255,255,0.85);
  border-radius:12px;
  overflow: hidden;
}
.btn-an {
  display: block;
  width:272px;
  height:70px;
  background:rgba(255,211,0,1);
  box-shadow:0px 0px 20px 0px rgba(255,211,0,0.5);
  border-radius:43px;
  line-height: 70px;
  text-align: center;
  text-decoration: none;
  font-size:24px;
  color:rgba(34,34,34,1);
  font-weight: bold;
  margin: 160px auto;
}
.btn-an1 {
  display: block;
  width:316px;
  height:70px;
  background:rgba(255,211,0,1);
  box-shadow:0px 5px 20px 0px rgba(255,211,0,0.42);
  border-radius:43px;
  line-height: 70px;
  text-align: center;
  text-decoration: none;
  font-size:24px;
  color:rgba(34,34,34,1);
  margin: 35px auto 0
}
.kefu {
  width: 77px;
  height: 100px;
  position: fixed;
  z-index: 10;
  top: 40vh;
  right: 50px;
  cursor: pointer;
  background: url(../assets/kefu.png) no-repeat;
  background-size: 100% 100%;
}
/* .kefu img {
  
} */
.back-top {
  position: fixed;
  z-index: 10;
  top: 80vh;
  right: 50px;
  transition: right 0.3s;
}
.back-top1 {
  position: fixed;
  z-index: 10;
  top: 80vh;
  right: -80px;
  transition: right 0.3s;
}
.back-top img{
  width: 77px;
  height: 150px;
}
.back-top1 img{
  width: 77px;
  height: 150px;
}
#claim {
  min-width: 1200px;
  text-align: center;
  margin-bottom: 100px;
}
#claim h2 {
  padding: 100px 0 50px;
  font-size: 36px;
  color: #707070;
  font-weight:400;
}

#normal {
  min-width: 1200px;
  text-align: center;
  margin-bottom: 150px;
}
#normal h2 {
  padding: 100px 0 50px;
  font-size: 36px;
  color: #707070;
  font-weight:400;
}

#problem {
  min-width: 1200px;
  text-align: center;
  background: url(../assets/bg2x1.png) no-repeat;
  background-size: cover;
  background-position: center 0;
  padding-bottom: 156px;
}
#problem h2 {
  padding: 100px 0 36px;
  font-size: 36px;
  color: #707070;
  font-weight:400;
}
.problem-box {
  width: 1200px;
  margin: 0 auto;
  text-align: left;
}
.problem-box .wenda {
  margin: 0 120px;
  padding-bottom: 16px;
}
.problem-box p {
  display: flex;
  align-items: flex-start;
  font-size:16px;
  color:rgba(255,255,255,1);
  line-height:24px;
  margin-top: 12px;
  font-weight: bold;
}
.problem-box p .qa {
  display: inline-block;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  font-size:17px;
  /* font-family:SourceHanSansSC-Heavy,SourceHanSansSC; */
  font-weight:800;
  color:rgba(34,34,34,1);
  line-height:28px;
  background:rgba(255,211,0,1);
  border-radius:3px;
  text-align: center;
}
.problem-box p .zi {
  width: 915px;
  font-size: 19px;
  font-weight: bold;
}
.contact-box {
  min-width: 1200px;
  text-align: center;
}
.contact {
  display: flex;
  justify-content: center;
  margin-bottom: 126px;
}
.ewm-info {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
.ewm-box {
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
}
.ewm-box img {
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
}
.ewm-box p {
  font-size:14px;
  color:rgba(53,53,53,1);
  text-align: center;
}
.zhangshi {
  width: 1px;
  height: 185px;
  background: #bebebe;
  border-radius: 4px;
  margin: 0px 60px 0 60px;
}
.lx-us {
  margin-top: 30px;
  flex: 1;
}
.lx-us p {
  font-size: 16px;
  color: #353535;
  margin-bottom: 16px;
  text-align: left;
}
.nav_line {
    width:72px;
    height:4px;
    background:rgba(255,211,0,1);
    border-radius:2px;
    position: absolute;
    top: 34px;
    left: 1px;
    transition: left 0.5s;
}
.table-claim {
  font-size:16px;
  color:rgba(53,53,53,1);
  line-height:26px;
  box-shadow:0px 5px 30px 0px rgba(244,244,244,1);
}
.table-claim tr:hover {
  position: relative; 
	z-index: 10;
  box-shadow:0px 0px 30px 0px rgba(185,185,185,0.3);
}
 .table-claim tr:hover:nth-child(even){   
    background:#F9F9F9;
    position: relative;
    display: flex;
    align-items: center;
    z-index: 4;
}

.table-claim tr:nth-child(even){   
    background:#F9F9F9;
    position: relative;
    display: flex;
    align-items: center;
    z-index: 1;
}
.table-claim tr:nth-child(odd){
  background:#FFFFFF;
  position: relative;
  align-items: center;
  display: flex;
  z-index: 3;
}
.table-claim tr th {
  background: #FFD300;
  height: 80px;
  line-height: 80px;
}
.table-claim tr td {
  padding: 15px 0;
}
.table-claim tr th:first-child {
  width: 520px;
  text-align: center;
}
.table-claim tr td:first-child {
  width: 520px;
  text-align: center;
}

.table-claim tr th:last-child {
  width: 680px;
  text-align: center;
}
.table-claim tr th:last-child div {
  width: 426px;
  margin: 0 auto;
  text-align: center;
}

.table-claim tr td:last-child {
  width: 680px;

}
.table-claim tr td:last-child div {
  width: 426px;
  margin: 0 auto;
  text-align: justify;
}
.yiji-list {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  font-size:22px;
  color:rgba(53,53,53,1);
  position: relative;
}
.yiji-list div {
  width: 15%;
  white-space:nowrap;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.yiji-list .tab_line {
    width:96px;
    height:4px;
    background:rgba(255,211,0,1);
    border-radius:2px;
    position: absolute;
    top: 34px;
    transition: left 0.5s;
} 
.table-normal {
  width: 100%;
  font-size:16px;
  color:rgba(53,53,53,1);
  line-height:26px;
  box-shadow:0px 5px 30px 0px rgba(244,244,244,1);
  text-align: left;
  position: relative;
}
.table-normal tr:hover {
  box-shadow:0px 0px 30px 0px rgba(185,185,185,0.3);
  position: relative; 
	z-index: 10;
}
.table-normal tr:hover:nth-child(even){ 
    background:#FFFFFF;
    position: relative;
    display: flex;
    align-items: center;
    z-index: 4;
}
.table-normal tr:nth-child(even){   
    background:#FFFFFF;
    position: relative;
    display: flex;
    align-items: center;
    z-index: 1;
}
.table-normal tr:nth-child(odd){
    background:#F9F9F9;
    position: relative;
    display: flex;
    align-items: center;
    z-index: 3;
}
.table-normal tr th {
  width: 25%;
  background: #FFD300;
  height: 76px;
  line-height: 66px;
  padding-left: 60px;
}

.table-normal tr td {
  width: 25%;
  padding: 15px 0px 15px 60px;
}
.bzj-info {
  width: 310px;
  padding: 10px 12px;
  box-sizing: border-box;
  position: absolute;
  z-index: 10;
  top: 47px;
  left: 360px;
  font-size:12px;
  color:rgba(53,53,53,1);
  background:rgba(255,255,255,1);
  box-shadow:0px 5px 10px 0px rgba(0,0,0,0.15);
  border-radius:6px;
}
.bzj-info1 {
  width: 310px;
  padding: 10px 12px;
  box-sizing: border-box;
  position: absolute;
  z-index: 10;
  top: 47px;
  left: 710px;
  font-size:12px;
  color:rgba(53,53,53,1);
  background:rgba(255,255,255,1);
  box-shadow:0px 5px 10px 0px rgba(0,0,0,0.15);
  border-radius:6px;
}
.bzj-info2 {
  width: 310px;
  padding: 10px 12px;
  box-sizing: border-box;
  position: absolute;
  z-index: 10;
  top: 47px;
  left: 810px;
  font-size:12px;
  color:rgba(53,53,53,1);
  background:rgba(255,255,255,1);
  box-shadow:0px 5px 10px 0px rgba(0,0,0,0.15);
  border-radius:6px;
}

input::-webkit-input-placeholder { 
/* WebKit browsers */ 
color: #666666; 
} 
input:-moz-placeholder { 
/* Mozilla Firefox 4 to 18 */ 
color: #666666; 
} 
input::-moz-placeholder { 
/* Mozilla Firefox 19+ */ 
color: #666666; 
} 
input:-ms-input-placeholder { 
/* Internet Explorer 10+ */ 
color: #666666; 
}

</style>