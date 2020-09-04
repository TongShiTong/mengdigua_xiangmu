<template>
  <div class="help">
    <div class="class-word">帮助中心</div>
  </div>
</template>

<script>

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
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
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/distribution.scss";

.help{
    position:fixed;
     background: #fff;
    right: 0;
    top: 0;
    width: 150px;
    min-height: 100%;
    z-index: 35;
    font-size: 14px;
    padding: 0px;
    border-width: 0px;
    border-style: solid;
    line-height: 20px;
    font-weight: normal;
    font-style: normal;
    opacity: 1;
    font-family: SourceHanSansSC;
    font-weight: 400;
    font-size: 14px;
    color: #323233;
    font-style: normal;
    letter-spacing: 0px;
    text-decoration: none;
    line-height:80px;
    // border-left: 1px solid #ebedf0;
    .class-word{
      padding-left: 30px;
    }
}
</style>
