<template>
<div>
    <van-nav-bar title="注册" left-arrow @click-left="$router.back()" />
    <van-form @submit="register">
    <van-field
        v-model="form.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
    />
    <van-field
        v-model="form.nickname"
        name="昵称"
        label="昵称"
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '请输入昵称' }]"
      />
    <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册 </van-button>
        
    </div>
    
    </van-form>
</div>
</template>

<script>
import {Toast} from 'vant'
import {register} from '../util/axios'
export default {
    data() {
        return {
            form:{
                phone:'',
                nickname:'',
                password:''
                
            }
        }
    },
    methods: {
        register(){
            // console.log(this.form);
            register(this.form)
            .then(res=>{
                console.log(res);
                if(res.code==200){
                    // console.log(res);
                    // sessionStorage.setItem('login',JSON.stringify(res.list))
                    this.$router.push('/mine')
                    Toast.success(res.msg)
                }else{
                    Toast.fail(res.msg)
                }
            })
        }
    },
}
</script>

<style lang="" scoped >


</style>