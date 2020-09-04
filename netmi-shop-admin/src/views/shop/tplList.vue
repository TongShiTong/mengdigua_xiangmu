<template>
  <div class="shop-list-tpl">
    <el-row :gutter="30">
      <el-col :span="5">
        <div class="tpl-tools">
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增位置</el-button>
        </div>
        <el-menu
          background-color="#eeeeee"
          default-active="0"
          class="el-menu-vertical-demo"
          @select="handleSelect"
        >
          <el-menu-item v-for="(item,index) in plist" :key="index" :index="index+''">
            <!-- <i class="el-icon-arrow-right"/> -->
            <div slot="title">
              <div style="line-height:28px;">{{ item.name }}(id:{{ item.position_code }})</div>
              <div style="line-height:27px;border-bottom:solid 1px #dddddd;font-size:12px;"><span style="color:#777777;">{{ item.introduction==1?'首页显示':'普通模板' }}</span></div>
            </div>

            <!-- <el-button style="float:right;margin-top:13px;" type="danger" icon="el-icon-delete" circle size="mini" plain @click.stop="delPos(item.id,index)"/> -->
            <!-- <el-button style="float:right;margin-top:13px;" type="primary" size="mini" plain @click.stop="editPos(item.id,index)">修改</el-button> -->
            <i style="float:right;margin-top:13px;" class="el-icon-delete" @click.stop="delPos(item.id,index)"/>
            <i style="float:right;margin-top:13px;" class="el-icon-edit" @click.stop="editPos(item)"/>
          </el-menu-item>

        </el-menu>
      </el-col>
      <el-col v-if="use_position" :span="19">
        <div class="tpl-tools">
          <el-button type="primary" icon="el-icon-plus" @click="dialogForm1Visible = true">新增模板</el-button>
          <span style="padding-left:20px;color: #66b1ff;font-size:18px;">
            {{ use_position_name }}
          </span>
        </div>
        <!-- <el-table
          :data="list"
          border
          style="width: 100%">
          <el-table-column
            label="创建时间"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"/>
              <span style="margin-left: 10px">{{ scope.row.floor.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>模板名称: {{ scope.row.floor.title }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.floor.title }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.is_enable==0"
                size="mini"
                @click="handleSet(scope.$index, scope.row)">启用</el-button>
              <el-button
                v-if="scope.row.is_enable==1"
                type="success"
                size="mini"
                plain
                disabled>已启用</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table> -->
        <div class="template-wrapper">
          <el-row :gutter="30">
            <el-col v-for="(item,index) in list" :key="item.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
              <div class="template-item">
                <div class="template-item-img">
                  <div class="title">{{ item.floor.title }}</div>
                </div>
                <div class="template-item-content">
                  <div class="title">{{ item.floor.title }}</div>
                  <div class="btn-group">
                    <el-button v-if="item.is_enable==0" size="mini" @click="handleSet(index,item.floor_id)">启用</el-button>
                    <el-button v-if="item.is_enable==1" type="success" size="mini" plain disabled>已启用</el-button>
                    <el-button size="mini" @click="handleEdit(index,item.floor_id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(index,item.floor_id)">删除</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="页面位置新增">
      <el-form :model="posObj">
        <el-form-item :label-width="'180px'" label="位置名称">
          <el-input v-model="posObj.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="'180px'" label="位置编码（首页必须填1）">
          <el-input v-model="posObj.position_code" autocomplete="off" placeholder="首页必须填1"/>
        </el-form-item>
        <el-form-item :label-width="'180px'" label="是否为首页分类">
          <!-- <el-input v-model="posObj.introduction" autocomplete="off"/> -->
          <el-radio-group v-model="posObj.introduction">
            <el-radio :label="'1'">是</el-radio>
            <el-radio :label="'0'">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPos()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormEdit" title="页面位置修改">
      <el-form :model="posObj">
        <el-form-item :label-width="'180px'" label="位置名称">
          <el-input v-model="posObj.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="'180px'" label="是否为首页分类">
          <!-- <el-input v-model="posObj.introduction" autocomplete="off"/> -->
          <el-radio-group v-model="posObj.introduction">
            <el-radio :label="'1'">是</el-radio>
            <el-radio :label="'0'">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">取 消</el-button>
        <el-button type="primary" @click="savePos()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogForm1Visible" title="装修模板新增">
      <el-form :model="posObj">
        <el-form-item :label-width="'120px'" label="模板名称">
          <el-input v-model="title" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="'120px'" label="模板说明">
          <el-input v-model="abstract" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
        <el-button type="primary" @click="addTpl()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'TplList',
  data() {
    return {
      dialogFormEdit: false,
      dialogFormVisible: false,
      dialogForm1Visible: false,
      shop_id: '',
      use_position: '',
      title: '',
      content: '[]',
      abstract: '',
      use_position_name: '',
      posObj: {
        position_id: '',
        name: '',
        introduction: '1',
        position_code: ''
      },
      plist: [],
      list: [],
      username: ''// 操纵者
    }
  },
  created() {
    this.username = this.$route.query.username
    this.shop_id = this.$route.query.shop_id
    // this.use_position = this.$route.query.use_position
    this.getPosList()
    // this.getTplList()
  },
  methods: {

    // 获取位置信息
    getPosList() {
      const self = this
      request({
        method: 'post',
        url: '/floor/floor-api/get-use-position-list',
        data: {
          shop_id: self.shop_id
        }
      }).then(function(res) {
        console.log(res)
        self.plist = res.data.data
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 新增位置
    addPos() {
      const self = this
      if (!self.posObj.name) {
        self.$message({
          type: 'info',
          message: '位置名称不能为空!'
        })
        return
      }
      if (!self.posObj.position_code) {
        self.$message({
          type: 'info',
          message: '位置编码不能为空!'
        })
        return
      }
      request({
        method: 'post',
        url: '/floor/floor-api/add-use-position',
        data: {
          shop_id: self.shop_id,
          name: self.posObj.name,
          position_code: self.posObj.position_code,
          introduction: self.posObj.introduction
        }
      }).then(function(res) {
        console.log(res)
        // self.plist = res.data.data
        if (res.data.errcode === 0) {
          self.getPosList()
          self.dialogFormVisible = false
        } else {
          self.$message.error(res.data.errmsg)
        }
      }).catch(function(error) {
        console.log(error)
        self.$message.error(error)
      })
    },
    handleSelect(index) {
      this.use_position = this.plist[parseInt(index)].id
      this.use_position_name = this.plist[parseInt(index)].name
      this.getTplList()
    },
    // 修改位置
    savePos() {
      const self = this
      if (!self.posObj.name) {
        self.$message({
          type: 'info',
          message: '位置名称不能为空!'
        })
        return
      }
      request({
        method: 'post',
        url: '/floor/floor-api/update-position',
        data: {
          position_id: self.posObj.position_id,
          position_code: self.posObj.position_code,
          name: self.posObj.name,
          introduction: self.posObj.introduction
        }
      }).then(function(res) {
        console.log(res)
        // self.plist = res.data.data
        if (res.data.errcode === 0) {
          self.getPosList()
          self.dialogFormEdit = false
        } else {
          self.$message.error(res.data.errmsg)
        }
      }).catch(function(error) {
        console.log(error)
        self.$message.error(error)
      })
    },
    // 删除位置
    delPos(id, index) {
      const self = this
      // if (index === 0) {
      //   self.$message({
      //     type: 'info',
      //     message: '首页配置不能删除'
      //   })
      //   return false
      // }
      self.$confirm('此操作将删除该位置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.delPosConfirm(id)
      }).catch(() => {
        self.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editPos(obj) {
      const self = this
      self.posObj.position_id = obj.id
      self.posObj.position_code = obj.position_code
      self.posObj.name = obj.name
      self.posObj.introduction = obj.introduction
      self.dialogFormEdit = true
    },
    // 确认删除位置
    delPosConfirm(id) {
      const self = this
      request({
        method: 'post',
        url: '/floor/floor-api/del-use-position',
        data: {
          position_id: id
        }
      }).then(function(res) {
        console.log(res)
        // self.plist = res.data.data
        if (res.data.errcode === 0) {
          self.getPosList()
          if (id === self.use_position) {
            self.list = []
          }
        } else {
          self.$message.error(res.data.errmsg)
        }
      }).catch(function(error) {
        console.log(error)
        self.$message.error(error)
      })
    },
    // 获取模板信息
    getTplList() {
      const self = this
      request({
        method: 'post',
        url: '/floor/floor-api/get-floor-by-parameter',
        data: {
          shop_id: self.shop_id,
          use_position: self.use_position
        }
      }).then(function(res) {
        self.list = res.data.data
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 新增模板
    addTpl() {
      const self = this
      request({
        method: 'post',
        url: '/floor/floor-api/create-floor',
        data: {
          shop_id: self.shop_id,
          usePosition: self.use_position,
          title: self.title,
          content: self.content,
          abstract: self.abstract
        }
      }).then(function(res) {
        console.log(res)
        // self.plist = res.data.data
        if (res.data.errcode === 0) {
          self.getTplList()
          self.dialogForm1Visible = false
        } else {
          self.$message.error(res.data.errmsg)
        }
      }).catch(function(error) {
        console.log(error)
        self.$message.error(error)
      })
    },
    // 启用
    handleSet(index, floor_id) {
      const self = this
      request({
        method: 'post',
        url: '/floor/floor-api/set-enable',
        data: {
          shop_id: self.shop_id,
          use_position: self.use_position,
          floor_id
        }
      }).then(function(res) {
        console.log(res)
        // self.plist = res.data.data
        if (res.data.errcode === 0) {
          self.getTplList()
        } else {
          self.$message.error(res.data.errmsg)
        }
      }).catch(function(error) {
        console.log(error)
        self.$message.error(error)
      })
    },
    // 编辑
    handleEdit(index, floor_id) {
      this.$router.push({ path: '/shop_tpl_edit', query: { floor_id, shop_id: this.shop_id }})
    },
    // 删除模板
    handleDelete(index, floor_id) {
      const self = this
      self.$confirm('此操作将删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.handleDeleteConfirm(index, floor_id)
      }).catch(() => {
        self.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 确认删除
    handleDeleteConfirm(index, floor_id) {
      const self = this
      request({
        method: 'post',
        url: '/floor/floor-api/delete-floor',
        data: {
          username: self.username,
          shop_id: self.shop_id,
          use_position: self.use_position,
          floor_id
        }
      }).then(function(res) {
        console.log(res)
        // self.plist = res.data.data
        if (res.data.errcode === 0) {
          self.getTplList()
        } else {
          self.$message.error(res.data.errmsg)
        }
      }).catch(function(error) {
        console.log(error)
        self.$message.error(error)
      })
    }

  }

}
</script>
<style lang="scss">
.shop-list-tpl {
 display: block;
 padding: 0 15px;
 .tpl-tools{
   line-height: 36px;
   padding: 10px 0;
   display: flex;
 }
 .template-wrapper{
   padding: 30px 50px 50px 0;
  .template-item{
    position: relative;
    margin-bottom: 30px;
    width: 100%;
    height: 0;
    padding-top: 150%;
    background-color: #fff;
    box-shadow: 0 2px 12px #e5e5e5;
    &-img{
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translateX(-50%);
      width: 95%;
      padding-top: 110%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50% 50%;
      background-color: ghostwhite;
      .title{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 20px;
      }
    }
    &-content{
      position: absolute;
      bottom: 0;
      width: 95%;
      left: 50%;
      transform: translateX(-50%);
      .title{
        margin-left: 5px;
        font-size: 14px;
      }
      .btn-group{
        display: flex;
        justify-content: flex-end;
        margin: 30px 0 10px;
      }
    }
    &:hover{
      animation: 0.3s 50 linear;
      transform: scale(1.05);
    }
  }
  @keyframes play{
    50%{
      transform: translateY(-25px);
    }
    100%{
      transform: translateY(-25px);
    }
  }
 }
}

</style>

