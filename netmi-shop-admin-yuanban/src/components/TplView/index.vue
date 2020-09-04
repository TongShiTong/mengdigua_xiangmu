<template>
  <div class="tpl-column">
    <div class="tpl-column-header">
      {{ headerText }}
    </div>
    <draggable
      :list="list"
      :options="options"
      class="tpl-column-content">
      <div v-for="element in list" :key="element.id" class="tpl-item">
        {{ element.name }} {{ element.id }}
      </div>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'DragTplView',
  components: {
    draggable
  },
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="scss">
.tpl-column {
  min-width: 375px;
  min-height: 667px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .tpl-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }

  .tpl-column-content {
    height: auto;
    overflow: hidden;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .tpl-item {
      cursor: pointer;
      width: 100%;
      height: 64px;
      border: solid 1px #999999;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
    }
  }
}
</style>

