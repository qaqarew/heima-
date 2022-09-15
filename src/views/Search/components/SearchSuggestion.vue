<template>
  <div>
    <!-- d4-引入van-cell组件 -->
    <!-- d4-1-6-渲染得到的值 -->
    <van-cell v-for="(item,index) in highLightSuggestions" 
    :key="index" 
    icon="search"
    @click="$emit('change-keywords',suggestions[index])"
    >
    <!-- d4-1-7-1-渲染 -->
    <template #title>
<span v-html="item"></span>
    </template>
    
    </van-cell>
  </div>
</template>

<script>
// map:返回新数组，长度和原数组一致，函数的返回值新数组那一项的值
//动态正则：/Anglar/ig 字面量形式的正则；new RegExp(字符串，修饰符ig)
//字符串的replace：字符串(正则，函数)
//这个函数参数match，匹配上的结果，函数的返回值作为替换的结果


// d4-1-1-引入关键词接口
import {getSuggestionsAPI} from "@/api"
// d4-1-7-下载lodash 降低抖动
import {debounce} from "lodash"
export default {
    data(){
        return{
            suggestions:[]
        }
    },
    // d4-1-3-1-从index传值过来
props:{
    keywords:{
        type: String,
        required: true,
    }
},
// d4-1-4-监听getSuggestions是否发生变化
watch:{
keywords:{
    immediate:true,
    handler:'getSuggestions'
}
},
computed:{
    // d4-1-7-搜索关键词颜色高亮
highLightSuggestions(){
    const reg = new RegExp(this.keywords,'ig')

    return this.suggestions.map((str)=>{
        return str.replace(reg,
        (match)=>`<span style ="color:red">${match}</span>`)
    })
}
},
methods:{
    // d4-1-2-结果获取来的getSuggestionsAPI，获取里面的值
    // d4-1-6-1-用debounce（）包裹起来
   getSuggestions:debounce(async function (){
 try {
        const {data} =  await getSuggestionsAPI(this.keywords)

    //  this.suggestions =data.data.options.filter((item)=>Boolean(item))
// d4-1-5-filter过滤得到的函数
     this.suggestions =data.data.options.filter(Boolean)
 } catch (error) {
    if(error.response){
        this.$toast.fail('获取搜索建议失败')
    }else{
        throw error
    }
 }
    },300) 
}
}
</script>

<style>

</style>