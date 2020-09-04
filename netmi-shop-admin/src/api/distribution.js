import request from '@/utils/request'

// 推手列表
export function pushList(data) {
  return request({
    url: '/handConfig/hand-config-api/index',
    method: 'post',
    data
  })
}
// 获取分红配置
export function getDividend(data) {
  return request({
    url: '/handConfig/config-api/commission-config',
    method: 'post',
    data
  })
}

// 分红奖励名称
export function rewardName(data) {
  return request({
    url: '/handConfig/config-api/set-name-list',
    method: 'post',
    data
  })
}

// 分红模式
export function dividendMode(data) {
  return request({
    url: '/handConfig/config-api/set-mode',
    method: 'post',
    data
  })
}

// 设置分红权益
export function dividendInterest(data) {
  return request({
    url: '/handConfig/config-api/set-data',
    method: 'post',
    data
  })
}

// 获取分佣配置
export function getConfiguration(data) {
  return request({
    url: '/handConfig/config-api/divider-config',
    method: 'post',
    data
  })
}
// 设置分佣模式
export function setMode(data) {
  return request({
    url: '/handConfig/config-api/set-divider-mode',
    method: 'post',
    data
  })
}
// 设置分佣奖励名称
export function setName(data) {
  return request({
    url: '/handConfig/config-api/set-divider-name-list',
    method: 'post',
    data
  })
}
// 设置分佣权益
export function setRight(data) {
  return request({
    url: '/handConfig/config-api/set-divider-data',
    method: 'post',
    data
  })
}
// 推手创建
export function handCreate(data) {
  return request({
    url: '/handConfig/hand-config-api/create',
    method: 'post',
    data
  })
}
// 推手更新
export function handUpdate(data) {
  return request({
    url: '/handConfig/hand-config-api/update',
    method: 'post',
    data
  })
}
// 推手删除
export function handDelete(data) {
  return request({
    url: '/handConfig/hand-config-api/delete',
    method: 'post',
    data
  })
}
// 升级规则
export function updateRule(data) {
  return request({
    url: '/handUpdate/hand-update-level-api/get-update-rules',
    method: 'post',
    data
  })
}
// 保存规则接口
export function saveUpdateRule(data) {
  return request({
    url: '/handUpdate/hand-update-level-api/save-rule',
    method: 'post',
    data
  })
}
// 获取礼包设置
export function giftSetting(data) {
  return request({
    url: '/handUpdate/hand-update-level-api/get-conf',
    method: 'post',
    data
  })
}
// 保存礼包设置
export function saveGiftSetting(data) {
  return request({
    url: '/handUpdate/hand-update-level-api/save-conf',
    method: 'post',
    data
  })
}
