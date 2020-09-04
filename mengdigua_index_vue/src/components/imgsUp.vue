<template>
  <div class="img-comp">
    <el-upload
      :action="baseApi+'/material/index/upload'"
      list-type="picture-card"
      multiple
      :file-list="imgArr"
      :on-success="handleAvatarSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
//多图上传插件
// import { getBaseApi } from '@/utils/index.js'
export default {
  name: "imgsUp",
  props: {
    kind: {
      type: Number,
      default() {
        return 0;
      }
    },
    imgArr: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: "",
      baseApi: window.location.origin + "/web"
          // baseApi: 'http://applying.mengdigua.cn/' + '/web'
    };
  },
  created() {},
  methods: {
    handleRemove(file, fileList) {
      if (this.kind == 1) {
        this.$emit("imgs1", fileList);
      }
      if (this.kind == 2) {
        this.$emit("imgs2", fileList);
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if(this.kind==1){
        this.$emit('imgs1',fileList)
      }
      if(this.kind==2){
        this.$emit('imgs2',fileList)
      }
    }
  }
};
</script>
<style scoped>
.avatar {
  width: 160px;
  height: 90px;
}
.avCon {
  width: 160px;
  height: 90px;
   background-size: contain;
  background-repeat:no-repeat;
  background-position: center center;
}
</style>


