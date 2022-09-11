import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
//封装本地存储
//1.下载  yarn add vuex-persistedstate@3.2.1
//2.引入 import createPersistedState from 'vuex-persistedstate'
//3.调用    plugins:[createPersistedState()],
//封装
//4.配置项
//key：默认值是vuex
//reducer:函数，指定持久化那些数据return一个对象，对象就作为存储的value
// storage：存储的方式，默认值是本地存储
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "HEIMA_TOUTIAO",
      reducer({ tokenObj }) {
        return { tokenObj };
      },
    }),
  ],
  state: {
    tokenObj: {},
  },
  getters: {
    isLogin(state){
      // b2.1取反获得布尔值，第一个返回false，
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      //将toke存在vuex
      state.tokenObj = token;
    },
  },
});
