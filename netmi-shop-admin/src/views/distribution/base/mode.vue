<template>
  <div class="base-mode">
    1
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { pushList, rewardName, dividendMode, dividendInterest, getDividend } from '@/api/distribution' // 验权
// import Vue from 'vue'
// import editorDashboard from './editor'

export default {
  name: 'Basemode',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {

  },

  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../src/styles/distribution.scss";
.base-mode{
   width: 100%;
  box-sizing: border-box;
  padding: 20px 30px;
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

