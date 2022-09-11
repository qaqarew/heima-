<template>
  <div>

<!-- 没有图片新闻 -->
<!-- c-6-3-引入时判断图片 -->
<van-cell v-if="article.cover.type ===0" :title="article.title"
:label="label"></van-cell>
<!-- 一张图片 -->
<van-cell v-else-if="article.cover.type ===1" :title="article.title" :label="label">
    <van-image width="100%" height="100%" :src="article.cover.images[0]" />
</van-cell>

<!-- 三张图片 -->
<van-cell v-else-if="article.cover.type ===3" :title="article.title">
    <template #label>
        <van-image v-for="(item,index) in article.cover.images"
        :key="index"
        width="100"
        height="100"
        :src="item"/>
    </template>
</van-cell>


  </div>
</template>

<script>
export default {
    // c-6-2-子父传值
props:{
    article:{
        type:Object,
        default:()=>({})
    }
},
computed:{
   
    label (){
        const {aut_name ,comm_count ,pubdate} =this.article
        return `${aut_name}${comm_count}评论${pubdate}`
    }
}

}
</script>

<style>

</style>