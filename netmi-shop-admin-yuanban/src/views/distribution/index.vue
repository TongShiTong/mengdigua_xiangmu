<template>
  <div class="distribution">
    <distribution-menu/>
    <div class="center-content">
      <distribution-top class="top-min-width" />
      <div style="padding-top:56px;min-width:1100px;">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
    <!-- <distribution-help/> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import distributionMenu from '../../../src/components/distributionMenu'
import distributionTop from '../../../src/components/distributionTop'
import distributionHelp from '../../../src/components/distributionHelp'
// import editorDashboard from './editor'

export default {
  name: 'Distribution',
  components: { distributionMenu, distributionTop, distributionHelp },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.distribution{
  width: 100%;
  height: 100%;
  .center-content{
    overflow-x: scroll;
    position: absolute;
    min-height: 100%;
    background: #fff;
    left: 132px;
    right: 0;
    top: 0;
    border-left: 1px solid #ebedf0;
    border-right: 1px solid #ebedf0;

    // overflow-y: scroll;
  }
  .top-min-width{
    min-width:1100px ;
  }
}

</style>
