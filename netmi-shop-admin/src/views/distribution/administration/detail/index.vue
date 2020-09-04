<template>
  <div class="admin-detial">
    <div class="admin-title">分销员详情</div>
    <!-- detail -->
    <div class="user-detail flex-r-b">
      <div class>
        <img
          class="each-head-url"
          src="https://liemimofang.oss-cn-hangzhou.aliyuncs.com/backend/frontend_15484925435580.jpg"
          alt
        >
      </div>
      <div class="detial-content flex-r-s flex-1">
        <div>
          <span>微信昵称:</span>微信昵称
        </div>
        <div>
          <span>手机号码:</span> 17858513811
        </div>
        <div>
          <span>vip等级:</span>微信昵称
        </div>
        <div>
          <span>邀请码:</span> 微信昵称
        </div>
        <div>
          <span>上级:</span>微信昵称
        </div>
        <div>
          <span>微信昵称:</span>微信昵称
        </div>
        <div>
          <span>成为分销员时间:</span>微信昵称
        </div>
        <div>
          <span>可提现佣金:</span>微信昵称
        </div>
        <div>
          <span>佣金总收入:</span>微信昵称
        </div>
      </div>
    </div>

    <div class="mt20">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="查看下级" name="first">
          <div>
            <div class="flex-r-a talble-top">
              <div>头像/昵称</div>
              <div>等级</div>
              <div>消费金额</div>
              <div>售卖金额</div>
              <div>上级用户</div>
              <div>成为分销商时间</div>
              <div>关系</div>
            </div>
            <div class="flex-r-a each-content">
              <div>
                <img
                  class="each-head"
                  src="https://liemimofang.oss-cn-hangzhou.aliyuncs.com/backend/frontend_15484925435580.jpg"
                  alt
                >
              </div>
              <div>Vip</div>
              <div>￥500</div>
              <div>￥200</div>
              <div>微信昵称</div>
              <div>2018-12-09 13:02:21</div>
              <div>直接下级</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图标展示" name="second">
          <div>
            <v-tree
              :data="treeData2"
              :multiple="false"
              @async-load-nodes="asyncLoad2($event,index)"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="佣金情况" name="third">
          <div>
            <div class="flex-r-a talble-top">
              <div>剩余佣金</div>
              <div>变动佣金</div>
              <div>类型</div>
              <div>创建时间</div>
              <div>备注</div>
            </div>
            <div class="flex-r-a each-content">
              <div>100</div>
              <div>+10.00</div>
              <div>入账</div>
              <div>2018-12-09 13:02:21</div>
              <div>奖励</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="售卖情况" name="fourth">
          <div class>
            <div class="flex-r-e lookInfo">
              <el-input
                v-model="keyword"
                type="text"
                size="mini"
                class="keyword mr20"
                min="0"
                placeholder="请输入收货人/手机号/订单号"
              />
              <el-button type="primary" size="mini">查询</el-button>
            </div>
            <div class="flex-r-b order-title">
              <div class="flex-r-b">
                <div class="flex-2">商品</div>
                <div class="flex-1">价格/数量</div>
              </div>
              <div>退款退货</div>
              <div>买家</div>
              <div>下单时间</div>
              <div>订单状态</div>
              <div>实付金额</div>
            </div>
            <div class="each-order">
              <div class="order-des flex-r-b">
                <div class="order-left flex-r-s">
                  <div class="order-number mr20">订单号：LM12345678901234567</div>
                  <div class="order-way">自买</div>
                </div>
                <el-button type="primary" size="mini">查看详情</el-button>
              </div>
              <div class="flex-r-b each-order-attr">
                <div>
                  <div class="flex-r-b each-shop">
                    <div>
                      <img
                        class="oder-shop-img "
                        src="https://liemimofang.oss-cn-hangzhou.aliyuncs.com/backend/frontend_15484925435580.jpg"
                        alt
                      >
                    </div>
                    <div class="">测试商品001</div>
                    <div class="mr20">
                      <div class="mb10">100.00</div>
                      <div>1件</div>
                    </div>
                  </div>

                  <div class="flex-r-b">
                    <div>
                      <img
                        class="oder-shop-img "
                        src="https://liemimofang.oss-cn-hangzhou.aliyuncs.com/backend/frontend_15484925435580.jpg"
                        alt
                      >
                    </div>
                    <div >测试商品001</div>
                    <div class="mr20">
                      <div class="mb10">100.00</div>
                      <div>1件</div>
                    </div>
                  </div>
                </div>
                <div class="flex-1 flex-r-b shop-attr">
                  <div>&nbsp;</div>
                  <div>
                    微信昵称
                    收件人
                    15869639978
                  </div>
                  <div>2019-01-11 17:01:23</div>
                  <div>待付款</div>
                  <div>100.00</div>
                </div>

              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vTree from '@/components/tree/tree.vue'

