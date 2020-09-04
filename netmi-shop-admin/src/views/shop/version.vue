<template>
  <div class="shop-version">
    <el-row>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <span>当前版本号：{{ version }}</span>
            <div class="bottom clearfix" style="padding:15px 0;">
              <el-input
                v-model="new_version"
                size="mini"
                placeholder="请输入新的版本号"/>
            </div>
            <div class="bottom clearfix">
              <el-button size="mini" @click="setVersion()">更新版本号</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'ShopVersion',
  data() {
    return {
      version: '',
      new_version: ''
    }
  },
  created() {
    this.getVersion()
  },
  methods: {

    // 获取位置信息
    getVersion() {
      const self = this
      request({
        method: 'post',
        url: '/content/content-api/obtain-version-hao',
        data: {
        }
      }).then(function(res) {
        console.log(res)
        self.version = res.data.data.version_hao
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 新增位置
    setVersion() {
      const self = this
      if (!self.new_version) {
        self.$message({
          type: 'info',
          message: '新版本好不能为空!'
        })
        return
      }
      request({
        method: 'post',
        url: '/content/content-api/add-version-hao',
        data: {
          version_hao: self.new_version
        }
      }).then(function(res) {
        console.log(res)
        if (res.data.errcode === 0) {
          self.getVersion()
        } else {
          self.$message.error(res.data.errmsg)
        }
      }).catch(function(error) {
        console.log(error)
        self.$message.error(error)
      })
    }

  }

}
</script>
<style lang="scss">
.shop-version {
 display: block;
 padding: 15px;
}

</style>

