(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7dd3"],{GLPW:function(e,t,a){"use strict";a.r(t);var n=a("4d7F"),i=a.n(n),s=a("QbLZ"),l=a.n(s),c=a("L2JU"),o=a("IdKY"),r={name:"Chexkbox",props:{visibilityHeight:{type:Number,default:400},backPosition:{type:Number,default:0},checkData:{type:Array,default:function(){return[]}},customStyle:{type:Object,default:function(){return{}}},transitionName:{type:String,default:"fade"}},data:function(){return{visible:!1,interval:null,isMoving:!1}},computed:{},mounted:function(){},beforeDestroy:function(){},methods:{changeStatus:function(e,t){this.$emit("change-status",{status:!e,index:t})}}},u=(a("u/Vn"),a("KHd+")),d=Object(u.a)(r,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"Chexkbox"},[a("div",{staticClass:"flex-r-s"},e._l(e.checkData,function(t,n){return a("div",{key:n,staticClass:"flex-r-s each-choice mr20",on:{click:function(a){e.changeStatus(t.chekced,n)}}},[a("div",{staticClass:"circle",class:t.chekced?"checked":""}),e._v(" "),a("div",{staticClass:"choice"},[e._v(e._s(t.name))])])}))])},[],!1,null,"146afd3a",null);d.options.__file="index.vue";var v={name:"BaseSet",components:{checkBox:d.exports},data:function(){return{choiceType:"1",created:1,options:[],optionstwo:[{}],value4:"",chekced:!1,checKData:[{name:"购买礼包",chekced:!0,id:1},{name:"邀请注册用户",chekced:!1,id:2}],inputInfo:{name:"",level:"",fee:""},rewardtext:"",loading:!1,levelLoading:!1,deteteLoading:!1,people:[],centerDialogVisible:!1,visibleD:!1,deleteId:0,updateId:0,is_multiple:!1,createLoading:!1,inputWay:1,detaleway:1,upgradeRule:[],clearIndex:0,saveLoading:!1,levelData:{purchase:1,invite_num:0,fans_protection:0,team_trace_level:0},fansOptions:[{value:-1,label:"永久"},{value:7,label:"7天"},{value:10,label:"10天"},{value:15,label:"15天"},{value:0,label:"自定义"}],fansChoice:null}},computed:l()({},Object(c.b)(["roles"]),{gift:function(){var e=[];return this.checKData.forEach(function(t,a){t.chekced&&e.push(t.id)}),e},chocice:function(){return this.gift.includes(2)}}),created:function(){this.getPushList(),this.getGiftSetting()},methods:{numberChange:function(e,t,a){1===e&&(this.upgradeRule[t].level[a].member_num="",this.upgradeRule[t].level[a].money="",this.$message.error("请先勾选"+this.upgradeRule[t].name+"的第"+(a+1)+"个"))},optionChange:function(e,t,a,n){var i=this;if(n||0===n)if(1===e)this.upgradeRule[t].level[a].name="",this.$message.error("请先勾选"+this.upgradeRule[t].name+"的第"+(a+1)+"个");else{var s=this.upgradeRule[t].options[n].value;this.upgradeRule[t].level[a].team_level=s.id,this.upgradeRule[t].level[a].type=s.type,this.upgradeRule[t].options.forEach(function(e,t){e.disabled=!1}),this.upgradeRule[t].level.forEach(function(e,a){""!==e.name&&(i.upgradeRule[t].options[e.name].disabled=!0)})}},clearValue:function(e,t,a,n){var i=this;this.upgradeRule[t].options.forEach(function(e,t){e.disabled=!1}),this.upgradeRule[t].level.forEach(function(e,a){""!==e.name&&(i.upgradeRule[t].options[e.name].disabled=!0)})},numberChange2:function(e,t,a){if(!e){var n=this.upgradeRule[t].level.length;1===a?this.upgradeRule[t].sale_commission="":2===a?this.upgradeRule[t].order_num="":this.upgradeRule[t].invite_num="",this.$message.error("请先勾选"+this.upgradeRule[t].name+"的第"+(a+n)+"个")}},addArray:function(e,t){this.upgradeRule[e].level.splice(t+1,0,{level_id:this.people[e].level,team_level:"",member_num:"",money:"",type:"",name:"",status:1})},deleteArray:function(e,t){var a=this;this.upgradeRule[e].level.splice(t,1),this.upgradeRule[e].options.forEach(function(e,t){e.disabled=!1}),this.upgradeRule[e].level.forEach(function(t,n){""!==t.name&&(a.upgradeRule[e].options[t.name].disabled=!0)})},changeStatus:function(e){var t=e.status,a=e.index;this.checKData[a].chekced=t},changeContent:function(e){e=!e},getPushList:function(){var e=this,t=this;return t.loading=!0,new i.a(function(a,n){Object(o.i)({}).then(function(a){0===a.data.errcode?(t.people=a.data.data,e.upgradeRule=[],t.initRule(),t.getUpdateRule()):t.$message.error(a.data.errmsg),t.loading=!1}).catch(function(e){t.loading=!1,n(e)})})},getGiftSetting:function(){var e=this;return e.loading=!0,new i.a(function(t,a){Object(o.e)({}).then(function(t){if(0===t.data.errcode)if(t.data.data.purchase){var a=t.data.data;e.levelData.purchase=a.purchase,e.levelData.id=a.id,e.levelData.invite_num=a.invite_num,e.levelData.fans_protection=a.fans_protection,e.levelData.team_trace_level=a.team_trace_level,"-1"===a.fans_protection||"7"===a.fans_protection||"15"===a.fans_protection||"10"===a.fans_protection?e.fansChoice=parseInt(a.fans_protection):e.fansOptions}else e.levelData={purchase:1,invite_num:0,fans_protection:0,team_trace_level:0};else e.$message.error(t.data.errmsg);e.loading=!1}).catch(function(t){e.loading=!1,a(t)})})},saveGiftSetting:function(){var e=this;return null==e.fansChoice&&-1!==parseInt(e.levelData.fans_protection)?(e.$message.error("粉丝保护期不能不能为空"),!1):""===e.levelData.fans_protection?(e.$message.error("粉丝保护期不能为空"),!1):(e.levelData.purchase="1"===e.choiceType?1:0,e.levelData.invite_num="2"===e.choiceType?e.levelData.invite_num:0,e.levelData.fans_protection=0===e.fansChoice?e.levelData.fans_protection:e.fansChoice||0,e.levelLoading=!0,new i.a(function(t,a){Object(o.k)(e.levelData).then(function(t){0===t.data.errcode?(e.$message.success("保存成功"),e.getGiftSetting()):e.$message.error(t.data.errmsg),e.levelLoading=!1}).catch(function(t){e.levelLoading=!1,a(t)})}))},open:function(e){this.centerDialogVisible=!0,e&&(this.updateId=e.id,this.inputInfo.name=e.name,this.inputInfo.level=e.level,this.inputInfo.fee=e.fee)},DeteleDig:function(e,t){this.detaleway=e,this.visibleD=!0,1===e?this.deleteId=t:this.clearIndex=t},itemDelete:function(){var e=this;return e.visibleD=!1,e.deteteLoading=!0,new i.a(function(t,a){Object(o.g)({id:e.deleteId}).then(function(t){0===t.data.errcode?(e.$message.success("删除成功"),e.getPushList()):e.$message.error(t.data.errmsg),e.deteteLoading=!1}).catch(function(t){e.deteteLoading=!1,a(t)})})},itemdataDelete:function(e){this.visibleD=!1,this.initEachItem(e)},handUpdateWay:function(){var e=this;e.centerDialogVisible=!1,e.createLoading=!0;var t=e.inputInfo;return t.id=e.updateId,new i.a(function(a,n){Object(o.h)(t).then(function(t){0===t.data.errcode?(e.inputInfo.name="",e.inputInfo.level="",e.inputInfo.free="",e.$message.success("修改成功"),e.getPushList()):e.$message.error(t.data.errmsg),e.createLoading=!1}).catch(function(t){e.createLoading=!1,n(t)})})},createMumber:function(){var e=this;return e.centerDialogVisible=!1,e.createLoading=!0,new i.a(function(t,a){Object(o.f)(e.inputInfo).then(function(t){0===t.data.errcode?(e.inputInfo.name="",e.inputInfo.level="",e.inputInfo.free="",e.$message.success("添加成功"),e.getPushList()):e.$message.error(t.data.errmsg),e.createLoading=!1}).catch(function(t){e.createLoading=!1,a(t)})})},getUpdateRule:function(){var e=this;return e.loading=!0,new i.a(function(t,a){Object(o.p)({}).then(function(t){0===t.data.errcode?(t.data.data||(t.data.data=[]),t.data.data.forEach(function(t,a){"0"===t.invite_num?e.upgradeRule[a].chekced3=!1:(e.upgradeRule[a].chekced3=!0,e.upgradeRule[a].invite_num=t.invite_num),e.upgradeRule[a].level_id=t.level_id,"0"===t.order_num?e.upgradeRule[a].chekced2=!1:(e.upgradeRule[a].chekced2=!0,e.upgradeRule[a].order_num=t.order_num),"0.00"===t.sale_commission?e.upgradeRule[a].chekced1=!1:(e.upgradeRule[a].chekced1=!0,e.upgradeRule[a].sale_commission=t.sale_commission);var n=t.level.length-e.upgradeRule[a].level.length;if(n>0)for(var i=0;i<n;i++)e.upgradeRule[a].level.push({name:"",level_id:t.level,team_level:"",member_num:"",money:"",type:"",status:1});t.level.forEach(function(t,n){e.upgradeRule[a].level.forEach(function(i,s){n===s&&(i.level_id=t.level_id,i.team_level=t.team_level,i.member_num=t.member_num,i.money=t.money,i.status=t.status,i.type=t.type,"2"===i.status&&e.upgradeRule[a].options.forEach(function(e,t){e.value.id===i.team_level&&parseInt(e.value.type)===parseInt(i.type)&&(i.name=t)})),""!==i.name&&(e.upgradeRule[a].options[i.name].disabled=!0)})})})):e.$message.error(t.data.errmsg);e.loading=!1}).catch(function(t){e.loading=!1,a(t)})})},initRule:function(){var e=this;this.people.forEach(function(t,a){e.upgradeRule.push({people_level:t.level,level_id:t.level,sale_commission:"",order_num:"",invite_num:"",name:t.name,chekced1:!1,chekced2:!1,chekced3:!1,level:[{level_id:t.level,team_level:"",member_num:"",money:"",type:"",status:1,name:""}],options:[]})});for(var t=0;t<this.upgradeRule.length;t++)for(var a=0;a<this.people.length;a++)t>0&&t>a&&(this.upgradeRule[t].options.push({name:"直属下级"+this.people[a].name,value:{type:1,id:this.people[a].level},id:a+1,disabled:!1}),this.upgradeRule[t].options.push({name:"团队内"+this.people[a].name,value:{type:2,id:this.people[a].level},id:a+10001,disabled:!1}))},initEachItem:function(e){this.upgradeRule.splice(e,1,{people_level:this.people[e].level,level_id:this.people[e].level,sale_commission:"",order_num:"",invite_num:"",name:this.people[e].name,chekced1:!1,chekced2:!1,chekced3:!1,level:[{name:"",level_id:this.people[e].level,team_level:"",member_num:"",money:"",type:"",status:1}],options:[]});for(var t=e,a=0;a<this.people.length;a++)t>0&&t>a&&(this.upgradeRule[t].options.push({name:"直属下级"+this.people[a].name,value:{type:1,id:this.people[a].level},id:a+1,disabled:!1}),this.upgradeRule[t].options.push({name:"团队内"+this.people[a].name,value:{type:2,id:this.people[a].level},id:a+10001,disabled:!1}))},saveEnd:function(){for(var e=this,t=[],a=0;a<this.upgradeRule.length;a++)if(a>0){var n=this.upgradeRule[a];if(n.chekced1&&""===n.sale_commission)return e.$message.error(e.people[a].name+"实际销售佣金不能为空"),!1;if(n.chekced2&&""===n.order_num)return e.$message.error(e.people[a].name+"订单数不能为空"),!1;if(n.chekced3&&""===n.invite_num)return e.$message.error(e.people[a].name+"邀请关注公众号人数不能为空"),!1;for(var s=0;s<n.level.length;s++){var l=n.level[s];if(2===l.status){if(""===l.money)return e.$message.error(e.people[a].name+"第"+(s+1)+" 实际消费不能为空"),!1;if(""===l.type)return e.$message.error(e.people[a].name+"第"+(s+1)+" 选择不能为空"),!1;if(""===l.member_num)return e.$message.error(e.people[a].name+"第"+(s+1)+" 人数不能为空"),!1}}}return this.upgradeRule.forEach(function(e,a){t.push({level_id:e.level_id,sale_commission:""===e.sale_commission?0:e.sale_commission,order_num:""===e.order_num?0:e.order_num,invite_num:""===e.invite_num?0:e.invite_num,level:[]}),e.level.forEach(function(e){t[a].level.push({level_id:e.level_id,team_level:e.team_level,member_num:e.member_num,money:e.money,type:e.type,status:e.status})})}),e.saveLoading=!0,new i.a(function(a,n){Object(o.l)(t).then(function(t){0===t.data.errcode?e.$message.success("保存成功"):e.$message.error(t.data.errmsg),e.saveLoading=!1}).catch(function(t){e.saveLoading=!1,n(t)})})}}},p=(a("q4BM"),a("wpif"),Object(u.a)(v,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"base-set",attrs:{"element-loading-text":"拼命加载中"}},[a("div",{staticClass:"set-top"},[a("div",{staticClass:"flex-r-s"},[a("div",{staticClass:"label mr20"},[e._v("成为会员条件：")]),e._v(" "),a("el-radio",{attrs:{label:"1"},model:{value:e.choiceType,callback:function(t){e.choiceType=t},expression:"choiceType"}},[e._v("购买礼包")]),e._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:e.choiceType,callback:function(t){e.choiceType=t},expression:"choiceType"}},[e._v("邀请用户注册")])],1),e._v(" "),2==e.choiceType?a("div",{staticClass:"flex-r-s mt20"},[a("div",{staticClass:"label mr20"},[e._v("设置注册用户人数：")]),e._v(" "),a("el-input",{staticClass:"input-width mr20",attrs:{size:"mini",type:"number",placeholder:"设置注册用户人数："},model:{value:e.levelData.invite_num,callback:function(t){e.$set(e.levelData,"invite_num",t)},expression:"levelData.invite_num"}})],1):e._e(),e._v(" "),a("div",{staticClass:"flex-r-s mt20"},[a("div",{staticClass:"label mr20"},[e._v("团队追溯级别：")]),e._v(" "),a("el-input",{staticClass:"input-width mr20 input-width-two",attrs:{type:"number",size:"mini",placeholder:"默认填写0，则为无限级追溯"},model:{value:e.levelData.team_trace_level,callback:function(t){e.$set(e.levelData,"team_trace_level",t)},expression:"levelData.team_trace_level"}})],1),e._v(" "),a("div",{staticClass:"flex-r-s mt20"},[a("div",{staticClass:"label mr20"},[e._v("粉丝保护期：")]),e._v(" "),a("el-select",{staticClass:"mr20",attrs:{size:"mini",clearable:"",placeholder:"请选择"},model:{value:e.fansChoice,callback:function(t){e.fansChoice=t},expression:"fansChoice"}},e._l(e.fansOptions,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})),e._v(" "),0===e.fansChoice?a("el-input",{staticClass:"input-width mr20 ",attrs:{type:"number",size:"mini",placeholder:"请输入粉丝保护期"},model:{value:e.levelData.fans_protection,callback:function(t){e.$set(e.levelData,"fans_protection",t)},expression:"levelData.fans_protection"}}):e._e(),e._v(" "),a("el-button",{attrs:{loading:e.levelLoading,type:"primary",size:"mini"},on:{click:e.saveGiftSetting}},[e._v("保存")])],1)]),e._v(" "),a("div",{staticClass:"set-level mt20"},[a("div",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.open(),e.inputWay=1}}},[e._v("添加分销员等级")])],1),e._v(" "),e._m(0),e._v(" "),a("div",{staticClass:"table-content"},e._l(e.people,function(t,n){return a("div",{key:n,staticClass:"each-content flex-r-b"},[a("div",{staticClass:"flex-r-s flex-3"},[a("div",{staticClass:"each-content-attr"},[e._v(e._s(t.level))]),e._v(" "),a("div",{staticClass:"each-content-attr"},[e._v(e._s(t.name))]),e._v(" "),a("div",{staticClass:"each-content-attr"},[e._v(e._s(t.num))]),e._v(" "),a("div",{staticClass:"each-content-attr"},[e._v(e._s(t.fee))])]),e._v(" "),a("div",{staticClass:"flex-1 operate"},[a("el-button",{on:{click:function(a){e.open(t),e.inputWay=2}}},[e._v("编辑")]),e._v(" "),a("span",[e._v("|")]),e._v(" "),a("el-button",{attrs:{slot:"reference"},on:{click:function(a){e.DeteleDig(1,t.id)}},slot:"reference"},[e._v("删除")])],1)])}))]),e._v(" "),a("div",{staticClass:"upgrade-rule mt20"},[a("div",{staticClass:"title"},[e._v("升级规则配置：")]),e._v(" "),e._m(1),e._v(" "),a("div",{staticClass:"upgrade-content"},e._l(e.upgradeRule,function(t,n){return a("div",{key:n,staticClass:"each-content flex-r-b"},[a("div",{staticClass:"flex-1"},[e._v(e._s(t.people_level))]),e._v(" "),a("div",{staticClass:"flex-1"},[e._v(e._s(t.name))]),e._v(" "),a("div",{staticClass:"flex-4"},0==n?[e._v("系统默认成为分销员后即是该等级")]:[a("div",{staticClass:"each-attr flex-r-s"},[a("div",[e._l(t.level,function(i,s){return a("div",{key:s,staticClass:"flex-r-s ptb10"},[a("div",{staticClass:"button-expend",on:{click:function(e){1==i.status?i.status=2:i.status=1,i.name="",i.money="",i.member_num=""}}},[a("div",{staticClass:"circle mr10",class:2==i.status?"checked":""})]),e._v(" "),a("div",{staticClass:"flex-r-s"},[a("div",[a("el-select",{staticClass:"mr5",attrs:{size:"mini",clearable:"",placeholder:"请选择"},on:{change:function(t){e.optionChange(i.status,n,s,t,i.name)},clear:function(t){e.clearValue(i.status,n,s,t,i.name)}},model:{value:i.name,callback:function(t){e.$set(i,"name",t)},expression:"item1.name"}},e._l(t.options,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:t,disabled:e.disabled}})}))],1),e._v(" "),a("div",{staticClass:"flex-r-s"},[a("div",{staticClass:"mr5"},[e._v("实际消费")]),e._v(" "),a("el-input",{staticClass:"table-input mr5",attrs:{type:"number",size:"mini",min:"0",placeholder:""},on:{change:function(t){e.numberChange(i.status,n,s)}},model:{value:i.money,callback:function(t){e.$set(i,"money",t)},expression:"item1.money"}}),e._v(" "),a("div",{staticClass:"mr5"},[e._v("元达到")]),e._v(" "),a("el-input",{staticClass:"table-input mr5",attrs:{type:"number",size:"mini",min:"0",placeholder:""},on:{change:function(t){e.numberChange(i.status,n,s)}},model:{value:i.member_num,callback:function(t){e.$set(i,"member_num",t)},expression:"item1.member_num"}}),e._v(" "),a("div",{staticClass:"mr5"},[e._v("人")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.addArray(n,s)}}},[e._v("添加")]),e._v(" "),0!==s?a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(t){e.deleteArray(n,s)}}},[e._v("删除")]):e._e()],1)])])}),e._v(" "),a("div",{staticClass:"flex-r-s ptb10"},[a("div",{staticClass:"button-expend",on:{click:function(e){t.chekced1=!t.chekced1,t.sale_commission=""}}},[a("div",{staticClass:"circle mr10",class:t.chekced1?"checked":""})]),e._v(" "),a("div",{staticClass:"flex-r-s"},[a("div",{staticClass:"mr5"},[e._v("该分销员实际销售佣金满")]),e._v(" "),a("el-input",{staticClass:"table-input mr5",attrs:{type:"number",size:"mini",min:"0",placeholder:""},on:{change:function(a){e.numberChange2(t.chekced1,n,1)}},model:{value:t.sale_commission,callback:function(a){e.$set(t,"sale_commission",a)},expression:"item.sale_commission"}}),e._v(" "),a("div",[e._v("元")])],1)]),e._v(" "),a("div",{staticClass:"flex-r-s ptb10"},[a("div",{staticClass:"button-expend",on:{click:function(e){t.chekced2=!t.chekced2,t.order_num=""}}},[a("div",{staticClass:"circle mr10",class:t.chekced2?"checked":""})]),e._v(" "),a("div",{staticClass:"flex-r-s"},[a("div",{staticClass:"mr5"},[e._v("累计订单数（自买/售卖）满")]),e._v(" "),a("el-input",{staticClass:"table-input mr5",attrs:{type:"number",size:"mini",min:"0",placeholder:""},on:{change:function(a){e.numberChange2(t.chekced2,n,2)}},model:{value:t.order_num,callback:function(a){e.$set(t,"order_num",a)},expression:"item.order_num"}}),e._v(" "),a("div",[e._v("单")])],1)]),e._v(" "),a("div",{staticClass:"flex-r-s ptb10"},[a("div",{staticClass:"button-expend",on:{click:function(e){t.chekced3=!t.chekced3,t.invite_num=""}}},[a("div",{staticClass:"circle mr10",class:t.chekced3?"checked":""})]),e._v(" "),a("div",{staticClass:"flex-r-s"},[a("div",{staticClass:"mr5"},[e._v("邀请关注公众号人数满")]),e._v(" "),a("el-input",{staticClass:"table-input mr5",attrs:{type:"number",size:"mini",min:"0",placeholder:""},on:{change:function(a){e.numberChange2(t.chekced3,n,3)}},model:{value:t.invite_num,callback:function(a){e.$set(t,"invite_num",a)},expression:"item.invite_num"}}),e._v(" "),a("div",[e._v("人")])],1)])],2)])]),e._v(" "),a("div",{staticClass:"flex-1"},[0!==n?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){e.DeteleDig(2,n)}}},[e._v("清除")]):e._e()],1)])}))]),e._v(" "),a("div",{staticClass:"advice"},[e._v("提示：仅统计等级设置后分销员的销售佣金、订单数、关注公众号人数数据，设置前的历史数据暂不统计")]),e._v(" "),a("div",{staticClass:"mt20"},[a("el-button",{attrs:{loading:e.saveLoading,type:"primary",size:"mini"},on:{click:function(t){e.saveEnd()}}},[e._v("保存")])],1),e._v(" "),a("el-dialog",{attrs:{visible:e.centerDialogVisible,title:"添加分销员等级 ",width:"30%",center:""},on:{"update:visible":function(t){e.centerDialogVisible=t}}},[a("div",{staticClass:"flex-r-s mt20"},[a("div",{staticClass:"label label-two mr20"},[e._v("等级权重：")]),e._v(" "),a("el-input",{staticClass:"input-width mr20",attrs:{disabled:2==e.inputWay,type:"number",placeholder:""},model:{value:e.inputInfo.level,callback:function(t){e.$set(e.inputInfo,"level",t)},expression:"inputInfo.level"}})],1),e._v(" "),a("div",{staticClass:"flex-r-s mt20"},[a("div",{staticClass:"label label-two mr20"},[e._v("等级名称：")]),e._v(" "),a("el-input",{staticClass:"input-width mr20",attrs:{type:"text",placeholder:""},model:{value:e.inputInfo.name,callback:function(t){e.$set(e.inputInfo,"name",t)},expression:"inputInfo.name"}})],1),e._v(" "),a("div",{staticClass:"flex-r-s mt20"},[a("div",{staticClass:"label label-two mr20"},[e._v("提现手续费：")]),e._v(" "),a("el-input",{staticClass:"input-width mr20",attrs:{autosize:{minRows:4,maxRows:8},type:"number",placeholder:""},model:{value:e.inputInfo.fee,callback:function(t){e.$set(e.inputInfo,"fee",t)},expression:"inputInfo.fee"}})],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.centerDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),1==e.inputWay?a("el-button",{attrs:{loading:e.createLoading,type:"primary"},on:{click:e.createMumber}},[e._v("确 定")]):a("el-button",{attrs:{loading:e.createLoading,type:"primary"},on:{click:e.handUpdateWay}},[e._v("确 定")])],1)]),e._v(" "),a("el-dialog",{attrs:{visible:e.visibleD,title:1===e.detaleway?"删除推手，会同时删除对应分佣、分佣配置和升级规则":"会清空"+e.people[e.clearIndex].name+"全部数据",width:"300px"},on:{"update:visible":function(t){e.visibleD=t}}},[a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visibleD=!1}}},[e._v("取 消")]),e._v(" "),1===e.detaleway?a("el-button",{attrs:{loding:e.deteteLoading,type:"primary"},on:{click:e.itemDelete}},[e._v("确 定")]):a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.itemdataDelete(e.clearIndex)}}},[e._v("确 定")])],1)])],1)},[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"talble-top mt20 flex-r-b"},[a("div",{staticClass:"flex-r-s flex-3"},[a("div",{staticClass:"each-table-title"},[e._v("等级权重")]),e._v(" "),a("div",{staticClass:"each-table-title"},[e._v("等级名称")]),e._v(" "),a("div",{staticClass:"each-table-title"},[e._v("用户数")]),e._v(" "),a("div",{staticClass:"each-table-title"},[e._v("提现手续费")])]),e._v(" "),a("div",{staticClass:"each-table-title"},[e._v("操作")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"flex-r-b mt20 upgrade-title"},[t("div",{staticClass:"flex-1"},[this._v("等级权重")]),this._v(" "),t("div",{staticClass:"flex-1"},[this._v("等级名称")]),this._v(" "),t("div",{staticClass:"flex-4"},[this._v("升级规则")]),this._v(" "),t("div",{staticClass:"flex-1"},[this._v("操作")])])}],!1,null,"1439860c",null));p.options.__file="set.vue";t.default=p.exports},IdKY:function(e,t,a){"use strict";a.d(t,"i",function(){return i}),a.d(t,"d",function(){return s}),a.d(t,"j",function(){return l}),a.d(t,"b",function(){return c}),a.d(t,"a",function(){return o}),a.d(t,"c",function(){return r}),a.d(t,"m",function(){return u}),a.d(t,"n",function(){return d}),a.d(t,"o",function(){return v}),a.d(t,"f",function(){return p}),a.d(t,"h",function(){return m}),a.d(t,"g",function(){return f}),a.d(t,"p",function(){return h}),a.d(t,"l",function(){return _}),a.d(t,"e",function(){return g}),a.d(t,"k",function(){return b});var n=a("t3Un");function i(e){return Object(n.a)({url:"/handConfig/hand-config-api/index",method:"post",data:e})}function s(e){return Object(n.a)({url:"/handConfig/config-api/commission-config",method:"post",data:e})}function l(e){return Object(n.a)({url:"/handConfig/config-api/set-name-list",method:"post",data:e})}function c(e){return Object(n.a)({url:"/handConfig/config-api/set-mode",method:"post",data:e})}function o(e){return Object(n.a)({url:"/handConfig/config-api/set-data",method:"post",data:e})}function r(e){return Object(n.a)({url:"/handConfig/config-api/divider-config",method:"post",data:e})}function u(e){return Object(n.a)({url:"/handConfig/config-api/set-divider-mode",method:"post",data:e})}function d(e){return Object(n.a)({url:"/handConfig/config-api/set-divider-name-list",method:"post",data:e})}function v(e){return Object(n.a)({url:"/handConfig/config-api/set-divider-data",method:"post",data:e})}function p(e){return Object(n.a)({url:"/handConfig/hand-config-api/create",method:"post",data:e})}function m(e){return Object(n.a)({url:"/handConfig/hand-config-api/update",method:"post",data:e})}function f(e){return Object(n.a)({url:"/handConfig/hand-config-api/delete",method:"post",data:e})}function h(e){return Object(n.a)({url:"/handUpdate/hand-update-level-api/get-update-rules",method:"post",data:e})}function _(e){return Object(n.a)({url:"/handUpdate/hand-update-level-api/save-rule",method:"post",data:e})}function g(e){return Object(n.a)({url:"/handUpdate/hand-update-level-api/get-conf",method:"post",data:e})}function b(e){return Object(n.a)({url:"/handUpdate/hand-update-level-api/save-conf",method:"post",data:e})}},LbgI:function(e,t,a){},ovKD:function(e,t,a){},q4BM:function(e,t,a){"use strict";var n=a("LbgI");a.n(n).a},"u/Vn":function(e,t,a){"use strict";var n=a("ovKD");a.n(n).a},wpif:function(e,t,a){"use strict";var n=a("zOQy");a.n(n).a},zOQy:function(e,t,a){}}]);