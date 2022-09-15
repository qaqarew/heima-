<template>
<!-- d1-先创建路由 -->
  <div>
    <!-- -引入动画跳转组件transition -->
    <!-- <transition name="van-slide-left" mode="out-in">
        <router-view></router-view>
    </transition> -->
    <!-- d2-引入search搜索框 -->
<form action="/">
    <van-search
    class="search"
  v-model="keywords"
  background="#3296fa"
  placeholder="请输入搜索关键词"
  show-action
  @search ="onSearch"
  @focus="isShowSearchResults=false"
  @cancel ="$router.push('/')"
/>
<!-- d5-2-5@cancel ="$router.push('/')"点击取消跳转到首页 -->
</form>
<!-- d3-创建components文件夹，在里面创建三个组件 -->
<!-- <search-history></search-history>
<search-suggestion></search-suggestion>
<search-result></search-result> 改成 <component is=""></component>动态组件 -->
<!-- d3-2-在component创建函数 componentName-->
<!-- d4-1-3-将 :keywords="keywords"传给建议组件-->
<component :is="componentName" :keywords="keywords"  @change-keywords="onSearch" ></component>
  </div>
</template>

<script>
// d3-1-引入子组件
import SearchHistory from './components/SearchHistory.vue';
import SearchResult from './components/SearchResult.vue';
import SearchSuggestion from './components/SearchSuggestion.vue';


import {mapMutations,mapState} from 'vuex'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResult },
data() {
    return {
      keywords: '',
      isShowSearchResults: false,
    };
},


computed:{
    ...mapState(['histories']),
// d3-2-1-判断搜索框的状态
    componentName(){
        if(this.keywords === ''){
            return 'SearchHistory'
        }
        if(this.isShowSearchResults){
            return 'SearchResult'
        }
        return 'SearchSuggestion'
    }
},
methods:{
    ...mapMutations(['SET_HISTORIES']),
    // d3-2-2-给搜索框绑定点击事件，点击isShowSearchResults为true，为true时显示结果
    onSearch(keywords){
        //去重，1.获取没有去重的数组 2.放在new Set（arr） 3.[..set]
        const distinctHistories = [...new Set([keywords,...this.histories])]
        this.SET_HISTORIES(distinctHistories)
        this.keywords = keywords
        this.isShowSearchResults =true
    }
}
}
</script>

<style scoped lang="less">
// d2-1-设置样式
.search{
    [role='button']{
        color: #fff;
    }
}

</style>