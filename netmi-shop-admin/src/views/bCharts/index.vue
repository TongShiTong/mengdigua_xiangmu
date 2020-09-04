<template>
  <div id="chart">
    <div class="radius header">
      <el-row class="header_title">经营概况</el-row>
      <el-row class="header_content">
        <el-col :span="5">
          <div>支付金额（元）</div>
          <div class="color_orange">￥{{ surveyData.order_money.today }}</div>
          <div>昨日: ￥{{ surveyData.order_money.yesterday }}</div>
        </el-col>
        <el-col :span="5">
          <div>支付订单数</div>
          <div class="color_orange">{{ surveyData.count_order.today }}</div>
          <div>昨日: {{ surveyData.count_order.yesterday }}</div>
        </el-col>
        <el-col :span="5">
          <div>支付人数</div>
          <div class="color_orange">{{ surveyData.order_num.today }}</div>
          <div>昨日: {{ surveyData.order_num.yesterday }}</div>
        </el-col>
        <el-col v-if="!shop_id" :span="5">
          <div>新增分销员数</div>
          <div class="color_orange">{{ surveyData.hand_num.today }}</div>
          <div>昨日: {{ surveyData.hand_num.yesterday }}</div>
        </el-col>
        <el-col v-if="!shop_id" :span="4">
          <div>申请提现笔数</div>
          <div class="color_orange">{{ surveyData.cash_num.today }}</div>
          <div>昨日: {{ surveyData.cash_num.yesterday }}</div>
        </el-col>
        <el-col v-if="!shop_id" :span="5">
          <div>佣金金额（元）</div>
          <div class="color_red">￥{{ surveyData.hand_money.today }}</div>
          <div>昨日: ￥{{ surveyData.hand_money.yesterday }}</div>
        </el-col>
        <el-col v-if="!shop_id" :span="5">
          <div>已提现佣金（元）</div>
          <div class="color_red">￥{{ surveyData.cash_hand_money.today }}</div>
          <div>昨日: ￥{{ surveyData.cash_hand_money.yesterday }}</div>
        </el-col>
        <el-col :span="5">
          <div>平台总额（元）</div>
          <div :class="shop_id?'color_orange': 'color_red'">￥{{ surveyData.all_money.today }}</div>
          <div>昨日: ￥{{ surveyData.all_money.yesterday }}</div>
        </el-col>
        <el-col v-if="shop_id" :span="4">
          <div>优惠金额（元）</div>
          <div class="color_orange">￥{{ surveyData.coupon_money.today }}</div>
          <div>昨日: ￥{{ surveyData.coupon_money.yesterday }}</div>
        </el-col>
        <el-col :span="5">
          <div>商家提现总额（元）</div>
          <div class="color_red">￥{{ surveyData.shop_money.today }}</div>
          <div>昨日: ￥{{ surveyData.shop_money.yesterday }}</div>
        </el-col>
        <el-col :span="4">
          <div>商家提现笔数</div>
          <div class="color_red">{{ surveyData.shop_num.today }}</div>
          <div>昨日: {{ surveyData.shop_num.yesterday }}</div>
        </el-col>
      </el-row>
      <el-row class="header_foot">
        <el-col :span="5">
          <div>待付款订单</div>
          <div>{{ surveyData.wait_pay_order }}</div>
        </el-col>
        <el-col :span="5">
          <div>待发货订单</div>
          <div>{{ surveyData.wait_delivery_order }}</div>
        </el-col>
        <el-col :span="5">
          <div>待退订单</div>
          <div>{{ surveyData.wait_return_order }}</div>
        </el-col>
        <el-col :span="5">
          <div>出售中的商品</div>
          <div>{{ surveyData.on_sale_item }}</div>
        </el-col>
        <el-col :span="4">
          <div>仓库中的商品</div>
          <div>{{ surveyData.out_sale_item }}</div>
        </el-col>
      </el-row>
    </div>
    <div class="radius title">
      <el-row type="flex" justify="space-between" class="title_head">
        <div class="title_h_left" @click="clickTitle($event)">
          <span :class="titleId == 1? 'active': ''" data-id="1">运营视窗</span>
          <span v-if="!shop_id" :class="titleId == 2? 'active': ''" data-id="2">会员分析</span>
          <span v-if="!shop_id" :class="titleId == 3? 'active': ''" data-id="3">会员精选</span>
          <span v-if="!shop_id" :class="titleId == 4? 'active': ''" data-id="4">佣金统计</span>
        </div>
        <div class="title_h_right">
          <em>年份</em>
          <el-select v-model="year" placeholder="请选择" @change="timeChange">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
          <em>月份</em>
          <el-select v-model="month" placeholder="请选择" @change="timeChange">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
      </el-row>
      <el-row>
        <div class="title_foot" @click="clickTwoTitle($event)">
          <span v-show="titleId == 1" class="active" data-id="1">今日核心指标</span>
          <span v-show="titleId == 2" class="active" data-id="2">今日会员分析</span>
          <span
            v-for="(item,index) in two_menu"
            v-show="titleId == 3"
            :key="index"
            :class="titleTwoId == item.level ? 'active' : ''"
            :data-id="item.level"
            data-class="two">
            {{ item.name }}筛选
          </span>
          <span v-show="titleId == 4" class="active" data-id="4">佣金统计</span>
        </div>
      </el-row>
    </div>
    <el-row :gutter="19" class="rowCard">
      <el-col v-for="(item,index) in card" v-show="titleId == 3 || titleId == 4" :key="index+'1'" :span="6" class="rowCard_col">
        <div :class="cardId == index?'active': ''" class="card" @click="clickCard(index)">
          <p>{{ item.name }}</p>
          <p>{{ item.all }}</p>
          <p v-if="item.yesterday">{{ item.yesterday }}</p>
          <p v-if="item.week">{{ item.week }}</p>
        </div>
      </el-col>
      <el-col v-for="(item,index) in card" v-show="titleId == 1" :key="index+'1'" :span="6" class="rowCard_col">
        <div :class="cardId == index?'active': ''" class="card" @click="clickCard(index)">
          <p>{{ item.name }}</p>
          <p>{{ item.all }}</p>
          <p v-if="item.yesterday&&item.yesterday>=0&&index!=1&&index!=3">较前一日：<span style="color:#f00;">+{{ item.yesterday }}</span></p>
          <p v-if="item.yesterday&&item.yesterday<0&&index!=1&&index!=3">较前一日：<span style="color:#090;">{{ item.yesterday }}</span></p>
          <p v-if="item.week&&item.week>=0&&index!=1&&index!=3">较上一周：<span style="color:#f00;">+{{ item.week }}</span></p>
          <p v-if="item.week&&item.week<0&&index!=1&&index!=3">较上一周：<span style="color:#090;">{{ item.week }}</span></p>
          <p v-if="item.yesterday&&item.yesterday>=0&&index==3">较前一日：<span style="color:#f00;">+{{ Math.floor(item.yesterday) }}</span></p>
          <p v-if="item.yesterday&&item.yesterday<0&&index==3">较前一日：<span style="color:#090;">{{ Math.floor(item.yesterday) }}</span></p>
          <p v-if="item.week&&item.week>=0&&index==3">较上一周：<span style="color:#f00;">+{{ Math.floor(item.week) }}</span></p>
          <p v-if="item.week&&item.week<0&&index==3">较上一周：<span style="color:#090;">{{ Math.floor(item.week) }}</span></p>
          <p v-if="item.yesterday&&item.yesterday>=0&&index==1">较前一日：<span style="color:#f00;">{{ item.yesterday }}</span><span style="font-weight: 600;color:#f00;padding-left:5px;">↑</span></p>
          <p v-if="item.yesterday&&item.yesterday<0&&index==1">较前一日：<span style="color:#090;">{{ Math.abs(item.yesterday) }}</span><span style="font-weight: 600;color:#090;padding-left:5px;">↓</span></p>
          <p v-if="item.week&&item.week>=0&&index==1">较上一周：<span style="color:#f00;">{{ item.week }}</span><span style="font-weight: 600;color:#f00;padding-left:5px;">↑</span></p>
          <p v-if="item.week&&item.week<0&&index==1">较上一周：<span style="color:#090;">{{ Math.abs(item.week) }}</span><span style="font-weight: 600;color:#090;padding-left:5px;">↓</span></p>
        </div>
      </el-col>
      <el-col v-for="(item,index) in card" v-show="titleId == 2" :key="index+'2'" :span="6" class="rowCard_col">
        <div :class="cardId == index?'active': ''" class="card" @click="clickCard(index,item.level)">
          <p>{{ item.name }}新增</p>
          <p>{{ item.today }}</p>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">{{ item.name }}总数：{{ item.all_hand }}</el-col>
            <el-col :span="10">昨日新增：{{ item.yesterday }}</el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">上月新增：{{ item.month }}</el-col>
            <el-col :span="10">上周新增：{{ item.week }}</el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row class="radius rowChart">
      <div id="main" style="width: 100%;height:100%;"/>
    </el-row>
  </div>
