<template>
<!-- d6- -->
  <div>
    <!-- 搜索历史标题 -->
    <!-- d6-1-引入van-cell， -->
<van-cell title="搜索历史">
  <template #extra>
    <van-icon name="delete-o" v-if="!isEdit" @click="isEdit =true"/>
<div v-else>
  <!-- 添加点击删除事件：@click="$store.commit('SET_HISTORIES',[]) -->
  <span @click="$store.commit('SET_HISTORIES',[])">全部删除</span>&nbsp;
  <span @click="isEdit =false">完成</span>
</div>
  </template>
</van-cell>
    <!-- 搜索历史 -->
<van-cell 
v-for="item in histories" 
:key="item" 
:title="item"
@click="!isEdit && $emit('change-keywords',item)"
>
  <template #extra>
    <!-- 绑定点击事件单个删除 -->
    <van-icon
     name="close"
     v-show="isEdit"
     @click=" $store.commit('SET_HISTORIES',histories.filter((i)=>item !==i))"
      />
  </template>
</van-cell>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
data(){
  return{
    isEdit:false,
  }
},
computed:{
  ...mapState(['histories'])
}
}
</script>

<style>

</style>