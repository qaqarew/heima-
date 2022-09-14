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
// storage：存储的方式，默认值是本地存储1
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "HEIMA_TOUTIAO",
      // c15-3-2-把myChannels传入
      reducer({ tokenObj,myChannels }) {
        return { tokenObj ,myChannels};
      },
    }),
  ],
  state: {
    tokenObj: {},
    // c15-3-创建一个空数组
    myChannels:[]
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
    /**
     * 
     * @param {Array} channels 删除或者
     */
    // c15-3-1创建SET_MY_CHANNELS
    SET_MY_CHANNELS(state,channels){
      state.myChannels=channels
    }
  },
});
