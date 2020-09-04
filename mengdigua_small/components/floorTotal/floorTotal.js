// components/floorTotal/floorTotal.js
const app = getApp()
const http = require('../../utils/http.js')
const common = require('../../utils/common.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    floorCode: { //楼层code
      type: null,
      observer: function(newVal, oldVal, changedPath) {
        this.getFloor(this.data.floorCode);
      }
    },
    groundTimes: { //拼团场藏地
      type: null,
      observer: function(newVal, oldVal, changedPath) {}
    },
    show: { //显示隐藏
      type: null,
      observer: function(newVal, oldVal, changedPath) {

      }
    },
    groupList: { //显示隐藏
      type: null,
      observer: function(newVal, oldVal, changedPath) {}
    },
    marginTop: { //显示隐藏
      type: null,
      observer: function(newVal, oldVal, changedPath) {}
    },
    showIndex: { //展示和隐藏 猜你喜欢
      type: null,
      observer: function(newVal, oldVal, changedPath) {}
    },
    shopId:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollY: true,
    loadOnce: false, //加载一次
    theme: false,
    showType: false, //默认不显示
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
    skillIndex: 0,
    skillContentIndex: null,
    skillCode: 99,
    listData: '',
    yesterdayData: '',
    tomorrowData: '',
    userInfo: '',
    superUser: '',
    shareCode: '',
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
    pageHeight: app.globalData.pageHeight,
    totalHeight: app.globalData.totalHeight,
    _ratio: app.globalData._ratio,
    sharePath: "", //分享链接
    firstIn: false, //第一次渲染Tabbar
    spikeFixed: false, //秒杀头部是否固定
    groupIndex: 0,
    skill_start_page: 0, //分页
    start_page: 0, //分页
    groupId: "", //场次id,
    groupList: false, //拼团列表
    newList: null,
    cityName: '', //城市名
    indexScrollHeight: 0, //首页scroll高度
    indexScrollTop: 0, //首页scroll距顶高度
    likeData: '',
    like_start_page: 0,
    like_pages: 10,
    loginData: '',
    floorCode: "", //楼层code
    showindexfirst: 0, //楼层展示长度
    showindexlast: 10, //楼层展示长度
    canLoadMore: false,
    showLike: false, // 楼层加载之前不展示


  },
  attached() {
    const appData = app.globalData
    if (appData.INDEX_SCROLL_HEIGHT && appData.INDEX_SCROLL_TOP) {
      this.setData({
        indexScrollHeight: appData.INDEX_SCROLL_HEIGHT,
        indexScrollTop: appData.INDEX_SCROLL_TOP,
      })
    } else {
      this.calculateHeight() //计算scroll高度
    }

    common.loadTheme(this)
    this.skill();
    this.yesterday();
    // this.getFloor(this.data.floorCode);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击楼层
    tapFloor(e) {
      console.log(e)
      let showType = e.currentTarget.dataset.type || e.detail.currentTarget.dataset.type;
      console.log(147,showType)
      let param = e.currentTarget.dataset.param != '' ? e.currentTarget.dataset.param : e.detail.currentTarget.dataset.param;
      // let title = e.currentTarget.dataset.title || e.detail.currentTarget.dataset.title;
      console.log(147,param)
      // let showType = e.currentTarget.dataset.type ;
      // let param = e.currentTarget.dataset.param ;
      let title = e.currentTarget.dataset.title;

      /* 商品：1，
      -- 分类对应列表：2，
      -- 店铺：3，
      -- 热门商品列表：4，
      -- 新品推荐列表：5，
      -- 推荐店铺列表：6，
      -- 富文本：7，
      -- 外链：8，
      -- 其他同一店铺下楼层的use_position：9，
      -- 新人必买：10，
      -- 品牌精选：11，
      -- VIP专区：12，
      -- 签到领币：13，14  
      -- 礼包列表页面  跳转type15 礼包详情 
      -- 佣金商品 ： 16 */
      if (showType == 1) {
        if (param == "") {
          return
        }
        wx.navigateTo({
          url: '/pages/goodDetail/goodDetail?id=' + param
        })
      } else if (showType == 2) {
        if (param == "") {
          return
        }
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
        if (param == "") {
          return
        }
        app.globalData.rich = param;
        wx.navigateTo({
          url: '/pages/rich/rich?'
        })
      } else if (showType == 8) {

      } else if (showType == 9) {
        if (param == "") {
          return
        }
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
        if (param == "") {
          return
        }
        wx.navigateTo({
          url: '/pages/member/giftDetail/giftDetail?id=' + param
        })
      } else if (showType ==16) {
        wx.navigateTo({
          url: '/pages/member/commissionGood/comissionGood',
        })
      }
    },
    // 获取店铺优惠券
    getCouponeList() {
      let self = this;
      http.HttpRequst(false, '/coupon/coupon-templet-api/item-index', 2, '', {
        token: app.globalData.token,
        shop_id: self.data.shopId,
        scenario: "shop",
        start_page: 0,
        pages: 9999,
      },
        'POST',
        false,
        function (res) {
          if (res.data.errcode == 0) {
            self.setData({
              couponListData: res.data.data,
            })
          }
        }
      )
    },
    // 楼层配置

    // 获取弹窗
    getModal() {
      let self = this;
      http.HttpRequst(true, '/hand/shop-conf-api/get-info', 2, '', {

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
      http.HttpRequst(true, '/item/seckill-api/seckill-scene-list', 2, '', {
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
            self.setData({
              skillData: res.data.data
            })
            app.globalData.skillData = res.data.data;
            
            //加载当前秒杀场次
            if (self.data.skillData.list[0]) {
              let nowId = self.data.skillData.list[0].seckill_scene_id

              
              //找到第一个正在秒杀的场次 返回ID
              try {
                self.data.skillData.list.forEach((sku, skuIdx) => {
                  if (sku.status == 1) {
                    self.setData({
                      skillIndex: skuIdx
                    })
                    nowId = sku.seckill_scene_id
                    // throw new Error('exist')
                  }
                })
              } catch (e) {
                if (e.message == 'exist') throw e
              } finally {
                self.getSkillContent(nowId)
              }
            }

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
    selectSkillContent(e) {
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
      http.HttpRequst(true, '/item/seckill-api/seckill-item-list', 2, '', {
          token: app.globalData.token,
          start_page: self.data.skill_start_page,
          pages: 100,
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
    loadMoreSkill() {
      let self = this;
      if (!self.data.listData) {
        return false
      }
      let pages = self.data.skill_start_page + 1;
      if (pages > Math.ceil(self.data.listData.total_pages / 10) - 1) {
        return false
      } else {
        self.setData({
          skill_start_page: pages
        })
        http.HttpRequst(true, '/item/seckill-api/seckill-item-list', 2, '', {
            token: app.globalData.token,
            start_page: self.data.skill_start_page,
            pages: 100,
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
      http.HttpRequst(true, '/item/group-api/group-category-list', 2, '', {

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
          let data = res.data.data;

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
          shop_id: this.data.shopId
        },
        'POST',
        false,
        function(res) {
          if (res.data.errcode == 0) {
            self.setData({
              floorData: res.data.data,
            })
            // let  interVek = setInterval(()=>{
            console.log('楼层', res.data.data)
            // },500)

            if (self.data.floorData.content && self.data.floorData.content.list.length) {
              self.showContent()

            }
          }
        }
      )
    },

    // 跳转分类
    jumpClass() {
      wx.navigateTo({
        url: '/pages/class/class',
      })
    },
    // 获取热门商品
    getHotGood(i) {
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
          if (i % 10 === 0) {
            wx.hideLoading(); //隐藏提示框
          }
        }
      )
    },
    // 获取新品商品
    getNewGood(i) {
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
          if (i % 10 === 0) {
            wx.hideLoading(); //隐藏提示框
          }
        }
      )
    },
    // 获取推荐店铺
    getComShop(i) {
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
          if (i % 10 === 0) {
            wx.hideLoading(); //隐藏提示框
          }
        }
      )
    },
    // 楼层自定义列表
    getCuscom(i) {
      let self = this;
      let name = "cuscomData[" + i + "]"
      http.HttpRequst(false, '/item/me-item-api/index', 2, '', {
          item_ids: self.data.cuscomSize,
          start_page: 0,
          token: app.globalData.token,
        },
        'POST',
        false,
        function(res) {
          if (res.data.errcode == 0) {
            self.setData({
              [name]: res.data.data
            })
          }
          if (i % 10 === 0) {
            wx.hideLoading(); //隐藏提示框
          }
        }
      )
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
        app.globalData.groupId = id
        self.getGroupList()
      }
    },
    // 拼团列表
    getGroupList() {
      let self = this;
      common.getgoodsList(self, '/item/group-api/group-item-list', {
        token: app.globalData.token,
        start_page: self.data.start_page,
        pages: 10,
        category_id: self.data.groupId,
      }, 'groupList')
    },

    //计算scroll高度
    calculateHeight() {
      const {
        isIphoneX,
        pageHeight,
        totalHeight,
        _ratio
      } = this.data
      let indexScrollHeight = pageHeight - (75 + 100) * _ratio - (isIphoneX ? 140 : 98) * _ratio
      let indexScrollTop = (75 + 100) * _ratio + totalHeight
      this.setData({
        indexScrollHeight,
        indexScrollTop
      })
      app.globalData.INDEX_SCROLL_HEIGHT = indexScrollHeight
      app.globalData.INDEX_SCROLL_TOP = indexScrollTop
    },

    addMore() {
      if (this.data.canLoadMore && this.data.showindexlast < this.data.floorData.content.list.length) {
        this.setData({
          showindexfirst: this.data.showindexfirst + 10,
          showindexlast: this.data.showindexlast + 10,
          canLoadMore: false
        })
        this.showContent()
      } else if (this.data.showindexlast >= this.data.floorData.content.list.length) {
        // console.log("加载完成")
      }


    },
    showContent() {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      let self = this;
      self.data.floorData.content.list.forEach((x, skuIdx) => {
        if (self.data.showindexfirst <= skuIdx && skuIdx < self.data.showindexlast) {
          switch (x.type) {
            case '6':
              self.setData({
                hotSize: x.nums
              })
              if (x.nums != 0) {
                self.getHotGood(skuIdx);
              }
              break;
            case '7':
              self.setData({
                newSize: x.nums
              })
              if (x.nums != 0) {
                self.getNewGood(skuIdx);
              }
              break;
            case '8':
              self.setData({
                comSize: x.nums
              })
              if (x.nums != 0) {
                self.getComShop(skuIdx);
              }
              break;
            case '10':
              self.setData({
                cuscomSize: x.goods_list
              })
              if (x.goods_list != '') {
                // setTimeout(() => {
                self.getCuscom(skuIdx);
                // }, 1000)
              }
              break;
            case '11':

              self.getCouponeList();
            case '15':
              self.setData({
                bargainSize: x.nums
              })
              if (x.nums != 0) {
                self.geBargainSize(skuIdx);
              }

              break;
            case '16':
              self.setData({
                bargainSize: x.nums
              })
              if (x.nums != 0) {
                self.geBargainSize(skuIdx);
              }
              break;
            case '17':
              self.setData({
                horizonListItem:x.goods_list
              })
                self.getHorizonList();

              // self.setData({
              //   horizonListItem:
              // })
            default:
              return false;
          }
        }

      })
      this.setData({
        canLoadMore: true
      })
      setTimeout(() => {
        wx.hideLoading(); //隐藏提示框
      }, 1000)


    },
    // 跳转详情
    jumpDetail(e) {
      let id = e.detail;
      wx.navigateTo({
        url: '/pages/goodDetail/goodDetail?id=' + id
      })
    },
    getHorizonList(){
      http.HttpRequst(false, '/item/me-item-api/index', 2, '', {
        start_page: 0,
        pages: this.data.horizonListItem.length,
        token: app.globalData.token,
        item_ids:this.data.horizonListItem
      },
        'POST',
        false,
         (res) =>{
          if (res.data.errcode == 0) {
            this.setData({
              horizonList: res.data.data
            })
          }
          // if (i % 10 === 0) {
          //   wx.hideLoading(); //隐藏提示框
          // }
        }
      )
    },
    // 砍价
    geBargainSize(i) {
      let self = this;
      if (self.data.bargainList) {
        return
      }
      http.HttpRequst(false, '/bargain/me-bargain-api/get-item', 2, '', {
          start_page: 0,
          pages: self.data.bargainSize,
          token: app.globalData.token,
        },
        'POST',
        false,
        function(res) {
          if (res.data.errcode == 0) {
            self.setData({
              bargainList: res.data.data
            })
          }
          if (i % 10 === 0) {
            wx.hideLoading(); //隐藏提示框
          }
        }
      )
    },
  },

})