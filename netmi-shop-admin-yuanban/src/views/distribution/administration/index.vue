<template>
  <div v-loading="loading" class="administration" element-loading-text="拼命加载中">
    <!-- top部 -->
    <div class="admin-top">
      <div class="flex-r-s top-each-line">
        <div class="flex-r each-input-total">
          <div class="label">用户名称:</div>
          <el-input v-model="filterData.nickname" size="mini" placeholder class="input"/>
        </div>
        <div class="flex-r each-input-total">
          <div class="label">用户等级:</div>
          <el-select v-model="filterData.level" clearable size="mini" placeholder="请选择">
            <el-option
              v-for="item in people"
              :key="item.value"
              :label="item.name"
              :value="item.level"
            />
          </el-select>
        </div>

        <div class="flex-r each-input-total">
          <div class="label">手机号码:</div>
          <el-input v-model="filterData.phone" size="mini" placeholder class="input"/>
        </div>
      </div>

      <div class="flex-r-s top-each-line">
        <div class="flex-r each-input-total each-input-total-two">
          <div class="label">成为时间:</div>
        </div>
        <div class="block">
          <el-date-picker
            v-model="value7"
            :picker-options="pickerOptions2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
          />
        </div>
        <!-- <div class="flex-r each-input-total">
          <div class="label">至:</div>
          <el-input
            v-model="input2"
            size="mini"
            placeholder="请选择日期"
            suffix-icon="el-icon-date"
            class="input"
          />
        </div>
        <div class="vip-date-label">近7天</div>
        <div class="vip-date-label">近30天</div>-->
      </div>

      <div class="flex-r-s top-each-line">
        <el-button :loading="lookLoading" type="primary" size="mini" @click="LookingButton">查询</el-button>
        <!-- <el-button type="warning exexl" size="mini">用户导出</el-button> -->
        <export-data
          :t-header-father="tHeaderFather"
          :is-for-bidden="isForBiddenExportData"
          :export-lists-father="ExportListsFather"
          :filter-array-lists="filterArrayLists"
          :export-file-name="ExportFileName"
        />
      </div>
    </div>
    <!-- list -->
    <div class="admin-list">
      <div class="list-top flex-r-a">
        <div class="each-atr-circle">
          <div :class="checkedAll?'checked':''" class="circle mr10" @click="changeClick" />
        </div>
        <div class="each-atr">用户</div>
        <div class="each-atr each-atr-two">统计</div>
        <div class="each-atr-three">下级会员数</div>
        <div class="each-atr each-atr-four">成为时间</div>
        <div class="each-atr-five">操作</div>
      </div>
      <div class="list-total">
        <div v-for="(item,index) in distributorList" :key="index" class="each-list flex-r-a">
          <div class="each-atr-circle">
            <!-- <div class="circle"/> -->
            <div :class="item.checked?'checked':''" class="circle mr10" @click="item.checked=!item.checked" />
          </div>
          <div class="each-atr flex-r">
            <img
              class="each-head-url"
              src="https://liemimofang.oss-cn-hangzhou.aliyuncs.com/backend/frontend_15484925435580.jpg"
              alt
            >
            <div class="user-info">
              <div class="user-name">{{ item.nickname }}</div>
              <div class="user-phone">{{ item.phone }}</div>
              <div class="user-level">等级：{{ item.level }}</div>
              <div class="user-ceode">邀请码：{{ item.share_code }}</div>
              <div class="user-superior">上级：{{ item.up_nickname }}</div>
            </div>
          </div>
          <div class="each-atr each-atr-two">
            <div>消费：{{ item.consume }}</div>
            <div>收益：{{ item.income }}</div>
          </div>
          <div class="each-atr-three">{{ item.hand_count }}</div>
          <div class="each-atr each-atr-four">{{ item.update_level_time }}</div>
          <div class="flex-r-b operate each-atr-five">
            <router-link :to="{ path: '/distribution/administration/detail', query: { id:item.id }}" tag="div" class="each-click">查看详情</router-link>
            <div class="each-click" @click="openDialog(1,item.id)">设置等级</div>
            <div class="each-click" @click="openDialog(2,item.id)">调整收益</div>
            <div class="each-click" @click="openDialog(3,item.id)">发放优惠券</div>
            <div class="each-click">导出下级</div>
          </div>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <div class="list-bottom flex-r-b">
      <div class="flex-r-s">
        <div :class="checkedAll?'checked':''" class="circle mr10" @click="changeClick" />
        <div class="list-bottom-button">当页全选</div>
        <el-button type="primary" size="mini">设置等级</el-button>
        <el-button type="primary" size="mini">调整收益</el-button>
        <el-button type="primary" size="mini">发放优惠券</el-button>
      </div>
      <div>
        <div class="block">
          <el-pagination
            :current-page="filterData.start_page+1"
            :page-size="filterData.pages"
            :total="100"
            layout="total, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="showindex==1?'设置分销员':showindex==2?'调整收益':'发放优惠券'"
      width="400px"
    >
      <span v-if="showindex==1">
        <div class="mb20">当前等级：普通用户</div>
        <div class="flex-r-s">
          <div class="label">设置等级：</div>
          <el-select v-model="levelValue" class="moeny-input" size="mini" placeholder="请选择">
            <el-option
              v-for="item in people"
              :key="item.value"
              :label="item.name"
              :value="item.level"
            />
          </el-select>
        </div>
      </span>
      <span v-if="showindex==2">
        <div class="mb20">分销员昵称：微信昵称</div>
        <div class="mb20">当前收益余额：10.00</div>
        <div class="flex-r-s">
          <div class="label">增加或减少余额：</div>
          <el-input v-model="input2" size="mini" class="moeny-input"/>
        </div>
      </span>
      <span v-if="showindex==3">
        <div class="flex-r-s mb20">
          <div class="label min-width">选择优惠券：</div>
          <el-select v-model="levelValue" class="moeny-input" size="mini" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="flex-r-s">
          <div class="label min-width">数量:</div>
          <el-input v-model="input2" size="mini" class="moeny-input"/>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import XLSX from 'xlsx'
