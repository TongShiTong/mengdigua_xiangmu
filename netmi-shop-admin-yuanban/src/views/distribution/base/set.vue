<template>
  <div v-loading="loading" class="base-set" element-loading-text="拼命加载中">
    <div class="set-top">
      <div class="flex-r-s">
        <div class="label mr20">成为会员条件：</div>
        <el-radio v-model="choiceType" label="1">购买礼包</el-radio>
        <el-radio v-model="choiceType" label="2">邀请用户注册</el-radio>
        <!-- <check-box :check-data="checKData" @change-status="changeStatus($event)"/> -->
      </div>
      <div v-if="choiceType==2" class="flex-r-s mt20">
        <div class="label mr20">设置注册用户人数：</div>
        <el-input
          v-model="levelData.invite_num"
          size="mini"
          type="number"
          class="input-width mr20"
          placeholder="设置注册用户人数："
        />
      </div>
      <div class="flex-r-s mt20">
        <div class="label mr20">团队追溯级别：</div>
        <el-input
          v-model="levelData.team_trace_level"
          type="number"
          size="mini"
          class="input-width mr20 input-width-two"
          placeholder="默认填写0，则为无限级追溯"
        />
      </div>
      <div class="flex-r-s mt20">
        <div class="label mr20">粉丝保护期：</div>
        <el-select v-model="fansChoice" size="mini" class="mr20" clearable placeholder="请选择">
          <el-option
            v-for="(item,index) in fansOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-if="fansChoice===0"
          v-model="levelData.fans_protection"
          type="number"
          size="mini"
          class="input-width mr20 "
          placeholder="请输入粉丝保护期"
        />
        <el-button :loading="levelLoading" type="primary" size="mini" @click="saveGiftSetting">保存</el-button>
      </div>
    </div>
    <!-- 添加分销人员 -->
    <div class="set-level mt20">
      <div>
        <el-button type="primary" size="mini" @click="open();inputWay=1">添加分销员等级</el-button>
      </div>
      <div class="talble-top mt20 flex-r-b">
        <div class="flex-r-s flex-3">
          <div class="each-table-title">等级权重</div>
          <div class="each-table-title">等级名称</div>
          <div class="each-table-title">用户数</div>
          <div class="each-table-title">提现手续费</div>
        </div>
        <div class="each-table-title">操作</div>
      </div>
      <div class="table-content">
        <div v-for="(item,index) in people" :key="index" class="each-content flex-r-b">
          <div class="flex-r-s flex-3">
            <div class="each-content-attr">{{ item.level }}</div>
            <div class="each-content-attr">{{ item.name }}</div>
            <div class="each-content-attr">{{ item.num }}</div>
            <div class="each-content-attr">{{ item.fee }}</div>
          </div>
          <div class="flex-1 operate">
            <el-button @click="open(item);inputWay=2">编辑</el-button>
            <span>|</span>
            <el-button slot="reference" @click="DeteleDig(1,item.id)">删除</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 升级规则配置 -->
    <div class="upgrade-rule mt20">
      <div class="title">升级规则配置：</div>
      <div class="flex-r-b mt20 upgrade-title">
        <div class="flex-1">等级权重</div>
        <div class="flex-1">等级名称</div>
        <div class="flex-4">升级规则</div>
        <div class="flex-1">操作</div>
      </div>
      <!-- 内容 -->
      <div class="upgrade-content">
        <div v-for="(item,index) in upgradeRule" :key="index" class="each-content flex-r-b">
          <div class="flex-1">{{ item.people_level }}</div>
          <div class="flex-1">{{ item.name }}</div>
          <div v-if="index==0" class="flex-4">系统默认成为分销员后即是该等级</div>
          <div v-else class="flex-4">
            <div class="each-attr flex-r-s">
              <div>
                <div v-for="(item1,index2) in item.level" :key="index2" class="flex-r-s ptb10">
                  <!-- 类型1 -->
                  <div class="button-expend" @click="item1.status==1?item1.status=2:item1.status=1;item1.name='';item1.money='';item1.member_num=''">
                    <div :class="item1.status==2?'checked':''" class="circle mr10"/>
                  </div>
                  <div class="flex-r-s">
                    <div>
                      <el-select
                        v-model="item1.name"
                        size="mini"
                        class="mr5"
                        clearable
                        placeholder="请选择"
                        @change="optionChange(item1.status,index,index2,$event,item1.name)"
                        @clear="clearValue(item1.status,index,index2,$event,item1.name)"
                      >
                        <el-option
                          v-for="(option,index3) in item.options"
                          :key="index3"
                          :label="option.name"
                          :value="index3"
                          :disabled="option.disabled"
                        />
                      </el-select>
                    </div>
                    <div class="flex-r-s">
                      <div class="mr5">实际消费</div>
                      <el-input
                        v-model="item1.money"
                        type="number"
                        size="mini"
                        min="0"
                        class="table-input mr5"
                        placeholder
                        @change="numberChange(item1.status,index,index2)"
                      />
                      <div class="mr5">元达到</div>
                      <el-input
                        v-model="item1.member_num"
                        type="number"
                        size="mini"
                        class="table-input mr5"
                        min="0"
                        placeholder
                        @change="numberChange(item1.status,index,index2)"
                      />
                      <div class="mr5">人</div>
                      <el-button type="primary" size="mini" @click="addArray(index,index2)">添加</el-button>
                      <el-button
                        v-if="index2!==0"
                        type="warning"
                        size="mini"
                        @click="deleteArray(index,index2)"
                      >删除</el-button>
                    </div>
                  </div>
                </div>
                <div class="flex-r-s ptb10">
                  <!-- 类型2 -->
                  <div class="button-expend" @click="item.chekced1=!item.chekced1;;item.sale_commission=''">
                    <div :class="item.chekced1?'checked':''" class="circle mr10"/>
                  </div>
                  <div class="flex-r-s">
                    <div class="mr5">该分销员实际销售佣金满</div>
                    <el-input
                      v-model="item.sale_commission"
                      type="number"
                      size="mini"
                      min="0"
                      class="table-input mr5"
                      placeholder
                      @change="numberChange2(item.chekced1,index,1)"
                    />
                    <div>元</div>
                  </div>
                </div>
                <div class="flex-r-s ptb10">
                  <!-- 类型3 -->
                  <div class="button-expend" @click="item.chekced2=!item.chekced2;item.order_num=''">
                    <div :class="item.chekced2?'checked':''" class="circle mr10"/>
                  </div>
                  <div class="flex-r-s">
                    <div class="mr5">累计订单数（自买/售卖）满</div>
                    <el-input
                      v-model="item.order_num"
                      type="number"
                      size="mini"
                      min="0"
                      class="table-input mr5"
                      placeholder
                      @change="numberChange2(item.chekced2,index,2)"
                    />
                    <div>单</div>
                  </div>
                </div>
                <div class="flex-r-s ptb10">
                  <!-- 类型4 -->
                  <div class="button-expend" @click="item.chekced3=!item.chekced3;item.invite_num=''">
                    <div :class="item.chekced3?'checked':''" class="circle mr10"/>
                  </div>
                  <div class="flex-r-s">
                    <div class="mr5">邀请关注公众号人数满</div>
                    <el-input
                      v-model="item.invite_num"
                      type="number"
                      size="mini"
                      min="0"
                      class="table-input mr5"
                      placeholder
                      @change="numberChange2(item.chekced3,index,3)"
                    />
                    <div>人</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <el-button v-if="index!==0" type="danger" size="mini" @click="DeteleDig(2,index)">清除</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="advice">提示：仅统计等级设置后分销员的销售佣金、订单数、关注公众号人数数据，设置前的历史数据暂不统计</div>
    <div class="mt20">
      <el-button :loading="saveLoading" type="primary" size="mini" @click="saveEnd()">保存</el-button>
    </div>

    <el-dialog :visible.sync="centerDialogVisible" title="添加分销员等级 " width="30%" center>
      <div class="flex-r-s mt20">
        <div class="label label-two mr20">等级权重：</div>
        <el-input
          v-model="inputInfo.level"
          :disabled="inputWay==2"
          type="number"
          class="input-width mr20"
          placeholder
        />
      </div>
      <div class="flex-r-s mt20">
        <div class="label label-two mr20">等级名称：</div>
        <el-input v-model="inputInfo.name" type="text" class="input-width mr20" placeholder/>
      </div>
      <div class="flex-r-s mt20">
        <div class="label label-two mr20">提现手续费：</div>
        <el-input
          v-model="inputInfo.fee"
          :autosize="{ minRows: 4, maxRows: 8}"
          type="number"
          class="input-width mr20"
          placeholder
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          v-if="inputWay==1"
          :loading="createLoading"
          type="primary"
          @click="createMumber"
        >确 定</el-button>
        <el-button v-else :loading="createLoading" type="primary" @click="handUpdateWay">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="visibleD"
      :title="detaleway===1?'删除推手，会同时删除对应分佣、分佣配置和升级规则':'会清空'+people[clearIndex].name+'全部数据'"
      width="300px"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleD = false">取 消</el-button>
        <el-button
          v-if="detaleway===1"
          :loding="deteteLoading"
          type="primary"
          @click="itemDelete"
        >确 定</el-button>
        <el-button v-else type="primary" @click="itemdataDelete(clearIndex)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { pushList, handCreate, handUpdate, handDelete, updateRule, saveUpdateRule, giftSetting, saveGiftSetting } from '@/api/distribution' // 验权