// import editorDashboard from './editor'

export default {
  name: 'AdminDetial',
  components: { vTree },
  data() {
    return {
      id: '',
      keyword: '', // 模糊查询
      activeName2: 'first',
      treeData2: [
        {
          title: '图片',
          expanded: false,
          async: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    this.id = this.$route.query.id
    console.log(this.id)
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    async asyncLoad2(node) {
      const { checked = false } = node
      this.$set(node, 'loading', true)
      const pro = await new Promise(resolve => {
        setTimeout(resolve, 2000, [
          { title: '好的' + this.index, async: true },
          { title: 'test2', async: true },
          { title: 'test3' }
        ])
      })
      if (!node.hasOwnProperty('children')) {
        this.$set(node, 'children', [])
      }
      // console.log(node.children)
      node.children.push(...pro)
      this.$set(node, 'loading', false)
      if (checked) {
        this.$refs.tree2.childCheckedHandle(node, checked)
      }
      // console.log(this.treeData2)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../../src/styles/distribution.scss";

.admin-detial {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 30px;
  .admin-title {
    @include title-font(16px);
  }
  .user-detail {
    padding: 20px;
    margin-top: 20px;
    border: 1px solid #ebedf0;
    .each-head-url {
      width: 51px;
      height: 51px;
      border-radius: 51px;
      margin-right: 30px;
    }
    .detial-content {
      @include text-font(14px);
      flex-wrap: wrap;
      > div {
        letter-spacing: 1px;
        margin-right: 50px;
        line-height: 30px;
        > span {
          font-weight: 600;
          margin-right: 5px;
        }
      }
    }
  }
  .talble-top {
    background: #f7f7f7;
    height: 56px;
    text-align: center;
    @include title-font(14px);
    width: 100%;
    > div {
      min-width: 150px;
      padding: 0 10px;
    }
  }
  .each-content {
    @include text-font(14px);
    height: 56px;
    border-bottom: 1px solid #ebedf0;
    width: 100%;
    align-items: center;
    > div {
      min-width: 150px;
      padding: 0 10px;
      text-align: center;
    }
    .each-head {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .keyword {
    width: 200px;
  }
  .each-order {
    padding: 20px;
    @include boder-font;
    .order-des {
      height: 56px;
      @include title-font(14px);
    }
  }
  .oder-shop-img {
    width: 80px;
    height: 80px;
  }
  .lookInfo {
    margin-bottom: 20px;
  }
  .each-order-attr {
    @include text-font(14px);
    text-align: center;
    @include boder-font;
    padding: 20px;
    .shop-attr{
      >div{
      width: 150px;
      line-height: 20px;
      }
    }
    >div:nth-of-type(1){
      width: 300px;
    }
  }
  .order-way {
    color: #34a6db;
  }
  .order-title {
    height: 56px;
    background: #f7f7f7;
    padding: 0 40px;
    >div{
      width: 150px;
      text-align: center;

    }
    >div:nth-of-type(1){
      width: 300px;
    }
  }
  .each-shop{
    margin-bottom: 20px;
  }
}
</style>
