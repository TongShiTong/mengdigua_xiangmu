<template>
  <div class="distribution-top">
    <div v-if="$route.path.indexOf('/distribution/administration')!==-1" class="flex-r-s">
      <!-- <router-link tag="div" to="/distribution/administration" class="each-title" active-class="menu-choice" >分销员管理</router-link> -->
    </div>
    <!-- <div class="each-title">分销员管理</div> -->

    <div v-if="$route.path.indexOf('/dividend')!==-1" class="flex-r-s" >
      <router-link tag="div" to="/dividend/set" class="each-title" active-class="menu-choice" >分佣设置</router-link>
      <router-link tag="div" to="/dividend/red" class="each-title" active-class="menu-choice" >分红设置</router-link>
    </div>

    <div v-if="$route.path.indexOf('/base')!==-1" class="flex-r-s">
      <router-link tag="div" to="/base/set" class="each-title" active-class="menu-choice" >基础设置</router-link>
      <router-link tag="div" to="/base/mode" class="each-title" active-class="menu-choice" >模式设置</router-link>
    </div>

  </div>
</template>

<script>

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function // eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.distribution-top {
  position: fixed;
  left: 132px;
  // right: 150px;
  right: 0;
  background: #fff;
  z-index: 50;
  border-bottom: 1px solid #ebedf0;
  border-left: 1px solid #ebedf0;
    border-right: 1px solid #ebedf0;
  font-weight: 500;
  font-size: 14px;
  height: 56px;
  line-height: 56px;
  cursor: pointer;
  color: #333;
  display: flex;
  .each-title {
    min-width: 100px;
    padding:0 15px;
    text-align: center;
    font-family: SourceHanSansSC;
    font-weight: 400;
    color: #323233;
    font-style: normal;
    letter-spacing: 0px;
    text-decoration: none;
  }
  .menu-choice{
    color: rgba(52, 166, 219, 1);
  }
}
</style>
