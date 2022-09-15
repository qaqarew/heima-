<template>
  <div>
    <!-- c1-头部搜索框 -->
    <van-nav-bar class="navbar">
      <template #title>
<!-- d2-绑定点击事件，跳转到search页面 -->
      <van-button icon="search" size="small" round block
      @click="$router.push('/search')"
      >搜索</van-button>
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
  <span class="toutiao toutiao-gengduo" @click="isShow=true "></span>
</van-tabs>

<!-- c11-弹出层,引入popup组件 设置高度百分百 c11-2-引入closeable-->
<van-popup v-model="isShow" closeable close-icon-position="top-left"
 position="bottom" :style="{height:'100%'}">
 <!-- c12-4-父子传值，把数据传给ChannelEdit -->
 <!-- c14-2  @change-active="[(isShow=false),(active =$event)]父子传值-->
 <!-- c14-3-@del-channel ="delChannel" 绑定点击事件，删除功能 -->
 <!-- c14-4-@add-channel="addChannel" 绑定点击事件，添加功能 -->
 <!-- c17-最后添加 v-if="isShow" -->
 <channel-edit 
 v-if="isShow"
 @change-active="[(isShow=false),(active =$event)]"
 :my-channels="channels"
 @del-channel ="delChannel"
 @add-channel="addChannel"
 ></channel-edit>
 </van-popup>
  </div>
</template>

<script>
// c4-2-引入所有频道接口文档
import {getChannelAPI} from "@/api"
// c5-先去一个compon文件夹，创建文章详情的组件，然后引入
import ArticleList from './components/ArticleList.vue'
//c11-3-引入组件
import ChannelEdit from './components/ChannelEdit.vue'
// c14-3-2-引入删除接口api
import {delChannelAPI} from '@/api'
// c14-4-2
import {addChannelAPI} from '@/api'
// c15-引入mapGetters判断用户是否登入
import {mapGetters,mapMutations} from 'vuex'
// c15-4-引入mapMutations 方法


export default {
  components:{
    // c5-1
    ArticleList,
    ChannelEdit
  },
  // c15-1-创建component
  computed:{
    ...mapGetters(['isLogin'])
  },
  
data() {
    return {
      // c2-1-active:高亮的tab索引
      active: 0,
      // c4-4-创建一个空数组获取数据
      channels:[],
  // c11-1-
      isShow:false,
    };
  },
  created(){
    // c4-3-1运行getChannel（）
      // this.getChannel()
      this.initChannels()
  },

  //1.?? ==>相当于&&，常用于语句
  //2.?. ==> 可选链操作符，？前面是undifined，那么不会往后取值
  methods:{
    // C15-4-1-解构获取到的mapMutations
     ...mapMutations(['SET_MY_CHANNELS']),
// c16-判断是否登入
     initChannels(){
      // c16-1-如果登入了，channels发起请求获取自己的用户频道
      if(this.isLogin){
        this.getChannel()
      }else{
        // c16-2未登入，1：频道本地存储有没有数据，有直接运行本地存储，没有就发送请求获取默认数据
        //c16-2- 创建一个本地数据myChannels，然后判断他的长度
        const myChannels= this.$store.state.myChannels
        if(myChannels.length===0){
          this.getChannel()
        }else{
          this.channels = myChannels
        }
      }
     },
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
    },
    // c14-3-1-用filter来实现点击删除事件，从子组件传id过来
    async delChannel(id){
     
      try {
        // c15-4-2-创建newChannels，删除频道
        const newChannels =this.channels.filter((item)=>item.id !==id)
        // c15-2-判断用户是否登入，未登入就存储在本地
       if(this.isLogin){
         // 1.发送请求删除频道,引入删除api接口
         await delChannelAPI(id)
       }else{
        // c15-4-3-把我的频道存储在本地
          this.SET_MY_CHANNELS(newChannels)
       }
         // 2.视图层删除频道
      // this.channels =this.channels.filter((item)=>item.id !==id)
      this.channels = newChannels
        this.$toast.success('删除频道成功')
      } catch (error) {
        if(error.response && error.response.status ===401){
          this.$toast.fail('请登入再删除')
        }else{
          throw error
        }
      }
    },
    // c14-4-1-点击添加到我的频道
    async addChannel(channel){
      
     try {
        // c15-2-判断用户是否登入，未登入就存储在本地
     if(this.isLogin){
        // 1.发送请求添加频道
       await addChannelAPI(channel.id, this.channels.length)
     }else{
// c15-4-4-把我的频道存储在本地
this.SET_MY_CHANNELS([...this.channels,channel])
     }
      // 2.视图层添加频道
      this.channels.push(channel)

      this.$toast.success('添加频道成功')
     } catch (error) {
       if(error.response && error.response.status ===401){
          this.$toast.fail('请登入再删除')
        }else{
          throw error
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