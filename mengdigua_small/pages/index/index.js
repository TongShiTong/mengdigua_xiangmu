//获取应用实例
const app = getApp()
const http = require('../../utils/http.js')
const common = require('../../utils/common.js')

Page({

  /**
   * 页面的初始数据
   */

  data: {
    loadOnce:false,//加载一次
    theme: false,
    showType: false, //默认不显示
    indicatorDots: true,
    showNoRead: false,
    hotSize: 0,
    newSize: 0,
    comSize: 0,
    cuscomSize: [],
    hotData: '',
    newData: '',
    comData: '',
    cuscomData: '',
    tab: '',
    tabIndex: 0,
    skillData: '',
    skillIndex: null,
    skillContentIndex: 0,
    skillCode: '',
    listData: '',
    yesterdayData: '',
    tomorrowData: '',
    userInfo: '',
    superUser: '',
    // uid: '',
    shareCode: '',
    autoplay: true,
    indexModel: '',
    showIndexModel: false,
    scene: '',
    launchOptions: '',
    // showShare: false,
    shareImg: '',
    skillTop: '',
    toView: '',
    isShowModal: false,
    tabbar: {},
    isIphoneX: false, //
    couponList: [],
    barHeight: app.globalData.totalHeight,
    _ratio: app.globalData._ratio2,
    pageHeight: app.globalData.pageHeight,
    sharePath: "", //分享链接
    firstIn: false, //第一次渲染Tabbar
    spikeFixed: false, //秒杀头部是否固定
    groupIndex: 0,
    skill_start_page: 0, //分页
    start_page: 0, //分页
    groupId: "", //场次id,
    groupList: false, //拼团列表
    newList:null,
  },
  onPageScroll: function () {
    // 页面滚动时执行
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '首页',
      path: this.data.sharePath
    }
  },
  onPageScroll: function(e) {
    if (e.scrollTop >= this.data.pageHeight && !this.data.spikeFixed) {
      this.setData({
        spikeFixed: true,
      })
    } else if (e.scrollTop < this.data.pageHeight && this.data.spikeFixed) {
      this.setData({
        spikeFixed: false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    this.isShowSend();
    this.setData({
      isIphoneX: app.globalData.systemX,
      userInfo: app.globalData.userInfo,
      isDistr: app.globalData.isDistr
    })
    // 获取场景值
    if (options.scene) {
      this.setData({
        scene: options.scene,
        launchOptions: app.globalData.launchOptions
      })
      let scene = decodeURIComponent(options.scene);
      scene = this.hrefObj(scene);
      this.setData({
        // uid: scene.uid
        shareCode: scene.share_code
      })
      this.getSuperUser();
    } else if (app.globalData.launchOptions.query.scene) {
      let scene = decodeURIComponent(app.globalData.launchOptions.query.scene);
      scene = this.hrefObj(scene);
      this.setData({
        scene: scene,
        launchOptions: app.globalData.launchOptions,
        // uid: scene.uid
        shareCode: scene.share_code
      })
      this.getSuperUser();
    }

  
    this.floorConfig();


  },
  onShow: function() {
    // 检测主题色
    common.loadTheme(this)
    if (app.globalData.setRemined) {
      app.globalData.setRemined = !app.globalData.setRemined
      this.setData({
        groupList: false,
        start_page: 0,
        groupId: app.globalData.groupId
      })
      this.getGroupList()
    }
    this.setData({
      isShowModal: app.globalData.showModal,
    })
    wx.hideTabBar();
    wx.hideNavigationBarLoading();
    if (app.globalData.groupRemind!='null'){
      this.setData({
        newList: app.globalData.groupRemind
      })
    }
    this.getList()
  },
  // 解析小程序的url
  hrefObj(url) {
    var localarr = url.split('&');
    var tempObj = {};
    for (var i = 0; i < localarr.length; i++) {
      tempObj[localarr[i].split('=')[0]] = localarr[i].split('=')[1];
    }
    return tempObj;
  },
  // 是否需要弹窗
  isShowSend() {
    let self = this;
    try {
      wx.getStorage({
        key: 'time',
        success(res) {
          let storageTime = res.data;
          let nowTime = new Date().getTime(); // 当前时间
          if (nowTime >= storageTime) {
            self.getModal();
          }
        },
        fail(res) {
          self.getModal();
        }
      })
    } catch (e) {

    }
  },
  // 获取上级信息
  getSuperUser() {
    let self = this;
    if (self.data.shareCode) {
      http.HttpRequst(false, '/hand/fans-api/create-fans', 2, '', {
          token: app.globalData.token,
          share_code: self.data.shareCode
        },
        'POST',
        false,
        function(res) {
          if (res.data.errcode == 0) {
            self.setData({
              superUser: res.data.data,
            })
            console.log('绑定成功')
            // if (app.globalData.launchOptions.query.scene) {

            // }else {
            //   self.fans();
            // }
          }
        }
      )
    }
  },
  // 生成上下级 粉丝
  fans() {
    let self = this;
    http.HttpRequst(false, '/hand/fans-api/create-fans-from-share', 2, '', {
        token: app.globalData.token,
        puid: self.data.uid
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          // console.log('绑定成功')
        }
      }
    )
  },
  // 楼层配置
  floorConfig() {
    let self = this;
    self.setData({
      floorShow:false,
    })
    http.HttpRequst(false, '/floor/floor-api/get-use-position-list', 2, '', {
        token: app.globalData.token,
        introduction: 1,
        shop_id: 0
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          res.data.data.forEach((x, index) => {
            if (index == self.data.tabIndex) {
              x.loading = true
              x.show = true
            } else {
              x.loading = false
              x.show = false
            }
          })
          self.setData({
            tab: res.data.data,
            floorShow: true,

          })
          self.getCouponList(); //获取优惠券
          self.getGroupTimes(); //拼图获取场地
          // self.getFloor(self.data.tab[self.data.tabIndex].position_code);
          // self.skill();
          // self.yesterday();
        }
      }
    )
  },
  // 获取弹窗
  getModal() {
    let self = this;
    http.HttpRequst(false, '/hand/shop-conf-api/get-info', 2, '', {

      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            indexModel: res.data.data
          })
          if (res.data.data != '') {
            self.setData({
              showIndexModel: true
            })
          } else {
            self.setData({
              showIndexModel: false
            })
          }
          // 本地缓存请求时间
          let date = new Date().setHours(24, 0, 0, 0); // 当天的第二天0点
          try {
            wx.setStorageSync('time', date)
          } catch (e) {}
        }
      }
    )
  },
  // 获取秒杀
  skill() {
    let self = this;
    let date = new Date();
    let nowTime = date.getTime();
    http.HttpRequst(false, '/item/seckill-api/seckill-scene-list', 2, '', {
        token: app.globalData.token,
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          for (let i = 0; i < res.data.data.list.length; i++) {
            if (nowTime < new Date(res.data.data.list[i].start_time.replace(/-/g, "/")).getTime()) {
              res.data.data.list[i].status = 0; // 未开始
            } else if (new Date(res.data.data.list[i].start_time.replace(/-/g, "/")).getTime() <= nowTime && nowTime <= new Date(res.data.data.list[i].end_time.replace(/-/g, "/")).getTime()) {
              res.data.data.list[i].status = 1; // 进行中
            } else if (nowTime > new Date(res.data.data.list[i].end_time.replace(/-/g, "/")).getTime()) {
              res.data.data.list[i].status = 2; // 已结束
            }
          }
          console.log(res.data.data)
          self.setData({
            skillData: res.data.data
          })
        }
      }
    )
  },
  // 选择秒杀的场次
  selectSkill(e) {
    let index = e.currentTarget.dataset.index;
    let code = e.currentTarget.dataset.code;
    this.setData({
      skillIndex: index,
      skillCode: code,
      skillContentIndex: null,
      tomorrowData: 0,
      toView: 'skillView',
      skill_start_page: 0,
    })
    this.getSkillContent(this.data.skillCode)
  },
  // 选择秒杀内容
  slectSkillContent(e) {
    let index = e.currentTarget.dataset.index;
    if (index == this.data.skillContentIndex) {
      return
    } else {
      if (index == 1) {
        if (this.data.tomorrowData == '') {
          this.tomorrow();
        }
      } else if (index == 0) {
        if (this.data.yesterdayData == '') {
          this.yesterday();
        }
      }
    }
    this.setData({
      skillContentIndex: index,
      skillIndex: null,
      tomorrowData: 0,
      toView: 'skillView',
    })
  },
  // 秒杀场次列表
  getSkillContent(code) {
    let self = this;
    let date = new Date();
    let nowTime = date.getTime();
    http.HttpRequst(false, '/item/seckill-api/seckill-item-list', 2, '', {
        token: app.globalData.token,
        start_page: self.data.skill_start_page,
        pages: 9999,
        seckill_scene_id: code
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          for (let i = 0; i < res.data.data.list.length; i++) {
            if (nowTime < new Date(res.data.data.list[i].start_time.replace(/-/g, "/")).getTime()) {
              res.data.data.list[i].status = 0; // 未开始
            } else if (new Date(res.data.data.list[i].start_time.replace(/-/g, "/")).getTime() <= nowTime && nowTime <= new Date(res.data.data.list[i].end_time.replace(/-/g, "/")).getTime()) {
              res.data.data.list[i].status = 1; // 进行中
            } else if (nowTime > new Date(res.data.data.list[i].end_time.replace(/-/g, "/")).getTime()) {
              res.data.data.list[i].status = 2; // 已结束
            }
          }
          self.setData({
            listData: res.data.data,
          })
        }
      }
    )
  },
  // 秒杀加载更多
  loadMoreSkill()  {
    let self = this;
    if (!self.data.listData) {
      return false
    }
    let pages = self.data.skill_start_page + 1;
    if (pages > Math.ceil(self.data.listData.total_pages / 10) - 1) {
      // console.log('加载完了')
      return false
    } else {
      self.setData({
        skill_start_page: pages
      })
      http.HttpRequst(false, '/item/seckill-api/seckill-item-list', 2, '', {
          token: app.globalData.token,
          start_page: self.data.skill_start_page,
          pages: 9999,
          seckill_scene_id: code
        },
        'POST',
        false,
        function(res) {
          if (res.data.errcode == 0) {
            for (let i = 0; i < res.data.data.list.length; i++) {
              if (nowTime < new Date(res.data.data.list[i].start_time.replace(/-/g, "/")).getTime()) {
                res.data.data.list[i].status = 0; // 未开始
              } else if (new Date(res.data.data.list[i].start_time.replace(/-/g, "/")).getTime() <= nowTime && nowTime <= new Date(res.data.data.list[i].end_time.replace(/-/g, "/")).getTime()) {
                res.data.data.list[i].status = 1; // 进行中
              } else if (nowTime > new Date(res.data.data.list[i].end_time.replace(/-/g, "/")).getTime()) {
                res.data.data.list[i].status = 2; // 已结束
              }
            }
            let listData = "listData.list";
            let list = res.data.data.list;
            let newListData = self.data.listData.list.concat(list);
            self.setData({
              [listData]: newListData
            })

          }
        }
      )

    }
  },



  getGroupTimes() {
    let self = this;
    http.HttpRequst(false, '/item/group-api/group-category-list', 2, '', {

      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            groundTimes: res.data.data
          })
          // let firstIndex =0
          // self.data.groundTimes.list.forEach((x,index)=>{
          //   x.goodStatus = common.compareTime(x.start_time, x.end_time)
          //   if (x.goodStatus == 1 && firstIndex == 0){
          //     self.setData({
          //       groupId: x.id
          //     })
          //     firstIndex =1
          //   }
          // })
          // 有场次 调取拼团
          if (self.data.groundTimes.list.length > 0) {
            self.setData({
              groupId: self.data.groundTimes.list[0].id
            })
            self.getGroupList()
          }

        }
      }
    )
  },
  // 秒杀场次列表
  getGroupContent(code) {
    let self = this;
    let date = new Date();
    let nowTime = date.getTime();
    http.HttpRequst(false, '/item/group-api/group-scene-list', 2, '', {
        token: app.globalData.token,
        start_page: 0,
        pages: 9999,
        seckill_scene_id: code
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          for (let i = 0; i < res.data.data.list.length; i++) {
            if (nowTime < new Date(res.data.data.list[i].start_time.replace(/-/g, "/")).getTime()) {
              res.data.data.list[i].status = 0; // 未开始
            } else if (new Date(res.data.data.list[i].start_time.replace(/-/g, "/")).getTime() <= nowTime && nowTime <= new Date(res.data.data.list[i].end_time.replace(/-/g, "/")).getTime()) {
              res.data.data.list[i].status = 1; // 进行中
            } else if (nowTime > new Date(res.data.data.list[i].end_time.replace(/-/g, "/")).getTime()) {
              res.data.data.list[i].status = 2; // 已结束
            }
          }
          self.setData({
            listData: res.data.data,
          })
        }
      }
    )
  },
  // 昨日精选
  yesterday() {
    let self = this;
    http.HttpRequst(false, '/item/seckill-api/seckill-item-list-last', 2, '', {
        token: app.globalData.token,
        start_page: 0,
        pages: 9999,
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            yesterdayData: res.data.data,
          })
        }
      }
    )
  },
  // 明日日精选
  tomorrow() {
    let self = this;
    http.HttpRequst(false, '/item/seckill-api/seckill-item-list-next', 2, '', {
        token: app.globalData.token,
        start_page: 0,
        pages: 9999,
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            tomorrowData: res.data.data,
          })
        }
      }
    )
  },
  // 获取楼层
  getFloor(code) {
    let self = this;
    http.HttpRequst(false, '/floor/floor-api/get-floor-info', 2, '', {
        token: app.globalData.token,
        use_position: code,
        shop_id: 0
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            floorData: res.data.data,
          })
          console.log('楼层',res.data.data)
          self.getList();
        }
      }
    )
  },
  // 选择tab
  selectTab(e) {
    let index = e.currentTarget.dataset.index;
    let code = e.currentTarget.dataset.code;
    if (index == this.data.tabIndex) {
      return
    } else {
      let beforeIndex = this.data.tabIndex
      let name1 = "tab[" + index + "].loading"
      let name2 = "tab[" + beforeIndex + "].show"
      let name3 = "tab[" + index + "].show"
      this.setData({
        [name1]: true,
        [name2]: false, // 隐藏
        [name3]: true, //显示
        tabIndex: index
      })
      // this.getFloor(code)
    }
  },
  // 跳转分类
  jumpClass() {
    wx.navigateTo({
      url: '/pages/class/class',
    })
  },
  // 获取热门商品
  getHotGood() {
    let self = this;
    http.HttpRequst(false, '/item/me-item-api/index', 2, '', {
        start_page: 0,
        token: app.globalData.token,
        pages: self.data.hotSize,
        is_hot: 1
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            hotData: res.data.data
          })
        }
      }
    )
  },
  // 获取新品商品
  getNewGood() {
    let self = this;
    http.HttpRequst(false, '/item/me-item-api/index', 2, '', {
        start_page: 0,
        token: app.globalData.token,
        pages: self.data.newSize,
        is_new: 1
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            newData: res.data.data
          })
        }
      }
    )
  },
  // 获取推荐店铺
  getComShop() {
    let self = this;
    http.HttpRequst(false, '/shop/shop-api/index', 2, '', {
        start_page: 0,
        token: app.globalData.token,
        pages: self.data.comSize,
        is_recommend: 2
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            comData: res.data.data
          })
        }
      }
    )
  },
  // 楼层自定义列表
  getCuscom(i) {
    let self = this;
    let name = "cuscomData[" + i + "]"
    http.HttpRequst(true, '/item/me-item-api/index', 2, '', {
      item_ids: self.data.cuscomSize,
      start_page: 0,
      token: app.globalData.token,
    },
      'POST',
      false,
      function (res) {
        if (res.data.errcode == 0) {
          self.setData({
            [name]: res.data.data
          })
        }
      }
    )
  },
  // 站内信未读数
  getList() {
    let self = this;
    http.HttpRequst(false, '/notice/notice-api/get-num', 2, '', {
        token: app.globalData.token,
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          if (res.data.data.all_no_readnum > 0) {
            self.setData({
              showNoRead: true
            })
          } else {
            self.setData({
              showNoRead: false
            })
          }
          self.setData({
            userInfo: app.globalData.userInfo,
          })
          if (app.globalData.role != self.data.userInfo.role || !self.data.firstIn) {
            // if (self.data.userInfo.role == 0) {
            //   console.log(self.data.isDistr)
            //   if (self.data.isDistr==1){
            //     self.setData({
            //       tabbar: app.globalData.tabBar2
            //     })
            //   }else{
            //     console.log(2)
            //     self.setData({
            //       tabbar: app.globalData.tabBar1
            //     })
            //   }
            // } else {
            //   self.setData({
            //     tabbar: app.globalData.tabBar
            //   })
            // }
            self.setData({
              firstIn: true,
            })
            app.editTabbar(self.data.userInfo.role, app.globalData.isDistr);
          }
          setTimeout(() => {
            self.setData({
              userInfo: app.globalData.userInfo,
              isShowModal: app.globalData.showModal
            })
            if (self.data.userInfo.role == 1) {
              self.getHandInfo()
            }
          }, 500)
          if (!self.data.loadOnce){
            self.setData({
              loadOnce:true
            })
          }
        }
      }
    )
  },
  // 跳转搜索
  jumpSerch: function() {
    wx.navigateTo({
      url: '/pages/class/serch/serch'
    })
  },
  // 点击楼层
  tapFloor: function(e) {
    let showType = e.currentTarget.dataset.type;
    let param = e.currentTarget.dataset.param;
    let title = e.currentTarget.dataset.title;
    if (param==""){
      return
    }
    // 商品：1，-- 分类对应列表：2，-- 店铺：3，-- 热门商品列表：4，-- 新品推荐列表：5，-- 推荐店铺列表：6，-- 富文本：7，-- 外链：8，-- 其他同一店铺下楼层的use_position：9，-- 新人必买：10，-- 品牌精选：11，-- VIP专区：12，-- 签到领币：13，14  礼包列表页面  跳转type15 礼包详情
    if (showType == 1) {
      wx.navigateTo({
        url: '/pages/goodDetail/goodDetail?id=' + param
      })
    } else if (showType == 2) {
      wx.navigateTo({
        url: '/pages/class/classDetail/classDetail?mcid=' + param + '&name=商品'
      })
    } else if (showType == 3) {
      // wx.navigateTo({
      //   url: '/pages/shop/shopDetail/shopDetail?id=' + param
      // })
    } else if (showType == 4) {
      wx.navigateTo({
        url: '/pages/class/classDetail/classDetail?name=热门商品&isHot=1'
      })
    } else if (showType == 5) {
      wx.navigateTo({
        url: '/pages/class/classDetail/classDetail?name=新品推荐&isNew=1'
      })
    } else if (showType == 6) {
      // wx.reLaunch({
      //   url: '/pages/shop/shop?recommend=1'
      // })
    } else if (showType == 7) {
      app.globalData.rich = param;
      wx.navigateTo({
        url: '/pages/rich/rich?'
      })
    } else if (showType == 8) {

    } else if (showType == 9) {
      wx.navigateTo({
        url: '/pages/index/floor/floor?code=' + param
      })
    } else if (showType == 10) {
      wx.navigateTo({
        url: '/pages/index/newPeople/newPeople',
      })
    } else if (showType == 11) {
      wx.navigateTo({
        url: '/pages/index/bestSelect/bestSelect',
      })
    } else if (showType == 12) {
      wx.navigateTo({
        url: '/pages/index/vip/vip',
      })
    } else if (showType == 13) {
      wx.navigateTo({
        url: '/pages/index/signIn/signIn',
      })
    } else if (showType == 14) {
      wx.navigateTo({
        url: '/pages/member/promote/promote',
      })
    } else if (showType == 15) {
      wx.navigateTo({
        url: '/pages/member/giftDetail/giftDetail?id='+ param
      })
    }
  },
  // 跳转详情
  jumpDetail(e) {
    let id = e.detail;
    wx.navigateTo({
      url: '/pages/goodDetail/goodDetail?id=' + id
    })
  },
  // 跳转详情
  jumpGoodDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goodDetail/goodDetail?id=' + id
    })
  },
  // 点击弹窗
  jumpModal() {
    if (this.data.indexModel.position == 1) {
      wx.navigateTo({
        url: '/pages/goodDetail/goodDetail?id=' + this.data.indexModel.info
      })
    } else if (this.data.indexModel.position == 2) {

    } else if (this.data.indexModel.position == 3) {
      wx.navigateTo({
        url: '/pages/class/classDetail/classDetail?mcid=' + this.data.indexModel.info
      })
    } else if (this.data.indexModel.position == 4) {
      app.globalData.rich = this.data.indexModel.content;
      wx.navigateTo({
        url: '/pages/rich/rich'
      })
    }
    this.setData({
      showIndexModel: false
    })
  },
  // 关闭弹窗
  colseModal() {
    this.setData({
      showIndexModel: false
    })
  },
  // 推广
  shareSkillGood(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/goodDetail/share/share?id=' + id
    })
  },
  // 分享调用点接口
  shareSuccess() {
    let self = this;
    http.HttpRequst(false, '/item/me-item-api/share-item', 2, '', {
        token: app.globalData.token,
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {

        }
      }
    )
  },
  // 上拉到底部
  onReachBottom() {
    // this.loadMore()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.floorConfig()
    wx.stopPullDownRefresh()
  },

  // 优惠券
  getCouponList() {
    let self = this;
    http.HttpRequst(false, '/coupon/coupon-templet-api/daily-pop', 2, '', {
        token: app.globalData.token,
      },
      'POST',
      false,
      function(res) {
        if (res.data.errcode == 0) {
          self.setData({
            couponList: res.data.data.list
          })
          if (res.data.data.list.length == 0) {
            self.setData({
              showType: false
            })
          } else {
            self.setData({
              showType: true
            })
          }
        }
      }
    )
  },
  close: function(e) {
    let self = this;
    self.setData({
      showType: e.detail.close
    })
  },
  changeGroupTop(e) {
    let self = this;
    let index = e.detail.activeIndex
    let id = e.detail.id
    if (index == self.data.groupIndex) {
      return
    } else {
      // 走场次
      self.setData({
        groupId: id,
        groupIndex: index,
        start_page: 0,
      })
      self.getGroupList()
    }
  },
  // 平团列表
  getGroupList() {
    // console.log(this.data.groupId)
    let self = this;
    common.getgoodsList(self, '/item/group-api/group-item-list', {
      token: app.globalData.token,
      start_page: self.data.start_page,
      pages:10,
      category_id: self.data.groupId,
    }, 'groupList')
  },
  loadMore() {
    let self = this
    common.loadMore(self, '/item/group-api/group-item-list', {
      token: app.globalData.token,
      start_page: self.data.start_page,
      category_id: self.data.groupId,
      pages: 10,
    }, 'groupList')
    self.loadMoreSkill()
  },
  // 组件改变了 列表 重新渲染
  changeList(e) {
    let list = 'groupList.list'
    this.setData({
      [list]: e.detail.list
    })
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
          common.handleShareUrl(self, "pages/index/index")
        }
      }
    )
  },
})