import checkBox from '@/components/checkbox'
// import Vue from 'vue'
// import editorDashboard from './editor'

//
export default {
  name: 'BaseSet',
  components: { checkBox },
  data() {
    return {
      choiceType: '1',
      created: 1, // 创建一次
      options: [],
      optionstwo: [{}],
      value4: '',
      chekced: false, // 勾选zao
      checKData: [
        { name: '购买礼包', chekced: true, id: 1 },
        { name: '邀请注册用户', chekced: false, id: 2 }
      ],

      inputInfo: {
        name: '',
        level: '',
        fee: ''
      },
      rewardtext: '',
      loading: false, // 页面加载指令
      levelLoading: false, // 保存按钮
      deteteLoading: false, // 删除按钮
      people: [], // 分销员列表
      centerDialogVisible: false, // 对话框
      visibleD: false, // 删除对话框
      deleteId: 0, // 删除id
      updateId: 0, // 更新id
      is_multiple: false,
      createLoading: false, // 创建 loading
      inputWay: 1, // 添加方法 1 编辑方法 2
      detaleway: 1, // 人员，2 升级规则
      upgradeRule: [], // 升级规则数组
      clearIndex: 0, // 清楚索引
      saveLoading: false, // 清楚索引
      levelData: {
        purchase: 1, // 购买礼包
        invite_num: 0, // 设置注册用户人数
        fans_protection: 0, // 粉丝保护期
        team_trace_level: 0 // 团队追溯级别：
      },
      fansOptions: [
        { value: -1, label: '永久' },
        { value: 7, label: '7天' },
        { value: 10, label: '10天' },
        { value: 15, label: '15天' },
        { value: 0, label: '自定义' }
      ],
      fansChoice: null
    }
  },
  computed: {
    ...mapGetters(['roles']),
    gift: function() {
      const A = []
      this.checKData.forEach((element, index) => {
        if (element.chekced) {
          A.push(element.id)
        }
      })
      return A
    },
    chocice: function() {
      return this.gift.includes(2)
    }
  },
  created() {
    this.getPushList()
    this.getGiftSetting()
  },

  methods: {
    // 升级验证
    numberChange(e, index, index2) {
      if (e === 1) {
        this.upgradeRule[index].level[index2].member_num = ''
        this.upgradeRule[index].level[index2].money = ''
        this.$message.error(
          '请先勾选' +
            this.upgradeRule[index].name +
            '的第' +
            (index2 + 1) +
            '个'
        )
      }
    },
    optionChange(e, index, index2, index3) {
      if (index3 || index3 === 0) {
        if (e === 1) {
          this.upgradeRule[index].level[index2].name = ''
          this.$message.error(
            '请先勾选' +
            this.upgradeRule[index].name +
            '的第' +
            (index2 + 1) +
            '个'
          )
        } else {
          var getValue = this.upgradeRule[index].options[index3].value
          this.upgradeRule[index].level[index2].team_level = getValue.id
          this.upgradeRule[index].level[index2].type = getValue.type
          // this.upgradeRule[index].options[index3].disabled = true
          this.upgradeRule[index].options.forEach((element, eIndex) => {
            element.disabled = false
          })
          this.upgradeRule[index].level.forEach((element2, eIndex2) => {
          //  两个索引相等 而且有值disabled选择
            if (element2.name !== '') {
              this.upgradeRule[index].options[element2.name].disabled = true
            }
          })
        }
      }
    },
    clearValue(e, index, index2, index3) {
      this.upgradeRule[index].options.forEach((element, eIndex) => {
        element.disabled = false
      })
      this.upgradeRule[index].level.forEach((element2, eIndex2) => {
        //  两个索引相等 而且有值disabled选择
        if (element2.name !== '') {
          this.upgradeRule[index].options[element2.name].disabled = true
        }
      })
    },
    numberChange2(e, index, type) {
      if (!e) {
        const secondLength = this.upgradeRule[index].level.length
        if (type === 1) {
          this.upgradeRule[index].sale_commission = ''
        } else if (type === 2) {
          this.upgradeRule[index].order_num = ''
        } else {
          this.upgradeRule[index].invite_num = ''
        }
        this.$message.error(
          '请先勾选' +
            this.upgradeRule[index].name +
            '的第' +
            (type + secondLength) +
            '个'
        )
      }
    },
    addArray(index, index2) {
      this.upgradeRule[index].level.splice(index2 + 1, 0, {
        level_id: this.people[index].level, // 等级
        team_level: '', // 团队还是直属
        member_num: '', // 邀请人数
        money: '', // 消费金额
        type: '', //  选择身份
        name: '', // 选择名字
        status: 1 //  1 没有勾选 2 勾选
      })
    },
    deleteArray(index, index2) {
      this.upgradeRule[index].level.splice(index2, 1)

      // 选项重置
      this.upgradeRule[index].options.forEach((element, eIndex) => {
        element.disabled = false
      })
      this.upgradeRule[index].level.forEach((element2, eIndex2) => {
        //  两个索引相等 而且有值disabled选择
        if (element2.name !== '') {
          this.upgradeRule[index].options[element2.name].disabled = true
        }
      })
    },
    changeStatus(event) {
      const e = event.status
      const index = event.index

      this.checKData[index].chekced = e
    },
    changeContent(e) {
      e = !e
    },
    // 获取列表
    getPushList() {
      const self = this
      self.loading = true
      return new Promise((resolve, reject) => {
        pushList({})
          .then(response => {
            if (response.data.errcode === 0) {
              self.people = response.data.data
              this.upgradeRule = [] // 初始化
              self.initRule()
              self.getUpdateRule()
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
    // 获取礼包接口
    getGiftSetting() {
      const self = this
      self.loading = true
      return new Promise((resolve, reject) => {
        giftSetting({})
          .then(response => {
            if (response.data.errcode === 0) {
              if (!response.data.data.purchase) {
                self.levelData = {
                  purchase: 1, // 购买礼包
                  invite_num: 0, // 设置注册用户人数
                  fans_protection: 0, // 粉丝保护期
                  team_trace_level: 0 // 团队追溯级别：
                }
              } else {
                const res = response.data.data
                self.levelData.purchase = res.purchase
                self.levelData.id = res.id
                self.levelData.invite_num = res.invite_num
                self.levelData.fans_protection = res.fans_protection
                self.levelData.team_trace_level = res.team_trace_level
                if (res.fans_protection === '-1' || res.fans_protection === '7' || res.fans_protection === '15' || res.fans_protection === '10') {
                  self.fansChoice = parseInt(res.fans_protection)
                } else {
                  self.fansOptions === 0
                }
              }
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
    // 保存礼包接口
    saveGiftSetting() {
      const self = this
      // 1购 0 不勾选
      if (self.fansChoice == null && parseInt(self.levelData.fans_protection) !== -1) {
        self.$message.error('粉丝保护期不能不能为空')
        return false
      }
      if (self.levelData.fans_protection === '') {
        self.$message.error('粉丝保护期不能为空')
        return false
      }
      self.levelData.purchase = self.choiceType === '1' ? 1 : 0
      self.levelData.invite_num = self.choiceType === '2' ? self.levelData.invite_num : 0
      self.levelData.fans_protection = self.fansChoice === 0 ? self.levelData.fans_protection : self.fansChoice || 0
      self.levelLoading = true
      return new Promise((resolve, reject) => {
        saveGiftSetting(self.levelData)
          .then(response => {
            if (response.data.errcode === 0) {
              self.$message.success('保存成功')
              self.getGiftSetting()
            } else {
              self.$message.error(response.data.errmsg)
            }
            self.levelLoading = false
          })
          .catch(error => {
            self.levelLoading = false
            reject(error)
          })
      })
    },

    // 打开对话框
    open(e) {
      this.centerDialogVisible = true
      if (e) {
        this.updateId = e.id
        this.inputInfo.name = e.name
        this.inputInfo.level = e.level
        this.inputInfo.fee = e.fee
      }
    },
    DeteleDig(way, e) {
      this.detaleway = way
      this.visibleD = true
      if (way === 1) {
        this.deleteId = e
      } else {
        this.clearIndex = e
      }
    },
    itemDelete() {
      // this.people.splice(this.deleteId, 1)
      const self = this
      self.visibleD = false
      self.deteteLoading = true
      return new Promise((resolve, reject) => {
        handDelete({
          id: self.deleteId
        })
          .then(response => {
            if (response.data.errcode === 0) {
              self.$message.success('删除成功')
              self.getPushList()
            } else {
              self.$message.error(response.data.errmsg)
            }
            self.deteteLoading = false
          })
          .catch(error => {
            self.deteteLoading = false
            reject(error)
          })
      })
    },
    itemdataDelete(index) {
      this.visibleD = false
      this.initEachItem(index)
    },
    handUpdateWay() {
      // this.people.splice(this.deleteId, 1)
      const self = this
      self.centerDialogVisible = false
      self.createLoading = true
      var inputInfo = self.inputInfo
      inputInfo.id = self.updateId
      return new Promise((resolve, reject) => {
        handUpdate(inputInfo)
          .then(response => {
            if (response.data.errcode === 0) {
              self.inputInfo.name = ''
              self.inputInfo.level = ''
              self.inputInfo.free = ''
              self.$message.success('修改成功')
              self.getPushList()
            } else {
              self.$message.error(response.data.errmsg)
            }
            self.createLoading = false
          })
          .catch(error => {
            self.createLoading = false
            reject(error)
          })
      })
    },
    createMumber() {
      const self = this
      self.centerDialogVisible = false
      self.createLoading = true
      return new Promise((resolve, reject) => {
        handCreate(self.inputInfo)
          .then(response => {
            if (response.data.errcode === 0) {
              self.inputInfo.name = ''
              self.inputInfo.level = ''
              self.inputInfo.free = ''
              self.$message.success('添加成功')
              self.getPushList()
            } else {
              self.$message.error(response.data.errmsg)
            }
            self.createLoading = false
          })
          .catch(error => {
            self.createLoading = false
            reject(error)
          })
      })
    },
    // 获取列表
    getUpdateRule() {
      const self = this
      self.loading = true
      return new Promise((resolve, reject) => {
        updateRule({})
          .then(response => {
            if (response.data.errcode === 0) {
              if (!response.data.data) {
                response.data.data = []
              }
              const tem = response.data.data
              // 有值的情况下
              tem.forEach((element, index) => {
                // 邀请人数
                if (element.invite_num === '0') {
                  self.upgradeRule[index].chekced3 = false
                } else {
                  self.upgradeRule[index].chekced3 = true
                  self.upgradeRule[index].invite_num = element.invite_num
                }
                // 权重
                self.upgradeRule[index].level_id = element.level_id
                // 订单数
                if (element.order_num === '0') {
                  self.upgradeRule[index].chekced2 = false
                } else {
                  self.upgradeRule[index].chekced2 = true
                  self.upgradeRule[index].order_num = element.order_num
                }
                //  销售金额
                if (element.sale_commission === '0.00') {
                  self.upgradeRule[index].chekced1 = false
                } else {
                  self.upgradeRule[index].chekced1 = true
                  self.upgradeRule[index].sale_commission = element.sale_commission
                }
                //  level 数组
                // 数据库 多条 那么 就添加
                const overLength =
                  element.level.length - self.upgradeRule[index].level.length
                if (overLength > 0) {
                  for (let i = 0; i < overLength; i++) {
                    self.upgradeRule[index].level.push({
                      name: '', // 选择名字
                      level_id: element.level, // 等级
                      team_level: '', // 选择等级id
                      member_num: '', // 邀请人数
                      money: '', // 消费金额
                      type: '', //   1:团队；2直属
                      status: 1 //  1 没有勾选 2 勾选
                    })
                  }
                }
                element.level.forEach((element1, index1) => {
                  self.upgradeRule[index].level.forEach((element2, index2) => {
                    if (index1 === index2) {
                      // 等级
                      element2.level_id = element1.level_id
                      element2.team_level = element1.team_level
                      element2.member_num = element1.member_num
                      element2.money = element1.money
                      element2.status = element1.status
                      element2.type = element1.type
                      if (element2.status === '2') {
                        self.upgradeRule[index].options.forEach((element3, index3) => {
                          // 记录选择结果
                          if (element3.value.id === element2.team_level && parseInt(element3.value.type) === parseInt(element2.type)) {
                            element2.name = index3
                          }
                        })
                      }
                    }
                    if (element2.name !== '') {
                      self.upgradeRule[index].options[element2.name].disabled = true
                    }
                  })
                })
              })
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
    // 初始化规则
    initRule() {
      // sale_commission销售佣金 //order_num订单数   invite_num邀请人数
      this.people.forEach((element, index) => {
        this.upgradeRule.push({
          people_level: element.level,
          level_id: element.level, // 等级
          sale_commission: '', // 销售金额
          order_num: '', // 订单数
          invite_num: '', // 邀请人数
          name: element.name, // 名字  保存删除
          chekced1: false, // 勾选1    保存删除
          chekced2: false, // 勾选2    保存删除
          chekced3: false, // 勾选3    保存删除
          level: [
            {
              level_id: element.level, // 等级
              team_level: '', // 选择等级id
              member_num: '', // 邀请人数
              money: '', // 消费金额
              type: '', //   1:团队；2直属
              status: 1, //  1 没有勾选 2 勾选
              name: '' // 选择名字
            }
          ],
          options: []
        })
      })
      // (1 0)    (2 0 2 1)
      for (let i = 0; i < this.upgradeRule.length; i++) {
        for (let j = 0; j < this.people.length; j++) {
          if (i > 0 && i > j) {
            this.upgradeRule[i].options.push({
              name: '直属下级' + this.people[j].name,
              value: { type: 1, id: this.people[j].level },
              id: j + 1,
              disabled: false
            })
            this.upgradeRule[i].options.push({
              name: '团队内' + this.people[j].name,
              value: { type: 2, id: this.people[j].level },
              id: j + 10001,
              disabled: false
            })
          }
        }
      }
    },
    initEachItem(index) {
      // this.upgradeRule.splice(index, 1)
      this.upgradeRule.splice(index, 1, {
        people_level: this.people[index].level,
        level_id: this.people[index].level, // 等级
        sale_commission: '', // 销售金额
        order_num: '', // 订单数
        invite_num: '', // 邀请人数
        name: this.people[index].name, // 名字  保存删除
        chekced1: false, // 勾选1    保存删除
        chekced2: false, // 勾选2    保存删除
        chekced3: false, // 勾选3    保存删除
        level: [
          {
            name: '', // 选择名字
            level_id: this.people[index].level, // 等级
            team_level: '', // 团队还是直属
            member_num: '', // 邀请人数
            money: '', // 消费金额
            type: '', //  选择身份
            status: 1 //  1 没有勾选 2 勾选
          }
        ],
        options: []
      })
      const i = index
      for (let j = 0; j < this.people.length; j++) {
        if (i > 0 && i > j) {
          this.upgradeRule[i].options.push({
            name: '直属下级' + this.people[j].name,
            value: { type: 1, id: this.people[j].level },
            id: j + 1,
            disabled: false
          })
          this.upgradeRule[i].options.push({
            name: '团队内' + this.people[j].name,
            value: { type: 2, id: this.people[j].level },
            id: j + 10001,
            disabled: false

          })
        }
      }
    },
    saveEnd() {
      const self = this
      const params = []
      for (let i = 0; i < this.upgradeRule.length; i++) {
        if (i > 0) {
          var element = this.upgradeRule[i]
          if (element.chekced1 && element.sale_commission === '') {
            self.$message.error(self.people[i].name + '实际销售佣金不能为空')
            return false
          }
          if (element.chekced2 && element.order_num === '') {
            self.$message.error(self.people[i].name + '订单数不能为空')
            return false
          }
          if (element.chekced3 && element.invite_num === '') {
            self.$message.error(self.people[i].name + '邀请关注公众号人数不能为空')
            return false
          }
          for (let j = 0; j < element.level.length; j++) {
            var element2 = element.level[j]
            if (element2.status === 2) {
              if (element2.money === '') {
                self.$message.error(self.people[i].name + '第' + (j + 1) + ' 实际消费不能为空')
                return false
              }
              if (element2.type === '') {
                self.$message.error(self.people[i].name + '第' + (j + 1) + ' 选择不能为空')
                return false
              }
              if (element2.member_num === '') {
                self.$message.error(self.people[i].name + '第' + (j + 1) + ' 人数不能为空')
                return false
              }
            }
          }
        }
      }
      // params =
      this.upgradeRule.forEach((element, index) => {
        params.push({
          level_id: element.level_id,
          sale_commission: element.sale_commission === '' ? 0 : element.sale_commission,
          order_num: element.order_num === '' ? 0 : element.order_num,
          invite_num: element.invite_num === '' ? 0 : element.invite_num,
          level: []
        })
        element.level.forEach(element2 => {
          params[index].level.push({
            level_id: element2.level_id,
            team_level: element2.team_level,
            member_num: element2.member_num,
            money: element2.money,
            type: element2.type,
            status: element2.status
          })
        })
      })
      // return false
      self.saveLoading = true
      return new Promise((resolve, reject) => {
        saveUpdateRule(params)
          .then(response => {
            if (response.data.errcode === 0) {
              self.$message.success('保存成功')
            } else {
              self.$message.error(response.data.errmsg)
            }
            self.saveLoading = false
          })
          .catch(error => {
            self.saveLoading = false
            reject(error)
          })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../src/styles/distribution.scss";

.base-set {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 30px;
  .set-top {
    @include boder-font;
    padding: 20px;
  }
  .label {
    @include title-font(14px);
    font-weight: 600;
  }
  .title {
    @include title-font(16px);
    font-weight: 600;
  }
  .label-two {
    min-width: 85px;
  }
  .input-width-two {
    width: 210px;
  }
  .set-level {
    @include boder-font;
    padding: 20px;
    .talble-top {
      background: #f7f7f7;
      width: 100%;
      height: 56px;
      line-height: 56px;
      text-align: center;
      .each-table-title {
        min-width: 200px;
        @include title-font(14px);
      }
      > .each-table-title:last-of-type {
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        height: 100%;
      }
    }
    .table-content {
      @include text-font(14px);
      border-left: 1px solid #ebedf0;
      border-right: 1px solid #ebedf0;
      .each-content {
        min-height: 56px;
        border-bottom: 1px solid #ebedf0;
        .each-content-attr {
          min-width: 200px;
          text-align: center;
        }
      }
      .each-content:hover {
        background: #c6e2ff;
      }
      .operate {
        text-align: center;
        .el-button {
          border: 0;
          padding: 10px;
          background: transparent;
        }
        .el-poppe-two {
          display: none;
          .el-poppe {
            display: none;
          }
        }
      }
    }
  }
  .upgrade-rule {
    @include boder-font;
    padding: 20px;
  }
  .upgrade-title {
    @include title-font(14px);
    text-align: center;
    background: #f7f7f7;
    height: 56px;
    line-height: 56px;
  }
  .upgrade-content {
    @include text-font(14px);
    text-align: center;
    .each-content {
      > div {
        padding: 20px 0;
        box-sizing: border-box;
        .each-attr {
          padding: 20px 0;
          .table-input {
            width: 70px;
          }
          .button-expend {
            padding: 10px;
          }
        }
        .circle {
          width: 14px;
          height: 14px;
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
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #fff;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .advice {
    height: 56px;
    line-height: 56px;
    @include text-font(14px);
    background: #fffcba;
    text-align: left;
    padding-left: 20px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
// 改变组件样式
.base-set {
  .el-input__inner {
    padding: 0 0 0 7px;
  }
  .el-dialog__footer {
    text-align: right;
  }
}
</style>

