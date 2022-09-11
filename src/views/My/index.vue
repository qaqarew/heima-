<template>
  <div class="profile">
    <!-- b1.创建页面结构，头部--主体--底部 -->
    <!-- 头部 -->
    <header>
      <!-- 登录的结构 -->
      <!-- b2.绑定if/else 属性，判断是否登录 先去store的vuex绑定判断函数-->
      <div class="login banner" v-if="isLogin">
        <!-- b4 给登入页面插入layout布局 -->
        <van-row></van-row>
        <!-- b4.2.用van-col按需分配，从左到右 -->
        <van-row>
          <van-col span="12">
            <!-- b4.3给图片，手机号单独添加van-row，用flex布局平分空间，侧轴居中 -->
         <van-row style="height:100%" type="flex" justify="space-around" align="center" >
             <van-image
            round
            width="1.5rem"
            height="1.5rem"
            :src="userInfo.photo"/>
          <span class="mobile">{{userInfo.name}}</span>
         </van-row>
          </van-col>

          <van-col span="7"></van-col>

          <van-col span="5">
            <!-- b4.4-给按钮添加van-row开启flex布局设置行内高百分百 -->
           <van-row type="flex" justify ="center" align ="center" style="height:100%"  >
            <!-- b4.4.1-给按钮添加class设置高宽，字体颜色 -->
             <van-button round size="mini" class="edit-btn">编辑按钮</van-button>
           </van-row>
          </van-col>

        </van-row>
        <van-row>
          <!-- b4.5-引入van-grid-item布局 -->
          <van-grid class="grid" :border="false">
  <van-grid-item  text="头条" >
    <template #icon>{{userInfo.art_count}}</template>
    </van-grid-item>
  <van-grid-item  text="粉丝" >
    <template #icon>{{userInfo.fans_count}}</template>
    </van-grid-item>
  <van-grid-item  text="关注" >
    <template #icon>{{userInfo.follow_count}}</template>
    </van-grid-item>
  <van-grid-item  text="获赞" >
    <template #icon>{{userInfo.like_count}}</template>
    </van-grid-item>
</van-grid>
        </van-row>
      </div>
      <!-- 未登入的结构 -->
      <!-- b6-2-添加跳转链接 -->
      <div class="logout banner" v-else @click="$router.push('/login')" >
        <!-- b3.1.引入背景图片 -->
        <van-image
  width="1.76rem"
  height="1.76rem"
  :src="mobileSrc"
/> <span class="text">登录/注册</span>
      </div>
    </header>



    <!-- 主体 -->
    <!-- b4-6  clickable点击反馈-->
    <main>
      <van-grid column-num="2" clickable>
  <van-grid-item text="收藏">
    <template #icon>
      <span class="toutiao toutiao-shoucang"></span>
    </template>
  </van-grid-item>
  <van-grid-item text="历史">
    <template #icon>
      <span class="toutiao toutiao-lishi"></span>
    </template>
  </van-grid-item>
</van-grid>
<!-- b4-7 -->
<van-cell title="消息通知" is-link />
<van-cell title="小爱同学" is-link />
</main>



    <!-- 底部 -->
    <footer>
      <!-- b2.3.绑定点击事件，退出登入 block添加块级元素-->
      <!-- <van-button block style="color:red" v-if="isLogin" @click="$store.commit('SET_TOKEN',{})">退出</van-button> -->
      <!-- b6.设置弹窗，确认是否退出 -->
      <van-button block style="color:red" v-if="isLogin" @click="logout">退出</van-button>

    </footer>
  </div>
</template>

<script>
//b2.2. 引入vuex的mapGetters
import {mapGetters} from 'vuex'
import mobileSrc from '@/assets/images/mobile.png'
import {getUserInfoAPI} from '@/api'
export default {
  data(){
    return{
      mobileSrc,
      //b8-1 运行userInfo `
      userInfo:{}
    }
  },
  created(){
    //b7-4-运行getUserInfo函数
this.getUserInfo()
  },
// b6-1-设置函数
  methods:{
async logout(){
  await this.$dialog.confirm({
    title:'黑马头条',
    message:'是否退出该账户'
  })
  this.$store.commit('SET_TOKEN',{})
},
// b7-1-获取用户信息,引入封装函数
async getUserInfo(){
  try {
    // b7-2-判断是否登入，没登入直接return出去
    if(!this.isLogin) return
    // 解构获取到的数据
  const {data} = await getUserInfoAPI()
  //b8-解构获取到的数据，然后将数据绑定到对应的位置，userInfo.***
  this.userInfo =data.data
  } catch (error) {
    // b-7-3 判断登入是否正确：error
    // 1.js导致的 2.axios导致的
    // js和400，507给程序员提示，401给用户提示重新登入
    if(error.response && error.response.status ===401){
      this.$toast.fail('用户认证失败，请重新登录')
    }else{
      throw error
    }
  }
}
  },
  // b2.2.1.---
computed:{
  ...mapGetters(['isLogin'])
}
}
</script>

// b3.给头部创建css样式
<style scoped lang="less">
// b5给外盒子添加背景色
.profile{
  height: 100vh;
  background-color: #f3f3f3;
  // b5-1-添加边距
  .link{
    margin: 10px;
  }
  // b5-2-设置icon字体大小
  .toutiao{
    font-size: 40px;
  }
  //b5-3- 图片颜色
  .toutiao-shoucang{
    color: red;
  }
  .toutiao-lishi{
    color: orange;
  }

}
.banner{
  width: 100%;
  height: 5.33rem;
  //b3.1.引入图片，给图片设置不重复no-repeat，0 0 x,y轴起点，/cover ：background-size: cover缩写
  background: url('../../assets/images/banner.png') no-repeat 0 0 /cover;
  // background-size: cover;
}
// b3.2给背景图片添加flex布局
.logout{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text{
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
// b4.1. 给登入页面开启flex布局
.login{
  display: flex;
  // flex-direction: column主轴改成列
 flex-direction: column;
  > .van-row{
    flex: 1;
  }
  // b4.3.1-给手机号绑定样式
  .mobile{
    font-size: 30px;
    color: #fff;
  }
  // b4.4-设置按钮css样式
  .van-col{
    height: 100%;
  }
  .edit-btn{
    width: 1.6rem;
    height: 0.4266rem;
    color: #666;
  }
  // b4.5-1-给girt添加css样式
  :deep(.grid){
    .van-grid-item__content{
   background-color: inherit;
      color: #fff;

      font-size: 30px;
    }
    .van-grid-item__text{
      color: #fff;
    }
  }
}
</style>