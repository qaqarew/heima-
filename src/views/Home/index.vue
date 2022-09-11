<template>
  <div>
    <!-- c1-头部搜索框 -->
    <van-nav-bar class="navbar">
      <template #title>

      <van-button icon="search" size="small" round block>搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- c2-引入标签tab active:高亮的tab索引-->
    <van-tabs v-model="active" swipeable>
<!-- c4-6-插入后台信息 -->
  <van-tab v-for="item in channels" :key="item.id" :title="item.name">
    <!-- c5-2-引入文章详情组件 -->
<article-list :id="item.id"></article-list>
  </van-tab>

  <!-- c2-3-引入图标 -->
  <span class="toutiao toutiao-gengduo"></span>
</van-tabs>
  </div>
</template>

<script>
// c4-2-引入接口文档
import {getChannelAPI} from "@/api"
// c5-先去一个compon文件夹，创建文章详情的组件，然后引入
import ArticleList from './components/ArticleList.vue'
export default {
  components:{
    // c5-1
    ArticleList
  },
data() {
    return {
      // c2-1-active:高亮的tab索引
      active: 0,
      // c4-4-创建一个空数组获取数据
      channels:[]
    };
  },
  created(){
    // c4-3-1运行getChannel（）
this.getChannel()
  },

  //1.?? ==>相当于&&，常用于语句
  //2.?. ==> 可选链操作符，？前面是undifined，那么不会往后取值
  methods:{
    // c4-3-解构获取到的数据
    async getChannel(){
    try {
       const {data} = await getChannelAPI()
     this.channels =data.data.channels
    } catch (error) {
      // c4-5-判断：js的错误反馈给程序员。axios：507错误，提示用户刷新
      if(!error.response){
        throw error
      } else {
        const status =error.response.status
        status === 507&&this.fail('服务端异常，请刷新')
      }
    }
    }
  }
}
</script>

<style scoped lang="less"> 
// c1-1- 头部搜索样式
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}

/* c-3-tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}
/* c-3-1字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

</style>