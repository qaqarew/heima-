<template>
  <div>
    <!-- a2.创建二级路由文件夹-->
    <!-- a2.3映入二级路由router-view -->
    <router-view></router-view>
    <!-- a1.引入底部导航区 。 -->
    <!-- a1.2给底部添加class绑定css样式 -->
    <van-tabbar v-model="active" class="tabbar" route>
     <!-- a2.4 绑定to属性 ；然后绑定route拿item的to属性和当前的path对比，一样的话就高亮-->
  <van-tabbar-item to="/ ">
    <!-- a1.1.引入插槽#icon，自定义图标图标 -->
    <template #icon>
        <span class="toutiao toutiao-shouye"></span>
        <span class="text">首页</span>
    </template>
  </van-tabbar-item>
  <van-tabbar-item  to="/video">
    <template #icon>
         <span class="toutiao toutiao-shipin"></span>
        <span class="text">视频</span>
    </template>
  </van-tabbar-item>
  <van-tabbar-item  to="/qa">
    <template #icon>
         <span class="toutiao toutiao-wenda"></span>
        <span class="text">问答</span>
    </template>
  </van-tabbar-item>
  <van-tabbar-item to="/profile">
    <template #icon>
         <span class="toutiao toutiao-wode"></span>
         <!-- b3.1.绑定跳转 -->
        <span class="text">{{isLogin ?'我的':'未登录'}}</span>
    </template>
  </van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
//b3.引入mapGetters，绑定
import {mapGetters} from 'vuex'
export default {
 data() {
    return {
      active: 0,
    };
  },
  computed:{
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang='less'>
   
   :deep( .tabbar){
    .van-tabbar-item__icon{
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
        }
        .toutiao{
            font-size: 40px;
        }
        .text{
            font-size: 30px;
        }
    }
</style>