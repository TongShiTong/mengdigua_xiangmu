<template>
  <div v-loading="loading" class="dividend" element-loading-text="拼命加载中">
    <!-- top部 -->
    <div class="dividend-top">
      <div class="flex-r-s">
        <div class="label mr20">分红奖励选择：</div>
        <!-- <el-checkbox-group v-model="checkList" size="mini" > -->
        <el-checkbox v-model="ascSwitch" label="1" size="mini" @change="ascOpen($event)" >顺级分红奖励</el-checkbox>
        <el-checkbox v-model="equalSwitch" label="2" size="mini" @change="equalOpen($event)">平级分红奖励</el-checkbox>
        <el-checkbox v-model="descSwitch" label="3" size="mini" @change="descOpen($event)">逆级分红奖励</el-checkbox>
        <!-- </el-checkbox-group> -->
        <el-button :loading="Mode" class="ml20" type="primary" size="mini" @click="saveModel">保存</el-button>
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

      <div v-show="levelOptions.length!=0" class="dividend-setting mt20">
        <!-- 顺级分红奖励 -->
        <div v-if="ascSwitch" class="sequential">
          <div class="title">顺级分红奖励配置：</div>
          <div class="flex-r-s mt20">
            <div class="label title-label">收益方：</div>
            <el-checkbox-group v-model="asc_commission.handers" size="mini">
              <span v-for="(peo,index) in people" :key="index" >
                <el-checkbox v-if="index!=0" :label="peo.level" class=" mr20" @change="ascHaners($event,peo.level,index,peo.name)">{{ peo.name }}</el-checkbox>
              </span>
            </el-checkbox-group>
          </div>
          <div class="flex-r-s mt20">
            <div class="label title-label">追溯层数:</div>
            <el-radio-group v-model="asc_commission.trace_type" size="mini">
              <el-radio :label="1">直属</el-radio>
              <el-radio :label="2">团队</el-radio>
            </el-radio-group>
          </div>
          <!-- 表 -->
          <div class="sequential-tabel mt20">
            <div class="flex-r-s title-total">
              <div class="each-title">
                <div class="line"/>
                <div class="now-identity">当前身份</div>
                <div class="next-identity">下级身份</div>
              </div>
              <div class="each-title flex-1">行为</div>
              <div class="each-title flex-3">身份</div>
              <div class="each-title flex-1">奖励名称</div>
            </div>

            <div v-for="(item,index) in asc_commission.wrap" :key="index" >
              <!-- v-if="ascPeople[index].showConfirm" -->
              <div v-if="ascShow[index].showConfirm" class="flex-r-s each-content">
                <div class="each-identity">{{ ascShow[index].name }}</div>
                <div class="flex-1 way">
                  <div class="nbsp"/>
                  <div v-for="(item1,index1) in item" :key="index1">
                    <div v-if="index==0">
                      <el-checkbox-group v-model="item1.type" size="mini" >
                        <span v-for="(item2,index2) in choiceOptionFirst" :key="index2" >
                          <el-checkbox v-if="index1==index2" :label="item2.type" class=" mr20" @change="ascChange($event,index,index1)">{{ item2.label }}</el-checkbox>
                        </span>
                      </el-checkbox-group>
                    </div>
                    <div v-if="index!=0">
                      <el-checkbox-group v-model="item1.type" size="mini" >
                        <span v-for="(item2,index2) in choiceOption" :key="index2" >
                          <el-checkbox v-if="index1==index2" :label="item2.type" class=" mr20" @change="ascChange($event,index,index1)">{{ item2.label }}</el-checkbox>
                        </span>
                      </el-checkbox-group>
                    </div>
                  </div>

                </div>

                <div v-if="rateLoading" class="indetity-box flex-3">
                  <div v-for="(item1,index1) in item" :key="index1">
                    <div v-if="index1==0" class="table-one">
                      <div v-for="(peo,index2) in ascPeople" :key="index2" style="display:inline-block">
                        <div v-if="index2>0" class="each-attr">{{ peo.name }}</div>
                      </div>
                    </div>

                    <!-- <div >{{ item1.label }}</div> -->
                    <div class="table-one">
                      <div
                        v-for="(item2,index2) in item1.commission_data"
                        :key="index2"
                        class="each-attr">

                        <!-- <div>{{ item2.level }}：：{{ item1.level }}</div> -->
                        <div v-if="item2.level<=item1.level">/</div>
                        <div v-else class="flex-r-s" >
                          <div>佣金</div>
                          <input
                            v-model="item2.commission_rate"
                            type="number"
                            class="m10 flex-1 input-number"
                            size="mini"
                            min="0"
                            @input ="inputNumber(1,item1.type,index,index1,index2)"
                          >
                          <div>%</div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

                <div class=" reward flex-1">
                  <div class="nbsp"/>
                  <div >
                    <div v-for="(item1,index2) in item" :key="index2" class="choice">
                      <!-- <div>{{ item1 }}</div> -->
                      <el-select v-model="item1.name" size="mini" placeholder="请选择" @change="removeOption(1,item1.type,index,index2)">
                        <el-option
                          v-for="options in levelOptions"
                          :key="options.value"
                          :label="options.name"
                          :value="options.name"

                        />
                      </el-select>
                    </div>
                  </div>
                <!-- <div v-if="index!=0">
                  <div v-for="(item1,index2) in choiceOption" :key="index2" class="choice">
                    <el-select v-model="choice" size="mini" placeholder="请选择">
                      <el-option
                        v-for="item in levelOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </div>
                </div> -->

                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- 平级分红奖励 -->
        <div v-if="equalSwitch" class="sequential mt20">
          <div class="title">平级分红奖励配置：</div>
          <div class="flex-r-s mt20">
            <div class="label title-label">收益方：</div>

            <el-checkbox-group v-model="equal_commission.handers" size="mini">
              <span v-for="(peo,index) in people" :key="index" >
                <el-checkbox :label="peo.level" class=" mr20" @change="equalHaners($event,peo.level,index,peo.name)">{{ peo.name }}</el-checkbox>
              </span>
            </el-checkbox-group>

          </div>
          <div class="flex-r-s mt20">
            <div class="label title-label">追溯层数:</div>
            <el-radio-group v-model="equal_commission.trace_type" size="mini">
              <el-radio :label="1">直属</el-radio>
              <el-radio :label="2">团队</el-radio>
            </el-radio-group>
          </div>
          <!-- 表 -->
          <div class="sequential-tabel mt20">
            <div class="flex-r-s title-total">
              <div class="each-title">
                <div class="line"/>
                <div class="now-identity">当前身份</div>
                <div class="next-identity">下级身份</div>
              </div>
              <div class="each-title flex-1">行为</div>
              <div class="each-title flex-3">身份</div>
              <div class="each-title flex-1">奖励名称</div>
            </div>

            <div v-for="(item,index) in equal_commission.wrap" :key="index" >
              <div v-if="equalShow[index].showConfirm" class="flex-r-s each-content">
                <div class="each-identity">{{ equalShow[index].name }}</div>
                <!-- <div class="each-identity">{{ equalPeople[index].name }}</div> -->

                <div class="flex-1 way">
                  <div class="nbsp"/>
                  <div v-for="(item1,index1) in item" :key="index1">
                    <div v-if="index==0">
                      <el-checkbox-group v-model="item1.type" size="mini">
                        <span v-for="(item2,index2) in equalChoiceOptionFirst" :key="index2" >
                          <el-checkbox v-if="index1==index2" :label="item2.type" class=" mr20" @change="equalChange($event,index,index1)">{{ item2.label }}</el-checkbox>
                        </span>
                      </el-checkbox-group>
                    </div>
                    <div v-if="index!=0">
                      <el-checkbox-group v-model="item1.type" size="mini">
                        <span v-for="(item2,index2) in equalChoiceOption" :key="index2" >
                          <el-checkbox v-if="index1==index2" :label="item2.type" class=" mr20" @change="equalChange($event,index,index1)">{{ item2.label }}</el-checkbox>
                        </span>
                      </el-checkbox-group>
                    </div>
                  </div>

                </div>

                <div v-if="rateLoading" class="indetity-box flex-3">

                  <div v-for="(item1,index1) in item" :key="index1">
                    <div v-if="index1==0" class="table-one">
                      <div v-for="(peo,index2) in equalPeople" :key="index2" style="display:inline-block" >
                        <div class="each-attr">{{ peo.name }}</div>
                      </div>
                    </div>
                    <!-- <div >{{ item1.label }}</div> -->
                    <div class="table-one each-rate" >
                      <div
                        v-for="(item2,index2) in item1.commission_data"
                        :key="index2"
                        class="each-attr">
                        <div v-if="item2.level!=item1.level">/</div>
                        <div v-else class="flex-r-s" >
                          <div>佣金</div>
                          <input
                            v-model="item2.commission_rate"
                            type="number"
                            class="m10 flex-1 input-number"
                            size="mini"
                            @input ="inputNumber(2,item1.type,index,index1,index2)"
                          >
                          <div>%</div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

                <div class=" reward flex-1">
                  <div class="nbsp"/>
                  <div >
                    <div v-for="(item1,index2) in item" :key="index2" class="choice">
                      <!-- <div>{{ item1 }}</div> -->
                      <el-select v-model="item1.name" size="mini" placeholder="请选择" @change="removeOption(2,item1.type,index,index2)">
                        <el-option
                          v-for="options in levelOptions"
                          :key="options.value"
                          :label="options.name"
                          :value="options.name"
                        />
                      </el-select>
                    </div>
                  </div>
                <!-- <div v-if="index!=0">
                  <div v-for="(item1,index2) in choiceOption" :key="index2" class="choice">
                    <el-select v-model="choice" size="mini" placeholder="请选择">
                      <el-option
                        v-for="item in levelOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </div>
                </div> -->

                </div>

              </div>
            </div>

          </div>
        </div>
        <!-- 逆级分红奖励 -->
        <div v-if="descSwitch" class="sequential mt20">
          <div class="title">逆级分红奖励:</div>
          <div class="flex-r-s mt20">
            <div class="label title-label">收益方：</div>
            <!-- <el-checkbox-group v-model="desc_commission.handers" size="mini">
            <span v-for="(peo,index) in people" :key="index" >
              <el-checkbox v-if="index!=people.length-1" :label="peo.level" class=" mr20">{{ peo.name }}</el-checkbox>
            </span>
          </el-checkbox-group> -->

            <el-checkbox-group v-model="desc_commission.handers" size="mini">
              <span v-for="(peo,index) in people" :key="index" >
                <el-checkbox v-if="index!=people.length-1" :label="peo.level" class=" mr20" @change="descHaners($event,peo.level,index,peo.name)">{{ peo.name }}</el-checkbox>
              </span>
            </el-checkbox-group>
          </div>
          <div class="flex-r-s mt20">
            <div class="label title-label">追溯层数:</div>
            <el-radio-group v-model="desc_commission.trace_type" size="mini">
              <el-radio :label="1">直属</el-radio>
              <el-radio :label="2">团队</el-radio>
            </el-radio-group>
          </div>
          <!-- 表 -->
          <div class="sequential-tabel mt20">
            <div class="flex-r-s title-total">
              <div class="each-title">
                <div class="line"/>
                <div class="now-identity">当前身份</div>
                <div class="next-identity">下级身份</div>
              </div>
              <div class="each-title flex-1">行为</div>
              <div class="each-title flex-3">身份</div>
              <div class="each-title flex-1">奖励名称</div>
            </div>

            <div v-for="(item,index) in desc_commission.wrap" :key="index" class="">
              <div v-if="descShow[index].showConfirm" class="flex-r-s each-content">
                <div
                  class="each-identity"
                  style="align-self:flex-end;line-height: 60px;">{{ descShow[index+1].name }}</div>

                <div class="flex-1 way" style="align-self:flex-end">
                  <!-- <div class="nbsp"/> -->
                  <div v-for="(item1,index1) in item" :key="index1">
                    <div>
                      <el-checkbox :label="5" v-model="item1.type" class=" mr20" @change="descChange($event,index,index1)">从低等级升到高等级</el-checkbox>
                    </div>

                  </div>

                </div>

                <div v-if="rateLoading" class="indetity-box flex-3">

                  <div v-for="(item1,index1) in item" :key="index1">
                    <div v-if="index1==0" class="table-one">
                      <div v-for="(peo,index2) in descPeople" :key="index2" style="display:inline-block" >
                        <div v-if="index2!=descPeople.length-1" class="each-attr">{{ peo.name }}</div>
                      </div>
                    </div>

                    <!-- <div >{{ item1.label }}</div> -->
                    <div class="table-one each-rate" >
                      <div
                        v-for="(item2,index2) in item1.commission_data"
                        :key="index2"
                        class="each-attr">
                        <div v-if="item2.level>=item1.level">/</div>
                        <div v-else class="flex-r-s" >
                          <div>佣金</div>
                          <input
                            v-model="item2.commission_rate"
                            type="number"
                            class="m10 flex-1 input-number"
                            size="mini"
                            @input ="inputNumber(3,item1.type,index,index1,index2)"
                          >
                          <div>元</div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

                <div class=" reward flex-1" style="align-self:flex-end">
                  <!-- <div class="nbsp"/> -->
                  <div >
                    <div v-for="(item1,index2) in item" :key="index2" class="choice">
                      <!-- <div>{{ item1 }}</div> -->
                      <el-select v-model="item1.name" size="mini" placeholder="请选择" @change="removeOption(3,item1.type,index,index2)">
                        <el-option
                          v-for="options in levelOptions"
                          :key="options.value"
                          :label="options.name"
                          :value="options.name"
                        />
                      </el-select>
                    </div>
                  </div>
                <!-- <div v-if="index!=0">
                  <div v-for="(item1,index2) in choiceOption" :key="index2" class="choice">
                    <el-select v-model="choice" size="mini" placeholder="请选择">
                      <el-option
                        v-for="item in levelOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </div>
                </div> -->

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      <div v-show="levelOptions.length==0" class="mt20 mb20">请先设置自定义奖励</div>
      <!-- 保存 -->
      <el-button :loading="EndModel" type="primary" size="mini mt20" @click="saveEnd">保存</el-button>
    </div>
