const basicService = [
  {
    name:'砍价订单',
    icon:'bargain',
    url:'/pages/order/barList/barList',
    role:0,
    
  },
  {
    name: '拼团订单',
    icon: 'group',
    url: '/pages/center/groupOrder/groupOrder?type=1',
    role: 0

  },
  {
    name: '优惠券',
    icon: 'coupon',
    url: '/pages/center/myCoupon/myCoupon',
    role: 0

  },
  {
    name: '企业福利卡',
    icon: 'welfare',
    url: '/pages/center/welfareCard/welfareCard',
    role: 0

  },
  {
    name: '我的地址',
    icon: 'address',
    url: '/pages/center/seting/address/address',
    role: 0

  },
  {
    name: '我的收藏',
    icon: 'collect',
    url: '/pages/center/moeCollect/moeCollect',
    role: 0

  },
  {
    name: '联系客服',
    icon: 'service',
    url: '',
    role: 0
    
  },

]

const advanceService = [
  {
    name: '业绩收入',
    icon: 'income',
    url: '/pages/member/income/income',
    role: 1

  },
  {
    name: '我的好友',
    icon: 'fans',
    url: '/pages/center/myPartner/myPartner',
    role: 0
  },
  {
    name: '商家入驻',
    icon: 'merchant',
    url: '/pages/center/merchantRegister/merchant',
    role: 0

  },
  {
    name: '邀请好友',
    icon: 'invite',
    url: '/pages/member/invite/invite',
    role: 0

  }
]

module.exports = {
  basicService,
  advanceService
}