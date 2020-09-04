<template>
  <div v-loading="loading" class="shop-theme">
    <div class="theme-box">
      <el-row class="row-box">
        <el-col :span="3" style="text-align:right;padding-right:15px;">
          商城名称：
        </el-col>
        <el-col :span="8">
          <el-input v-model="theme.shop_name" placeholder="请输入商城名称"/>
        </el-col>
      </el-row>

      <el-row class="row-box">
        <el-col :span="3" style="text-align:right;padding-right:15px;">
          颜色风格：
        </el-col>
        <el-col :span="11" >
          <el-row>
            <el-col :span="8" style="padding:2px;">
              <div :class="theme.color_theme==0?'color-box-act':''" class="color-box" @click="setThemeColor(0)">
                <div class="color-box-t">
                  美妆
                </div>
                <div class="color-box-i">
                  <img src="@/assets/bg_1.png">
                </div>
                <i class="el-icon-circle-check-outline color-check"/>
              </div>
            </el-col>
            <el-col :span="8" style="padding:2px;">
              <div :class="theme.color_theme==1?'color-box-act':''" class="color-box" @click="setThemeColor(1)">
                <div class="color-box-t">
                  生鲜
                </div>
                <div class="color-box-i">
                  <img src="@/assets/bg_2.png">
                </div>
                <i class="el-icon-circle-check-outline color-check"/>
              </div>
            </el-col>
            <el-col :span="8" style="padding:2px;">
              <div :class="theme.color_theme==2?'color-box-act':''" class="color-box" @click="setThemeColor(2)">
                <div class="color-box-t">
                  数码3c
                </div>
                <div class="color-box-i">
                  <img src="@/assets/bg_3.png">
                </div>
                <i class="el-icon-circle-check-outline color-check"/>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" style="padding:2px;">
              <div :class="theme.color_theme==3?'color-box-act':''" class="color-box" @click="setThemeColor(3)">
                <div class="color-box-t">
                  百货
                </div>
                <div class="color-box-i">
                  <img src="@/assets/bg_4.png">
                </div>
                <i class="el-icon-circle-check-outline color-check"/>
              </div>
            </el-col>
            <el-col :span="8" style="padding:2px;">
              <div :class="theme.color_theme==4?'color-box-act':''" class="color-box" @click="setThemeColor(4)">
                <div class="color-box-t">
                  医疗
                </div>
                <div class="color-box-i">
                  <img src="@/assets/bg_5.png">
                </div>
                <i class="el-icon-circle-check-outline color-check"/>
              </div>
            </el-col>
            <el-col :span="8" style="padding:2px;">
              <div :class="theme.color_theme==5?'color-box-act':''" class="color-box" @click="setThemeColor(5)">
                <div class="color-box-t">
                  服装
                </div>
                <div class="color-box-i">
                  <img src="@/assets/bg_6.png">
                </div>
                <i class="el-icon-circle-check-outline color-check"/>
              </div>
            </el-col>
          </el-row>

        </el-col>
      </el-row>

      <el-row class="row-box">
        <el-col :span="3" style="text-align:right;padding-right:15px;">
          商城logo：
        </el-col>
        <el-col :span="20">
          <el-upload
            :action="base_api+'/material/index/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader">
            <img v-if="theme.logo_url" :src="theme.logo_url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="row-box">
        <el-col :span="3" style="text-align:right;padding-right:15px;">
          商城icon(100*100)：
        </el-col>
        <el-col :span="2">
          <div style="padding-bottom:5px;height:65px;text-align:center;line-height:60px;">
            未选中
          </div>
          <div style="padding-bottom:5px;height:65px;text-align:center;line-height:60px;">
            选中
          </div>
        </el-col>
        <el-col :span="2">
          <div style="padding-bottom:5px;">
            <el-upload
              :action="base_api+'/material/index/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess01"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader">
              <img v-if="theme.icons[0].icon" :src="theme.icons[0].icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </div>
          <div style="padding-bottom:5px;">
            <el-upload
              :action="base_api+'/material/index/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess02"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader">
              <img v-if="theme.icons[0].icon_act" :src="theme.icons[0].icon_act" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </div>
        </el-col>

        <el-col :span="2">
          <div style="padding-bottom:5px;">
            <el-upload
              :action="base_api+'/material/index/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess11"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader">
              <img v-if="theme.icons[1].icon" :src="theme.icons[1].icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </div>
          <div style="padding-bottom:5px;">
            <el-upload
              :action="base_api+'/material/index/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess12"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader">
              <img v-if="theme.icons[1].icon_act" :src="theme.icons[1].icon_act" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </div>
        </el-col>

        <el-col :span="2">
          <div style="padding-bottom:5px;">
            <el-upload
              :action="base_api+'/material/index/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess21"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader">
              <img v-if="theme.icons[2].icon" :src="theme.icons[2].icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </div>
          <div style="padding-bottom:5px;">
            <el-upload
              :action="base_api+'/material/index/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess22"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader">
              <img v-if="theme.icons[2].icon_act" :src="theme.icons[2].icon_act" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </div>
        </el-col>

        <el-col :span="2">
          <div style="padding-bottom:5px;">
            <el-upload
              :action="base_api+'/material/index/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess31"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader">
              <img v-if="theme.icons[3].icon" :src="theme.icons[3].icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </div>
          <div style="padding-bottom:5px;">
            <el-upload
              :action="base_api+'/material/index/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess32"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader">
              <img v-if="theme.icons[3].icon_act" :src="theme.icons[3].icon_act" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </div>
        </el-col>

        <el-col :span="2">
          <div style="padding-bottom:5px;">
            <el-upload
              :action="base_api+'/material/index/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess41"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader">
              <img v-if="theme.icons[4].icon" :src="theme.icons[4].icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </div>
          <div style="padding-bottom:5px;">
            <el-upload
              :action="base_api+'/material/index/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess42"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader">
              <img v-if="theme.icons[4].icon_act" :src="theme.icons[4].icon_act" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </div>
        </el-col>
      </el-row>

      <el-row class="row-box">
        <el-col :span="3" style="text-align:right;padding-right:15px;">
          会员背景1(600*618)：
        </el-col>
        <el-col :span="6" style="width:205px;">
          <el-upload
            :action="base_api+'/material/index/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccessV"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader">
            <img v-if="theme.vip_bg" :src="theme.vip_bg" class="avatar1">
            <i v-else class="el-icon-plus avatar-uploader-icon1"/>
          </el-upload>
        </el-col>
        <el-col :span="3" style="text-align:right;padding-right:15px;">
          会员背景2(600*618)：
        </el-col>
        <el-col :span="6" style="width:205px;">
          <el-upload
            :action="base_api+'/material/index/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccessV2"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader">
            <img v-if="theme.vip_bg2" :src="theme.vip_bg2" class="avatar1">
            <i v-else class="el-icon-plus avatar-uploader-icon1"/>
          </el-upload>
        </el-col>
        <el-col :span="3" style="text-align:right;padding-right:15px;">
          个人中心背景(600*393)：
        </el-col>
        <el-col :span="6" style="width:205px;">
          <el-upload
            :action="base_api+'/material/index/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccessU"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader">
            <img v-if="theme.user_bg" :src="theme.user_bg" class="avatar2">
            <i v-else class="el-icon-plus avatar-uploader-icon2"/>
          </el-upload>
        </el-col>
      </el-row>

      <el-row class="row-box">
        <el-col :span="3" style="text-align:right;padding-right:15px;">
          <el-button type="primary" style="width:100px;" size="mini" @click="saveInfo()">保存</el-button>
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import { getBaseApi } from '@/utils'
export default {
  name: 'ShopTheme',
  data() {
    return {
      base_api: getBaseApi(),
      theme: {
        shop_name: '', // 店铺名称
        logo_url: '', // 店铺logo
        user_bg: '', // 个人中心页面背景
        vip_bg: '', // 分销员页面背景
        vip_bg2: '', // 分销员页面背景
        color_theme: 0, // 风格类型（0,1,2,3,4,5........）
        icons: [
          {
            icon: '',
            icon_act: ''
          },
          {
            icon: '',
            icon_act: ''
          },
          {
            icon: '',
            icon_act: ''
          },
          {
            icon: '',
            icon_act: ''
          },
          {
            icon: '',
            icon_act: ''
          }
        ]
      },
      color_list: [
        {
          color_1: '#FF4444',
          color_2: '#FF8855',
          color_3: '#C3A769'
        },
        {
          color_1: '#65C4AA',
          color_2: '#DDF2EC',
          color_3: '#C3A769'
        },
        {
          color_1: '#333333',
          color_2: '#FF4444',
          color_3: '#C3A769'
        }
      ],
      loading: false
    }
  },
  created() {
    this.getThemeInfo()
  },
  methods: {
    setThemeColor(type) {
      const self = this
      self.loading = true
      self.theme.color_theme = type
      request({
        method: 'post',
        url: '/base/templet-api/set',
        data: {
          color_theme: type
        }
      }).then(function(res) {
        self.getThemeInfo()
      }).catch(function(error) {
        self.loading = false
        console.log(error)
      })
    },
    /**
     * 图片上传成功
     * res(返回值)，file(返回文件)
    */
    handleAvatarSuccess(res, file) {
      const self = this
      self.theme.logo_url = res.data.url
    },
    handleAvatarSuccessV(res, file) {
      const self = this
      self.theme.vip_bg = res.data.url
    },
    handleAvatarSuccessV2(res, file) {
      const self = this
      self.theme.vip_bg2 = res.data.url
    },
    handleAvatarSuccessU(res, file) {
      const self = this
      self.theme.user_bg = res.data.url
    },
    /**
     * 图片上传成功
     * res(返回值)，file(返回文件)
    */
    handleAvatarSuccess01(res, file) {
      const self = this
      self.theme.icons[0].icon = res.data.url
    },
    handleAvatarSuccess02(res, file) {
      const self = this
      self.theme.icons[0].icon_act = res.data.url
    },

    handleAvatarSuccess11(res, file) {
      const self = this
      self.theme.icons[1].icon = res.data.url
    },
    handleAvatarSuccess12(res, file) {
      const self = this
      self.theme.icons[1].icon_act = res.data.url
    },

    handleAvatarSuccess21(res, file) {
      const self = this
      self.theme.icons[2].icon = res.data.url
    },
    handleAvatarSuccess22(res, file) {
      const self = this
      self.theme.icons[2].icon_act = res.data.url
    },

    handleAvatarSuccess31(res, file) {
      const self = this
      self.theme.icons[3].icon = res.data.url
    },
    handleAvatarSuccess32(res, file) {
      const self = this
      self.theme.icons[3].icon_act = res.data.url
    },

    handleAvatarSuccess41(res, file) {
      const self = this
      self.theme.icons[4].icon = res.data.url
    },
    handleAvatarSuccess42(res, file) {
      const self = this
      self.theme.icons[4].icon_act = res.data.url
    },
    /**
     * 图片上传前验证
     * file(文件)
    */
    beforeAvatarUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return isLt3M
    },
    // 获取位置信息
    getThemeInfo() {
      const self = this
      request({
        method: 'post',
        url: '/base/templet-api/info',
        data: {}
      }).then(function(res) {
        self.loading = false
        console.log(res)
        if (res.data.data.logo_url) {
          self.theme = res.data.data
        } else if (res.data.data.logo_url === '') {
          self.theme = res.data.data
        }
      }).catch(function(error) {
        self.loading = false
        console.log(error)
      })
    },

    // 新增位置
    saveInfo() {
      const self = this
      request({
        method: 'post',
        url: '/base/templet-api/update',
        data: self.theme
      }).then(function(res) {
        console.log(res)
        // self.plist = res.data.data
        if (res.data.errcode === 0) {
          self.$message({
            message: '保存成功！',
            type: 'success'
          })
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
.shop-theme {
 display: block;
 padding: 15px;
 box-sizing: border-box;
 background-color: #f4f4f4;
 .theme-box{
   background-color: #ffffff;
   padding: 0;
   box-sizing: border-box;
   .row-box{
     .color-box{
       width: 100%;
       padding: 4px;
       box-sizing: border-box;
       border: solid 1px #cccccc;
       display: flex;
       position: relative;
       .color-check{
         color: #ffffff;
         position:absolute;
         bottom: 2px;
         left:2px;
         font-size: 20px;
       }
       .color-box-t{
         width: 60px;
         font-size: 14px;
         color: #888888;
       }
       .color-box-i{
          flex: 1;
          img{
            width: 100%;
            display: block;
          }
       }
     }
     .color-box:hover{
       border: solid 1px #FF7516;
     }
     .color-box-act{
       border: solid 1px #FF7516;
       .color-check{
         color: #FF7516;
         position:absolute;
         bottom: 2px;
         left:2px;
         font-size: 20px;
       }
     }
        padding: 10px;
        box-sizing: border-box;
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
        }
        .avatar {
            width: 60px;
            height: 60px;
            display: block;
        }
        .avatar-uploader-icon1 {
            font-size: 28px;
            color: #8c939d;
            width: 200px;
            height: 206px;
            line-height: 206px;
            text-align: center;
        }
        .avatar1 {
            width: 200px;
            height: 206px;
            display: block;
        }
        .avatar-uploader-icon2 {
            font-size: 28px;
            color: #8c939d;
            width: 200px;
            height: 131px;
            line-height: 131px;
            text-align: center;
        }
        .avatar2 {
            width: 200px;
            height: 131px;
            display: block;
        }
   }

 }
}

</style>

