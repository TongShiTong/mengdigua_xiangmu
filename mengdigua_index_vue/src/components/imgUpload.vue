<template>
  <div class="img-comp">
    <el-upload
      class="avatar-uploader"
      :action="baseApi+'/material/index/upload'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <div
        v-if="imageUrl"
        style="width: 240px;height: 150px;"
        class="avCon"
        :style="{backgroundImage: 'url(' + image + ')'}"
      ></div>
      <div
        v-else
        style="background-color: #F7F7F7;width: 240px;height: 150px;position: relative;border-radius: 3px"
      >
        <img
          src="../assets/upimg.png"
          alt
          style="width:40px;height: 40px;position: absolute;left: 50%;top: 50%;transform:translate(-50%, -70%);"
        />
        <span
          v-if="typekind==1"
          style="position: absolute;left: 50%;top: 50%;transform:translate(-50%, 150%);font-size: 12px;width: 100%;text-align: center;color: #3d3d3d;cursor:pointer;font-weight: 500"
        >立即上传(国徽面)</span>
        <span
          v-if="typekind==2"
          style="position: absolute;left: 50%;top: 50%;transform:translate(-50%, 150%);font-size: 12px;width: 100%;text-align: center;color: #3d3d3d;cursor:pointer;font-weight: 500"
        >立即上传(人像图)</span>
        <span
          v-if="typekind==3"
          style="position: absolute;left: 50%;top: 50%;transform:translate(-50%, 150%);font-size: 12px;width: 100%;text-align: center;color: #3d3d3d;cursor:pointer;font-weight: 500"
        >立即上传</span>
      </div>
    </el-upload>
  </div>
</template>
<script>
// import { getBaseApi } from "./../utils/index.js";
import Vue from "vue";
export default {
  //单图上传插件
  name: "imgUpload",
  props: {
    kind: {
      type: Number,
      default() {
        return 0; // 'circle', 'square'
      }
    },
    typekind: {
      type: Number
    },
    imageUrl: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      // baseApi: window.location.origin + '/web',
      baseApi: "https://api.mengdigua.cn",
      image:this.imageUrl
    };
  },
  created() {},
  methods: {
    handleAvatarSuccess(res, file) {
      const self = this;

      self.image = URL.createObjectURL(file.raw)+"";
      if (this.kind == 1) {
        this.$emit("demo1", res.data.url);
      }
      if (this.kind == 2) {
        this.$emit("demo2", res.data.url);
      }
      if (this.kind == 3) {
        this.$emit("demo3", res.data.url);
      }
      if (this.kind == 4) {
        this.$emit("demo4", res.data.url);
      }
      if (this.kind == 5) {
        this.$emit("demo5", res.data.url);
      }
      if (this.kind == 6) {
        this.$emit("demo6", res.data.url);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log('111',file)
      if (!isJPG) {
        Vue.prototype.$message.error("上传头像图片只能是 JPG 和 PNG 格式!");
      }
      if (!isLt2M) {
        Vue.prototype.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped>
.avCon {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>


