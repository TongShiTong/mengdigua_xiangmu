<template>
  <div class="home-page">
    <div>
      <!-- <div class="top-bar">活动专题</div> -->
      <div class="header">
        <img src="@/assets/header.png" />
        <div class="rules" @click="toRule">活动细则</div>
      </div>

      <ul class="time clearfix">
        <li
          v-for="(item, index) in eventTimes"
          :key="index"
          v-bind:class="{ cur: index === currentEventIndex }"
        >
          <p v-if="index === currentEventIndex && waitForEvent">即将开抢</p>
          <p v-if="index === currentEventIndex && !waitForEvent">正在开抢</p>
          {{ splitTime0(item) }}
          <br />
          {{ splitTime1(item) }}
        </li>
      </ul>
      <div class="page-content">
        <!-- 下单 -->
        <div class="path1">
          <div class="steps">
            邀请新朋友
            <span>>></span>人满得优惠券
            <span>>></span>下单使用
          </div>
          <div class="path-box">
            <div class="ending-time">
              <div v-html="countdownText"></div>
              <!-- 抢购中 progress-bar 加on -->
              <!-- <div class="progress-bar on"> -->
              <div class="progress-bar">
                <!-- cur 的进度是0~100% -->
                <div class="cur" v-bind:style="{ width: getPrecent + '%' }"></div>

                <!-- 抢购结束 把cur的div去掉-->
                <!-- <div class="num disabled">剩余0个</div> -->
                <div class="num">仅剩{{ getStock }}个</div>
              </div>
            </div>

            <div class="goods-box">
              <div class="img">
                <img v-if="item !== undefined" v-bind:src="item.img_url" />
                <img v-else src="@/assets/pic.png" />
              </div>
              <div class="goods-info">
                <div class="name">{{ getItemName }}</div>
                <div class="tag">
                  <span>限时抢购</span>
                  <span>官方补贴</span>
                </div>
                <div class="price">
                  <span class="cur">
                    <i>￥</i>49.8
                  </span>
                  <span class="cost">¥239.8</span>
                </div>
                <!-- 已参与/已售罄状态 加disabled -->
                <!-- <button class="btn-buy disabled">已参与</button> -->
                <button class="btn-buy" @click="toWeixin">马上抢</button>
              </div>
            </div>

            <div class="records-wrap">
              <p>{{ randomRegisterText }}</p>
              <div class="records-list">
                <ul class="list clearfix">
                  <li v-for="(item, index) in recentRegisters" :key="index">
                    <img v-bind:src="item.head_url" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 邀请好友 -->
        <div class="path2">
          <div class="item" v-if="needInviteCount < 10">
            再邀请
            <span>{{ needInviteCount }}</span>名新用户，就能获取
            <span class="money">{{ canReceiveCoupanMoney }}</span>元榴莲优惠券～
          </div>
          <ul class="user-list clearfix">
            <li v-for="(item, index) in invateShowList" :key="index">
              <img v-if="item.head_url" v-bind:src="item.head_url" />
              <i v-if="index === 5 || index === 9" class="award">
                <img src="@/assets/award.png" />
              </i>
            </li>
          </ul>
          <button class="btn-invite" @click="showWXSharePopFade">立即邀请</button>

          <!-- 优惠券 -->
          <ul class="coupon-list">
            <li v-for="(item, index) in coupans" :key="index">
              <div class="box">
                <span class="money">{{ item.discount_num }}</span>元
              </div>
              {{ item.name }}
              <button v-if="item.is_accept" class="btn-coupon">已领取</button>
              <button
                v-else-if="canReceiveCoupan(item)"
                class="btn-coupon"
                @click="receiveCoupan(item.id)"
              >立即领取</button>
              <button v-else class="btn-coupon" @click="showWXSharePopFade">去邀请</button>
            </li>
          </ul>
        </div>

        <div class="path3">
          <div class="item">商品详情</div>
          <div class="detail-box">
            <div class="pic">
              <img src="@/assets/detail/detail-1.png" />
            </div>
            <div class="pic">
              <img src="@/assets/detail/detail-2.png" />
            </div>
            <!-- <div class="pic">
              <img src="@/assets/detail/detail-3.png" />
            </div> -->
            <div class="pic">
              <img src="@/assets/detail/detail-4.png" />
            </div>
            <div class="pic">
              <img src="@/assets/detail/detail-5.png" />
            </div>
            <div class="pic">
              <img src="@/assets/detail/detail-6.png" />
            </div>
            <div class="pic">
              <img src="@/assets/detail/detail-7.png" />
            </div>
            <div class="pic">
              <img src="@/assets/detail/detail-8.png" />
            </div>
            <div class="pic">
              <img src="@/assets/detail/detail-9.png" />
            </div>
            <!-- <div class="pic">
              <img src="@/assets/detail/detail-10.png" />
            </div> -->
            <div class="pic">
              <img src="@/assets/detail/detail-11.png" />
            </div>
            <div class="pic">
              <img src="@/assets/detail/detail-12.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- 当弹窗出现时，向body添加class名为hidden  解决弹窗出现时，页面滚动问题 -->
    <div class="pop-fade" v-show="popFade&&showPop">
      <!-- 弹窗 立即参与-->
      <div class="pop-join pop-wrap" style="display:none">
        <img src="@/assets/pop-join.png" />
        <button class="btn-join"></button>
      </div>
      
      <!-- 弹窗 助力 -->
      <div class="pop-help pop-wrap" v-show="!hasToken">
        <img src="@/assets/pop-help.png" />
        <button class="btn-help" @click="toLogin"></button>
        <button class="btn-close" @click="toLogin"></button>
      </div>

      <!-- 弹窗 助力成功 -->
      <div class="pop-help-ok pop-wrap" v-show="hasToken && firstTimeEnter">
        <img src="@/assets/pop-help-ok.png" />
        <div class="text">
          <span>{{ getRecommendName }}</span>送你100元猫山王优惠券
        </div>
        <button class="btn-ok" @click="closePopFade"></button>
        <button class="btn-close" @click="closePopFade"></button>
      </div>
    </div>
    <div class="pop-fade" v-show="showWXShare" @click="closeWXSharePopFade">
        <!-- 弹窗 分享链接 -->
      <div class="pop-share pop-wrap">
        <div class="pic">
          <img src="@/assets/share.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, getUserInfo, getRecomendId } from "../store/user";
