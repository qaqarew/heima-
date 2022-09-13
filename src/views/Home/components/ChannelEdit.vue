<template>
  <div class="channel-edit">
    <!-- c12-引入van-cell，编辑模块 -->
    <!-- c12-3-1-绑定点击按钮，点击后取反， -->
    <van-cell title="我的频道">
        <van-button
        class="btn"
        size="mini"
        round
        style="color:red;border-color:red"
        @click="isEdit =!isEdit"
        >{{isEdit ?'完成':'编辑'}}</van-button>
    </van-cell>
    <!-- c12-2-引入九宫格布局频道，设置样式 -->
<div class="my-pannel">
   <van-grid gutter="10" :border="false">
    <!-- c12-3-2-给icon设置点击取反 -->
    <!-- c12-4-2引入数据 -->
  <van-grid-item 
  v-for="(item,index) in myChannels" 
  :class="{active:item.name==='推荐'}" 
  :key="item.id" 
  :icon="isEdit&&item.name!=='推荐'  ? 'cross':''" 
  :text="item.name" 
  @click="handleMyChannel(item,index)"/>
 
 
</van-grid>
</div>
    <!-- c12-推荐频道 -->
    <!-- 标题 -->
    <van-cell title="推荐频道"></van-cell>
    <!-- c12-3-引入九宫格布局频道，设置样式 -->
    <div  class="recommend-pannel">
   <van-grid gutter="10" :border="false">
  <van-grid-item 
  v-for="item in recommendChannels" 
  :key="item.id" 
  icon="plus" 
  :text="item.name"/>

 
 
</van-grid>
</div>
  </div>
</template>

<script>
// c13-创建获取全部频道的请求，
import {getAllChannelsAPI} from "@/api/channel"
export default {
    name:'ChannelEdit',
    // c12-4-1从Home的index传入myChannels
    props:{
        myChannels:Array
    },
data(){
    return{
        isEdit:false,
        allChannels:[]
    }
},
created(){
    // c13-3-运行getAllChannels
    this.getAllChannels()
},
methods:{
    // c13-2-解构获取到的全部频道的值
   async getAllChannels(){
      const {data} =  await getAllChannelsAPI()
      this.allChannels =data.data.channels
    },
    // c14-编辑的时候点击删除，完成的时候点击跳转，先在上面绑定点击事件
    handleMyChannel({name},index){
        if(this.isEdit &&name !=='推荐'){
            console.log('删除频道',name);
        }else{
            // c14-1-获取父亲传过来的值绑定，v-for上面绑定index定义
            this.$emit('change-active',index)
        }
    }

},
computed:{
    // c13-4-创建全部频道函数
recommendChannels(){
    return this.allChannels.filter((allChannelItem)=>{
        return !this.myChannels.find(
            (myChannelItem)=>myChannelItem.id ===allChannelItem.id
        )
    })
}
}
}
</script>

<style scoped lang ="less">
/* c12-1-给盒子设置样式 */
.channel-edit{
    padding-top: 92px;
}
:deep(.btn){
    width: 100px;
    font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
/* // 我的频道 */
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  /* // 关闭按钮样式 */
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
/* // 推荐频道 */
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
:deep(.active){
    .van-grid-item__text{
        color: red;
    }
}
</style>