</div></template>

<script>
import { mapGetters } from 'vuex'
import { pushList, rewardName, dividendMode, dividendInterest, getDividend } from '@/api/distribution' // 验权
// import Vue from 'vue'
// import editorDashboard from './editor'

export default {
  name: 'Dividend',
  data() {
    return {
      loading: false,
      mode: '', // 分红选择项
      rateLoading: true,
      TextModel: false, // 文本保存
      Mode: false, // 模式保存
      EndModel: false, // 最后保存
      rewardtext: '', // 奖励设置
      currentRole: 'adminDashboard',
      more: 1,
      choice: '请选择',
      levelOptions: [
        // { id: 1, name: '请选择', value: 1 },
        // { id: 2, name: '管理奖', value: 2 },
        // { id: 3, name: '培训奖', value: 3 },
        // { id: 4, name: '咨询奖', value: 4 }
      ],
      rewardOption: [], // 奖励
      people: [{ name: 'vip', level: 1 }, { name: '经理', level: 2 }, { name: '总监', level: 3 }, { name: 'BOSS', level: 4 }, { name: 'BOSS2', level: 5 }, { name: 'BOSS3', level: 6 }],
      ascPeople: [{ name: 'vip', level: 1 }, { name: '经理', level: 2 }, { name: '总监', level: 3 }, { name: 'BOSS', level: 4 }, { name: 'BOSS2', level: 5 }, { name: 'BOSS3', level: 6 }], // 顺级人
      equalPeople: [{ name: 'vip', level: 1 }, { name: '经理', level: 2 }, { name: '总监', level: 3 }, { name: 'BOSS', level: 4 }, { name: 'BOSS2', level: 5 }, { name: 'BOSS3', level: 6 }], // 平級人
      descPeople: [{ name: 'vip', level: 1 }, { name: '经理', level: 2 }, { name: '总监', level: 3 }, { name: 'BOSS', level: 4 }, { name: 'BOSS2', level: 5 }, { name: 'BOSS3', level: 6 }], // desc人
      checkList: [1, 2, 3],
      choiceOptionFirst: [
        { label: '自买/售卖商品', type: 1, value: '' },
        { label: '获得平级分红奖励', type: 3, value: '' },
        { label: '获得逆级分红奖励', type: 4, value: '' }
      ],
      choiceOption: [
        { label: '自买/售卖商品', type: 1 },
        { label: '获得顺级分红奖励', type: 2 },
        { label: '获得平级分红奖励', type: 3 },
        { label: '获得逆级分红奖励', type: 4 }
      ],
      equalChoiceOptionFirst: [
        { label: '自买/售卖商品', type: 1 },
        { label: '获得逆级分红奖励', type: 4 }
      ],
      equalChoiceOption: [
        { label: '自买/售卖商品', type: 1 },
        { label: '获得顺级分红奖励', type: 2 },
        { label: '获得逆级分红奖励', type: 4 }
      ],
      // 顺级分红开关
      asc_commission: {
        handers: [], // 收益方
        trace_type: 1, // 追溯层数
        wrap: []
      },
      asc_commission2: {},
      // 平级分红奖励配置：
      equal_commission: {
        handers: [], // 收益方
        trace_type: 1, // 追溯层数
        wrap: []
      },
      equal_commission2: {},
      // 逆级分红奖励
      desc_commission: {
        handers: [], // 收益方
        trace_type: 1, // 追溯层数
        wrap: []
      },
      desc_commission2: {},
      ascSwitch: false,
      equalSwitch: false,
      descSwitch: false,
      text: [],
      ascShow: [],
      equalShow: [],
      descShow: [],
      checkValue: false // 分红奖励选择

    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    this.getPushList()

    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  },
  methods: {
    // 移除选项
    removeOption(type, value, index, index1) {
      var worth = type === 1 ? this.asc_commission : type === 2 ? this.equal_commission : this.desc_commission
      var hasValue = true
      for (let i = 0; i < value.length; i++) {
        if ((typeof (value[i])) === 'number') {
          hasValue = false
          break
        }
      }
      if (hasValue) {
        worth.wrap[index][index1].name = ''
        this.$message.error('请先选择行为')
        return false
      }
    },
    inputNumber(type, value, index, index1, index2) {
    // 顺级输入佣金 type 1  // 顺级输入佣金  type 2    // 顺级方式改变 type 3
      var worth = type === 1 ? this.asc_commission : type === 2 ? this.equal_commission : this.desc_commission
      var hasValue = true
      for (let i = 0; i < value.length; i++) {
        if ((typeof (value[i])) === 'number') {
          hasValue = false
          break
        }
      }
      if (hasValue) {
        worth.wrap[index][index1].commission_data[index2].commission_rate = ''
        this.$message.error('请先选择行为')
        return false
      }
    },
    ascChange(e, index, index1) {
      //  e = true ||false   index第一层索引  index1 第二层索引
      const self = this
      if (!e) {
        self.asc_commission.wrap[index][index1].name = ''
        for (let i = 0; i < self.asc_commission.wrap[index][index].commission_data.length; i++) {
          self.asc_commission.wrap[index][index1].commission_data[i].commission_rate = ''
        }
      }
    },
    // 平级方式改变
    equalChange(e, index, index1) {
      const self = this
      if (!e) {
        self.equal_commission.wrap[index][index1].name = ''
        for (let i = 0; i < self.equal_commission.wrap[index][index].commission_data.length; i++) {
          self.equal_commission.wrap[index][index1].commission_data[i].commission_rate = ''
        }
      }
    },
    // 逆级方式改变
    descChange(e, index, index1) {
      const self = this
      if (!e) {
        self.desc_commission.wrap[index][index1].name = ''
        for (let i = 0; i < self.desc_commission.wrap[index][index1].commission_data.length; i++) {
          self.desc_commission.wrap[index][index1].commission_data[i].commission_rate = ''
        }
      }
    },
    showOrHiden(e, type) {
      e.forEach((element, index) => {
        if (type === 1) {
          this.ascShow[index].showConfirm = false // 隐藏
        } else if (type === 2) {
          this.equalShow[index].showConfirm = false // 隐藏
        } else if (type === 3) {
          this.descShow[index].showConfirm = false
        }
        var breakswitch = true
        element.forEach((element2, index1) => {
          if (index1 === 0 && breakswitch) {
            element2.commission_data.forEach((element3, index2) => { // 顺级小于隐藏
              if (element2.level < element3.level && type === 1 && breakswitch) {
                this.ascShow[index].showConfirm = true // 不隐藏
                breakswitch = false
              }
              if (element2.level === element3.level && type === 2 && breakswitch) { // 平级一旦有相等就不隐藏
                this.equalShow[index].showConfirm = true
                breakswitch = false
              }
              if (element2.level > element3.level && type === 3 && breakswitch) { // 逆级出现一个大于 就不隐藏
                this.descShow[index].showConfirm = true
                breakswitch = false
              }
            })
          }
        })
        if (!this.ascShow[index].showConfirm && type === 1) {
          this.text = []
          this.pushArray(this.text, index, this.asc_commission.handers, type)
          const arr = this.text
          e[index] = arr
        }
        if (!this.equalShow[index].showConfirm && type === 2) {
          this.text = []
          this.pushArray(this.text, index, this.equal_commission.handers, type)
          const arr = this.text
          e[index] = arr
        }
        if (!this.descShow[index].showConfirm && type === 3) {
          this.text = []
          this.pushArray(this.text, index + 1, this.desc_commission.handers, type)
          const arr = this.text
          e[index] = arr
        }
      })
    },
    // 顺级
    ascHaners(e, value, index, name) {
      // false 删除  //true添加
      // var newIndex = index - 1
      this.rateLoading = false
      if (!e) {
        for (let a = 0; a < this.ascPeople.length; a++) {
          if (value === this.ascPeople[a].level) {
            this.ascPeople.splice(a, 1)
            break
          }
        }
        for (let i = 0; i < this.asc_commission.wrap.length; i++) {
          for (let j = 0; j < this.asc_commission.wrap[i].length; j++) {
            for (let k = 0; k < this.asc_commission.wrap[i][j].commission_data.length; k++) {
              if (value === this.asc_commission.wrap[i][j].commission_data[k].level) {
                this.asc_commission.wrap[i][j].commission_data.splice(k, 1)
                break
              }
            }
          }
        }
      } else {
        let addindex = -1
        if (this.ascPeople.length !== 0) {
          for (let a = 0; a < this.ascPeople.length; a++) {
            if (value < this.ascPeople[a].level) {
              addindex = 1
              this.ascPeople.splice(a, 0, { level: value, name: name })
              break
            }
          }
          if (addindex === -1) {
            this.ascPeople.push({ level: value, name: name })
          }
        } else {
          this.ascPeople.push({ level: value, name: name })
        }
        for (let i = 0; i < this.asc_commission.wrap.length; i++) {
          for (let j = 0; j < this.asc_commission.wrap[i].length; j++) {
            var addIndex = -1
            var item = this.asc_commission.wrap[i][j].commission_data
            if (item.length === 0) {
              this.asc_commission.wrap[i][j].commission_data.push({ level: value, commission_rate: '' })
            } else {
              for (let z = 0; z < item.length; z++) {
                if (value < item[z].level) {
                  addIndex = z
                  this.asc_commission.wrap[i][j].commission_data.splice(addIndex, 0, { level: value, commission_rate: '' })
                  break
                }
              }
              if (addIndex === -1) {
                this.asc_commission.wrap[i][j].commission_data.push({ level: value, commission_rate: '' })
              }
            }

            // break
          }
        }
      }
      // Vue.set(this.asc_commission, this.asc_commission)
      this.showOrHiden(this.asc_commission.wrap, 1)
      this.rateLoading = true
    },
    ascOpen(e) {
      this.ascSwitch = e
      this.checkValue = true
    },
    // 顺初始化
    ascInit() {
      const self = this
      for (let i = 0; i < self.people.length - 1; i++) {
        self.asc_commission.handers.push(self.people[i + 1].level)
        self.asc_commission.wrap.push([])
        for (let k = 0; k < self.choiceOption.length; k++) {
          self.asc_commission.wrap[i].push({
            type: [],
            name: '',
            label: self.people[i].name,
            commission_data: [],
            level: self.people[i].level
          })
          for (let j = 0; j < self.people.length - 1; j++) {
            self.asc_commission.wrap[i][k].commission_data[j] = {
              level: self.people[j + 1].level,
              commission_rate: ''
            }
          }
        }
      }
      self.asc_commission.wrap[0].splice(0, 1)
    },
    // 平级初始化
    equalInit() {
      const self = this
      for (let i = 0; i < self.people.length; i++) {
        self.equal_commission.handers.push(self.people[i].level)
        self.equal_commission.wrap.push([])
        for (let k = 0; k < self.equalChoiceOption.length; k++) {
          self.equal_commission.wrap[i].push({
            type: [],
            name: '',
            label: self.people[i].name,
            commission_data: [],
            level: self.people[i].level
          })
          for (let j = 0; j < self.people.length; j++) {
            self.equal_commission.wrap[i][k].commission_data.push({
              level: self.people[j].level,
              commission_rate: ''
            })
          }
        }
      }
      self.equal_commission.wrap[0].splice(0, 1)
    },
    // 逆级初始化
    desInit() {
      const self = this
      // 逆级
      for (let i = 0; i < self.people.length - 1; i++) {
        self.desc_commission.handers.push(self.people[i].level)
        self.desc_commission.wrap.push([])
        for (let k = 0; k < 1; k++) {
          self.desc_commission.wrap[i].push({
            type: [],
            name: '',
            label: self.people[i + 1].name,
            commission_data: [],
            level: self.people[i + 1].level
          })
          for (let j = 0; j < self.people.length - 1; j++) {
            self.desc_commission.wrap[i][k].commission_data[j] = {
              level: self.people[j ].level,
              commission_rate: ''
            }
          }
        }
      }
      // self.equal_commission = Object.assign(self.asc_commission)
    },

    // 平级
    equalHaners(e, value, index, name) {
      // false 删除  //true添加
      // var newIndex = index - 1
      this.rateLoading = false
      if (!e) {
        for (let a = 0; a < this.equalPeople.length; a++) {
          if (value === this.equalPeople[a].level) {
            this.equalPeople.splice(a, 1)
          }
        }
        for (let i = 0; i < this.equal_commission.wrap.length; i++) {
          for (let j = 0; j < this.equal_commission.wrap[i].length; j++) {
            for (let k = 0; k < this.equal_commission.wrap[i][j].commission_data.length; k++) {
              if (value === this.equal_commission.wrap[i][j].commission_data[k].level) {
                this.equal_commission.wrap[i][j].commission_data.splice(k, 1)
                // break
              }
            }
          }
        }
      } else {
        if (this.equalPeople.length !== 0) {
          let addindex = -1
          for (let a = 0; a < this.equalPeople.length; a++) {
            if (value < this.equalPeople[a].level) {
              this.equalPeople.splice(a, 0, { level: value, name: name })
              addindex = 1
              break
            }
          }
          if (addindex === -1) {
            this.equalPeople.push({ level: value, name: name })
          }
        } else {
          this.equalPeople.push({ level: value, name: name })
        }
        for (let i = 0; i < this.equal_commission.wrap.length; i++) {
          for (let j = 0; j < this.equal_commission.wrap[i].length; j++) {
            let addIndex = -1
            var item = this.equal_commission.wrap[i][j].commission_data
            if (item.length === 0) {
              this.equal_commission.wrap[i][j].commission_data.push({ level: value, commission_rate: '' })
            } else {
              for (let z = 0; z < item.length; z++) {
                if (value < item[z].level) {
                  addIndex = z
                  this.equal_commission.wrap[i][j].commission_data.splice(addIndex, 0, { level: value, commission_rate: '' })
                  break
                }
              }
              if (addIndex === -1) {
                this.equal_commission.wrap[i][j].commission_data.push({ level: value, commission_rate: '' })
              }
            }
          }
        }
      }
      this.showOrHiden(this.equal_commission.wrap, 2)
      this.rateLoading = true
    },
    equalOpen(e) {
      this.equalSwitch = e
      this.checkValue = true
    },
    // 逆级
    descHaners(e, value, index, name) {
      // false 删除  //true添加
      // var newIndex = index - 1
      if (!e) {
        for (let a = 0; a < this.descPeople.length; a++) {
          if (value === this.descPeople[a].level) {
            this.descPeople.splice(a, 1)
          }
        }
        for (let i = 0; i < this.desc_commission.wrap.length; i++) {
          for (let j = 0; j < this.desc_commission.wrap[i].length; j++) {
            for (let k = 0; k < this.desc_commission.wrap[i][j].commission_data.length; k++) {
              if (value === this.desc_commission.wrap[i][j].commission_data[k].level) {
                this.desc_commission.wrap[i][j].commission_data.splice(k, 1)
                break
              }
            }
          }
        }
      } else {
        if (this.descPeople.length !== 0) {
          let addindex = -1
          for (let a = 0; a < this.descPeople.length; a++) {
            if (value < this.descPeople[a].level) {
              addindex = 1
              this.descPeople.splice(a, 0, { level: value, name: name })
              break
            }
          }
          if (addindex === -1) {
            this.equalPeople.push({ level: value, name: name })
          }
        } else {
          this.descPeople.push({ level: value, name: name })
        }
        for (let i = 0; i < this.desc_commission.wrap.length; i++) {
          for (let j = 0; j < this.desc_commission.wrap[i].length; j++) {
            var addIndex = -1
            var item = this.desc_commission.wrap[i][j].commission_data
            if (item.length === 0) {
              this.desc_commission.wrap[i][j].commission_data.push({ level: value, commission_rate: '' })
            } else {
              for (let z = 0; z < item.length; z++) {
                if (value < item[z].level) {
                  addIndex = z
                  this.desc_commission.wrap[i][j].commission_data.splice(addIndex, 0, { level: value, commission_rate: '' })
                  break
                }
              }
              if (addIndex === -1) {
                this.desc_commission.wrap[i][j].commission_data.push({ level: value, commission_rate: '' })
              }
            }
          }
        }
      }
      this.showOrHiden(this.desc_commission.wrap, 3)
    },
    descOpen(e) {
      this.descSwitch = e
      this.checkValue = true
    },
    // 获取列表
    getPushList() {
      const self = this
      self.loading = true
      return new Promise((resolve, reject) => {
        pushList({
        })
          .then(response => {
            self.people = response.data.data
            self.people.forEach((e) => {
              this.ascShow.push({ showConfirm: true, name: e.name })
              this.equalShow.push({ showConfirm: true, name: e.name })
              this.descShow.push({ showConfirm: true, name: e.name })
            })
            self.ascPeople = JSON.parse(JSON.stringify(self.people))
            self.equalPeople = JSON.parse(JSON.stringify(self.people))
            self.descPeople = JSON.parse(JSON.stringify(self.people))
            self.pageGetDividend()
            self.loading = false
          })

          .catch(error => {
            self.loading = false
            reject(error)
          })
      })
    },
    // 处理行为
    dealway(e) {
      // const self = this
      for (var i = 0; i < e.length; i++) {
        for (var j = 0; j < e[i].length; j++) {
          var a = e[i][j].type
          e[i][j].type = []
          e[i][j].type.push(
            a
          )
        }
      }
    },
    peopleInit(e, item, type) {
      for (let a = 0; a < e.length; a++) {
        if (item.includes(e[a].level) === false) {
          if ((type === 1 && a !== 0) || type === 2 || (type === 3 && a !== e.length - 1)) {
            e.splice(a, 1)
          }
        }
      }
    },
    // 放一个数组
    pushArray(e, i, handers, type) {
      const self = this
      if (type === 1 || type === 2) {
        for (let k = 0; k < self.choiceOption.length; k++) {
          e.push({
            type: [],
            name: '',
            label: self.people[i].name,
            commission_data: [],
            level: self.people[i].level
          })
          if (type === 1) {
            for (let j = 0; j < self.people.length - 1; j++) {
              if (handers.includes(self.people[j + 1].level)) {
                e[k].commission_data.push({
                  level: self.people[j + 1].level,
                  commission_rate: ''
                })
              }
            }
          } else if (type === 2) {
            for (let j = 0; j < self.people.length; j++) {
              if (handers.includes(self.people[j].level)) {
                e[k].commission_data.push({
                  level: self.people[j].level,
                  commission_rate: ''
                }
                )
              }
            }
          }
        }
      } else if (type === 3) {
        for (let k = 0; k < 1; k++) {
          e.push({
            type: [],
            name: '',
            label: self.people[i ].name,
            commission_data: [],
            level: self.people[i].level
          })
          for (let j = 0; j < self.people.length - 1; j++) {
            if (handers.includes(self.people[j].level)) {
              e[k].commission_data.push({
                level: self.people[j].level,
                commission_rate: ''
              })
            }
          }
        }
      }
    },
    // 基础设置改了之后增加设置
    addvalue(e, e2, handers, type) {
      // e原数组。e2收益人数组

      if (type === 1 || type === 2) {
        for (let i = 0; i < e2.length; i++) {
          const j = i
          if (e[j]) {
            if (e[i][0].level !== e2[j].level) {
              e[i] = []
              this.text = []
              this.pushArray(this.text, i, handers, type)
              const arr = this.text
              e[i] = arr
            }
          } else {
            if (i === e2.length - 1 && type === 1) {
              console.log(1)
            } else {
              this.text = []
              this.pushArray(this.text, i, handers, type)
              const arr = this.text
              e.push(arr)
            }
          }
        }
      } else if (type === 3) {
        for (let i = 0; i < e2.length; i++) {
          const j = i
          if (e[i]) {
            if (e[i][0].level !== e2[j + 1].level) {
              e[i] = []
              this.text = []
              this.pushArray(this.text, i, handers, type)
              const arr = this.text
              e[i] = arr
            }
          } else {
            if (i < this.people.length - 1) {
              this.text = []
              this.pushArray(this.text, i + 1, handers, type)
              const arr = this.text
              e.push(arr)
            }
          }
        }
      }
    },

    // 获取分红列表
    pageGetDividend() {
      const self = this
      self.loading = true
      return new Promise((resolve, reject) => {
        getDividend({
        })
          .then(response => {
            // self.equal_commission = Object.assign(self.asc_commission)
            self.rewardtext = response.data.data.name_list
            self.mode = response.data.data.mode

            // 假数据
            // if (self.rewardtext) {
            //   self.levelOptions = []
            //   if (self.rewardtext.indexOf(';') === -1) {
            //     self.levelOptions.push({
            //       name: self.rewardtext
            //     })
            //   } else {
            //     var option = this.rewardtext.split(';')
            //     for (let i = 0; i < option.length; i++) {
            //       self.levelOptions.push({
            //         name: option[i]
            //       })
            //     }
            //   }
            // }
            // self.ascSwitch = true
            // self.equalSwitch = true
            // self.descSwitch = true
            // self.ascInit()
            // self.equalInit()
            // self.desInit()
            // return
            // 初始化 没有数据
            if (!self.mode) {
              self.ascSwitch = false
              self.equalSwitch = false
              self.descSwitch = false
              self.ascInit()
              self.equalInit()
              self.desInit()
            } else {
              // 有数据
              if (self.mode.asc_commission && response.data.data.data) {
                self.ascSwitch = true
                if (response.data.data.data.asc_commission.wrap.length !== 0) {
                  self.asc_commission = response.data.data.data.asc_commission
                  self.dealway(self.asc_commission.wrap)
                  self.peopleInit(self.ascPeople, self.asc_commission.handers, 1)
                  self.addvalue(self.asc_commission.wrap, self.ascPeople, self.asc_commission.handers, 1)
                  self.addAscInit()
                } else {
                  self.ascInit()
                }
              } else {
                if (self.mode.asc_commission) {
                  self.ascSwitch = true
                } else {
                  self.ascSwitch = false
                }
                self.ascInit()
              }
              this.showOrHiden(self.asc_commission.wrap, 1)
              if (self.mode.equal_commission && response.data.data.data) {
                self.equalSwitch = true
                if (response.data.data.data.equal_commission.wrap.length !== 0) {
                  self.equal_commission = response.data.data.data.equal_commission
                  self.dealway(self.equal_commission.wrap)
                  self.peopleInit(self.equalPeople, self.equal_commission.handers, 2)
                  self.addvalue(self.equal_commission.wrap, self.people, self.equal_commission.handers, 2)
                } else {
                  self.equalInit()
                }
              } else {
                if (self.mode.equal_commission) {
                  self.equalSwitch = true
                } else {
                  self.equalSwitch = false
                }
                self.equalInit()
              }
              this.showOrHiden(self.equal_commission.wrap, 2)
              if (self.mode.desc_commission && response.data.data.data) {
                self.descSwitch = true
                if (response.data.data.data.desc_commission.length !== 0) {
                  if (response.data.data.data.desc_commission.wrap.length !== 0) {
                    self.desc_commission = response.data.data.data.desc_commission
                    self.dealway(self.desc_commission.wrap)
                    self.addvalue(self.desc_commission.wrap, self.descPeople, self.desc_commission.handers, 3)
                    self.peopleInit(self.descPeople, self.desc_commission.handers, 3)
                  } else {
                    self.desInit()
                  }
                } else {
                  self.desInit()
                }
              } else {
                if (self.mode.desc_commission) {
                  self.descSwitch = true
                } else {
                  self.descSwitch = false
                }
                self.desInit()
              }
              // this.showOrHiden(self.desc_commission.wrap, 3)
            }
            //  初始化 有数据情况下
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
            self.loading = false
          })

          .catch(error => {
            self.loading = false
            reject(error)
          })
      })
    },
    // 每个的类型
    wayChange(e, type, index) {
      const self = this
      self.asc_commission.wrap[index].type = type
    },
    forDate(e, type) {
      var showname = type === 1 ? '顺级' : type === 2 ? '平级' : '逆级'
      var decreaseIndex = 0
      if (type === 1) {
        this.ascShow.forEach(element => {
          if (!element.showConfirm) {
            decreaseIndex = decreaseIndex + 1
          }
        })
      } else if (type === 2) {
        this.equalShow.forEach(element => {
          if (!element.showConfirm) {
            decreaseIndex = decreaseIndex + 1
          }
        })
      } else {
        this.descShow.forEach(element => {
          if (!element.showConfirm) {
            decreaseIndex = decreaseIndex + 1
          }
        })
      }
      for (let i = 0; i < e.wrap.length; i++) {
        for (let k = 0; k < e.wrap[i].length; k++) {
          // 选了type 必须填 佣金 和名称
          if (e.wrap[i][k].type !== '') {
            if (e.wrap[i][k].name === '') {
              this.$message.error(showname + '第' + (i + 1 - decreaseIndex) + '组数第' + (k + 1) + '条奖励  名称没有选')
              return false
            }
            for (let z = 0; z < e.wrap[i][k].commission_data.length; z++) {
              if ((type === 1 && e.wrap[i][k].commission_data[z].level > e.wrap[i][k].level) || (type === 2 && e.wrap[i][k].commission_data[z].level === e.wrap[i][k].level) || (type === 3 && e.wrap[i][k].commission_data[z].level < e.wrap[i][k].level)) {
                if (e.wrap[i][k].commission_data[z].commission_rate === '') {
                  this.$message.error(showname + '第' + (i + 1 - decreaseIndex) + '组数第' + (k + 1) + '条第' + (z + 1) + '个佣金没有填写')
                  return false
                }
                if (parseFloat(e.wrap[i][k].commission_data[z].commission_rate) === 0) {
                  this.$message.error(showname + '第' + (i + 1 - decreaseIndex) + '组数第' + (k + 1) + '条第' + (z + 1) + '个佣金不能为0')
                  return false
                }
              }
            }
          }
        }
      }
      return true
    },
    saveEnd() {
      // 数据转换后提交
      if (this.checkValue) {
        this.$message.error('请先保存分红奖励选择再保存')
        return false
      }
      this.EndModel = true
      this.asc_commission2 = JSON.parse(JSON.stringify(this.asc_commission))
      this.equal_commission2 = JSON.parse(JSON.stringify(this.equal_commission))
      this.desc_commission2 = JSON.parse(JSON.stringify(this.desc_commission))

      for (let i = 0; i < this.asc_commission2.wrap.length; i++) {
        for (let k = 0; k < this.asc_commission2.wrap[i].length; k++) {
          const A = this.asc_commission2.wrap[i][k].type[1]
          const B = this.asc_commission2.wrap[i][k].type[0]
          this.asc_commission2.wrap[i][k].type = A !== undefined || '' ? A : B || ''
        }
      }
      // return
      for (let i = 0; i < this.equal_commission2.wrap.length; i++) {
        for (let k = 0; k < this.equal_commission2.wrap[i].length; k++) {
          const A = this.equal_commission2.wrap[i][k].type[1]
          const B = this.equal_commission2.wrap[i][k].type[0]
          this.equal_commission2.wrap[i][k].type = A !== undefined || '' ? A : B || ''
        }
      }
      for (let i = 0; i < this.desc_commission2.wrap.length; i++) {
        for (let k = 0; k < this.desc_commission2.wrap[i].length; k++) {
          const A = this.desc_commission2.wrap[i][k].type[1]
          const B = this.desc_commission2.wrap[i][k].type[0]
          this.desc_commission2.wrap[i][k].type = A !== undefined || '' ? A : B || ''
          // this.desc_commission2.wrap[i][k].type = this.desc_commission2.wrap[i][k].type[1] || this.desc_commission2.wrap[i][k].type[0] || ''
        }
      }
      // 验证
      const a = this.forDate(this.asc_commission2, 1)
      const b = this.forDate(this.equal_commission2, 2)
      const c = this.forDate(this.desc_commission2, 3)
      // return false
      // 传值
      if (!a || !b || !c) {
        this.EndModel = false

        return
      }
      if (!this.ascSwitch) {
        this.asc_commission2 = {}
      }
      if (!this.equalSwitch) {
        this.equal_commission2 = {}
      }
      if (!this.descSwitch) {
        this.desc_commission2 = {}
      }
      return new Promise((resolve, reject) => {
        dividendInterest({
          data: {
            asc_commission: this.asc_commission2,
            equal_commission: this.equal_commission2,
            desc_commission: this.desc_commission2
          }

        })
          .then(response => {
            if (response.data.errcode === 0) {
              this.$message.success('保存成功')
            } else {
              this.$message.error(response.data.errmsg)
            }
            this.EndModel = false
          })
          .catch(error => {
            this.EndModel = false
            // self.$message.error(error)
            reject(error)
          })
      })
    },
    // 保存模式
    saveModel() {
      const self = this
      self.Mode = true
      return new Promise((resolve, reject) => {
        dividendMode({
          mode: {
            asc_commission: self.ascSwitch,
            equal_commission: self.equalSwitch,
            desc_commission: self.descSwitch
          }
        })
          .then(response => {
            if (response.data.errcode === 0) {
              self.checkValue = false
              self.$message.success('保存成功')
            } else {
              self.$message.error(response.data.errmsg)
            }
            self.Mode = false
          })
          .catch(error => {
            self.Mode = false
            reject(error)
          })
      })
    },
    // 保存文本
    saveText() {
      const self = this
      self.TextModel = true
      return new Promise((resolve, reject) => {
        rewardName({
          name_list: self.rewardtext
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
    // 少了加
    addAscInit() {
      const self = this
      // console.log(self.ascPeople)
      //           console.log(self.asc_commission.handers)
      //           console.log(self.asc_commission.wrap)
      const ascPeopleLength = self.ascPeople.length
      const ascWrap = self.asc_commission.wrap.length
      console.log(ascPeopleLength)
      console.log(ascWrap)
      if (ascPeopleLength > ascWrap) {
        for (let i = ascWrap; i < self.people.length - 1; i++) {
          // self.asc_commission.handers.push(self.people[i + 1].level)
          self.asc_commission.wrap.push([])
          for (let k = 0; k < self.choiceOption.length; k++) {
            self.asc_commission.wrap[i].push({
              type: [],
              name: '',
              label: self.people[i].name,
              commission_data: [],
              level: self.people[i].level
            })
            // for (let j = 0; j < self.people.length - 1; j++) {
            //   self.asc_commission.wrap[i][k].commission_data[j] = {
            //     level: self.people[j + 1].level,
            //     commission_rate: ''
            //   }
            // }
          }
        }
      }
      console.log(self.asc_commission)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../src/styles/distribution.scss";
.dividend {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 30px;
  .dividend-top {
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
  .dividend-setting {
    @include boder-font;
    padding: 20px;
    text-align: center;
    // .sequential {
    // }

    // .same-level {
    // }

    // .Inverse {
    // }
    //共同样式
    .title {
      @include title-font(16px);
      font-weight: 600;
      text-align: left;
    }
    .title-total {
      background: #f7f7f7;
      @include title-font(14px);
      height: 60px;
      line-height: 60px;
      // .each-title {
      // }
      .each-title:nth-of-type(1) {
        position: relative;
        width: 120px;
        height: 60px;
        .line {
          content: "";
          position: absolute;
          left: 0%;
          top: 50%;
          height: 1px;
          width: 100%;
          background: #333;
          box-sizing: border-box;
          // border-bottom:1px solid #333;
          transform: rotateZ(26deg) scale(1.11803);
        }
        .now-identity {
          position: absolute;
          right: 0;
          top: 30%;
          transform: translateY(-50%);
        }
        .next-identity {
          position: absolute;
          left: 0;
          top: 70%;
          transform: translateY(-50%);
        }
      }
    }
    .each-content {
      border-bottom:1px solid #ebedf0;
      .each-identity {
        width: 120px;
      }
      .el-checkbox {
        display: flex;
        height: 60px;
        align-items: center;
        margin: 0 auto;
        text-align: center;
        justify-content: flex-start;
      }
    }

    .title-label {
      min-width: 65px;
    }
    .indetity-box {
      overflow-x: auto;
      overflow-y: hidden;
      .indetity-name{
        height: 60px;
        line-height: 60px;
        // width: 150px;
      }
      .each-rate{
        height: 60px;
        .moeny{
          width: 150px;
        }
        // line-height: 60px;
      }
      .table-one {
        @include text-font;
        white-space: nowrap;
        .each-attr {
          height: 60px;
          line-height: 60px;
          box-sizing: border-box;
          width: 150px;
          display: inline-table;
          text-align: center;
          padding: 0 20px;
          margin: 0;
          .input-number{
            width: 100%;
            border-radius: 5px;
            box-shadow: 0;
            padding-left: 5px;
          }
          .each-number {
            margin: 0 10px;
          }

        }
      }

    }
    .nbsp{
      height: 60px;
    }
    .reward{
      .choice{
        margin: 0 20px;
        box-sizing: border-box;
        height: 60px;
        line-height: 60px;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
// 改变组件样式
.indetity-box {
    .el-input__inner{
        padding: 0 0 0 7px;
      }
    }
</style>