import bridge from "../utils/bridge";
import enter from "../utils/checkFirstTime";
import api from "../api/index";
import moment from 'moment/moment'

export default {
  name: "Home",
  data() {
    return {
      firstTimeEnter: false,
      hasToken: false,
      popFade: true,
      showPop: false,
      showWXShare: false,
      recommendName: "",
      item: undefined,
      invitations: [],
      needInviteCount: 6,
      canReceiveCoupanMoney: 170,
      invateShowList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      recentRegisters: [],
      randomRegisterText: "",
      coupans: [],
      eventTimes: [],
      waitForEvent: true,
      currentEventIndex: 0,
      countdownText: "",
      countdownTimer: undefined,
      refreshTimer: undefined
    };
  },
  methods: {
    toLogin() {
      if (bridge.hasBridge()) {
        bridge.startLogin();
      } else {
        this.$router.push("/login");
      }
    },
    toRule() {
      this.$router.push("/rule");
    },
    toWeixin() {
      if (bridge.hasBridge()) {
        bridge.startGoodsDetails(this.item.shop_id, this.item.item_id);
      } else {
        // this.$router.push("/weixin");
        location.href = 'http://d.mengdigua.com/'
      }
    },
    closePopFade() {
      this.popFade = false;
    },
    showWXSharePopFade() {
      if (bridge.hasBridge()) {
        const title = "急！就差你了，快来帮我抢榴莲~";
        const desc = "点一下助力得100元无门槛优惠券";
        const imgUrl =
          "https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/webp/ABFXNTHK12345789_1594282045.webp";
        const recomendId = getUserInfo().uid;

        // 定义分享链接,使用encodeURIComponent对传入参数编码，防止在iOS中传入参数编码问题
        // 此处示例传递单个参数
        const _shareLink =
          window.location.origin +
          "/#?" +
          encodeURIComponent("recomend_id") +
          "=" +
          encodeURIComponent(recomendId);
        bridge.shareWechat(title, desc, imgUrl, _shareLink);
      } else {
        this.showWXShare = true;
      }
    },
    closeWXSharePopFade() {
      this.showWXShare = false;
      this.popFade = false;
      this.showPop == false;
    },
    getItem() {
      const self = this;
      api.getItem(114584).then(data => {
        self.item = data;
        self.getEventTimes();
      });
    },
    getRecentRegisters: function() {
      const self = this;
      api.getRecentRegisters().then(data => {
        self.recentRegisters = data;
        const randomElement = data[Math.floor(Math.random() * data.length)];
        this.randomRegisterText = `用户${randomElement.nickname}已参与了抢购`;
      });
    },
    getInvitations: function() {
      const self = this;
      api.getInvitations().then(data => {
        if (data) {
          self.invitations = data;
          const emptyList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
          const showList = [...self.invitations, ...emptyList].slice(0, 10);
          self.invateShowList = showList;
          const length = data.length;
          if (length < 6) {
            self.needInviteCount = 6 - length;
            self.canReceiveCoupanMoney = 170;
          } else if (length < 10) {
            self.needInviteCount = 10 - length;
            self.canReceiveCoupanMoney = 190;
          }
        }
      });
    },
    getCoupans: function() {
      const self = this;
      api.getCoupons(114584, "item", 9).then(data => {
        self.coupans = data.list;
      });
    },
    canReceiveCoupan: function(coupan) {
      if (coupan.discount_num == 170) {
        return this.invitations.length >= 6;
      }
      if (coupan.discount_num == 190) {
        return this.invitations.length >= 10;
      }
      return true;
    },
    receiveCoupan: function(coupanId) {
      const self = this;
      api.receiveCoupon(coupanId).then(data => {
        self.getCoupans();
        console.log(data);
      });
    },
    getEventTimes: function() {
      const self = this;
      api.getEventTimes().then(data => {
        self.eventTimes = data;
        self.getCurrentDateIndex();
        self.setCountdownTimer();
      });
    },
    peekEventTimes: function(mapEventTimes, index) {
      if (index + 1 >= mapEventTimes.length - 1) {
        return false;
      } else {
        const item = mapEventTimes[index + 1];
        const time = Date.parse(item);
        const currentTime = new Date().getTime();
        return currentTime > time;
      }
    },
    getCurrentDateIndex: function() {
      if (this.eventTimes.length > 0) {
        let index = 0;
        const mapEventTimes = this.eventTimes.map(t => `2020/${t}`);
        for (const item of mapEventTimes) {
          const time = Date.parse(item);
          const currentTime = new Date().getTime();
          if (currentTime < time) {
            if (this.item.stock === 0) {
              index += 1;
            }
            break;
          } else {
            if (!this.peekEventTimes(mapEventTimes, index)) {
              if (this.item.stock > 0) {
                this.waitForEvent = false;
                break;
              }
            }
            index += 1;
          }
        }
        if (index > this.eventTimes.length - 1) {
          index = this.eventTimes.length - 1;
        }
        this.currentEventIndex = index;
        this.sliceEventTimes();
      } else {
        this.currentEventIndex = 0;
      }
    },
    sliceEventTimes() {
      if (this.eventTimes.length > 0) {
        const index = this.currentEventIndex;
        const length = this.eventTimes.length;
        if (index + 4 <= length - 1) {
          this.currentEventIndex = 0;
          this.eventTimes = this.eventTimes.slice(index, index + 4);
        } else {
          const pad = index + 4 - (length - 1);
          const newIndex = index - pad;
          this.currentEventIndex = pad;
          this.eventTimes = this.eventTimes.slice(newIndex, newIndex + 4);
        }
      } else {
        return this.eventTimes;
      }
    },
    getCountdownText: function() {
      let that = this
      if (this.waitForEvent && this.eventTimes.length > 0) {   
        let timeData = "2020/" + that.eventTimes[that.currentEventIndex];

        let currentTimedata = new Date(timeData);
        let time = moment(currentTimedata).valueOf();

        const newCurrentTime = new Date()
        const currentTime = moment(newCurrentTime).valueOf();
        let countdown = time - currentTime;
        const hour = Math.floor(countdown / 3600000);
        countdown = countdown % 3600000;
        const min = Math.floor(countdown / 60000);
        countdown = countdown % 60000;
        const second = Math.floor(countdown / 1000).toFixed(0);

        this.countdownText = `距离开始还剩 <span>${hour}</span> 小时 <span>${min}</span> 分 <span>${second}</span> 秒`;
      } else {
        this.countdownText = "正在抢购中";
      }
    },
    transformTime(t){
        //利用moment工具生成date对象
        let date = moment(t).toDate()
        //变成秒级时间戳
        console.log('date1:'+ date)
        return moment(date).valueOf()
    },
    splitTime0: function(time) {
      return time.split(" ")[0];
    },
    splitTime1: function(time) {
      return time.split(" ")[1];
    },
    setCountdownTimer: function() {
      if (!this.countdownTimer) {
        const self = this;
        this.countdownTimer = setInterval(() => {
          self.getCountdownText();
          if (!(self.waitForEvent && self.eventTimes.length > 0)) {
            clearInterval(self.countdownTimer);
            self.countdownTimer = undefined;
          }
        }, 1000);
      }
    },
    setRefreshTimer: function() {
      if (!this.refreshTimer) {
        const self = this;
        this.refreshTimer = setInterval(() => {
          self.init();
        }, 10000);
      }
    },
    init: function() {
      this.getItem();
      this.getInvitations();
      this.getRecentRegisters();
      this.getCoupans();
      if (!this.refreshTimer) {
        this.setRefreshTimer();
      }
    },
    onShare() {
      // 传入后台签名URL，域名+当前分享页面路径
      const _WXurl = window.location.origin + window.location.pathname;

      const wx = window.wx;

      //向后台发起请求获得config配置参数
      api
        .wxShare(_WXurl)
        .then(data => {
          if (data) {
            // 请求接口成功后，
            // 配置config
            wx.config({
              // 开启调试模式时,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              debug: false,
              // 后台返回之前获取的appId
              appId: data.appid,
              // 必填，生成签名的时间戳
              timestamp: data.timestamp,
              // 必填，生成签名的随机串
              nonceStr: data.nonceStr,
              // 必填，签名，见附录1
              signature: data.signature,
              // 必填，需要使用的JS接口列表，所有JS接口列表见附录3
              jsApiList: [
                "checkJsApi",
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "hideMenuItems"
              ]
            });

            // 微信检查接口列表
            wx.checkJsApi({
              jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "hideMenuItems"
              ], // 需要检测的JS接口列表
              success: function(res) {
                console.log(res);
              }
            });

            // 隐藏微信右上角弹出菜单中部分功能按钮
            wx.hideMenuItems({
              menuList: [
                "menuItem:share:qq",
                "menuItem:share:QZone",
                "menuItem:share:weiboApp",
                "menuItem:copyUrl"
              ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录4
              success: function(res) {
                console.log(res);
              }
            });

            // 页面加载完成后用户就有可能调用微信的分享，所以当页面ready 完后就加载
            wx.ready(function() {
              const title = "急！就差你了，快来帮我抢榴莲~";
              const desc = "点一下助力得100元无门槛优惠券";
              const imgUrl =
                "https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/webp/ABFXNTHK12345789_1594282045.webp";
              const recomendId = getUserInfo().uid;

              // 定义分享链接,使用encodeURIComponent对传入参数编码，防止在iOS中传入参数编码问题
              // 此处示例传递单个参数
              const _shareLink =
                window.location.origin +
                "/#?" +
                encodeURIComponent("recomend_id") +
                "=" +
                encodeURIComponent(recomendId);
              // alert(_shareLink);
              // 分享到朋友圈
              wx.onMenuShareTimeline({
                // 分享标题
                title: title,
                // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                link: _shareLink,
                // 分享图标
                imgUrl: imgUrl,
                // 用户确认分享后执行的回调函数
                success: function() {
                  console.log("分享回调函数");
                  console.log("shareLink= " + _shareLink);
                  // alert('分享回成功调函数');
                },
                // 用户取消分享后执行的回调函数
                cancel: function() {
                  console.log("取消分享回调函数");
                  // alert('取消分享回调函数');
                }
              });

              // 分享好友
              wx.onMenuShareAppMessage({
                // 分享标题
                title: title,
                // 分享描述
                desc: desc,
                // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                link: _shareLink,
                // 分享图标
                imgUrl: imgUrl,
                // 用户确认分享后执行的回调函数
                success: function() {
                  console.log("分享好友回调函数");
                  console.log("shareLink= " + _shareLink);
                  // alert('分享回好友调函数');
                },
                // 用户取消分享后执行的回调函数
                cancel: function() {
                  console.log("取消分享好友调函数");
                  // alert('取消分享回调函数');
                  // console.log('分享回好友调函数');
                }
              });
            });
            // 微信预加载失败回调
            wx.error(function(res) {
              console.log(res);
              // alert('失败');
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  
  },
  computed: {
    getItemName: function() {
      if (this.item) {
        return this.item.title;
      } else {
        return "马来西亚猫山王榴莲1.1～1.3kg";
      }
    },
    getStock: function() {
      if (this.item) {
        return this.item.stock;
      } else {
        return 0;
      }
    },
    getPrecent: function() {
      if (this.item) {
        return Math.round((this.item.stock / 500)*100);
      } else {
        return 100;
      }
    },
    getRecommendName: function() {
      if (this.recommendName.length <= 4) {
        return this.recommendName;
      } else {
        return this.recommendName.slice(0, 3) + "...";
      }
    }
  },
  created: function() {
    const self = this;
    const recomendId = getRecomendId();
    console.log(recomendId)
    if(recomendId=='123') {
      this.showPop == false
    }else {
      this.showPop == true
    }
    if (!recomendId) {
      this.closePopFade();
    }

    function init() {
      const token = getToken();
      console.log(token)
      if (token) {
         var ua = window.navigator.userAgent.toLowerCase();
        if (enter.getFirstTimeEnter()) {
          self.firstTimeEnter = true;
          enter.setEnter();
          const userInfo = getUserInfo();
          if (userInfo.recommend_name) {
            self.recommendName = userInfo.recommend_name;
          }
          if (
            userInfo.login_status != undefined &&
            userInfo.login_status === 1
          ) {
            self.closePopFade();
            // alert("您已是老用户，快去参加活动吧");
          }
        } else {
          self.closePopFade();
        }
        self.hasToken = true;
        self.init();
        self.onShare();
      } else {
        // if (!recomendId) {
          self.toLogin();
        // }
      }
    
    }
    if (bridge.hasBridge()) {
      bridge.getUserInfo(init);
    } else {
      init();
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      
      } else {
        self.$router.push("/tips");
      }
    }
  },
  beforeDestroy() {
    let self = this
    if( self.refreshTimer ) {
　　　　clearInterval( self.refreshTimer ); 
　　 }
    if( self.countdownTimer ) {
      clearInterval( self.countdownTimer );
    }
  }
};
</script>
