<template>
  <div class="team-statistics ignore">
    <div class="team-member ignore" style="border-bottom: solid 1px #929292;">
      <div class="team-list ignore">
        <div class="plus-btn ignore" style="text-align:center;color:#333333;font-weight: 600;">-</div>
        <div class="team-msg ignore">
          <div class="team-head ignore">
            <div style="text-align:center;color:#333333;font-weight: 600;">头像</div>
          </div>
          <div class="team-name ignore" style="text-align:center;color:#333333;font-weight: 600;">昵称</div>
          <div class="rank-level ignore" style="text-align:center;color:#333333;font-weight: 600;">会员等级</div>
          <div class="lower-hand ignore" style="text-align:center;color:#333333;font-weight: 600;">现有会员人数</div>
          <div class="lower-hand ignore" style="text-align:center;color:#333333;font-weight: 600;">成为VIP会员时间</div>
          <div
            class="lower-hand ignore"
            style="text-align:center;color:#333333;font-weight: 600;text-align:right;padding-right:15px;"
          >
            <a
              style="color: #fff;background-color: #337ab7;font-size:13px;border-color: #2e6da4;padding:5px 15px;"
              href="javascript:history.go(-1)"
            >返回</a>
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(v,index1) in myHand.hand"
      :key="index1"
      class="team-member ignore"
      style="border-bottom: solid 1px #f1f1f1;"
    >
      <div class="team-list ignore">
        <div v-show="v.count==1" class="plus-btn ignore">
          <img src="@/assets/icon_null.png">
        </div>
        <div v-show="!v.show_child&&v.count>1" class="plus-btn ignore">
          <img v-show="v.count>0" src="@/assets/add.png" alt="..." @click="showChild(v,index1)">
        </div>
        <div v-show="v.show_child&&v.count>1" class="plus-btn ignore">
          <img
            v-show="v.count>0"
            src="@/assets/minus.png"
            alt="..."
            @click="showChild(v,index1)"
          >
        </div>
        <!--<router-link :to="{name:'teamMember',params:{memberId:v.uid}}">-->
        <router-link :to="{name:'teamBackInfo',query:{uid:v.uid}}" class="team-msg ignore">
          <div class="team-head ignore">
            <div :style="{'background-image':'url('+ v.head_url +')'}" class="img"/>
          </div>
          <div class="team-name ignore">{{ v.nickname }}</div>
          <div class="rank-level ignore">{{ v.level==1?'高级会员':v.level==2?'御经理':v.level==3?'御总监':'' }}</div>
          <div class="lower-hand ignore">现有会员{{ v.count }}人</div>
          <div class="lower-hand ignore">{{ v.create_time }}</div>
          <div class="lower-hand ignore"/>
        </router-link>
        <!--</router-link>-->
      </div>
      <!--<router-link :to="{name:'teamMember',params:{memberId:v1.uid}}" :style="{'display':v.show_child?'block':'none'}">-->
      <div v-show="v.show_child&&v.child" style="border-bottom:1px #f0f0f0 solid;">
        <a v-for="(v1,index) in v.child" :key="index">
          <div class="lower-list ignore">
            <div class="plus-btn ignore"/>
            <router-link :to="{name:'teamBackInfo',query:{uid:v1.uid}}" class="team-msg">
              <div class="team-head ignore">
                <div :style="{'background-image':'url('+ v1.head_url + ')'}" class="img ignore"/>
              </div>
              <div class="team-name ignore" style="-webkit-box-orient: vertical;">{{ v1.nickname }}</div>
              <div class="rank-level ignore">{{ v1.level==1?'高级会员':v1.level==2?'御经理':v1.level==3?'御总监':'' }}</div>
              <div class="lower-hand ignore">现有会员{{ v1.count }}人</div>
              <div class="lower-hand ignore">{{ v1.create_time }}</div>
              <div class="lower-hand ignore"/>
            </router-link>
          </div>
        </a>
        <div v-show="v.more_state" class="m-more ignore" @click="lookMore1(v,index1)">
          查看更多
          <span class="right-in ignore">&rarr;</span>
        </div>
      </div>

      <!--</router-link>-->
    </div>
    <div
      v-show="myHand.hand&&myHand.total_page>myHand.hand.length"
      class="m-more ignore"
      @click="lookMore()"
    >
      查看更多
      <span class="right-in ignore">&rarr;</span>
    </div>
    <div v-show="myHand.hand&&myHand.total_page<=myHand.hand.length" class="dead-line ignore">
      <div class="line ignore"/>
      <div class="word ignore">我也是有底线的</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import request from '@/utils/request'