// import editorDashboard from './editor'
import ExportData from '@/components/excel'
import { pushList } from '@/api/distribution' // 验权

export default {
  name: 'Administration',
  components: { ExportData },

  data() {
    return {
      choiceId: '', // 选择id
      people: [], // 推手列表
      loading: false, // 页面 加载
      lookLoading: false, // 查找按钮
      filterData: {
        nickname: '', // 昵称
        phone: '', // 手机号
        level: '', // 推手等级
        start_page: 0, // 页数
        pages: 20, // 条数
        start_time: '', // 开始时间
        end_time: '' // 结束 时间
      },
      distributorList: [
        {
          id: '362',
          uid: '1337',
          nickname: 'nickname', // 昵称
          head_url:
            'https://liemimofang.oss-cn-hangzhou.aliyuncs.com/backend/frontend_15484925435580.jpg', // 头像
          phone: '17858513811', // 手机号
          level: '4', // 等级
          share_code: '9897ea', // 邀请码
          up_nickname: '2', // 上级昵称
          income: '300.00', // 收益
          consume: '0.00', // 消费
          hand_count: '0', // 会员数
          update_level_time: '2019-03-07 13:55:43', // 成为时间
          checked: false
        },
        {
          id: '362',
          uid: '1337',
          nickname: '王和锋', // 昵称
          head_url:
            'https://liemimofang.oss-cn-hangzhou.aliyuncs.com/backend/frontend_15484925435580.jpg', // 头像
          phone: '17858513811', // 手机号
          level: '4', // 等级
          share_code: '9897ea', // 邀请码
          up_nickname: '2', // 上级昵称
          income: '300.00', // 收益
          consume: '0.00', // 消费
          hand_count: '0', // 会员数
          update_level_time: '2019-03-07 13:55:43', // 成为时间
          checked: true
        }
      ], // 分销员列表
      showindex: 1,
      dialogVisible: false, //
      tHeaderFather: ['用戶', '統計'], // 下载表头
      isForBiddenExportData: false, // 导出按钮 true false
      ExportListsFather: [
        {
          author: 'Carol',
          comment_disabled: true,
          content_short: '我是测试数据',
          display_time: '1974-06-19 10:01:57',
          forecast: 71.85,
          id: 1,
          importance: 2,
          pageviews: 1670,
          reviewer: 'Ruth',
          status: 'deleted',
          timestamp: 1126391703464,
          title: '哦i啥v就开始对方能看出来市场v恐龙世界',
          type: 'JP'
        },
        {
          author: 'Carol111',
          comment_disabled: true,
          content_short: '178585138111785851381117858513811',
          display_time: '1974-06-19 10:01:57',
          forecast: 71.85,
          id: 1,
          importance: 2,
          pageviews: 1670,
          reviewer: 'Ruth',
          status: 'deleted',
          timestamp: 1126391703464,
          title: '哦i啥v就开始对方能看出来市场v恐龙世界',
          type: 'JP'
        }
      ], // 导出所有数据
      filterArrayLists: ['author', 'content_short'], // 过滤条件
      ExportFileName: '王和锋', // 用户过滤条件
      input2: '',
      currentRole: 'adminDashboard',
      levelOptions: [
        { id: 1, name: '全部' },
        { id: 2, name: '普通用戶' },
        { id: 3, name: 'vip' },
        { id: 4, name: '经理' },
        { id: 5, name: '总监' }
      ],
      levelValue: '全部',
      currentPage: 1,
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近半年',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value7: ''
    }
  },
  computed: {
    ...mapGetters(['roles']),
    checkedAll: function() {
      // `this` 指向 vm 实例
      let A = true
      this.distributorList.forEach(element => {
        if (!element.checked) {
          A = false
        }
      })
      return A
    }
  },
  created() {
    this.getPushList()
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  },
  methods: {
    // 获取列表
    changeClick() {
      if (this.checkedAll) {
        this.distributorList.forEach(element => {
          element.checked = false
        })
      } else {
        this.distributorList.forEach(element => {
          element.checked = true
        })
      }
    },
    getPushList() {
      const self = this
      self.loading = true
      return new Promise((resolve, reject) => {
        pushList({})
          .then(response => {
            if (response.data.errcode === 0) {
              self.people = response.data.data
            } else {
              self.$message.error(response.data.errmsg)
            }
            self.loading = false
          })
          .catch(error => {
            self.loading = false
            reject(error)
          })
      })
    },
    LookingButton() {
      console.log(this.filterData)
    },
    changeDate(e) {
      this.filterData.start_time =
        e[0].getFullYear() + '-' + (e[0].getMonth() + 1) + '-' + e[0].getDate()
      this.filterData.end_time =
        e[1].getFullYear() + '-' + (e[1].getMonth() + 1) + '-' + e[1].getDate()
      console.log(this.filterData.start_time)
      console.log(this.filterData.end_time)
    },
    openDialog(e) {
      this.showindex = e
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.administration {
  .el-date-editor .el-range-separator {
    padding: 0;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../src/styles/distribution.scss";
.administration {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 30px;
  .checked {
    border-color: #409eff;
    background: #409eff;
    position: relative;
  }
  .checked::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .circle {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #dcdfe6;
  }

  .admin-top {
    background: rgb(247, 247, 247);
    padding: 20px;
    width: 100%;
    .top-each-line {
      margin-bottom: 15px;
    }
    .each-input-total {
      margin-right: 30px;
    }
    .each-input-total-two {
      margin: 0;
    }
    .input {
      width: 143px;
    }
    .label {
      margin-right: 15px;
      font-family: SourceHanSansSC;
      font-weight: 400;
      font-style: normal;
      letter-spacing: 0px;
      text-decoration: none;
      @include text-font;
    }
    .vip-date-label {
      width: 56px;
      height: 28px;
      left: 780px;
      top: 192px;
      color: rgba(16, 16, 16, 0.52);
      background-color: rgb(221, 223, 223);
      border-radius: 5px;
      font-size: 14px;
      padding: 0px;
      text-align: center;
      line-height: 28px;
      font-weight: normal;
      font-style: normal;
      margin-right: 15px;
    }
    .find {
      margin-right: 30px;
    }
    .exexl {
      background: rgb(255, 152, 0);
    }
  }

  .admin-list {
    margin-top: 20px;
    text-align: center;
    @include title-font;
    .list-top {
      background: #f7f7f7;
      height: 58px;
      .each-atr {
        line-height: 24px;
        flex: 1;
      }
      .each-atr-circle {
        width: 50px;
        .circle {
          margin:0 auto;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #dcdfe6;
        }
        .checked {
          border-color: #409eff;
          background: #409eff;
          position: relative;
        }
        .checked::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          background-color: #fff;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .each-atr-three {
        width: 100px;
      }
      .each-atr-five {
        width: 150px;
      }
    }
    .each-list {
      padding: 20px 0;
      @include text-font;
      .each-atr {
        line-height: 24px;
        flex: 1;
      }
      .each-atr-circle {
        width: 50px;
        .circle {
          margin:0 auto;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #dcdfe6;
        }
        .checked {
          border-color: #409eff;
          background: #409eff;
          position: relative;
        }
        .checked::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          background-color: #fff;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .each-atr-three {
        width: 100px;
      }
      .each-atr-five {
        line-height: 24px;
        width: 150px;
      }
    }
    .each-head-url {
      width: 51px;
      height: 51px;
      border-radius: 51px;
      margin-right: 15px;
    }
    .user-info {
      font-family: SourceHanSansSC;
      font-weight: 400;
      font-size: 12px;
      color: #666;
      font-style: normal;
      letter-spacing: 0px;
      line-height: 24px;
      text-decoration: none;
    }
    .each-click {
      color: #34a6db;
      cursor: pointer;
      margin-bottom: 5px;
    }
    .operate {
      flex-wrap: wrap;
    }
  }
  .list-bottom {
    .circle {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      border: 1px solid #999;
    }
    .list-bottom-button {
      margin-right: 15px;
      @include title-font;
    }
  }
  .moeny-input {
    width: 100px;
  }
  .min-width {
    width: 90px;
  }
}
</style>
