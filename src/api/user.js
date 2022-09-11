import request from "@/utils/request";
// import store  from "@/store";

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
/**
 * 获取用户信息
 * @returns  Promise
 */
//b7-获取用户信息，this.$store用不了需要重新引入store,
export const getUserInfoAPI= ()=>{
  return request({
    url: '/v1_0/user',
    // headers :{
    //   //Authorization接口名称
    //   Authorization:`Bearer ${store.state.tokenObj.token}`
    // }
  })
}
