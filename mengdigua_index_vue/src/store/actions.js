import $axios from 'axios';

$axios.defaults.baseURL = 'https://api.mengdigua.cn';
let actions = {
    // 主营类目
    mainCate(store, data) {
        return $axios.post('/shop/shop-apply-record-api/business-category-list', data);
    },
    xieyi(store, data) {
        return $axios.post('/content/content-api/view', data);//协议
    },
    yiji(store, data) {
        return $axios.post('/shop/shop-apply-record-api/categoty-list', data);//一级类目
    },
    erji(store, data) {
        return $axios.post('/shop/shop-apply-record-api/categoty-second-list', data);//一级类目
    },
    pingtaiMsg(store, data) {
        return $axios.post('/base/intel-api/info', data);//平台信息
    },
    zuce(store, data) {
        return $axios.post('/member/user-api/web-register', data);//注册
    },
    forCode(store, data) {
        return $axios.post('/member/user-api/web-send-sms', data);// 获取验证码 登录 和注册
    },
    login(store, data) {
        return $axios.post('/member/user-api/web-login', data);// // 登录
    },
    storeApply(store, data) {
        return $axios.post('/shop/shop-apply-record-api/create', data);//店铺申请入驻
    },
    queryImgCode(store, data) {
        return $axios.post('/member/user-api/get-img-code', data);//图片二维码
    },
    shopDetail(store, data) {
       return $axios.post('/shop/shop-apply-record-api/detail', {
            token: store.state.token
        }).then(res => {
    
            let d = res.data;
            if (d.errcode == 0) {
                store.commit("changeMyShop",d.data);
                if (d.data) {
                    if (d.data.status) {
                        store.commit("changeResult",d.data.status);
                        store.commit("changeReason",d.data.reason);
                        store.commit("changeStep",4) ;
                        store.commit("changeIsSet",true)
                    }
                } else {
                    store.commit("changeStep",1) ;
                    store.commit("changeIsSet",false)
                }
            } else {
                store.commit("changeStep",1) ;
                store.commit("changeIsSet",false)
            };
        })
        .catch(d => {
         
            store.commit("changeStep",1) ;
            
        });;//获取店铺信息
    },
    storeApply(store, data) {
        return $axios.post('/shop/shop-apply-record-api/create', data);//店铺申请入驻
    },
    changeDetail(store, data) {
        return $axios.post('/shop/shop-apply-record-api/update', data);//店铺信息修改
    },
    reset(store,data){
        return $axios.post('/member/user-api/web-reset-password', data);//密码重置
    },
    resetCode(store, data) {
        return $axios.post('/member/user-api/send-sms', data);// 获取验证码修改密码
    },
    // downLoadWord(){
    //     return $axios.post('/member/user-api/web-reset-password', data);//密码重置
    // }
}
export default actions



