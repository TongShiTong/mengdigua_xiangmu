<template>
  <li
    v-if="itemVisible"
    :class="liClass"
  >
    <div :draggable="draggable" class="tree-node-el" @dragstart="drag(item, $event)">
      <span
        v-if="showExpand"
        :class="item.expanded ? 'tree-open' : 'tree-close'"
        class="tree-expand"
        @click="expandNode(item,index)"
      />
      <span v-if="multiple && !item.nocheck" :class="[item.checked ? (item.halfcheck ? 'box-halfchecked' : 'box-checked') : 'box-unchecked', 'inputCheck']">
        <input
          v-if="multiple"
          :disabled="item.chkDisabled"
          :class="['check', item.chkDisabled ? 'chkDisabled' : '']"
          :checked="item.checked"
          type="checkbox"
          @change="changeNodeCheckStatus(item, $event)">
      </span>
      <loading v-if="item.loading && item.expanded"/>
      <!-- <Render :node="item" :parent='parent' :index='index' :tpl ='tpl' :nodeMouseOver='nodeMouseOver'/> -->

      <img class="img" src="https://liemimofang.oss-cn-hangzhou.aliyuncs.com/backend/frontend_15484925435580.jpg">
      <div :class="showExpand?'padding-left':''">
        <div>微信昵称</div>
        <div>vip</div>
      </div>
      <!-- <div>{{ item.title }}</div> -->
    </div>
    <template v-if="showNextUl">
      <collapse-transition>
        <TreeUl
          v-show="item.expanded"
          :drag-after-expanded="dragAfterExpanded"
          :draggable="draggable"
          :tpl ="tpl"
          :data="item.children"
          :halfcheck="halfcheck"
          :scoped ="scoped"
          :parent ="item"
          :can-delete-root ="canDeleteRoot"
          :multiple="multiple"
          :level="level"
          :max-level="maxLevel"
          :top-must-expand="topMustExpand"
          :allow-get-parent-node="allowGetParentNode"
        />
      </collapse-transition>
    </template>
  </li>
</template>
<script>
import mixins from './mixins'
import Render from './render'
import Loading from './loading'
import CollapseTransition from './collapse-transition'
export default {
  name: 'TreeLi',
  components: { Render, Loading, CollapseTransition
    // TreeUl: () => import('./treeUl.vue') // 解决循环引用的问题
  },
  mixins: [mixins],
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    dataLength: {
      type: Number,
      default: 0
    },
    parent: {
      type: Object,
      default: () => null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    dragAfterExpanded: {
      type: Boolean,
      default: true
    },
    halfcheck: {
      type: Boolean,
      default: false
    },
    scoped: {
      type: Boolean,
      default: false
    },
    canDeleteRoot: {
      type: Boolean,
      default: false
    },
    tpl: {
      type: Function,
      default: () => {}
    },
    maxLevel: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 0
    },
    topMustExpand: {
      type: Boolean,
      default: false
    },
    allowGetParentNode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    itemVisible() {
      const { visible = true } = this.item
      // visible = visible === false ? false : true
      return visible
    },
    hasExpended() { // 已经展开过
      const { hasExpended = false, expanded = false } = this.item
      return this.itemVisible && (expanded || hasExpended)
    },
    liClass() {
      const index = this.index
      let res
      if (this.parent) {
        res = {
          leaf: this.isLeaf(this.item)
        }
      } else { // top node
        res = {
          'first-node': index === 0,
          'only-node': this.dataLength === 1,
          'second-node': index === 1
        }
      }
      return res
    },
    hasChildren() {
      const item = this.item
      return item.children && item.children.length > 0
    },
    showExpand() {
      const item = this.item
      const isShow = !this.parent ? this.topMustExpand : false
      return isShow || this.hasChildren || item.async
    },
    showNextUl() {
      return !this.isLeaf(this.item) && this.maxLevel > this.level && this.hasExpended
    }
  },
  watch: {
    'item.checked': {
      handler() {
        this.checkedChange()
      },
      immediate: true
    },
    'item.halfcheck': {
      handler() {
        this.checkedChange()
      },
      immediate: true
    }
  },
  beforeCreate() {
    this.$options.components.TreeUl = require('./treeUl.vue').default
  },
  inject: ['isLeaf', 'childChecked', 'parentChecked', 'nodeSelected', 'emitEventToTree', 'setAttr'],
  methods: {
    /* @method drag node
     * @param node draged node
     * @param ev  $event
    */
    drag(node, ev) {
      const guid = this.guid()
      this.setDragNode(guid, node, this.parent)
      ev.dataTransfer.setData('guid', guid)
    },
    /* @method expand or close node
     * @param node current node
    */
    expandNode(node, index) {
      const expended = !node.expanded
      this.setAttr(node, 'expanded', expended)
      this.setAttr(node, 'hasExpended', true)
      node.index = index
      node.level = this.level
      if (node.children || node.async) {
        if (node.async && !node.children) {
          this.emitEventToTree('async-load-nodes', node)
        }
      }
    },
    /* @event passing the node-check event to the parent component
     * @param node clicked node
     */
    nodeCheck(node, checked) {
      this.$set(node, 'checked', checked)
      const halfcheck = this.halfcheck
      if (halfcheck) {
        this.$set(node, 'halfcheck', false)
      }
      if (!this.scoped) {
        this.childChecked(node, checked, halfcheck)
        // this.theParentChecked(checked, halfcheck)
      }
    },
    /* @event passing the node-mouse-over event to the parent component
     * @param node overed node
     */
    nodeMouseOver(node, index, parent) {
      this.emitEventToTree('node-mouse-over', node, index, parent)
      // this.$emit('node-mouse-over', node)
    },
    /*
     *@method change the check box status method
     *@param node current node
     *@param $event event object
     */
    changeNodeCheckStatus(node, $event) {
      const checked = $event.target.checked
      this.nodeCheck(node, checked)
      this.emitEventToTree('node-check', node, checked)
    },
    theParentChecked(checked, halfcheck) {
      const parentNode = this.parent
      this.parentChecked(parentNode, checked, halfcheck)
    },
    checkedChange() {
      const { checked = false } = this.item
      this.theParentChecked(checked, this.halfcheck)
      // if (!checked) {
      //   this.$set(this.item, 'selected', checked)
      // }
    }
  }
}
</script>
<style >
.img {
   width: 46px;
   height: 46px;
   border-radius: 50%;
}
.padding-left{
  margin-left: 15px;
  line-height: 20px;
}
</style>
