<template>
  <div class="result">
    <!-- d5-2-用van-list包裹van-cell，下拉刷新 -->
    <!-- d5-2-4- 给list绑定finished属性：:finished ="finished" ，finished-text="没有更多了"-->
    <!-- d5-2-5-1-绑定重新发起请求属性，:error.sync="error"，error-text="请求失败，重新刷新" -->
   <van-list 
   v-model ="loading"
    @load="getResults"
    :finished ="finished"
    finished-text="没有更多了"

    :error.sync="error"
    error-text="请求失败，重新刷新"
    >
    <!-- d5-引入van-cell -->
    <!-- d5-4-点击文章跳转 ：
    @click="$router.push({path:'/detail',query:{articleId:item.art_id}})" -->
     <van-cell
     v-for="item in results"
     :key="item.art_id"
    :title="item.title"
    @click="$router.push({
      path:'/detail',
      query:{
        articleId:item.art_id
      }
    })"
    ></van-cell>
   </van-list>
  </div>
</template>

<script>
// d5-1-去api创建获取数据接口，然后引入
import  {getResultsAPI} from "@/api"
export default {
data(){
  return{
    loading:false,
    // d5-2-1-1:page:1, perPage:10,results:[]
    page:1,
    perPage:10,
    results:[],
    finished:false,
    error:false,

  }
},
// d5-2-1-请求参数
props:{
  keywords:{
    type:String,
    require:true,
  }
},
methods:{
  // d5-2-2-解构获取到的结果数据
async getResults(){
  // d5-2-5-绑定try-catch，判断错误重新刷新
try {
  // if(Math.random()<0.5){
  //   throw new Error()
  // } 测试代码
    // 1.发送请求数据，解构得到的数据
const {data} =  await getResultsAPI(
    this.page++,
    this.perPage,
    this.keywords
  )
  // d5-2-3-判断获取到的数据是否为零，为零时finished =true
  const results =data.data.results
  if(results.length ===0){
    this.finished =true
  }
// 2.保存数据：this.results.push(data.data.results)
  this.results =  [...this.results,...data.data.results]
} catch (error) {
  this.error =true
}
//3. 关闭loading
  this.loading = false
}
}
}
</script>

<style scoped lang="less">
// d5-3-绑定滚动条，先给大盒子来个类名
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}

</style>