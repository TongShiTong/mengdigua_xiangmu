import request from "../utils/request";

export default {
  getCode: function(phone, type) {
    return request.post("member/user-api/send-sms", {
      phone: phone,
      type: type,
    });
  },

  register: function(phone, code, recommend_id, scenario) {
    return request.post("member/user-api/login", {
      phone: phone,
      code: code,
      recommend_id: recommend_id,
      scenario: scenario,
    });
  },

  getItem: function(item_id) {
    return request.post("item/me-item-api/view", {
      item_id: item_id,
    });
  },

  getRecentRegisters() {
    return request.post("member/user-api/create-desc", {});
  },

  getInvitations: function() {
    return request.post("member/user-api/invitations", {});
  },

  getCoupons: function(item_id, scenario, type) {
    return request.post("coupon/coupon-templet-api/item-index", {
      item_id: item_id,
      scenario: scenario,
      type: type,
    });
  },

  receiveCoupon: function(ctid) {
    return request.post("coupon/coupon-templet-api/receive", {
      ctid: ctid,
    });
  },

  getEventTimes: function() {
    return request.post("/member/user-api/test-time-list", {});
  },

  getRuleContent: function(id) {
    return request.post("floor/floor-content-api/get-content", {
      id: id,
    });
  },

  wxShare: function(url) {
    return request.post("member/user-api/wx-share", {
      url: url,
    });
  },
  // 二次验证
  secVerification: function(val,phone) {
    return request.post("/member/action/second-validate", {
      geetest_challenge: val.geetest_challenge,
      geetest_validate: val.geetest_validate,
      geetest_seccode: val.geetest_seccode,
      phone: phone
    });
  },
};
