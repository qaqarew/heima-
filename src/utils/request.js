import axios from "axios";
// axios.defaults.baseURL = "http://toutiao.itheima.net";
// axios.defaults.timeout = 5000;
import store from '@/store'

const request = axios.create({
  baseURL: "http://toutiao.itheima.net",
  timeout: 5000,
});


//b8-2 每次请求都带请求头
// 请求拦截器interceptors
//config是每一次请求的配置对象；必须返回config
request.interceptors.request.use(
  function(config){
//每一次发请求都会执行，在发送请求之前做些什么
// 登入了，所有请求都加上Authorization
    const {
      getters:{isLogin},
      state:{tokenObj}
    } =store
    if(isLogin){
      config.headers.Authorization =`Bearer ${tokenObj.token}`
    }
    return config
  }
)
export default request;
