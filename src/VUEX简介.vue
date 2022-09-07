<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{count}}</h1>
    <h3>count十倍的数字：{{bigNum}}</h3>
    <button @click="SET_COUNT(5)">点击+1</button>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations} from "vuex"
export default {
  methods:{
   
      ...mapMutations(['SET_COUNT'])
   
  },
  computed:{
   ...mapState(['count']),
   ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped>

</style>
