<template>
  <div class="ag-page">
    <div class="ag-page-head">
      <div>审核商品</div>
      <div class="ag-page-head-bottom"/>
    </div>
    <div class="gcon">
      <div class="gcon-box1">
        <el-form ref="form" label-width="120px">

          <el-form-item :rules="[{ required: true}]" label="商品类目">
            <!-- <el-select v-model="sbc_id" placeholder="请选择商品类目">
              <el-option v-for="(item,index) in sbc_arr" :key="index" :label="item.name" :value="item.id"/>
            </el-select> -->
            <el-cascader
              v-model="sbc_id"
              :props="optionProps"
              :options="sbc_arr"
              class="reg-inp"
              @change="cascChange"
            />
          </el-form-item>

          <!-- <el-form-item :rules="[{ required: true}]" label="商品类型">
            <el-select v-model="goodstype" placeholder="请选择商品类型" @change="goodsKind()">
              <el-option label="主商城商品" value="0"/>
              <el-option v-if="shop_id==0||shop_id==''" label="分销员礼包" value="4"/>
            </el-select>
          </el-form-item> -->

          <!-- <el-form-item v-if="(shop_id==0||shop_id=='')&&(!isCreate)" :rules="[{ required: true}]" label="上架状态">
            <el-select v-model="status" placeholder="请选择上架状态">
              <el-option
                v-for="item in activeType"
                v-show="item.value==1||item.value==2||item.value==5||item.value==7"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item> -->

          <!-- <el-form-item v-if="(shop_id!=0&&shop_id!='')" :rules="[{ required: true}]" label="上架状态">
            <el-select v-model="status" placeholder="请选择上架状态">
              <el-option
                v-for="item in activeType"
                v-show="item.value==2||item.value==7"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item> -->

          <el-form-item v-if="goodstype==4" :rules="[{ required: true}]" label="礼包商品等级" style="width:300px;">
            <el-select v-model="giftLevel" placeholder="请选择">
              <el-option
                v-for="item in giftOp"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
            <!-- <el-input v-model="giftLevel" placeholder="请输入等级"/> -->
          </el-form-item>

          <el-form-item v-if="goodstype!=4" :rules="[{ required: true}]" label="商品分类">
            <el-tree
              ref="tree"
              :data="Gorys"
              :props="defaultProps"

              show-checkbox
              node-key="mcid"
              label="name"
              children="categoryList"
              highlight-current
              @check-change="getNodes233()"/>
              <!-- <el-button @click="getCheckedNodes()">{{checkedGorys[0]?'已选择':'确认'}}</el-button> -->
          </el-form-item>

          <el-form-item v-if="(goodstype!=4)&&(shop_id==0||shop_id=='')" :rules="[{ required: true}]" label="来源店铺" style="width:300px;">
            <el-input v-model="storeName"/>
          </el-form-item>

          <el-form-item :rules="[{ required: true}]" label="标题" style="width:600px;">
            <el-input v-model="goodsname"/>
          </el-form-item>

          <el-form-item :rules="[{ required: true}]" label="商品主图(750px*750px)" style="width:900px;">
            <!-- <img class="upImg" v-if="fileList[0]" v-for="(item,index) in fileList" :key="index" :src="item.response.data.url">v-if="fileList.length<5":show-file-list="false" -->
            <!-- <el-upload
              :limit="5"
              :class="{hide:1}"
              :on-change="handleEditChange"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :action="base_api+'/material/index/upload'"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove111"
              :on-success="imgUpSecceed"
              multiple
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload> -->
            <img v-for="(item,index) in fileList" :src="item.response.data.url" :key="index" class="iimgBox" alt="" @click="handlePictureCardPreview(item)">
            <el-dialog :visible.sync="dialogVisible">
              <img :src="dialogImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item>

          <el-form-item v-if="fileList2[0]" label="短视频 (mp4) (<5M)" style="width:900px;">
            <!-- <video class="upImg" v-if="fileList2[0]" v-for="(item,index) in fileList2" :key="index" :src="item.response.data.url"></video>v-if="fileList2.length<1":show-file-list="false" -->
            <!-- <el-upload
              :limit="1"
              :class="{hide:1}"
              :on-change="handleEditChange2"
              :on-exceed="handleExceed2"
              :file-list="fileList2"
              :action="base_api+'/material/index/upload'"
              :before-upload="beforeAvatarUpload2"
              :on-preview="handlePictureCardPreview2"
              :on-remove="handleRemove222"
              :on-success="imgUpSecceed2"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible2">
              <video :src="dialogImageUrl2" width="100%" alt=""/>
            </el-dialog> -->
            地址：{{ fileList2[0].response.data.url }}
            <video id="playVideos">
              <source id="playVideosss" :src="fileList2[0].response.data.url" type="video/mp4">
            </video>
          </el-form-item>

          <el-form-item label="商品货号" style="width:300px;">
            <el-input v-model="goodsNum" />
          </el-form-item>

          <el-form-item label="商品标签" style="width:300px;">
            <el-input v-model="item_label"/>
          </el-form-item>

          <el-form-item label="商品简介" style="width:600px;">
            <el-input v-model="goodsIntro" />
          </el-form-item>

          <el-form-item label="规模" style="width:300px;">
            <el-input v-model="scale" />
          </el-form-item>

          <el-form-item label="排序" style="width:300px;">
            <el-input v-model="goodsOrd" />
          </el-form-item>

          <el-form-item :rules="[{ required: true}]" label="原价" style="width:300px;">
            <el-input v-model="prePrice" />
          </el-form-item>

          <el-form-item :rules="[{ required: true}]" label="售价" style="width:300px;">
            <el-input v-model="mainPrice" />
          </el-form-item>

          <el-form-item :rules="[{ required: true}]" label="库存" style="width:300px;">
            <el-input v-model="goodsStock" />
          </el-form-item>

          <!-- <el-form-item v-if="goodstype!=4" :rules="[{ required: true}]" label="是否VIP" style="width:300px;">
            <el-radio v-model="isVIP" label="1">是</el-radio>
            <el-radio v-model="isVIP" label="0">否</el-radio>
          </el-form-item> -->

          <el-form-item v-if="goodstype!=4" :rules="[{ required: true}]" label="是否新人必买" style="width:300px;">
            {{ isNews==1?'是':'否' }}
            <!-- <el-radio v-model="isNews" label="1">是</el-radio>
            <el-radio v-model="isNews" label="0">否</el-radio> -->
          </el-form-item>

          <el-form-item v-if="goodstype!=4" :rules="[{ required: true}]" label="是否参与分佣" style="width:300px;">
            {{ is_bonus==1?'是':'否' }}
            <!-- <el-radio v-model="is_bonus" label="1">是</el-radio>
            <el-radio v-model="is_bonus" label="0">否</el-radio> -->
          </el-form-item>

          <el-form-item :rules="[{ required: true}]" label="快递运费" style="width:500px;">

            <div v-if="expressType==1" style="display:flex;alignItems:center">
              <el-radio v-model="expressType" label="1" disabled @change="oneExp">统一运费</el-radio>
              &nbsp;&nbsp;&nbsp;
              <el-input v-model="expressPrice"/>
            </div>

            <div style="height:20px;"/>

            <div v-if="expressType==2" style="display:flex;alignItems:center">
              <el-radio v-model="expressType" label="2">运费模板</el-radio>
              &nbsp;&nbsp;&nbsp;
              <el-select v-model="expvalue" @change="expItem">
                <el-option
                  v-for="item in ExpData"
                  :key="item.id"
                  :label="item.template_name"
                  :value="item.id"/>
              </el-select>
              &nbsp;&nbsp;&nbsp;
              <!-- <span style="fontSize:10px;color:blue;cursor:pointer">新建运费模板</span> -->
            </div>
          </el-form-item>

          <el-form-item v-show="expCtype==2" :rules="[{ required: true}]" label="重量(kg)" style="width:300px;">
            <el-input v-model="goodsWeight" placeholder="请输入重量"/>
          </el-form-item>

          <!-- <el-form-item label="运费计算类型" style="width:300px;">
            <el-radio v-model="expCtype" label="1">件数</el-radio>
            <el-radio v-model="expCtype" label="2">重量</el-radio>
          </el-form-item> -->

          <el-form-item v-if="(!goods_id)&&(goodstype!=4)" :rules="[{ required: true}]" label="展开规格配置" style="width:300px;">
            <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="createGoods()">请先确认商品信息，再点击展开规格配置</el-button>
          </el-form-item>

          <el-form-item v-if="goods_id&&(goodstype!=4)" :rules="[{ required: true}]" label="商品规格" style="width:900px;">
            <div class="guigeBox">
              <div v-for="(item,index) in goodsMSpec" :key="index" style="marginTop:10px;">
                <el-form-item :label="index==0?'主规格名':'规格名'">
                  <!-- <el-select v-model="goodsMSpec[index]" placeholder="规格名" @change="selectMain($event,index)">
                    <el-option v-for="(ite,ind) in MainSpcList" :label="ite.prop_name" :value="ite.prop_id" :key="ind" :disabled="goodsMSpec.indexOf(ite.prop_id)!=-1"/>
                  </el-select> -->
                  <el-input v-model="goodsMSpec[index]" style="width:120px" placeholder="规格名"/>
                </el-form-item>
                <el-form-item :rules="[{ required: true}]" label="规格值" style="marginTop:10px;">
                  <div v-for="(itt,inn) in goodsSpecListId[index]" :key="inn" style="display:inline-block">
                    <!-- <el-select v-model="goodsSpecListId[index][inn]" placeholder="规格值" style="marginRight:5px;" @change="selectChild($event,index,inn)">
                      <el-option v-for="(ite,ind) in goodsSpecList[index]" :label="ite.value_name" :value="ite.value_id" :key="ind" :disabled="goodsSpecListId[index].indexOf(ite.value_id)!=-1"/>
                    </el-select> -->
                    <el-input v-model="goodsSpecListId[index][inn]" style="width:120px" placeholder="规格值"/>
                    <el-upload
                      v-if="index==0&&specIMG"
                      :action="base_api+'/material/index/upload'"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess4"
                      :before-upload="beforeAvatarUpload"
                      class="avatar-uploader"
                      @click.native="seleimdx(inn)">
                      <img v-if="imageUrlList[inn]" :src="imageUrlList[inn]" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"/>
                    </el-upload>
                  </div>

                  <!-- <div style="verticalAlign: top;display:inline-block">
                    <el-button type="primary" plain @click="addSPC(index)">添加</el-button>
                    <el-button type="danger" plain @click="delSPC(index)">删除</el-button>
                  </div> -->

                </el-form-item>

                <span v-if="index==0">备注：仅支持为第一组规格设置规格图片，买家选择不同规格会看到对应规格图片</span>

              </div>

              <!-- <el-button type="primary" style="marginTop:10px;marginLeft:70px;" @click="addMainSpc()">添加规格</el-button> -->
              <!-- <br>
              <br>
              <el-form-item :rules="[{ required: true}]" label="原价" style="width:300px;">
                <el-input v-model="spcPrePrice" placeholder="请输入原价"/>
              </el-form-item>
              <br>
              <el-form-item :rules="[{ required: true}]" label="单价" style="width:300px;">
                <el-input v-model="spcPrice" placeholder="请输入单价"/>
              </el-form-item>
              <br> -->
              <!-- <el-form-item :rules="[{ required: true}]" label="供应价" style="width:300px;">
                <el-input v-model="appPrice" placeholder="请输入供应价"/>
              </el-form-item> -->
              <!-- <el-form-item :rules="[{ required: true}]" label="库存" style="width:300px;">
                <el-input v-model="spcStock" placeholder="请输入库存"/>
              </el-form-item>
              <br>
              <el-form-item :rules="[{ required: true}]" label="成本价" style="width:300px;">
                <el-input v-model="spcrelPrice" placeholder="请输入成本价"/>
              </el-form-item>
              <br> -->
              <!-- <el-button v-loading.fullscreen.lock="fullscreenLoading" type="success" style="marginTop:10px;marginLeft:70px;" @click="cerateSku()">保存商品规格</el-button> -->
            </div>
          </el-form-item>

          <el-form-item v-if="goods_id&&(goodstype!=4)" :rules="[{ required: true}]" label="规格明细" style="width:900px;">
            <div class="guigeBox">
              <!-- <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="refreshSkus()">更新设置</el-button>
              &nbsp;&nbsp;
              <el-button @click="dialogVisible3 = true">批量设置</el-button> -->

              <el-table
                :data="allSku"
                style="width: 100%">
                <el-table-column
                  prop="value_names"
                  label="规格组"
                  width="180"/>
                <el-table-column
                  prop="stock"
                  label="库存">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        v-model="scope.row.stock"
                        size="small"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="old_price"
                  label="原价">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        v-model="scope.row.old_price"
                        size="small"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="shop_id==0||shop_id==''"
                  prop="price"
                  label="单价">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        v-model="scope.row.price"
                        size="small"
                      />
                    </div>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  prop="supply_price"
                  label="供应价">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        v-model="scope.row.supply_price"
                        size="small"
                      />
                    </div>
                  </template>
                </el-table-column> -->
                <el-table-column
                  prop="contract_price"
                  label="成本价">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        v-model="scope.row.contract_price"
                        size="small"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="freight_number"
                  label="货号">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        v-model="scope.row.freight_number"
                        size="small"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="deal_num"
                  label="销量">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        v-model="scope.row.deal_num"
                        size="small"
                      />
                    </div>
                  </template>
                </el-table-column>
              </el-table>

            </div>
          </el-form-item>

          <!-- <el-form-item v-if="goodstype!=4" label="获得积分" style="width:300px;">
            <el-input v-model="goodsPoint" placeholder="请输入积分"/>
          </el-form-item> -->

          <!-- <el-form-item v-if="goodstype!=4" label="获得成长值" style="width:300px;">
            <el-input v-model="growthPoint" placeholder="请输入成长值"/>
          </el-form-item> -->

          <el-form-item label="虚拟销量" style="width:300px;">
            <el-input v-model="vrdealNum" placeholder="请输入虚拟销量"/>
          </el-form-item>

          <el-form-item label="商品详情富文本" style="width:900px;">
            <div class="richBox" v-html="content"/>

          </el-form-item>

          <el-form-item label="购买须知富文本" style="width:900px;">
            <div class="richBox" v-html="content2"/>
          </el-form-item>

        </el-form>

        <!-- <el-button v-loading.fullscreen.lock="fullscreenLoading" v-if="goodstype!=4" type="success" style="marginLeft:130px;marginTop:30px;" @click="makeGoods()">{{ isCreate?'创建商品':'更新商品' }}</el-button>

        <el-button v-loading.fullscreen.lock="fullscreenLoading" v-if="goodstype==4&&isCreate" type="success" style="marginLeft:130px;marginTop:30px;" @click="createGoods()">创建商品</el-button>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" v-if="goodstype==4&&(!isCreate)" type="success" style="marginLeft:130px;marginTop:30px;" @click="makeGoods()">更新商品</el-button> -->
        <el-button v-if="status!=8&&status!=9" type="primary" style="marginLeft:100px" @click="tongguo()">审核通过</el-button>
        <el-button v-if="status!=8&&status!=9" type="warning" @click="jujue()">审核拒绝</el-button>
        <el-button v-if="status==8" type="info" style="marginLeft:100px">审核已经通过</el-button>
        <el-button v-if="status==9" type="info" style="marginLeft:100px">审核已经拒绝</el-button>
      </div>
    </div>

    <el-dialog :width="'700px'" :visible.sync="dialogTable1Visible" title="选择店铺">
      <div style="padding:5px 10px;">
        <el-input v-model="key_word2" placeholder="请输入店铺名称" prefix-icon="el-icon-search" size="mini" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="getShops()"/>
        </el-input>
      </div>
      <el-table
        :data="shops"
        style="width: 100%">
        <el-table-column
          label="店铺名称"
          prop="name"/>
        <el-table-column
          label="备注"
          prop="remark"/>
        <el-table-column
          align="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="sureSelectShop(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="6"
        :total="total_pages2"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange2"/>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisible3"
      title="规格明细批量设置"
      width="30%">
      <el-checkbox v-model="Allchecked" @change="skuAllcheck">全选</el-checkbox>
      <div class="spcDElist">
        <el-checkbox v-model="checked1" @change="skuSigcheck">库存</el-checkbox>
        <div style="width:50px;"/>
        <el-input v-model="input1"/>
        <div style="width:50px;"/>
      </div>
      <div class="spcDElist">
        <el-checkbox v-model="checked2" @change="skuSigcheck">原价</el-checkbox>
        <div style="width:50px;"/>
        <el-input v-model="input2"/>
        <div style="width:50px;"/>
      </div>
      <div v-show="(shop_id==0||shop_id=='')" class="spcDElist">
        <el-checkbox v-model="checked3" @change="skuSigcheck">售价</el-checkbox>
        <div style="width:50px;"/>
        <el-input v-model="input3"/>
        <div style="width:50px;"/>
      </div>
      <!-- <div class="spcDElist">
        <el-checkbox v-model="checked4" @change="skuSigcheck">供应价</el-checkbox>
        <div style="width:30px;"/>
        <el-input v-model="input4"/>
        <div style="width:50px;"/>
      </div> -->
      <div class="spcDElist">
        <el-checkbox v-model="checked5" @change="skuSigcheck">成本价</el-checkbox>
        <div style="width:30px;"/>
        <el-input v-model="input5"/>
        <div style="width:50px;"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="spcAllchange()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }], // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
  [{ 'direction': 'rtl' }], // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['link', 'image'],
  ['clean'] // remove formatting button
]
import request from '@/utils/request'
import { getBaseApi } from '@/utils'
export default {
  data() {
    return {
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'pidList'
      },
      hideUploadEdit: false,
      hideUploadEdit2: false,
      store_id: '', // 店铺id
      status: '', // 商品目前状态
      giftOp: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }],
      activeType: [ // 主商城权限   添加无  更新全有
        { label: '待上架', value: '1' },
        { label: '上架待审核', value: '2' },
        { label: '待定价', value: '3' },
        { label: '待上架', value: '4' },
        { label: '已上架', value: '5' },
        { label: '下架待审核', value: '6' },
        { label: '已下架', value: '7' }
      ],
      activeType2: [ // 子商城权限 添加 更新 都有
        { label: '上架待审核', value: '2' },
        { label: '待上架', value: '4' }
      ],
      isCreate: true, // 是来创建还是修改的
      treeArr: [],
      detail: '', // 老商品详情
      fullscreenLoading: false, // toast
      allSku: '', // 该商品全部规格组合
      oldSpcs: '', // 老商品已经配好的规格
      goods_id: '', // 是来新建商品还是修改商品 1358 1681
      MainSpcList: '', // 主规格名
      shop_id: 0,
      isGorys: [], // 当前商品选好的分类
      Gorys: [], // 该店铺下有的分类
      ExpData: [], // 改店铺下的快递模板
      checkedGorys: [], // 选中的分类--------------------------
      base_api: getBaseApi(),
      dialogTable1Visible: false,
      key_word2: '',
      shops: [],
      total_pages2: 0,
      storeId: '0', // 来源店铺id-------------------------------
      storeName: '', // 来源店铺名-----------------------------
      goodstype: '0', // 商品类型---------------------
      sbc_id: '', // 商品品类
      sbc_arr: [],
      giftLevel: '', // 礼包等级----------------------------
      defaultProps: {
        children: 'categoryList',
        label: 'name'
      },
      goodsname: '', // 商品名称---------------------------
      dialogImageUrl: '',
      dialogImageUrl2: '',
      dialogVisible: false,
      dialogVisible2: false,
      fileList: [], // 图片上传列表，上传的url在response对象里面-------------------------
      // 形如如此，编辑的时候处理下，也可以直接加入[{url:'https://liemimofang.oss-cn-hangzhou.aliyuncs.com/__liemi__/default/ABFWXZMNTK023789_1553245330.png'}]
      fileList2: [], // 视频列变-----------------------------------------
      goodsNum: '', // 商品货号------------------------------------
      item_label: '',
      goodsIntro: '', // 商品简介--------------------------
      scale: '',
      goodsOrd: '', // 排序值-------------------------------
      prePrice: '', // 原价-----------------------------------------
      goodsStock: '', // 库存----------------------------
      mainPrice: '', // 售价--------------------------------------
      goodsMSpec: [''], // 商品规格名id  一维数组
      goodsSpecList: [[]], // 对应商品规格名下的规格值 二维数组
      goodsSpecListId: [['']], // 对应商品规格名下的规格值id,不止一个  二维数组
      specIMG: true, // 是否主规格图片
      imageUrlList: [''], // 主规格图片数组
      spcPrePrice: '', // 规格原价
      spcPrice: '', // 规格的单价
      appPrice: '9999999999999', // 规格供应价
      spcStock: '', // 规格库存
      spcrelPrice: '', // 规格成本价
      imdx: 0, // 当前选择的主图
      dialogVisible3: false,
      Allchecked: false,
      checked1: false, // 库存
      input1: '',
      checked2: false, // 库存
      input2: '',
      checked3: false, // 库存
      input3: '',
      checked4: false, // 库存
      input4: '',
      checked5: false, // 库存
      input5: '',
      tableData: [{
        spcGroup: '红色大个',
        stock: '12',
        price1: '200',
        price2: '200',
        price3: '200',
        price4: '200',
        goodNum: 1,
        delNum: 111
      }, {
        spcGroup: '红色小个',
        stock: '12',
        price1: '200',
        price2: '200',
        price3: '200',
        price4: '200',
        goodNum: 12,
        delNum: 123
      }],
      expressType: '1', // 运费形式
      expressPrice: '', // 统一运费价格
      goodsWeight: '', // 重量
      expCtype: '', // 运费计算类型 1件数 2重量
      expoptions: [{
        value: '1',
        label: '模板1'
      }, {
        value: '2',
        label: '模板2'
      }, {
        value: '3',
        label: '模板3'
      }, {
        value: '4',
        label: '模板4'
      }, {
        value: '5',
        label: '模板5'
      }],
      expvalue: '', // 运费模板id
      goodsPoint: '', // 获得积分
      growthPoint: '', // 获得成长值
      vrdealNum: '', // 虚拟销量
      isVIP: '0', // 是否是vip
      isNews: '0', // 是否新人够
      isBorad: '0', // 是否跨境
      is_bonus: '0', // 是否分佣
      content: '', // 富文本1
      content2: '', // 富文本2
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function(value) {
                if (value) {
                  document.querySelector('.imgupload1').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      editorOption2: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function(value) {
                if (value) {
                  document.querySelector('.imgupload2').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      username: '', // 操纵者
      refRea: '',
      item_category: null// 该类目下的分类
    }
  },
  mounted() {
    setTimeout(function() {
      window.scrollTo(0, 0)
    }, 500)
  },
  created() {
    this.username = this.$route.query.username
    console.log(this.username)
    if (this.$route.query.store_id) {
      this.store_id = this.$route.query.store_id
    }
    if (this.$route.query.shop_id) {
      this.shop_id = this.$route.query.shop_id
      this.storeId = this.$route.query.shop_id
    }
    if (this.$route.query.item_id) {
      this.goods_id = this.$route.query.item_id
      this.isCreate = false
      this.getMainSpc()
      this.getOldSpc()
      this.getAllSku()
      this.getDetail()
    }
    this.getGorys()
    this.getExps()
    this.getpinglei()
  },
  methods: {
    cascChange(e) {
      // const self = this
      console.log(e)
      console.log(this.sbc_arr)
      // this.checkedGorys = []
      // this.sbc_arr.forEach((v, i, a) => {
      //   if (v.id == e[0]) {
      //     v.pidList.forEach((vv, ii, aa) => {
      //       if (vv.id == e[1]) {
      //         self.item_category = vv.item_category
      //       }
      //     })
      //   }
      // })
      // this.getGorys()
    },
    tongguo() {
      const self = this
      if (!this.checkedGorys[0]) {
        this.$message({
          type: 'warning',
          message: '请选择至少一个分类'
        })
        return false
      }
      this.$confirm('您确定通过该商品的审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.goodsSucc()
      }).catch(() => {

      })
    },
    jujue() {
      const self = this
      this.$prompt('请输入拒绝理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputPattern: /^[^\s]*$/,
        // inputErrorMessage: '输入不能为空'
      }).then(({ value }) => {
        if (value) {
          self.refRea = value
          self.goodsRefu()
        } else {
          this.$message({
            type: 'warning',
            message: '输入不能为空'
          })
        }
      }).catch(() => {

      })
    },
    goodsRefu() {
      const self = this
      const loading = this.$loading({
        lock: true
      })
      request({
        method: 'post',
        url: '/item/me-item-api/item-check-refuse',
        data: {
          item_id: self.goods_id,
          reason: self.refRea
        }
      }).then(function(res) {
        loading.close()
        if (res.data.errcode == 0) {
          self.status = 9
          self.$message({
            message: '商品审核已拒绝！',
            type: 'success'
          })
        } else {
          self.$message({
            message: res.data.errmsg,
            type: 'warning'
          })
        }
      }).catch(function(error) {
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    goodsSucc() {
      const self = this
      const loading = this.$loading({
        lock: true
      })
      const cate_list = []
      this.checkedGorys.forEach(function(v, i, a) {
        cate_list.push(v.mcid)
      })
      request({
        method: 'post',
        url: '/item/me-item-api/item-check-pass',
        data: {
          item_id: self.goods_id,
          cate_list: cate_list
        }
      }).then(function(res) {
        loading.close()
        if (res.data.errcode == 0) {
          self.status = 8
          self.$message({
            message: '商品审核已通过',
            type: 'success'
          })
        } else {
          self.$message({
            message: res.data.errmsg,
            type: 'warning'
          })
        }
      }).catch(function(error) {
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    goodsKind() {
      if (this.goodstype == 0) {
        this.giftLevel = ''
      }
    },
    expItem(d) {
      const self = this
      console.log(d)
      this.ExpData.forEach(function(v, i, a) {
        if (v.id == d) {
          self.expCtype = v.type
        }
      })
    },
    oneExp() { // 清空运费模板相关数据
      this.expCtype = ''
      this.expvalue = ''
    },
    skuAllcheck(event) {
      if (event) {
        this.checked1 = true
        this.checked2 = true
        this.checked3 = true
        this.checked4 = true
        this.checked5 = true
      } else {
        this.checked1 = false
        this.checked2 = false
        this.checked3 = false
        this.checked4 = false
        this.checked5 = false
      }
    },
    skuSigcheck(event) {
      if (!event) {
        this.Allchecked = false
      }
      if (event) {
        if (this.checked1 && this.checked2 && this.checked3 && this.checked5) {
          this.Allchecked = true
        }
      }
    },
    getNodes233() {
      const self = this
      self.getCheckedNodes()
    },
    getCheckedNodes() { // 树状图选择
      this.checkedGorys = this.$refs.tree.getCheckedNodes()
    },
    handleRemove111(file, fileList) {
      this.fileList = fileList
      this.hideUploadEdit = fileList.length >= 5
    },
    handleEditChange(file, fileList) {
      this.hideUploadEdit = fileList.length >= 5
    },
    handleEditChange2(file, fileList) {
      this.hideUploadEdit2 = fileList.length >= 1
    },
    handleRemove(file, fileList) { // 删除图片
      this.fileList = fileList
      console.log(file, fileList)
    },
    imgUpSecceed(response, file, fileList) {
      this.fileList = fileList
      console.log(file, fileList)
    },
    handleRemove222(file, fileList) {
      this.fileList2 = fileList
      this.hideUploadEdit2 = fileList.length >= 1
    },
    imgUpSecceed2(response, file, fileList) {
      this.fileList2 = fileList
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) { // 看大图
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl2 = file.url
      this.dialogVisible2 = true
    },
    beforeAvatarUpload(file) { // 上传前验证
      const isLt3M = file.size / 1024 / 1024 < 3
      const isWEBP = file.type === 'image/webp'
      const isPNG = file.type === 'image/png'
      const isJPG = file.type === 'image/jpg'
      const isJEPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
      }
      if (isWEBP) {
        this.$message.error('上传图片不能是webp格式!')
      }
      if (!isPNG && !isJPG && !isJEPG && !isGIF) {
        this.$message.error('上传图片只能是jpg,png,jpeg!')
      }
      return isLt3M && !isWEBP && !(!isPNG && !isJPG && !isJEPG && !isGIF)
    },
    beforeAvatarUpload2(file) {
      const isLt3M = file.size / 1024 / 1024 < 5
      const isWEBP = file.type === 'video/mp4'
      if (!isLt3M) {
        this.$message.error('上传视频大小不能超过 5MB!')
      }
      if (!isWEBP) {
        this.$message.error('上传文件只能是mp4格式!')
      }
      return isLt3M && isWEBP
    },
    handleExceed(files, fileList) {
      this.$message.warning(`商品主图最多上传5张`)
    },
    handleExceed2(files, fileList) {
      this.$message.warning(`文件上传已经达到上限`)
    },
    addSPC(d) {
      this.goodsSpecListId[d].push('')
      this.imageUrlList.push('')
    },
    delSPC(d) {
      this.goodsSpecListId[d].pop()
      this.imageUrlList.pop()
    },
    addMainSpc() {
      this.goodsMSpec.push('')
      this.goodsSpecList.push([])
      this.goodsSpecListId.push([''])
    },
    delMainSpc(d) {
      this.goodsMSpec.splice(d, 1)
      this.goodsSpecList.splice(d, 1)
      this.goodsSpecListId.splice(d, 1)
    },
    seleimdx(d) {
      this.imdx = d
    },
    handleAvatarSuccess4(res, file) {
      console.log(res.data.url)
      this.$set(this.imageUrlList, this.imdx, res.data.url)
      this.imageUrlList[this.imdx] = res.data.url
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrlList)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleCurrentChange2(val) {
      const self = this
      self.start_page2 = (val - 1)
      self.getShops()
    },
    openShops() {
      this.dialogTable1Visible = true
      this.getShops()
    },
    // 获取店铺列表
    getShops() {
      const self = this
      request({
        method: 'post',
        url: '/shop/shop-api/index',
        data: {
          start_page: self.start_page2,
          pages: 6,
          key_word: self.key_word2
        }
      }).then(function(res) {
        self.total_pages2 = parseInt(res.data.data.total_pages)
        self.shops = res.data.data.list
        console.log(self.shops)
      }).catch(function(error) {
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    sureSelectShop(item) { // 选择店铺
      const self = this
      self.storeId = item.id
      self.store_id = item.id
      self.storeName = item.name
      self.dialogTable1Visible = false
      // 把邮费相关清空
      self.expressType = ''
      self.expressPrice = ''
      self.expvalue = ''
      self.expCtype = ''
      self.getExps(self.storeId)
      self.getMainSpc(self.storeId)
    },
    // 富文本图片成功回调
    handleAvatarSuccessRich1(res, file, fileList) {
      // 获取富文本组件实例
      const quill = this.$refs.QuillEditor.quill
      // 如果上传成功
      console.log(res)
      console.log(file)
      console.log(fileList)
      const ddd = fileList.length// 选中上传的文件数量
      let dd = 0
      fileList.forEach(function(v, i, a) {
        if (v.status == 'success') {
          dd++
        }
      })
      if (dd == ddd) { // 说明全部图片上传好了 富文本中开始插入图片
        let length = quill.getSelection().index // 获取光标所在位置
        fileList.forEach(function(v, i, a) {
          quill.insertEmbed(length, 'image', v.response.data.url)
          length++
        })
        this.$refs.uploadRich1.clearFiles()
      }
      // if (res.data.url) {
      //   // 获取光标所在位置
      //   const length = quill.getSelection().index
      //   // 插入图片，res为服务器返回的图片链接地址
      //   quill.insertEmbed(length, 'image', res.data.url)
      //   // 调整光标到最后
      //   quill.setSelection(length + 1)
      // } else {
      //   // 提示信息，需引入Message
      //   alert('图片插入失败')
      // }
    },
    // 富文本图片成功回调2
    handleAvatarSuccessRich2(res, file, fileList) {
      // 获取富文本组件实例
      const quill = this.$refs.QuillEditor2.quill
      // 如果上传成功
      console.log(res)
      console.log(file)
      console.log(fileList)
      const ddd = fileList.length// 选中上传的文件数量
      let dd = 0
      fileList.forEach(function(v, i, a) {
        if (v.status == 'success') {
          dd++
        }
      })
      if (dd == ddd) { // 说明全部图片上传好了 富文本中开始插入图片
        let length = quill.getSelection().index // 获取光标所在位置
        fileList.forEach(function(v, i, a) {
          quill.insertEmbed(length, 'image', v.response.data.url)
          length++
        })
        this.$refs.uploadRich2.clearFiles()
      }
      // if (res.data.url) {
      //   // 获取光标所在位置
      //   const length = quill.getSelection().index
      //   // 插入图片，res为服务器返回的图片链接地址
      //   quill.insertEmbed(length, 'image', res.data.url)
      //   // 调整光标到最后
      //   quill.setSelection(length + 1)
      // } else {
      //   // 提示信息，需引入Message
      //   alert('图片插入失败')
      // }
    },
    // 获取分类列表
    getGorys() {
      const self = this
      request({
        method: 'post',
        url: '/item/me-item-api/get-item-category',
        data: {
          shop_id: self.shop_id,
          item_id: self.goods_id,
          item_category: self.item_category
        }
      }).then(function(res) {
        console.log('商品分类信息', res.data.data)
        self.Gorys = res.data.data.list
        self.isGorys = res.data.data.item_category
        self.Gorys.forEach((v, i, a) => {
          // self.Gorys[i]['disabled']=true
          // self.Gorys[i].categoryList.forEach((vv, ii, aa) => {
          //   self.Gorys[i].categoryList[ii]['disabled'] = true
          // })
        })
        setTimeout(function() {
          if (self.isGorys[0]) { // 设置默认选中的
            self.isGorys.forEach(function(v, i, a) {
              self.$refs.tree.setChecked(v, true)
            })
          }
        }, 500)

        console.log(self.Gorys)
      }).catch(function(error) {
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    // 获取规格名
    getMainSpc(sid) {
      const self = this
      request({
        method: 'post',
        url: '/item/me-item-value-api/get-prop',
        data: {
          shop_id: self.store_id ? self.store_id : self.shop_id,
          item_id: sid || self.goods_id
        }
      }).then(function(res) {
        self.MainSpcList = res.data.data
        console.log('主规格名', self.MainSpcList)
      }).catch(function(error) {
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    // 选中规格名
    selectMain(event, index) {
      const self = this
      console.log(event)
      console.log(index)
      this.$set(self.goodsMSpec, index, event) // 商品主规格名id数组
      console.log('商品主规格名id数组', self.goodsMSpec)
      // 然后去请求该规格名下的规格值
      this.getchildSpc(event, index)
    },
    // 获取规格值
    getchildSpc(d, index) {
      const self = this
      request({
        method: 'post',
        url: '/item/me-item-value-api/get-prop-value',
        data: {
          prop_id: d
        }
      }).then(function(res) {
        // const guigezhi = res.data.data // 规格值也是个数组
        self.$set(self.goodsSpecList, index, res.data.data)
        console.log('规格值二维数组', self.goodsSpecList)
      }).catch(function(error) {
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    // 选中规格值
    selectChild(event, index, inn) {
      const self = this
      console.log(event)
      console.log(index)
      console.log(inn)
      // this.$set(self.goodsSpecListId[index],inn,event) //商品主规格名id数组
      console.log('商品规格值二维数组', self.goodsSpecListId)
    },
    // 获取快递模板
    getExps(sid) {
      const self = this
      request({
        method: 'post',
        url: '/express/express-api/get-list',
        data: {
          shop_id: sid || self.shop_id
        }
      }).then(function(res) {
        self.ExpData = res.data.data
        console.log(self.ExpData)
      }).catch(function(error) {
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    // 获取商品已有的规格信息
    getOldSpc() {
      const self = this
      request({
        method: 'post',
        url: '/item/me-item-api/get-property',
        data: {
          item_id: self.goods_id
        }
      }).then(function(res) {
      // goodsMSpec: [''], // 商品主规格名id  一维数组
      // goodsSpecList: [[]], // 对应商品主规格名下的规格值 二维数组
      // goodsSpecListId: [['']], // 对应商品规格名下的规格值id,不止一个  二维数组
        console.log('该商品已配置的规格', res.data.data)
        self.oldSpcs = res.data.data
        self.oldSpcs.forEach(function(val, ind, arr) {
          // self.$set(self.goodsMSpec, ind, self.oldSpcs[ind].prop_id)
          console.log(val)
          self.$set(self.goodsMSpec, ind, self.oldSpcs[ind].prop_name)
          console.log(self.goodsMSpec)
          self.$set(self.goodsSpecList, ind, self.oldSpcs[ind].children) // 规格值只有一个的，要多个要点下规格名
          const ids = []
          val.children.forEach(function(v, i, a) {
            // self.$set(ids, i, v.value_id)
            self.$set(ids, i, v.value_name)
            if (ind == 0) {
              self.$set(self.imageUrlList, i, v.img_url)
            }
            console.log(33333333333333333333, self.imageUrlList)
          })
          self.$set(self.goodsSpecListId, ind, ids)
          // 为了不让你规格值只有一个的，所以直接轮询请求233333
          self.getchildSpc(val.prop_id, ind)
        })
      }).catch(function(error) {
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    // 创建sku 修改创建都是这个
    cerateSku() {
      const self = this
      const skuOther = []
      const skuMain = []
      const obj = { 'skuFirst': '', 'skuSecond': [] }
      console.log('要创建SKU了', self.goodsSpecListId)
      self.goodsSpecListId.forEach(function(val, ind, arr) {
        if (ind == 0) { // 第一个
          const ddd = JSON.stringify(obj)
          const obj2 = JSON.parse(ddd)
          obj2.skuFirst = self.goodsMSpec[ind]
          obj2.skuSecond = val
          skuMain.push(obj2)
        }
        if (ind != 0) { // 第一个不算
          const ddd = JSON.stringify(obj)
          const obj2 = JSON.parse(ddd)
          obj2.skuFirst = self.goodsMSpec[ind]
          obj2.skuSecond = val
          skuOther.push(obj2)
        }
      })
      console.log('这是otherSKU', skuOther)
      if (!self.goodsSpecListId[0]) {
        this.$message({
          message: '商品主规格未填写',
          type: 'warning'
        })
        return false
      }
      if ((!self.spcPrice) && (self.shop_id == 0 || self.shop_id == '')) {
        this.$message({
          message: '商品价格未填写',
          type: 'warning'
        })
        return false
      }
      // if (!self.appPrice) {
      //   this.$message({
      //     message: '商品供应价未填写',
      //     type: 'warning'
      //   })
      //   return false
      // }
      if (!self.spcrelPrice) {
        this.$message({
          message: '商品成本价未填写',
          type: 'warning'
        })
        return false
      }
      if (!self.spcPrePrice) {
        this.$message({
          message: '商品原价未填写',
          type: 'warning'
        })
        return false
      }
      if (!self.spcStock) {
        this.$message({
          message: '商品库存未填写',
          type: 'warning'
        })
        return false
      }
      self.fullscreenLoading = true
      request({
        method: 'post',
        url: '/item/me-item-value-api/create-sku',
        data: {
          // skuFirstValue: self.goodsSpecListId[0],
          skuFirstValue: skuMain,
          imageUrl: self.imageUrlList,
          skuOther: skuOther,
          money: self.spcPrice,
          supply_price: self.appPrice,
          cost: self.spcrelPrice,
          old_price: self.spcPrePrice,
          stock: self.spcStock,
          item_id: self.goods_id,
          addImg: self.specIMG * 1
        }
      }).then(function(res) {
        self.fullscreenLoading = false
        // const guigezhi = res.data.data // 规格值也是个数组
        self.getAllSku()
      }).catch(function(error) {
        self.fullscreenLoading = false
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    // 获取规格组合列表
    getAllSku() {
      const self = this
      request({
        method: 'post',
        url: '/item/me-item-value-api/get-me-item-value-list',
        data: {
          item_id: self.goods_id
        }
      }).then(function(res) {
        self.allSku = res.data.data
        console.log('获取全部组合列表', self.allSku)
      }).catch(function(error) {
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    // 更新规格组合列表
    refreshSkus() {
      const self = this
      this.fullscreenLoading = true
      console.log('即将被更新的规格组合数据', self.allSku)
      request({
        method: 'post',
        url: '/item/me-item-value-api/update-sku',
        data: {
          item_id: self.goods_id,
          'sku_data': self.allSku
        }
      }).then(function(res) {
        self.dialogVisible3 = false
        self.fullscreenLoading = false
        console.log(res)
        self.$message({
          message: '信息更新成功',
          type: 'success'
        })
      }).catch(function(error) {
        self.fullscreenLoading = false
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    // 批量更新规格组合 dialogVisible3 = false  allSku
    spcAllchange() {
      const self = this
      if (!this.allSku[0]) {
        self.$message({
          message: '目前没有规格可以配置',
          type: 'warning'
        })
        return false
      }
      if (!(this.checked1 || this.checked2 || this.checked3 || this.checked5)) {
        self.$message({
          message: '请至少选择一项',
          type: 'warning'
        })
        return false
      }
      if (this.checked1) { // 勾选了库存
        if (!this.input1) {
          self.$message({
            message: '请输入库存',
            type: 'warning'
          })
          return false
        } else { // 批量修改库存
          self.allSku.forEach(function(v, i, a) {
            self.$set(self.allSku[i], 'stock', self.input1)
          })
        }
      }
      if (this.checked2) { // 勾选了原价
        if (!this.input2) {
          self.$message({
            message: '请输入原价',
            type: 'warning'
          })
          return false
        } else { // 批量修改库存
          self.allSku.forEach(function(v, i, a) {
            self.$set(self.allSku[i], 'old_price', self.input2)
          })
        }
      }
      if (this.checked3 && ((this.shop_id == 0 || this.shop_id == ''))) { // 勾选了售价
        if (!this.input3) {
          self.$message({
            message: '请输入售价',
            type: 'warning'
          })
          return false
        } else { // 批量修改库存
          self.allSku.forEach(function(v, i, a) {
            self.$set(self.allSku[i], 'price', self.input3)
          })
        }
      }
      // if (this.checked4) { // 勾选了供应价
      //   if (!this.input4) {
      //     self.$message({
      //       message: '请输入供应价',
      //       type: 'warning'
      //     })
      //     return false
      //   } else { // 批量修改库存
      //     self.allSku.forEach(function(v, i, a) {
      //       self.$set(self.allSku[i], 'supply_price', self.input4)
      //     })
      //   }
      // }
      if (this.checked5) { // 勾选了成本价
        if (!this.input5) {
          self.$message({
            message: '请输入成本价',
            type: 'warning'
          })
          return false
        } else { // 批量修改库存
          self.allSku.forEach(function(v, i, a) {
            self.$set(self.allSku[i], 'contract_price', self.input5)
          })
        }
      }
      self.refreshSkus()
    },
    // 创建商品
    createGoods() {
      const self = this
      if (!this.goodstype) {
        this.$message({
          message: '商品类型未选择',
          type: 'warning'
        })
        return false
      }
      if (!this.sbc_id) {
        this.$message({
          message: '商品品类未选择',
          type: 'warning'
        })
        return false
      }
      if (!this.status) {
        if ((this.shop_id * 1)) { // 是在子店铺中添加
          this.status = 2
        } else {
          this.status = 1
        }
      }
      if ((!this.checkedGorys[0]) && (!this.giftLevel)) {
        this.$message({
          message: '商品所属分类未选择',
          type: 'warning'
        })
        return false
      }
      if (!this.goodsname) {
        this.$message({
          message: '商品名称未填写',
          type: 'warning'
        })
        return false
      }
      if (!this.fileList[0]) {
        console.log(this.fileList)
        this.$message({
          message: '至少需要一张商品主图',
          type: 'warning'
        })
        return false
      }
      if (!this.prePrice) {
        this.$message({
          message: '商品原价未填写',
          type: 'warning'
        })
        return false
      }
      if (!this.goodsStock) {
        this.$message({
          message: '商品库存未填写',
          type: 'warning'
        })
        return false
      }
      if (!this.mainPrice) {
        this.$message({
          message: '商品售价未填写',
          type: 'warning'
        })
        return false
      }
      if (!this.expressType) {
        this.$message({
          message: '请选择快递方式',
          type: 'warning'
        })
        return false
      } else if (this.expressType == 2 && (!this.expvalue)) {
        this.$message({
          message: '请选择快递模板',
          type: 'warning'
        })
        return false
      }

      const cate_list = []
      this.checkedGorys.forEach(function(v, i, a) {
        cate_list.push(v.mcid)
      })

      const multi_urls = [] // fileList
      this.fileList.forEach(function(v, i, a) {
        multi_urls.push(v.response.data.url)
      })

      let short_video_url = ''
      if (this.fileList2[0]) {
        short_video_url = this.fileList2[0].response.data.url
      }

      this.fullscreenLoading = true
      request({
        method: 'post',
        url: '/item/me-item-api/create-item',
        data: {
          username: self.username,
          item_type: self.goodstype,
          sbc_id: self.sbc_id,
          cate_list: cate_list,
          gift_item_level: self.giftLevel,
          multi_urls: multi_urls,
          status: self.status,
          short_video_url: short_video_url,
          title: self.goodsname,
          item_code: self.goodsNum,
          item_label: self.item_label,
          remark: self.goodsIntro,
          scale: self.scale,
          stock: self.goodsStock,
          price: self.mainPrice,
          old_price: self.prePrice,
          shop_id: self.storeId ? self.storeId : self.shop_id,
          earn_score: self.goodsPoint,
          earn_growth: self.growthPoint,
          deal_num_false: self.vrdealNum,
          is_vip: self.isVIP,
          is_buy: self.isNews,
          express_template_type: self.expressType,
          postage: self.expressPrice,
          template_id: self.expvalue,
          template_type: self.expCtype,
          weight: self.goodsWeight,
          is_abroad: self.isBorad,
          is_bonus: self.is_bonus,
          rich_text: self.content,
          buy_rich_text: self.content2
        }
      }).then(function(res) {
        self.fullscreenLoading = false
        if (res.data.errcode == 0) {
          self.goods_id = res.data.data.item_id
          self.getMainSpc()
          self.$message({
            message: '商品已生成',
            type: 'success'
          })
        } else {
          self.$message({
            message: res.data.errmsg,
            type: 'warning'
          })
        }
      }).catch(function(error) {
        self.fullscreenLoading = false
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    // 更新商品 同上
    makeGoods() {
      const self = this
      if (!this.goods_id) {
        this.$message({
          message: '请先配置规格生成商品',
          type: 'warning'
        })
        return false
      }
      if (!this.goodstype) {
        this.$message({
          message: '商品类型未选择',
          type: 'warning'
        })
        return false
      }
      if (!this.sbc_id) {
        this.$message({
          message: '商品品类未选择',
          type: 'warning'
        })
        return false
      }
      if (!this.goodsname) {
        this.$message({
          message: '商品名称未填写',
          type: 'warning'
        })
        return false
      }
      if (!this.fileList[0]) {
        console.log(this.fileList)
        this.$message({
          message: '至少需要一张商品主图',
          type: 'warning'
        })
        return false
      }
      if (!this.prePrice) {
        this.$message({
          message: '商品原价未填写',
          type: 'warning'
        })
        return false
      }
      if (!this.mainPrice) {
        this.$message({
          message: '商品售价未填写',
          type: 'warning'
        })
        return false
      }
      if (!this.goodsStock) {
        this.$message({
          message: '商品库存未填写',
          type: 'warning'
        })
        return false
      }
      if (!this.expressType) {
        this.$message({
          message: '请选择快递方式',
          type: 'warning'
        })
        return false
      } else if (this.expressType == 2 && (!this.expvalue)) {
        this.$message({
          message: '请选择快递模板',
          type: 'warning'
        })
        return false
      }

      const cate_list = []
      this.checkedGorys.forEach(function(v, i, a) {
        cate_list.push(v.mcid)
      })

      const multi_urls = [] // fileList
      this.fileList.forEach(function(v, i, a) {
        multi_urls.push(v.response.data.url)
      })

      let short_video_url = ''
      if (this.fileList2[0]) {
        short_video_url = this.fileList2[0].response.data.url
      }

      this.fullscreenLoading = true
      request({
        method: 'post',
        url: '/item/me-item-api/update-item',
        data: {
          username: self.username,
          item_id: self.goods_id,
          item_type: self.goodstype,
          sbc_id: self.sbc_id,
          cate_list: cate_list,
          status: self.status,
          gift_item_level: self.giftLevel,
          multi_urls: multi_urls,
          short_video_url: short_video_url,
          title: self.goodsname,
          item_code: self.goodsNum,
          item_label: self.item_label,
          remark: self.goodsIntro,
          scale: self.scale,
          stock: self.goodsStock,
          price: self.mainPrice,
          old_price: self.prePrice,
          shop_id: self.storeId ? self.storeId : self.shop_id,
          earn_score: self.goodsPoint,
          earn_growth: self.growthPoint,
          deal_num_false: self.vrdealNum,
          is_vip: self.isVIP,
          is_buy: self.isNews,
          express_template_type: self.expressType,
          postage: self.expressPrice,
          template_id: self.expvalue,
          template_type: self.expCtype,
          weight: self.goodsWeight,
          is_abroad: self.isBorad,
          is_bonus: self.is_bonus,
          rich_text: self.content,
          buy_rich_text: self.content2
        }
      }).then(function(res) {
        self.fullscreenLoading = false
        if (res.data.errcode == 0) {
          self.refreshSkus()
          self.$message({
            message: '商品已更新',
            type: 'success'
          })
        } else {
          self.$message({
            message: res.data.errmsg,
            type: 'warning'
          })
        }
      }).catch(function(error) {
        self.fullscreenLoading = false
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    // 获取商品详情
    getDetail() {
      const self = this
      request({
        method: 'post',
        url: '/item/me-item-api/info',
        data: {
          item_id: self.goods_id
        }
      }).then(function(res) {
        self.detail = res.data.data
        console.log('获取到的商品详情', self.detail)
        self.status = String(self.detail.status)
        self.giftLevel = self.detail.gift_item_level
        self.goodstype = self.detail.item_type
        setTimeout(() => {
          self.sbc_arr.forEach((v, i, a) => {
            v.pidList.forEach((vv, ii, aa) => {
              if (vv.id == self.detail.sbc_id) {
                self.sbc_id = [v.id, self.detail.sbc_id, self.detail.three_sbc_id]
              }
            })
          })
        }, 500)
        // self.sbc_id = self.detail.sbc_id
        self.storeId = self.detail.shop_id
        self.getExps(self.storeId)
        // self.item_category = self.detail.item_category
        // self.getGorys()
        self.storeName = self.detail.shop_name
        self.goodsNum = self.detail.item_code
        self.item_label = self.detail.item_label
        self.expCtype = String(self.detail.template_type)
        self.cate_list = ''
        // self.giftLevel = ''
        self.fileList = []
        self.detail.multi_urls.forEach(function(v, i, a) {
          const obj = { // 生成模拟数据
            'url': '',
            'response': {
              'data': {
                'url': ''
              }
            }
          }
          obj.url = v
          obj.response.data.url = v
          self.fileList.push(obj)
        })
        self.hideUploadEdit = self.fileList.length >= 5
        if (self.detail.short_video_url) {
          self.fileList2 = []
          const obj2 = { // 生成模拟数据
            'url': '',
            'response': {
              'data': {
                'url': ''
              }
            }
          }
          obj2.url = self.detail.short_video_url
          obj2.response.data.url = self.detail.short_video_url
          self.fileList2.push(obj2)
          // let vdo = document.getElementById("playVideos")
          // vdo.src=self.detail.short_video_url;
        }
        self.hideUploadEdit2 = self.fileList2.length >= 1
        self.goodsname = self.detail.title
        self.goodsIntro = self.detail.remark
        self.scale = self.detail.scale
        self.goodsStock = self.detail.stock
        self.mainPrice = self.detail.price
        self.prePrice = self.detail.old_price
        self.goodsPoint = self.detail.earn_score
        self.growthPoint = self.detail.earn_growth
        self.vrdealNum = self.detail.deal_num_false
        self.isVIP = self.detail.is_vip
        self.isNews = self.detail.is_buy
        self.expressType = self.detail.express_template_type
        self.expressPrice = self.detail.postage * 1
        self.expvalue = self.detail.template_id
        self.goodsWeight = self.detail.weight * 1
        self.isBorad = self.detail.is_abroad
        self.is_bonus = self.detail.is_bonus
        self.content = self.detail.rich_text
        self.content2 = self.detail.buy_rich_text
      }).catch(function(error) {
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    },
    // 获取品类
    getpinglei() {
      const self = this
      request({
        method: 'post',
        url: '/shop/shop-apply-record-api/business-category-list',
        data: {
          start_page: '0',
          pages: '999'
        }
      }).then(function(res) {
        self.sbc_arr = res.data.data.list
        console.log('获取全部品类列表', self.sbc_arr)
      }).catch(function(error) {
        self.$message({
          message: error.data.errmsg,
          type: 'warning'
        })
      })
    }
  }
}
</script>
<style lang="scss">
.ag-page{
  width: 100%;
  padding-bottom:100px;
  .ivu-upload {
      display: none;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .ag-page-head{
    width: 100%;
    height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size:24px;
    border-bottom:1px solid #eee;
    .ag-page-head-bottom{
      height: 60px;
      display: flex;
      align-items: center;
    }
  }
  .gcon{
    width: 100%;
    padding-top:60px;
    padding-left:120px;
    box-sizing: border-box;
  }
  .guigeBox{
    width: 1000px;
    min-height: 100px;
    border: 1px solid #eee;
    padding-left:50px;
    padding-top:10px;
    box-sizing:border-box;
    padding-bottom:20px;
  }
  .spcDElist{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top:20px;
  }
  .ql-editor{
         height:400px;
     }
  .upImg{
    width: 148px;
    height: 148px;
    margin-right:5px;
  }
  .hide .el-upload--picture-card {
    display: none;
  }
  .iimgBox{
    width: 146px;
    height: 146px;
    border-radius:16px;
    border: 1px dashed #666;
    margin: 0 5px;
  }
  .richBox{
    width: 850px;
    img{
      width: 300px;
    }
  }
}
</style>

