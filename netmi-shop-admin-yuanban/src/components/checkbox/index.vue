<template>
  <div class="Chexkbox" >
    <div class="flex-r-s">
      <div
        v-for="(item,index) in checkData"
        :key = "index"
        class="flex-r-s each-choice mr20"
        @click="changeStatus(item.chekced,index)">
        <div :class="item.chekced?'checked':''" class="circle" />
        <div class="choice">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chexkbox',
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    },
    backPosition: {
      type: Number,
      default: 0
    },
    checkData: {
      type: Array,
      default: () => {
        return []
      }
    },
    customStyle: {
      type: Object,
      default: function() {
        return {
        }
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false
    }
  },
  computed: {
  },
  mounted() {
  },
  beforeDestroy() {

  },
  methods: {
    changeStatus(e, index) {
      this.$emit('change-status', { status: !e, index: index })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .circle{
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #dcdfe6;
  }
  .checked{
    border-color: #409EFF;
    background: #409EFF;
    position: relative
  }
  .checked::after{
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
  }
  .choice{
    margin-left: 10px;
  }
  .each-choice{
    cursor: pointer;
     font-size:14px;
    color: #666;
  }

</style>
