<template>
  <div class="menu">
    <div class="menu-total">
      <div class="menu-li">分销员管理</div>
      <router-link tag="div" to="/distribution/administration" class="menu-li" active-class="menu-choice">分销员管理</router-link>
      <router-link tag="div" to="/base" class="menu-li" active-class="menu-choice">基础设置</router-link>
      <router-link tag="div" to="/dividend" class="menu-li" active-class="menu-choice">分销设置</router-link>
      <!-- <div class=""/>
      <div class="menu-li">分销员管理</div>
      <div class="menu-li">基础设置</div>
      <div class="menu-li">分销设置</div> -->
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
.menu {
  height: 100%;
}
.menu-total {
  position:fixed;
  left: 0;
  top: 0;
  width: 132px;
  background: #fff;
  // border-right: 1px solid #ebedf0;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  min-height: 100%;
  .menu-li {
    width: 132px;
    font-size: 14px;
    height: 56px;
    line-height: 56px;
    cursor: pointer;
    color: #333;
    border-bottom: 1px solid #ebedf0;
        font-family: SourceHanSansSC;
    font-weight: 400;
    color: rgba(16, 16, 16, 1);
    font-style: normal;
    letter-spacing: 0px;
    text-decoration: none;
  }
  .menu-choice{
    color:rgb(52, 166, 219)
  }
}
</style>
