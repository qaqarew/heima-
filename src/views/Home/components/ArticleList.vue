<template>
<!-- c7-给盒子固定滚动条 -->
  <div class="article">
  <!-- c9-在list外面包裹 van-pull-refresh，下拉刷新-->
   <van-pull-refresh v-model ="refreshLoading" @refresh ="getNextPageArticle"> 
      <!-- c8- 添加list滚动条获取新数据，offset滚动条距离底部多少时触发load，immediate-check关闭刷新默认获取新数据-->
<!-- c8-2-绑定model属性：loading -->
     <van-list 
    v-model="loading" 
    @load="getNextPageArticle" 
    offset="100" 
    :immediate-check="false"
    :finished="finished"
    :error.sync ="error"
    error-text="请求失败，点击重新加载"
    finished-text="没有更多了"
    >
       <!-- c-6-1-:article = "item" -->
    <articleltem v-for="item in articles" :key="item.artid"
    :article = "item"
    >
    </articleltem>
    </van-list>
   </van-pull-refresh>
  </div>
</template>

<script>
// c5-2-引入获取新闻接口，去api新建js接口文件夹
import {getArticles} from '@/api'
// c6-新建一个新闻组件Articleltem，然后引入
import Articleltem from './Articleltem.vue'
export default {
  // c5-3-
  props:{
    id:[String,Number]
  },
  // c5-4-1
  data(){
    return{
      articles:[],
      // c8-2-1-loading为flase时触发load事件
      loading:false,
      preTimestamp:'',
      finished:false,
      // c8-5-1
      error:false,
// c9-1-refreshLoading绑定false
      refreshLoading:false
    }
  },
  // c6-1
  components:{Articleltem},
  created(){
    this.getFirstPageArticle()
  },
methods:{
  // c5-4-
  async getFirstPageArticle(){
    try {
      const {data} = await getArticles(this.id,+new Date())
   this.articles = data.data.results
  //  c8-3-保存下一页的时间戳，用于分页
   this.preTimestamp = data.data.pre_timestamp
    } catch (error) {
      const status =error.response?.status
      if(!error.response||status ===507){
        throw error
      }else{
        if(status ===400){
          throw new Error(error.response.data.message)
        }
      }
    }
  },
  // c8-1封装获取新数据函数
  async getNextPageArticle(){
    // c8-5-新增try/catch语句判断错误
 try {
  // c8-6-测试错误
  // if(Math.random()<0.5){
  //   throw new Error()
  // }
  
   // c8-1-01- 发送请求
 const {data} = await getArticles(this.id,this.preTimestamp)
//  c8-4-判断数据是否还有
 if(!data.data.pre_timestamp){
  this.finished =true
 }
// c9-2-如果下滑加载，将数据放在最后， 如果是下拉刷新，数据放在最前面
 if(this.refreshLoading){
  this.articles.unshift(...data.data.results)
 }else{
  this.articles.push(...data.data.results)
 }
 // c8-1-02.添加到articles
// this.articles.push(...data.data.results)
//c8-1-03.更新时间戳
this.preTimestamp =data.data.pre_timestamp
// c8-1-04.更改loading运行getNextPageArticle时改为false
// this.loading =false
 } catch (error) {
  // 错误进行处理
  this.error =true
 }finally{
// .更改loading运行getNextPageArticle时改为false
this.loading =false

this.refreshLoading =false
 }


  }
}
}
</script>

<style scoped lang="less">
// c-7-1-总高度减去上下的距离
.article{
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
}

</style>