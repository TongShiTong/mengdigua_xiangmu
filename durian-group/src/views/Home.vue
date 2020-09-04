<template>
  <div class="home-page">
    <div>
      <!-- <div class="top-bar">活动专题</div> -->
      <div class="header">
        <img src="@/assets/group/banner.png"/>
        <!-- <div class="rules" @click="toRule">规则</div> -->
        <div class="sp_title">山猫主D197猫山王榴莲</div>
        <div class="group_scss">已有{{makeGroupNum}}人拼团成功</div>
      </div>

      <div class="buy_box">
        <div class="alone_buy" @click="toWeixin">
          <div class="base_money"><span style="font-size:0.24rem">￥</span>239</div>
          <div>单独购买</div>
        </div>
        <div class="make_group_box">
          <div class="make_group" @click="toWeixin158">
            <div class="base_money_group"><span style="font-size:0.24rem;font-weight:400;">￥</span>158</div>
            <div>发起拼团</div>
          </div>
          <div class="outo_group">
            <img src="@/assets/group/xuanzhong.png" alt="">
            <div>自动成团</div>
          </div>
        </div>
      </div>
      <div class="doing_group">
        <div class="doing_group_top">
          正在拼团...
        </div>
        <div class="xh_group">
          <van-swipe style="height: 100%;width:100%" vertical :autoplay="5000" :show-indicators="false" :touchable="false">
            <van-swipe-item v-for="(group,index) in groupListZu" :key="index">
              <div class="user_group_box" v-for="(item,i) in group" :key="i">
                <div class="user_group">
                  <div class="user-avatar">
                    <img :src="item.avatar" alt="">
                  </div>
                  <div>
                    <div class="user_nickname">{{item.nickname}}</div>
                    <div>还差<span class="num_group">1</span>人拼团成功</div>
                  </div>
                </div>
                <div class="yqp_group" @click="toWeixin158">一起拼</div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        
      </div>

      <div class="title-img">
        <img src="@/assets/bargain/shaidan.png" alt="">
      </div>

      <div class="comment">
        <van-swipe style="height: 100%;width:100%;overflow: hidden;" vertical :autoplay="5000" :show-indicators="false" :touchable="false">
            <van-swipe-item style="overflow: hidden;" v-for="(item,index) in commentDataList" :key="index">
              <div class="info-user">
                <div class="avatar-info">
                  <div class="avatar"><img :src="item.u.head_url" alt=""></div>
                  <div>
                    <div class="info-name">{{item.u.nickname}}</div>
                    <div style="height:0.4rem;position: relative;">
                      <van-rate style="position: absolute;" v-model="item.level" :size="18" readonly allow-half icon="http://t22.mengdigua.com/1.png" void-icon="http://t22.mengdigua.com/2.png"/>
                    </div>
                  </div>
                </div>
                <div class="info-time">{{item.create_time}}</div>
              </div>
              <div class="info-content">
                {{item.content}}
              </div>
              <div class="pl-box">
                <!-- <div class="pl-img" v-for="(it,index1) in item.meCommetImgs" :key="index1" @click="imgPreview(index)"><img :src="it" alt=""></div> -->
                <div class="pl-img" v-for="(it,index1) in item.meCommetImgs" :key="index1"><img :src="it" alt=""></div>
              </div>
            </van-swipe-item>
        </van-swipe>
        
        
      </div>

      <div class="title-img">
        <img src="@/assets/bargain/spdetail.png" alt="">
      </div>

      <div class="detail-box1">
        <div class="pic1">
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
  
    <!-- 当弹窗出现时，向body添加class名为hidden  解决弹窗出现时，页面滚动问题 -->
    <div class="pop-fade" v-show="popFade">

      <!-- 拼团成功弹窗 -->
      <div class="scss-bg" @click="closePopFade">

        <div><img class="makegavat" :src="head_url" alt="">
        <img class="makegavat1" :src="head_url1" alt="">
        </div>
        
      </div>
      
    </div>
    <!-- <div class="pop-fade" v-show="showWXShare" @click="closeWXSharePopFade">
       
      <div class="pop-share pop-wrap">
        <div class="pic">
          <img src="@/assets/share.png" />
        </div>
      </div>
    </div> -->
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

      commentDataList:[], //评论列表
      groupList:[
        
      ],//拼团列表
      timeNum: null,
      makeGroupNum: '',
      isGroupPop: 0,
      head_url: '',
      head_url1: '',
      groupListZu:[],
      avatar: [
        'https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/FWXMNHK123456789_1594281598.png',
        'https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/ABFXZTHK01235689_1594281672.png',
        'https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/AFWZNTHK12456789_1594281721.png',
        'https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/ABWZMNHK01346789_1594281742.png',
        'https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/ABFWZMTH01345679_1594281754.png',
        'https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/BWXZNTHK01234679_1594281770.png',
        'https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/ABFXMTHK01345789_1594281785.png',
        'https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/ABXZMNTHK0124579_1594281798.png',
        'https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/ABFZMNTH01234589_1594281811.png',
        'https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/AFWXMNHK01456789_1594281659.png'
      ],//头像
      item: undefined,
      item1: undefined,
      firstTimeEnter: false,
      hasToken: false,
      popFade: false,
      showPop: false,
      showWXShare: false,
      recommendName: "",
      // item: undefined,
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

    // 获取拼团人数
    groupNum() {
      let self = this
      api.groupNum().then(data => {
        self.makeGroupNum = data
        // console.log('123',data)
      });
    },
    // 是否弹框
    groupPop() {
      let self = this
      api.groupPop().then(data => {
        self.isGroupPop = data.status
        if(self.isGroupPop==2) {
          self.popFade = true
        }
        self.head_url = data.head_url.head_url
        console.log('123',data)
      });
    },
    // 评论
    commentList: function() {
      const self = this;
      api.commentList().then(data => { 
        for(let i=0;i<data.list.length;i++) {
          data.list[i].level = Number(data.list[i].level)
          data.list[i].create_time = data.list[i].create_time.slice(0,-9)
          if(data.list[i].u.nickname.length>2) {
            let str = data.list[i].u.nickname
            let num = str.length;
            let a = str[0];
            for(let i=0;i<num-2;i++) {
              a+='*'
            }
            a+=str[num-1]
            data.list[i].u.nickname = a
          }else {
            let str = data.list[i].u.nickname
            data.list[i].u.nickname = data.list[i].u.nickname.replace(str.substr(1,1),'*')
          }
        }
        self.commentDataList = data.list
      });
    },
    // 跳转239详情页
    toWeixin() {
      if (bridge.hasBridge()) {
        bridge.startGoodsDetails(this.item.shop_id, this.item.item_id);
      } else {
        // this.$router.push("/weixin");
        location.href = 'http://d.mengdigua.com/'
      }
    },
    // 跳转158详情页
    toWeixin158() {
      if (bridge.hasBridge()) {
        bridge.startGoodsDetails(this.item1.shop_id, this.item1.item_id);
      } else {
        // this.$router.push("/weixin");
        location.href = 'http://d.mengdigua.com/'
      }
    },
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
    // getItem() {
    //   const self = this;
    //   api.getItem(114584).then(data => {
    //     self.item = data;
    //     self.getEventTimes();
    //   });
    // },
    getItem() {
      const self = this;
      // api.getItem(118316).then(data => {
        // 239详情页
      api.getItem(118408).then(data => {
        self.item = data;
        // self.getEventTimes();
      });
      // api.getItem(114584).then(data => {
        // 158详情页
      api.getItem(118409).then(data => {
        self.item1 = data;
        // self.getEventTimes();
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
      // this.getInvitations();
      // this.getRecentRegisters();
      // this.getCoupans();
      // if (!this.refreshTimer) {
      //   this.setRefreshTimer();
      // }
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
    this.commentList();
    this.groupNum()
    this.groupPop()
    this.getItem();
    var index1 = Math.floor((Math.random()*this.avatar.length));
    this.head_url1 = this.avatar[index1]
    // this.onShare()
    // 随机生成汉字
    function getRandomChineseWord () {
      var _rsl = "";
      var _randomUniCode = Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16);
      eval("_rsl=" + '"\\u' + _randomUniCode + '"');
      return _rsl;
    }
    // 随机（1-6）个数字
    function rnd(n, m){
      var random = Math.floor(Math.random()*(m-n+1)+n);
      return random;
    }
    function star() {
      var star = ''
      for(let i=0;i<rnd(1, 6);i++) {
          star = star + "*"
      }
      return star;
    }
    
    for (let m=0;m<12;m++) {
      let obj = {}
      var index = Math.floor((Math.random()*this.avatar.length));
      obj.avatar = this.avatar[index]
      obj.nickname = getRandomChineseWord() + star() + getRandomChineseWord()
      this.groupList.push(obj)
    }
    for(var i=0;i<this.groupList.length;i+=3){
      this.groupListZu.push(this.groupList.slice(i,i+3));
    }
    this.timeNum = setInterval(()=>{
      self.groupNum()
      self.groupPop()
    },60000)

    const recomendId = getRecomendId();
    console.log(11,recomendId)
    // if (!recomendId) {
    //   this.closePopFade();
    // }

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
            // self.closePopFade();
            // alert("您已是老用户，快去参加活动吧");
          }
        } else {
          // self.closePopFade();
        }
        self.hasToken = true;
        self.init();
        // self.onShare();
      } else {
        // if (!recomendId) {
          self.toLogin();
        // }
      }
    
    }
    if (bridge.hasBridge()) {
      bridge.getUserInfo(init);
    } else {
      self.$router.push("/tips")
      // init();
      // var ua = window.navigator.userAgent.toLowerCase();
      // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      
      // } else {
      //   // self.$router.push("/tips");
      // }
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
    if( self.timeNum ) {
      clearInterval( self.timeNum );
    }
    
  }
};
</script>
<style scoped>
  .sp_title {
    position: absolute;
    bottom: 0.12rem;
    left: 50%;
    transform: translate(-50%, 0);
    width: 5.76rem;
    height: 0.6rem;
    font-size: 0.44rem;
    color: #B21112;
    font-weight: bold;
    text-align: center;
    line-height: 0.6rem;
    background: url(../assets/group/zhuangshi.png) no-repeat;
    background-size: 100% 100%;
  }
  .group_scss {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 3.42rem;
    height: 0.58rem;
    background: linear-gradient(270deg,rgba(255,185,135,1) 0%,rgba(255,132,134,1) 100%);
    border-bottom-left-radius: 0.29rem;
    border-bottom-right-radius: 0.29rem;
    font-size: 0.28rem;
    color: #ffffff;
    line-height: 0.58rem;
    text-align: center;
  }
  .buy_box {
    margin: 0.18rem 0.74rem 0.4rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.28rem;
    color: #ffffff;
    line-height: 0.4rem;
  }
  .alone_buy {
    width: 2.34rem;
    height: 0.86rem;
    background: #FF4E50;
    border-radius: 0.5rem;
    text-align: center;
    padding-top: 0.06rem;
    box-sizing: border-box;

  }
  .base_money {
    line-height: 0.34rem;
  }
  .make_group_box {
    width: 3.36rem;
    text-align: center;
  }
  .make_group {
    width: 3.36rem;
    height: 0.86rem;
    background: url(../assets/group/btn.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
  }
  .base_money_group {
    font-size: 0.32rem;
    font-weight: 600;
    line-height: 0.34rem;
    padding-top: 0.06rem;
  }
  .outo_group {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.26rem;
    color: #747576;
    letter-spacing: 2px;
    margin-top: 0.12rem;
  }
  .outo_group img {
    width: 0.28rem;
    height: 0.28rem;
  }
  .doing_group {
    margin: 0 auto 0.4rem;
    width: 6.94rem;
    box-shadow:0px 10px 20px 0px rgba(254,94,41,0.2);
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    overflow: hidden;
  }
  .doing_group_top {
    width: 100%;
    height: 1.2rem;
    background: url(../assets/group/bg001.png) no-repeat;
    background-size: 100% 100%;
    font-size: 0.44rem;
    color: #ffffff;
    text-align: center;
    line-height: 1.2rem;
  }
  .xh_group {
    width: 100%;
    height: 4.24rem;
    background: #FFFAF1;
    padding: 0.16rem 0.3rem 0.48rem 0.48rem;
    box-sizing: border-box;
  }
  .user_group_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.32rem;
  }
  .user_group {
    display: flex;
    align-items: center;
    font-size: 0.24rem;
    color: #666666;
  }
  .user-avatar {
    width: 0.88rem;
    height: 0.88rem;
    background: #FFDBC8;
    border-radius: 50%;
    margin-right: 0.16rem;
    overflow: hidden;
  }
  .user-avatar img {
    width: 100%;
    height: 100%;
  }
  .user_nickname {
    font-size: 0.28rem;
    color: #222222;
    margin-bottom: 0.06rem;
    font-weight: bold;
  }
  .num_group {
    color: #E90000;
    font-weight: bold;
    margin: 0 0.06rem;
  }
  .yqp_group {
    width: 1.76rem;
    height: 0.88rem;
    background: url(../assets/group/yiqipin.png) no-repeat;
    background-size: 100% 100%;
    font-size: 0.28rem;
    font-weight: 600;
    color: #ffffff;
    line-height: 0.88rem;
    text-align: center;
  }
  .comment {
    width: 6.94rem;
    height: 4.6rem;
    border-radius: 0.2rem;
    background: #FFFAF1;
    margin: 0 auto 0.4rem;
    padding: 0.4rem 0.48rem 0.36rem;
    box-shadow:0px 10px 20px 0px rgba(254,94,41,0.2);
    box-sizing: border-box;
  }
  .info-user {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 0.88rem;
    margin-bottom: 0.24rem;
  }
  .avatar-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .avatar {
    width: 0.88rem;
    height: 0.88rem;
    border-radius: 50%;
    /* background: #FFDBC8; */
    margin-right: 0.16rem;
    overflow: hidden;
  }
  .avatar img {
    width: 100%;
    height: 100%;
  }
  .info-name {
    font-weight: bold;
    font-size: 0.28rem;
    color: #222222;
  }
  .van-rate__item:not(:last-child) {
    padding-right: 0;
  }
  .info-time {
    font-size: 0.2rem;
    color: #999999;
    padding-bottom: 0.08rem;
  }
  .info-content {
    font-size: 0.24rem;
    font-weight: 400;
    color: #222222;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .pl-box {
    display: flex;
    align-items: center;
  }
  .pl-img {
    width: 1.84rem;
    height:1.84rem;
    margin: 0.2rem 0.22rem 0.2rem 0;
    background: #E8E8E8;
    border-radius: 0.12rem;
    overflow: hidden;
  }
  .pl-img img {
    width: 100%;
    height: 100%;
  }
  .pl-img:last-child {
    margin-right: 0;
  }
  .detail-box1{
    width: 6.94rem;
    margin: 0 auto;
    box-shadow:0px 10px 20px 0px rgba(255,233,196,1);
    border-radius:0.2rem;
    overflow: hidden;
  }
  .detail-box1 img {
    width: 100%;
    display: block;
  }
  .scss-bg {
    width: 100%;
    height: 10.3rem;
    background: url(../assets/group/bgzlcg.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
   .makegavat {
      position: absolute;
      top: 0.42rem;
      border-radius: 50%;
      left: 2.2rem;
      width: 1.8rem;
      z-index: 2;
  }
  .makegavat1 {
      position: absolute;
      top: 0.42rem;
      border-radius: 50%;
      left: 3.52rem;
      width: 1.8rem;
      z-index: 1;
  }
  .title-img {
    width: 6.94rem;
    height: 0.9rem;
    margin: 0 auto 0.2rem;
  }
  .title-img img {
    width: 100%;
    height: 100%;
  }
</style>
