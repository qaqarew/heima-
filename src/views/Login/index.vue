<template>
  <div>
    <van-nav-bar title="登入" class="nav-bar" />
    <van-form @submit="onSubmit" class="from" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
      <template #label>
        <span class="toutiao toutiao-shouji"></span>
      </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"

      >
        <template #label>
        <span class="toutiao toutiao-yanzhengma"></span>
      </template>
      <template #button>
         <van-button 
         class="btn"
         round 
         type="default" 
         size="small"
         native-type="button"
         v-if="isShowCodeBtn"
         @click="sendCode"
          >获取验证码</van-button>
          <van-count-down :time="3*1000" 
          v-else
          format="ss秒"
          @finish="isShowCodeBtn =true"
          />
      </template>
      </van-field>
      <div style="margin: 16px">
        <van-button  block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {login,sendCodeAPI} from "@/api" 
import {mobileRules,codeRules} from "@/views/Login/rule"
export default {
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCodeBtn:true,
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
   async onSubmit() {
    //loading
    //message：提示文案
    //forbidClick 禁止点击
    //duration 展示的时长，
    this.loading()
    try{
  const {data} =  await login(this.mobile,this.code)
   this.SET_TOKEN(data.data)

//路由跳转
this.$router.push('/profile')
    this.$toast.success('登入成功')
    }catch(error){
      //细分一下失败：提示用户手机号跟验证码中的某一个错误
      //error：1.js报的错误 2.axios封装的error对象
      //axios封装的error对象
      if(error.response && error.response.status ===400){
        this.$toast.fail(error.response.data.message)
      }else{
        //1.js导致的错误
        console.dir(error)
        this.$toast.clear()
      }
    }
  
    },
    loading(){
      this.$toast.loading({
      message:'加载中',
      forbidClick:true,
      duration:0
    })
    },
    async sendCode(){
//0.验证用户输入是否输入了有效手机号
//1.form绑定ref
  await this.$refs.form.validate('mobile')
   
   this.loading()
   try{
    await sendCodeAPI(this.mobile)
    this.isShowCodeBtn =false
    this.$toast.success('发送成功')
    
   }catch(error){
    if(
      err.response && 
      (error.response.status === 429 ||error.response.status ===404)
      ){
      this.$toast.fail(error.response.data.message)
    }else{
      this.$toast.clear()
      throw error
    }
 
   }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: yellowgreen;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.from){
  .van-cell__title{
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn{
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
