<template>
  <ul class="halo-tree">
    <treeLi
      v-for="(item, index) in data"
      :key="item.id ? item.id : index"
      :item="item"
      :index="index"
      v-bind="childBind"
      @drop.stop.native="drop(item, $event)"
      @dragover.stop.native="dragover"
    />
  </ul>
</template>
<script>
import TreeLi from './treeLi'
// import './tree.css'
import mixins from './mixins'
export default {
  name: 'TreeUl',
  components: { TreeLi },
  mixins: [mixins],
  inheritAttrs: false,
  inject: ['isLeaf', 'childChecked', 'parentChecked', 'emitEventToTree'],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    parent: {
      type: Object,
      default: () => null
    },
    dragAfterExpanded: {
      type: Boolean,
      default: true
    },
    level: {
      type: Number,
      default: 0
    },
    allowGetParentNode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    childBind() {
      const { data, ...otherObj } = this.$props
      const dataLength = data.filter(node => node.visible !== false).length
      return Object.assign({},
        this.$attrs,
        otherObj,
        {
          dataLength,
          level: this.treeLevel
        }
      )
    },
    treeLevel() {
      return this.level + 1
    }
  },
  created() {
    if (this.allowGetParentNode === true) {
      const data = this.data
      const hasParent = data[0] && typeof data[0].parent === 'function'
      if (!hasParent) {
        const parent = this.parent
        this.data.forEach(item => {
          item.parent = () => parent
        })
      }
    }
  },
  methods: {
    /* @method drop node
     * @param node droped node
     * @param ev  $event
    */
    drop(node, ev) {
      ev.preventDefault()
      ev.stopPropagation()
      const guid = ev.dataTransfer.getData('guid')
      const { node: dragNode, parent: parentNode } = this.getDragNode(guid)
      // if drag node's parent is enter node or root node
      if (parentNode === node || parentNode === null || dragNode === node) return false
      // drag from parent node to child node
      if (this.hasInGenerations(dragNode, node)) return false
      const dragHost = parentNode.children
      if (node.children && node.children.indexOf(dragNode) === -1) {
        node.children.push(dragNode)
        dragHost.splice(dragHost.indexOf(dragNode), 1)
      } else {
        this.$set(node, 'children', [dragNode])
        dragHost.splice(dragHost.indexOf(dragNode), 1)
      }
      this.$set(node, 'expanded', this.dragAfterExpanded)
      this.dragNodeEnd({ dragNode: dragNode, targetNode: node, event: ev })
    },
    /* @method drag node
     * @param node draged node
     * @param ev  $event
    */
    drag(node, ev) {
      const guid = this.guid()
      this.setDragNode(guid, node, this.parent)
      ev.dataTransfer.setData('guid', guid)
    },
    /* @method dragover node
     * @param ev  $event
    */
    dragover(ev) {
      ev.preventDefault()
      ev.stopPropagation()
    },
    /* @event passing the drag-node-end event to the parent component
     * @param node clicked node
     */
    dragNodeEnd(obj = {}) {
      this.emitEventToTree('drag-node-end', obj)
    }
  }
}
</script>
