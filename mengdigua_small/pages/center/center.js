// pages/center/center.js
const app = getApp()
const http = require('../../utils/http.js')
const common = require('../../utils/common.js')
const serveList = require('centerListConfig.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.totalHeight,
    totalHeight: app.globalData.totalHeight,
    userInfo: '',
    noticeData: '',
    yuCouponNum: '',
    isShowModal: false,
    orderNum: '',
    growData: '',
    showMessage: false,
    isBindPhone: '',
    tabbar: {},
    platformPhone: "", //平台电话
    sharePath: "",
    userBg: false,
    firstIn: false,
    serveList:serveList,
    handInfo:'',
    userInfo:app.globalData.userInfo,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.loadTheme(this)
    wx.hideTabBar();
    this.setData({
      isDistr: app.globalData.isDistr,
      is_show_shop: app.globalData.is_show_shop
    })
    console.log('shoop',app.globalData.is_show_shop)
    this.getPhone()
    if(app.globalData.userInfo.is_hand == 1){
      this.getHandInfo();

    }
  },
  getHandInfo() {
    let self = this;
    http.HttpRequst(false, '/hand/hand-api/info', 2, '', {
      token: app.globalData.token
    },
      'POST', false,
      function (res) {
        if (res.data.errcode == 0) {
          self.setData({
            handInfo: res.data.data,
          })
          app.globalData.handInfo = res.data.data;
        }
      }
    )
  },
  // 授权获取头像
  authorization() {
    setTimeout(() => {
      this.getUser();
    }, 500)
  },
  toAuth(){
    this.setData({
      isShowModal:true,
    })
  },
  // 获取用户信息
  getUser: function() {
    let self = this;
    http.HttpRequst(false, '/member/user-api/info', 2, '', {
        token: app.globalData.token,
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            userInfo: res.data.data,
            isBindPhone: app.globalData.isBindPhone,
            isShowModal:app.globalData.showModal,
            isAuth:app.globalData.showModal
          })
          app.globalData.userInfo = res.data.data;
          if (app.globalData.role != self.data.userInfo.role || !self.data.firstIn) {
            if (self.data.userInfo.role == 0) {
              self.setData({
                tabbar: app.globalData.tabBar2
              })
            } else {
              self.setData({
                tabbar: app.globalData.tabBar
              })
            }
            self.setData({
              firstIn: true,
            })
            app.editTabbar(self.data.userInfo.role, app.globalData.isDistr);
          }
          // 判断是否绑定过手机 true未绑定 false绑定过
          // if (self.data.isBindPhone === true) {

          // } else if (self.data.isBindPhone === false) {
          //   // 已绑定手机
          //   self.setData({
          //     isShowModal: app.globalData.showModal,
          //   })
          // }
          wx.stopPullDownRefresh();
          self.getOrderNum();
          self.getNotice();
          self.getYuCoupon();
          self.getGrow();
          self.getServicekeFu();
        }
      }
    )
  },
  // 获取成长值
  getGrow() {
    let self = this;
    http.HttpRequst(false, '/member/growth-api/get-info', 2, '', {
        token: app.globalData.token,
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            growData: res.data.data,
          })
        }
      }
    )
  },
  // 获取积分和优惠券数量
  getYuCoupon() {
    let self = this;
    http.HttpRequst(false, '/member/user-coin-api/get-my-coin', 2, '', {
        token: app.globalData.token,
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            yuCouponNum: res.data.data,
          })
        }
      }
    )
  },
  // 获取订单角标
  getOrderNum() {
    let self = this;
    http.HttpRequst(false, '/order/order-api/get-count', 2, '', {
        token: app.globalData.token,
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            orderNum: res.data.data,
          })
        }
      }
    )
  },
  // 跳转个人信息页面
  jumpUserInfo: function() {
    wx.navigateTo({
      url: '/pages/center/userInfo/userInfo',
    })
  },
  // 跳转站内信
  jumpMail: function() {
    wx.navigateTo({
      url: '/pages/center/message/message'
    })
  },
  // 跳转设置
  jumpSeting: function() {
    wx.navigateTo({
      url: '/pages/center/seting/seting'
    })
  },
  // 跳转优惠券
  jumpMycoupon: function() {
    wx.navigateTo({
      url: '/pages/center/myCoupon/myCoupon'
    })
  },
  // 跳转拼团列表
  jumpList: function(e) {
    wx.navigateTo({
      url: '/pages/center/groupOrder/groupOrder'
    })
  },
  // 跳转全部订单
  jumpAll: function() {
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },
  // 跳转相应订单
  jumpOrder: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order/order?tabIndex=' + id
    })
  },
  // 跳转退货退款
  jumpRefund: function() {
    wx.navigateTo({
      url: '/pages/center/refund/refund'
    })
  },
  // 跳转我的成长值
  jumpGrow() {
    wx.navigateTo({
      url: '/pages/center/myGrow/myGrow'
    })
  },
  // 跳转地址管理
  jumpAddress: function() {
    wx.navigateTo({
      url: '/pages/center/seting/address/address'
    })
  },
  // 我的关注
  jumpCollection: function() {
    wx.navigateTo({
      url: '/pages/center/myCollection/myCollection'
    })
  },
  // 获取站内信
  getNotice() {
    let self = this;
    http.HttpRequst(false, '/notice/notice-api/get-num', 2, '', {
        token: app.globalData.token,
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            noticeData: res.data.data
          })
          if (res.data.data.all_no_readnum != 0) {
            self.setData({
              showMessage: true
            })
          } else {
            self.setData({
              showMessage: false
            })
          }
        }
      }
    )
  },
  // 跳转我的钱包
  jumpWallet() {
    wx.navigateTo({
      url: '/pages/center/myWallet/myWallet'
    })
  },
  // 获取平台电话
  getPhone() {
    let self = this
    http.HttpRequst(false, '/base/intel-api/info', 2, '', {},
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            platformPhone: res.data.data.liemi_intel_tel
          })
        }
      }
    )
  },
  // 拨打电话
  makePhone() {
    let self = this;
    wx.makePhoneCall({
      phoneNumber: self.data.platformPhone // 仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    common.handleShareUrl(this, "pages/center/center")
    this.getUser();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getUser();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  // 去設置支付密碼
  goSerect: function() {
    wx.navigateTo({
      url: '/pages/center/userInfo/setPayPassword/setPayPassword'
    })
  },
  // 0平台
  getServicekeFu() {
    let self = this
    common.servicekeFu(self, "", "", 0, function(res) {
      self.setData({
        params: JSON.stringify(res.param),
        transferAction: res.transferAction
      })
    })
  },
  goDetail(e) {
    
    app.pushRoute(e)
  },
  copy(e){
    console.log(e)
  },
  jumpAccount(){
    wx.navigateTo({
      url: '/pages/center/myAccount/myAccount',
    })
  }
})