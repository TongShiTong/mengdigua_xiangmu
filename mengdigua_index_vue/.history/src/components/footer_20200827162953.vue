<template>
  <div class="footer">
      <div class="footer-box">
          <img class="logo" src="../assets/foot-logo.png" alt="">
          <div class="btns">
              <div class="wenan"><a href="#filter">入驻萌地瓜</a></div>
              <div class="line"></div>
              <div class="wenan"><a href="https://www.mengdigua.cn/join/company.html" target="_blank">关于我们</a></div>
              <div class="line"></div>
              <!-- <div class="wenan"><a href="https://www.mengdigua.cn/join/service-center.html" target="_blank">帮助中心</a></div>
              <div class="line"></div> -->
              <div class="wenan"><a href="https://www.mengdigua.cn/join/safeguard.html" target="_blank">消费者保障</a></div>
              <div class="line"></div>
              <div class="wenan"><a href="https://www.mengdigua.cn/join/report.html" target="_blank">廉政举报</a></div>
              <div class="line"></div>
              <div class="wenan"><a :href="require('../assets/permit.png')" target="_blank"> 营业执照</a></div>
          </div>
          <div class="beian">
              <div class="paperwork">©2020 萌瓜（浙江）网络科技有限公司</div>
              <div class="paperwork">
                  <a :href="require('../assets/zzdxxk.jpg')" target="_blank" rel="noopener noreferrer">增值电信业务经营许可证：浙B2-20200976</a>
              </div>
              <div class="paperwork">
                  <a href="http://beian.miit.gov.cn/state/outPortal/loginPortal.action" target="_blank" rel="noopener noreferrer"> 浙ICP备19049378号-5</a>
              </div>
              <div class="paperwork tubiao">
                  <img src="../assets/foot-public.png" alt="">
                  <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011802001974" target="_blank" rel="noopener noreferrer">浙公网安备 33011802001974号</a>
              </div>
              
              
          </div>
          <div class="beian" style="padding-top:10px">
              <div class="paperwork">
                  <!-- <a :href="require('../assets/yiyao.png')" target="_blank" rel="noopener noreferrer">互联网药品信息服务资格证书：（浙）-经营性-2020-0106</a> -->
              </div>
              <div class="paperwork">
                  <span>浙江省网络食品销售第三方平台提供者备案：浙网食A33000038</span>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
//多图上传插件
// import { getBaseApi } from '@/utils/index.js'
export default {
  name: "footerbar",
  
  data() {
    return {
      
    };
  },
  created() {},
  methods: {
    
  }
};
</script>
<style scoped>
    .footer {
        width: 100%;
        /* height: 224px; */
        background: rgba(62, 59, 63, 1);
        padding-bottom: 20px;
    }
    .footer-box {
        min-width: 1260px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .footer-box .logo {
        padding-top: 28px;
        padding-bottom: 60px;
    }
    .btns {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btns .wenan a {
        font-size: 16px;
        font-weight: 400;
        color: rgba(255,255,255,1);
        padding: 0 16px 0;
        text-decoration: none;
    }
    .btns .line {
        width: 1px;
        height: 12px;
        background: rgba(255,255,255,1);
    }
    .beian {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 24px;
    }
    .paperwork {
        font-size: 14px;
        font-weight: 300;
        color: #fff;
        margin-right: 20px;
    }
    .tubiao {
        display: flex;
        align-items: center;
    }
    .tubiao img {
        margin-right: 10px;
    }
    .paperwork a {
        text-decoration: none;
        font-size: 14px;
        font-weight: 300;
        color: #fff;
    }
</style>


