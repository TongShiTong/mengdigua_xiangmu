import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions.js"
import router from '../router';
Vue.use(Vuex);







//创建一个store仓库
const store = new Vuex.Store({
    //state用来存放数据的对象
    state: JSON.parse(sessionStorage.getItem("store"))||{
        //初始值、存放的东西
        step: 1,
        token: "",
        myShop: null,
        result: null,
        reason: null,
        stepObj1: {},
        stepObj2: {},
        stepObj3: {},
        phone: "",
        isSetUp: false,//是否申请开店
    },
    //定义取数据;;;;用来操作修改state的
    getters: {

    },

    //存数据
    mutations: {
        exit:(state, num) => {

            state.step=1;
           state.token="";
           state.myShop=null;
           state.result=null;
           state.reason=null;
           state.stepObj1 = {};
           state.stepObj2 = {};
           state.stepObj3 = {};
           state.phone="";
           state.isSetUp=false;

        },
   
        changeIsSet: (state, bool) => {

            state.isSetUp = bool;
        },
        changeStep: (state, index) => {
            state.step = index;
            if (index == 1) {
                router.push("/regpart1")
            } else if (index == 2) {
                router.push("/regpart2")
            } else if (index == 3) {
                router.push("/regpart3")
            } else if (index == 4) {
                router.push("/regresult")
            }
        },
        changeToken: (state, token) => {

            state.token = token;
        },
        changePhone: (state, token) => {

            state.phone = token;
        },
        changeMyShop: (state, data) => {
           
            state.myShop = data;

        },
        changeResult: (state, data) => {
            state.result = data;

        },
        changeReason: (state, data) => {
            state.reason = data;
        },
        changeStepObj1: (state, data) => {
            state.stepObj1 = data;

        },
        changeStepObj2: (state, data) => {
            state.stepObj2 = data;
        },
        changeStepObj3: (state, data) => {
            state.stepObj3= data;
        },


    },
    actions
})

window.addEventListener("beforeunload", function() {   //在页面刷新前将vuex里的信息保存到sessionStorage里
    sessionStorage.setItem("store", JSON.stringify(store.state))
})
// window.addEventListener("load",()=>{

// })

export default store;