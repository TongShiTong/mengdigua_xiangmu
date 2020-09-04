<template>
  <div v-loading="loading" class="settings" element-loading-text="拼命加载中">
    <!-- top部 -->
    <div class="setting-top">
      <div class="flex-r-s">
        <div class="label mr20">是否多级分拥：</div>
        <el-radio-group v-model="is_multiple" class="mr20" size="mini" >
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <el-button v-if="!is_multiple" :loading="levelLoading" type="primary" size="mini" @click="saveLevel">保存</el-button>
      </div>

      <div v-if="is_multiple" class="flex-r-s mt20">
        <!-- number-input -->
        <div class="label mr20">分佣追溯层级：</div>
        <el-input
          v-model="trace_level"
          type="number"
          placeholder="默认追溯1层关系，填写0则无效"
          class="input-width mr20"
          size="mini"
        />
        <el-button :loading="levelLoading" type="primary" size="mini" @click="saveLevel">保存</el-button>
      </div>
    </div>

    <!-- 自定义 -->
    <div class="customize mt20">
      <div class="flex-r-s">
        <div class="label mr20">自定义奖励名称：</div>
        <el-input
          v-model="rewardtext"
          :autosize="{ minRows: 4, maxRows: 8}"
          type="textarea"
          class="textarea-input mr20"
          placeholder="请输入奖励名称，以“;”作为分隔"
        />
        <el-button :loading="TextModel" type="primary" size="mini" @click="saveText">保存</el-button>
      </div>
    </div>
    <!-- 权益配置 -->
    <div v-show="levelOptions.length!=0" class="rights-setting mt20">
      <div class="title">权益配置：</div>
      <div class="level-box mt20">
        <div class="table-one table-title">
          <div class="each-attr-first">&nbsp;</div>
          <div v-for="(item,index) in people" :key="index" class="each-attr">{{ item.name }}</div>
          <div class="each-attr">奖励名称</div>
        </div>

        <div v-for="(item,index) in rights" :key="index" class="table-one">
          <div class="each-attr-first attr-level">{{ index+1 }}级</div>

          <div v-for="(item1,index2) in item.commission_data" :key="index2" class="each-attr">
            <div class="flex-r-s each-money">
              <div>佣金</div>
              <el-input
                v-model="item1.commission_rate"
                type="number"
                size="mini"
                class="each-number"
                min="0"
                placeholder
              />
              <div>%</div>
            </div>
          </div>
          <div class="each-attr">
            <div class="each-money">
              <el-select v-model="item.name" size="mini" placeholder="请选择">
                <el-option
                  v-for="item in levelOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="levelOptions.length==0" class="mt20 mb20">请先设置自定义奖励</div>
    <div class="prompt">提示：初次开启邀请奖励，所有商品默认使用平台设定的佣金，单商品需要自行调整</div>

    <!-- 保存 -->
    <el-button :loading="endLoading" type="primary" size="mini mt20" @click="saveChoice">保存</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setMode, setName, setRight, getConfiguration, pushList } from '@/api/distribution' // 验权

// import editorDashboard from './editor'

