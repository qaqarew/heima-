import request from "@/utils/request";

/**
 *
 * @param {String} mobile 手机号
 * @param {Number} code  验证码
 * @returns
 */
export const login = (mobile, code) => {
  return request({
    url: "/v1_0/authorizations",
    method: "POST",
    data: {
      mobile,
      code,
    },
  });
};
/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns  Promise
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