</template>
<script>
import echarts from 'echarts'
import request from '@/utils/request'

export default {
  name: 'Index',
  data: function() {
    return {
      shop_id: '',
      flag: 0,
      date: 2019,
      surveyData: {
        order_money: {},
        count_order: {},
        order_num: {},
        hand_num: {},
        cash_num: {},
        hand_money: {},
        cash_hand_money: {},
        shop_money: {},
        shop_num: {},
        coupon_money: {},
        all_money: {},
        wait_pay_order: '',
        wait_delivery_order: '',
        wait_return_order: '',
        on_sale_item: '',
        out_sale_item: ''
      },
      titleId: 1,
      titleTwoId: 0,
      year: '',
      month: '',
      options1: [{
        value: '2019',
        label: 2019
      }],
      options2: [
        {
          value: '1',
          label: 1
        }, {
          value: '2',
          label: 2
        }, {
          value: '3',
          label: 3
        }, {
          value: '4',
          label: 4
        }, {
          value: '5',
          label: 5
        }, {
          value: '6',
          label: 6
        }, {
          value: '7',
          label: 7
        }, {
          value: '8',
          label: 8
        }, {
          value: '9',
          label: 9
        }, {
          value: '10',
          label: 10
        }, {
          value: '11',
          label: 11
        }, {
          value: '12',
          label: 12
        }],
      cardId: 0,
      card: [{}, {}, {}, {}],
      cardData: {},
      two_menu: [],
      type: '',
      chartData: [],
      chartTitle: ''
    }
  },
  mounted() {
    if (window.location.hash.split('?shop_id=').length == 2) {
      this.shop_id = window.location.hash.split('?shop_id=')[1].split('&')[0]
    }
    const date = new Date()
    this.year = date.getFullYear() + ''
    this.month = date.getMonth() + 1 + ''
    if (this.year > 2019) {
      for (let i = 0; i < this.year - 2018; i++) {
        this.options1[i] = {
          value: 2019 + i,
          label: 2019 + i
        }
      }
    }
    this.getTopData()
    this.cardChange(1)
    this.drawChart()
  },
  methods: {
    // 图表
    drawChart() {
      const _this = this
      if (this.month.length == 1) {
        this.month = '0' + this.month
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: _this.chartTitle + '（' + _this.year + '-' + _this.month + '）',
          left: 'center',
          top: '26px'
        },
        grid: {
          top: '100px',
          left: '50px',
          right: '50px'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          axisTick: {
            interval: 0,
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [{
          name: _this.chartTitle,
          type: 'line',
          data: _this.chartData
        }],
        color: ['#FFC300', '#3DE0A8']
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    // 获取经济概况数据
    getTopData() {
      const _this = this
      request({
        method: 'post',
        url: '/index/index-api/top-data',
        data: {
          shop_id: _this.shop_id
        }
      }).then((res) => {
        this.surveyData = res.data.data
      })
    },
    // 获取卡片信息
    getBottomData(data) {
      return request({
        method: 'post',
        url: '/index/index-api/bottom-data',
        data
      }).then((res) => {
        this.cardData = res.data.data
      })
    },
    // 点击一级级菜单
    clickTitle(e) {
      if (e.target.tagName == 'SPAN') {
        this.titleId = e.target.dataset.id
        this.titleTwoId = 1
        this.cardChange(e.target.dataset.id)
      }
    },
    // 点击二级级菜单
    async clickTwoTitle(e) {
      if (e.target.tagName == 'SPAN' && e.target.dataset.class == 'two') {
        this.titleTwoId = e.target.dataset.id
        const data = {
          type: 'user_choice',
          level: e.target.dataset.id,
          shop_id: this.shop_id
        }
        await this.getBottomData(data)
        this.type = data.type
        this.ifCard(3)
        this.clickCard(0)
      }
    },
    // 改变时间
    timeChange() {
      this.getChartData(this.type)
    },
    // 卡片变化
    async cardChange(index) {
      const _this = this
      let data = {}
      if (index == 3) {
        request({
          method: 'post',
          url: '/index/index-api/hand-list'
        }).then((res) => {
          _this.two_menu = res.data.data
          _this.clickTwoTitle({ target: { dataset: { id: 1, class: 'two' }, tagName: 'SPAN' }})
        })
      } else {
        if (index == 1) {
          data = {
            type: 'default_view',
            shop_id: this.shop_id
          }
        } else if (index == 2) {
          data = {
            type: 'user_analyse',
            shop_id: this.shop_id
          }
        } else if (index == 4) {
          data = {
            type: 'hand_count',
            shop_id: this.shop_id
          }
        }
        await this.getBottomData(data)
        this.type = data.type
        if (index == 2) {
          this.clickCard(0, this.cardData[0].level)
        } else {
          this.clickCard(0)
        }
      }
      this.ifCard(index)
    },
    // 判断菜单类型改变卡片
    ifCard(index) {
      const _this = this
      if (index == 1) {
        this.card = this.cardData
      } else if (index == 2) {
        this.card = this.cardData
      } else if (index == 3) {
        this.card = [
          {
            name: '昨日增长（总数）',
            all: _this.cardData.yesterday
          }, {
            name: '今日增长（总数）',
            all: _this.cardData.today
          }, {
            name: '本周增长（总数）',
            all: _this.cardData.this_week,
            yesterday: '上周增长：' + _this.cardData.week
          }, {
            name: '本月增长(总数)',
            all: _this.cardData.this_month,
            yesterday: '上月增长：' + _this.cardData.month
          }]
      } else if (index == 4) {
        this.card = [
          {
            name: '昨日佣金（总数）',
            all: _this.cardData.yesterday
          }, {
            name: '今日佣金（总数）',
            all: _this.cardData.today
          }, {
            name: '本周佣金（总数）',
            all: _this.cardData.this_week,
            yesterday: '上周增长：' + _this.cardData.week
          }, {
            name: '本月佣金(总数)',
            all: _this.cardData.this_month,
            yesterday: '上月增长：' + _this.cardData.month
          }]
      }
    },
    // 点击卡片
    clickCard(index, level) {
      this.cardId = index
      this.level = level
      this.getChartData(this.type)
      if (this.titleId == 1) {
        this.chartTitle = this.cardData[index].name
      } else if (this.titleId == 2) {
        this.chartTitle = this.cardData[index].name + '数量'
      } else if (this.titleId == 3) {
        this.chartTitle = this.two_menu[this.titleTwoId - 1].name + '数量'
      } else if (this.titleId == 4) {
        this.chartTitle = '佣金统计'
      }
    },
    // 获取折线图信息
    getChartData(type) {
      const _this = this
      let data = {}
      if (type == 'user_choice') {
        data = {
          type,
          second_type: _this.cardId + 1 + '',
          year: _this.year,
          month: _this.month,
          level: _this.titleTwoId,
          shop_id: _this.shop_id
        }
      } else if (type == 'user_analyse') {
        data = {
          type,
          second_type: _this.level,
          year: _this.year,
          month: _this.month,
          shop_id: _this.shop_id
        }
      } else {
        data = {
          type,
          second_type: _this.cardId + 1 + '',
          year: _this.year,
          month: _this.month,
          shop_id: _this.shop_id
        }
      }
      request({
        method: 'post',
        url: '/index/index-api/zhexian',
        data
      }).then((res) => {
        this.chartData = res.data
        this.drawChart()
      })
    }
  }
}
</script>
<style lang='scss'>
    .radius{
        background: #fff;
        border-radius: 10px;
    }
    #chart{
        background: #F0F2F5;
        color: #333;
        padding: 40px;
        .header{
            .header_title{
                line-height: 80px;
                border-bottom: 1px solid #F0F2F5;
                font-size: 18px;
                font-weight: 900;
                padding: 0 32px;
            }
            .header_content{
                padding: 0 32px;
                .el-col{
                    padding: 20px 0;
                    div{
                        line-height: 40px;
                        &:nth-child(1){
                            font-size: 16px;
                            font-weight: 600;
                            color: #666;
                        }
                        &:nth-child(2){
                            font-size: 22px;
                            font-weight: 600;
                        }
                        &:nth-child(3){
                            color: #999;
                            font-size: 16px;
                        }
                    }
                    .color_orange{
                        color: #FF8000;
                    }
                    .color_red{
                        color: #FF4545
                    }
                }
            }
            .header_foot{
                padding: 0 32px;
                border-top: 5px solid #F0F2F5;
                .el-col{
                    padding: 20px 0;
                    div{
                        line-height: 40px;
                        font-weight: 600;
                        &:nth-child(1){
                            font-size: 16px;
                            color: #666;
                        }
                        &:nth-child(2){
                            font-size: 22px;
                            color: #63B0FF;
                        }
                    }
                }
            }
        }
        .title{
            height: 130px;
            margin-top: 22px;
            .title_head{
                padding: 0 32px;
                height: 65px;
                line-height: 65px;
                border: 1px solid #F0F2F5;
                font-size: 18px;
                font-weight: 600;
                .title_h_left{
                    span{
                        margin-right: 30px;
                        height: 100%;
                        display: inline-block;
                        cursor: pointer;
                        user-select: none;
                        color: #555;
                    }
                    .active{
                        color: #63B0FF;
                        border-bottom: 3px solid #63B0FF;
                    }
                }
                .title_h_right{
                    em{
                        padding: 0 20px;
                        font-style: normal
                    }
                    .el-select{
                        width: 140px;
                    }
                }
            }
            .title_foot{
                height: 65px;
                line-height: 65px;
                padding: 0 32px;
                font-size: 18px;
                span{
                    margin-right: 30px;
                    color: #777;
                    cursor: pointer;
                    user-select: none
                }
                .active{
                    color: #333;
                    font-weight: 600
                }
            }
        }
        .rowCard{
            margin-top: 22px;
            .rowCard_col{
                height: 230px;
                .card{
                    background: #fff;
                    box-shadow:0px 5px 22px 0px rgba(210,213,218,1);
                    height: 100%;
                    display: flex;
                    flex-flow: column;
                    align-items: center;
                    font-weight: 600;
                    padding-top: 40px;
                    border-radius: 10px;
                    font-size: 16px;
                    cursor: pointer;
                    p{
                        margin: 0;
                        line-height: 30px;
                        &:nth-child(1){
                            text-align: center;
                        }
                        &:nth-child(2){
                            text-align: center;
                            margin-bottom: 10px;;
                        }
                        &:nth-child(3){
                            color: #999;
                        }
                        &:nth-child(4){
                            color: #999;
                        }
                    }
                    .el-row{
                      width: 100%;
                      line-height: 30px;
                      color: #999;
                      font-size: 14px;
                    }
                }
                .active{
                    border: 3px solid #63B0FF
                }
            }
        }
        .rowChart{
            height: 380px;
            margin-top: 25px;
        }
    }
</style>