export default {
  name: 'Settings',
  data() {
    return {
      loading: true,
      rewardtext: '', // 奖励名称
      TextModel: false, // 奖励loading
      levelLoading: false, // 模式loading
      endLoading: false, // 权益loading
      currentRole: 'adminDashboard',
      more: 1,
      choice: '请选择',
      levelOptions: [
        { id: 1, name: '管理奖', value: 1 },
        { id: 2, name: '培训奖', value: 2 },
        { id: 3, name: '咨询奖', value: 3 }
      ],
      people: [{ name: 'vip' }, { name: '经理' }, { name: '总监' }],
      changePeople: [],
      is_multiple: false, // 是否多级分拥：
      trace_level: 1, // 分佣追溯层级：
      rights: [], // 权益配置：
      textarea3: ''
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    // for (let i = 0; i < this.people.length; i++) {
    //   this.changePeople.push({
    //     level: i + 1,
    //     commission_rate: ''

    //   })
    // }

    this.getPushList()
  },
  methods: {
    // 获取列表
    getPushList() {
      const self = this
      self.loading = true
      return new Promise((resolve, reject) => {
        pushList({
        })
          .then(response => {
            if (response.data.errcode === 0) {
              self.people = response.data.data
              for (let i = 0; i < this.people.length; i++) {
                this.changePeople.push({
                  level: this.people[i].level,
                  commission_rate: ''
                })
              }
              this.pageGetConfiguration()
            } else {
              self.loading = false
              self.$message.error(response.data.errmsg)
            }
          })
          .catch(error => {
            self.loading = false
            reject(error)
          })
      })
    },
    // 获取分拥
    pageGetConfiguration() {
      const self = this
      return new Promise((resolve, reject) => {
        getConfiguration({
        })
          .then(response => {
            if (response.data.errcode === 0) {
              this.rights = response.data.data.divider_data
              this.is_multiple = response.data.data.divider_mode.is_multiple
              this.trace_level = response.data.data.divider_mode.trace_level
              this.rewardtext = response.data.data.divider_name_list
              if (!this.rights) {
                self.rights = []
                for (let i = 0; i < parseInt(self.trace_level); i++) {
                  self.rights.push({
                    name: '',
                    commission_data: JSON.parse(JSON.stringify(self.changePeople))
                  })
                }
              } else {
                // 后来改了基础设置需要重置
                for (let i = 0; i < parseInt(self.trace_level); i++) {
                  // 少了 加
                  if (self.rights[i].commission_data.length <= self.changePeople.length) {
                    for (let j = 0; j < self.changePeople.length; j++) {
                      if (j <= self.rights[i].commission_data.length - 1) {
                        var k = j
                        if (parseInt(self.rights[i].commission_data[k].level) !== parseInt(self.changePeople[j].level)) {
                          self.rights[i].commission_data[k] = self.changePeople[j]
                        }
                      } else {
                        self.rights[i].commission_data.push(
                          JSON.parse(JSON.stringify(self.changePeople[j]))
                        )
                      }
                    }
                  }
                }
              }
              if (self.rewardtext) {
                self.levelOptions = []
                if (self.rewardtext.indexOf(';') === -1) {
                  self.levelOptions.push({
                    name: self.rewardtext
                  })
                } else {
                  var option = this.rewardtext.split(';')
                  for (let i = 0; i < option.length; i++) {
                    self.levelOptions.push({
                      name: option[i]
                    })
                  }
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
    // 保存文本
    saveText() {
      const self = this

      self.TextModel = true
      return new Promise((resolve, reject) => {
        setName({
          divider_name_list: self.rewardtext
        })
          .then(response => {
            if (response.data.errcode === 0) {
              self.$message.success('保存成功')
              self.levelOptions = []
              if (self.rewardtext.indexOf(';') === -1) {
                self.levelOptions.push({
                  name: self.rewardtext
                })
              } else {
                var option = this.rewardtext.split(';')
                for (let i = 0; i < option.length; i++) {
                  self.levelOptions.push({
                    name: option[i]
                  })
                }
              }
            } else {
              self.$message.error(response.data.errmsg)
            }
            self.TextModel = false
          })
          .catch(error => {
            self.TextModel = false
            reject(error)
          })
      })
    },
    // 保存等级
    saveLevel() {
      // var params = { trace_level, trace_level }

      const self = this
      if (!self.is_multiple) {
        self.trace_level = 1
      }
      self.levelLoading = true
      return new Promise((resolve, reject) => {
        setMode({
          divider_mode: {
            is_multiple: self.is_multiple,
            trace_level: self.trace_level
          }
        })
          .then(response => {
            if (response.data.errcode === 0) {
              self.$message.success('保存成功')
              self.levelLoading = false
              if (self.rights.length > parseInt(self.trace_level)) {
                self.rights.splice(self.trace_level, self.rights.length - parseInt(self.trace_level))
                return false
              }
              if (self.rights.length === parseInt(self.trace_level)) {
                return false
              }
              if (self.rights.length < parseInt(self.trace_level)) {
                // self.rights = []
                var pushLength = parseInt(self.trace_level) - self.rights.length
                for (let i = 0; i < pushLength; i++) {
                  self.rights.push({
                    name: '',
                    commission_data: JSON.parse(JSON.stringify(self.changePeople))
                  })
                }
              }
            } else {
              self.$message.error(response.data.errmsg)
            }
          })
          .catch(error => {
            self.levelLoading = false
            reject(error)
          })
      })
    },
    // 保存最后结果
    saveChoice() {
      const self = this
      for (var i = 0; i < self.rights.length; i++) {
        if (self.rights[i].name === '') {
          self.$message.error((i + 1) + '级奖励名称不能为空')
          return false
        }
        for (var j = 0; j < self.rights[i].commission_data.length; j++) {
          if (self.rights[i].commission_data[j].commission_rate < 0) {
            self.$message.error((i + 1) + '级 ' + self.people[j].name + '<0')
            return false
          }
          if (self.rights[i].commission_data[j].commission_rate === '') {
            self.$message.error((i + 1) + '级 ' + self.people[j].name + '不能为空')
            return false
          }
        }
      }
      self.endLoading = false
      return new Promise((resolve, reject) => {
        setRight({
          divider_data: this.rights
        })
          .then(response => {
            if (response.data.errcode === 0) {
              self.$message.success('保存成功')
            } else {
              self.$message.error(response.data.errmsg)
            }
            self.endLoading = false
          })
          .catch(error => {
            self.endLoading = false
            reject(error)
          })
      })
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../src/styles/distribution.scss";
.settings {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 30px;
  .setting-top {
    padding: 20px;
    @include boder-font;
  }
  .label {
    @include title-font(14px);
    font-weight: 600;
  }
  .number-input {
    width: 220px;
  }
  .customize {
    @include boder-font;
    padding: 20px;
  }
  .textarea-input {
    width: 420px;
  }
  .rights-setting {
    @include boder-font;
    padding: 20px;
  }
  .title {
    @include title-font(16px);
    font-weight: 600;
  }
  .level-box {
    width: 100%;
    overflow: auto;
    .table-one {
      @include text-font;
      white-space: nowrap;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;

      .each-attr:last-of-type {
        margin-left: -5px;
      }
      .each-attr {
        height: 60px;
        line-height: 60px;
        min-width: 150px;
        flex: 1;
        display: inline-block;
        text-align: center;
        padding: 0 20px;
        .each-number {
          margin: 0 10px;
        }
      }
      .each-money {
        width: 150px;
        margin: 0 auto;
      }
      .each-attr-first {
        width: 80px;
        display: inline-block;
        text-align: center;
        padding: 0 20px;
        line-height: 60px;
        height: 60px;
      }
      // .each-attr:nth-of-type(1) {
      // }
    }
    .table-title {
      @include title-font(14px);
      background: #f7f7f7;
      > div {
        background: #f7f7f7;
      }
    }
    .attr-level {
      background: #f7f7f7;
    }
  }
  .prompt {
    height: 60px;
    @include text-font;
    line-height: 60px;
    background: #fffcba;
    padding-left: 20px;
    box-sizing: border-box;
  }
}
</style>
