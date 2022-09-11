<template>
  <div>
     <!-- c-6-1-:article = "item" -->
    <articleltem v-for="item in articles" :key="item.artid"
    :article = "item"
    >

    </articleltem>
  </div>
</template>

<script>
// c5-1-引入获取新闻接口，去api新建js接口文件夹
import {getArticles} from '@/api'
// c6-新建一个新闻组件Articleltem，然后引入
import Articleltem from './Articleltem.vue'
export default {
  // c5-2-
  props:{
    id:[String,Number]
  },
  // c5-3-1
  data(){
    return{
      articles:[]
    }
  },
  // c6-1
  components:{Articleltem},
  created(){
    this.getFirstPageArticle()
  },
methods:{
  // c5-3-
  async getFirstPageArticle(){
    try {
      const {data} = await getArticles(this.id,+new Date())
   this.articles = data.data.results
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
  }
}
}
</script>

<style>

</style>