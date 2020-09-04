<template>
  <div id="app">
    <!-- 不缓存 -->
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "App",
  components: {

  },
  mounted() {},

  methods: {}
};
</script>

<style>
.flex-s-s {
  display: flex;
  justify-content: flex-start;
  justify-items: start;
}

.flex-b-e {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.bg-white-box {
  width: 1200px;
  margin: 40px auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 6px 6px rgba(0, 0, 0, 0.08);
}
.bg-header {
  height: 50px;
  background: rgba(0, 0, 0, 0.05);
  font-size: 18px;
  font-weight: bold;
  line-height: 50px;
  color: rgba(0, 0, 0, 0.9);
  padding-left: 24px;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  /* font-family: "PingFangSC-Regular", "-apple-system", "Helvetica Neue", "Roboto",
    "Segoe UI", sans-serif; */
}
.text-center {
  text-align: center;
}

.flex-a {
  display: flex;
  justify-content: space-around;
}
.flex {
  display: flex;
}
.flex-b-c {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-s-c {
  display: flex;
  align-items: center;
}
.flex-c-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-c-s {
  display: flex;
  justify-content: center;
}
#app {
  background-color: white;
  overflow-x: auto;
  overflow-y: hidden;
  min-width: 1260px;
}
</style>