export default {
  data() {
    return {
      myHand: {},
      start_page: 0,
      uid: '',
      t_rich_text: '',
      pages: 10,
      t_modal_state: false
    }
  },
  ready: function() {},
  watch: {},
  created() {
    // 生命周期钩子
    // this.$store.commit('changePage');
    this.uid = this.$route.query.uid
    this.getMyHand()
  },
  destroyed() {},
  methods: {
    closeModal() {
      this.t_modal_state = false
    },
    // 加载更多
    lookMore() {
      this.getMyHand()
    },
    // 加载更多
    lookMore1(item, index) {
      this.getChildsData(item.uid, index)
    },
    // 获取会员数据
    getMyHand: function() {
      const self = this
      request({
        method: 'post',
        url: '/banner/banner-api/team',
        data: {
          uid: self.uid,
          id: self.uid,
          start_page: self.start_page,
          pages: self.pages,
          type: 2
        }
      })
        .then(resp => {
          const res = resp.data
          if (res.errcode === 0) {
            for (let i = 0; i < res.data.hand.length; i++) {
              if (res.data.hand[i].nickname) {
                res.data.hand[i]['show_child'] = false
                res.data.hand[i]['child'] = []
                res.data.hand[i]['start_page'] = 0
                res.data.hand[i]['more_state'] = false
              }
            }
            if (self.start_page === 0) {
              self.myHand = res.data
            } else {
              res.data.hand.map(item => {
                self.myHand.hand.push(item)
              })
              for (const i in res.data) {
                if (i !== 'hand') {
                  self.myHand[i] = res.data[i]
                }
              }
            }
            if (self.myHand.hand.length < self.myHand.total_page) {
              self.start_page++
            }
          }
        })
        .catch(function() {
          // Toast("网络延迟，获取失败");
        })
    },
    showChild(item, index) {
      if (item.child.length === 0) {
        this.getChildsData(item.uid, index)
      }
      item.show_child = !item.show_child
    },
    getChildsData(uid, index) {
      const self = this

      request({
        method: 'post',
        url: '/banner/banner-api/team',
        data: {
          start_page: self.myHand.hand[index].start_page,
          pages: self.pages,
          id: uid,
          type: 2
        }
      })
        .then(resp => {
          const res = resp.data
          if (res.errcode === 0) {
            if (self.myHand.hand[index].start_page === 0) {
              self.myHand.hand[index].child = []
            }
            res.data.hand.map(item => {
              self.myHand.hand[index].child.push(item)
            })
            if (res.data.hand.length === 10) {
              self.myHand.hand[index].start_page =
                self.myHand.hand[index].start_page + 1
              self.myHand.hand[index].more_state = true
            } else {
              self.myHand.hand[index].more_state = false
            }
          }
        })
        .catch(function() {

        })
    }
  }
}
</script>
<style lang="scss">
.team-statistics {
  height: 100%;
  width: 100%;
  display: block;
  overflow-y: auto;
  .t-modal {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    .t-modal-panel {
      position: fixed;
      box-sizing: border-box;
      padding: 20px 12px 25px;
      overflow: hidden;
      background-color: #fff;
      width: 270px;
      height: 360px;
      left: 50%;
      margin-left: -135px;
      top: 80px;
      .t-modal-title {
        height: 30px;
        text-align: center;
        color: #df282c;
        font-size: 16px;
        line-height: 20px;
        padding-bottom: 10px;
      }
      .t-modal-content {
        height: 285px;
        overflow-y: auto;
      }
    }
    .t-modal-btn {
      position: fixed;
      left: 50%;
      margin-left: -108px;
      width: 216px;
      height: 32px;
      text-align: center;
      color: #fff;
      top: 460px;
      line-height: 32px;
      background-color: #df282c;
      box-shadow: 0px 2px 4px 0px rgba(184, 6, 5, 0.79);
      border-radius: 16px;
    }
  }
  .my-team {
    background: #fff;
    margin-bottom: 10px;
    .team-frame {
      padding-top: 6px;
      padding-left: 14px;
      padding-right: 14px;
      display: flex;
      color: #424242;
      > div {
        flex: 1;
      }
      .frame-left {
        font-size: 18px;
      }
      .frame-right {
        font-size: 14px;
        line-height: 30px;
        vertical-align: baseline;
        text-align: right;
        .num {
          color: #df282c;
        }
      }
    }
    .team-box {
      border-top: 1px solid #aaa;
      border-left: 1px solid #aaa;
      width: 80%;
      margin: 15px auto 11px;
      .box-row {
        border-bottom: 1px solid #aaa;
        display: flex;
        .box-col {
          flex: 1;
          border-right: 1px solid #aaa;
          height: 45px;
          line-height: 45px;
          text-align: center;
          color: #424242;
          font-size: 13px;
          > span {
            display: inline-block;
            line-height: 23px;
          }
        }
        .box-num {
          color: #eb664a;
          font-size: 18px;
        }
        .classify {
          position: relative;
          background: url("../../../assets/box_title.png") no-repeat;
          background-size: 100% 100%;
          .title-level {
            position: absolute;
            right: 6px;
            top: 8px;
            height: 13px;
            line-height: 13px;
          }
          .title-num {
            position: absolute;
            left: 6px;
            bottom: 8px;
            height: 13px;
            line-height: 13px;
          }
        }
      }
    }
    .team-more {
      font-size: 12px;
      line-height: 13px;
      color: #424242;
      text-align: right;
      padding-right: 13px;
      padding-bottom: 10px;
      img {
        height: 14px;
        width: 7px;
        vertical-align: baseline;
        margin-bottom: -2px;
        margin-left: 6px;
      }
    }
  }
  .team-list,
  .lower-list {
    padding-left: 15px;
    background: #fff;
    display: flex;
    height: 60px;
    line-height: 60px;
    .plus-btn {
      flex: 1;
      text-align: center;
      img {
        width: 18px;
        border-radius: 50%;
        height: 18px;
        vertical-align: middle;
      }
    }
    a {
      flex: 10;
    }
    .team-msg {
      flex: 10;
      display: flex;
      .team-head {
        flex: 2;
        text-align: center;
        .img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: url("../../../assets/rank_ava6.png") no-repeat;
          background-size: cover;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .team-name {
        flex: 2;
        text-align: center;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .rank-leve {
        flex: 2;
        text-align: center;
      }
      .lower-hand {
        flex: 4;
        text-align: center;
      }
    }
  }
  .m-more {
    color: #666666;
  }
  .dead-line {
    margin-top: 18px;
    margin-bottom: 18px;
    padding-left: 28px;
    padding-right: 28px;
    line-height: 12px;
    position: relative;
    text-align: center;
    .line {
      position: absolute;
      width: calc(100% - 56px);
      border-bottom: 1px solid #dbdbdb;
      top: 6px;
      z-index: 2;
    }
    .word {
      position: relative;
      z-index: 3;
      width: 140px;
      display: inline-block;
      background: #f4f4f4;
    }
  }
}
</style>

