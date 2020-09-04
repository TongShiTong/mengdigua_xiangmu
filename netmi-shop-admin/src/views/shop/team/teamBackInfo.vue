<template>
  <div class="team-statistics ignore">
    <div class="team-member" style="border-bottom: solid 1px #929292;">
      <div class="team-list">
        <div class="team-msg">
          <div
            class="lower-hand"
            style="text-align:center;color:#333333;font-weight: 600;text-align:left;"
          >粉丝数：{{ myHand.fans }}</div>
          <div
            class="lower-hand"
            style="text-align:center;color:#333333;font-weight: 600;text-align:left;"
          >客户数：{{ myHand.customer }}</div>
          <div
            class="lower-hand"
            style="text-align:center;color:#333333;font-weight: 600;text-align:left;"
          >订单总数：{{ myHand.order }}</div>
          <div
            class="lower-hand"
            style="text-align:center;color:#333333;font-weight: 600;text-align:left;"
          >总金额：{{ myHand.total_price }}</div>
          <div
            class="lower-hand"
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
    <div class="team-member" style="border-bottom: solid 1px #929292;">
      <div class="team-list">
        <div class="plus-btn" style="text-align:center;color:#333333;font-weight: 600;">-</div>
        <div class="team-msg">
          <div class="lower-hand" style="text-align:center;color:#333333;font-weight: 600;">订单编号</div>
          <div class="lower-hand" style="text-align:center;color:#333333;font-weight: 600;">订单价格</div>
        </div>
      </div>
    </div>
    <div
      v-for="(v,index1) in myHand.price"
      :key="index1"
      class="team-member"
      style="border-bottom: solid 1px #f1f1f1;"
    >
      <div class="team-list">
        <div class="plus-btn">{{ index1+1 }}</div>
        <div class="team-msg">
          <div class="lower-hand">{{ v.order_no }}</div>
          <div class="lower-hand">{{ v.price_total }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import request from '@/utils/request'

export default {
  data() {
    return {
      myHand: {
        price: []
      },
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
    // this.$store.commit("changePage");
    this.uid = this.$route.query.uid
    this.getMyHand()
  },
  destroyed() {},
  methods: {
    // 获取会员数据

    getMyHand: function() {
      const self = this
      request({
        method: 'post',
        url: '/banner/banner-api/fans',
        data: {
          uid: self.uid
        }
      })
        .then(resp => {
          const res = resp.data
          self.myHand = res.data
        })
        .catch(function() {
        })
    }
  }
}
</script>
<style lang="scss" scoped="">
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
    height: 30px;
    line-height: 30px;
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
      width: 110px;
      display: inline-block;
      background: #f4f4f4;
    }
  }
}
</style>

