<template>
<div class="main">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"/>

    <div class="container">
        <div class="icon">
            <img :src="img" alt="">
        </div>
        <van-form @submit="login" class="login">
        <van-field
            v-model="form.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
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
            <van-button round block type="info" native-type="submit">登录 </van-button>
            <van-tag type="primary" @click="$router.push('/register')" >去注册</van-tag>
        </div>
        </van-form>
        </div>
</div>
</template>

<script>
import {Toast} from 'vant'
import {login} from '../util/axios'
export default {
    data() {
        return {
            img:require('../assets/images/orange.png'),
            form:{
                phone:'13838408478',
                password:'123456'
            }
        }
    },
    methods: {
        login(){
            login(this.form)
            .then(res=>{
                console.log(res);
                if(res.code==200){
                    console.log(res);
                    sessionStorage.setItem('login',JSON.stringify(res.list))
                    this.$router.push('/home')
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
.container{
    width: 3.55rem;
    height: 6.7rem;
    background: white;
    margin: .1rem auto;
    overflow: hidden;
    font-size: 12px;
    color: #666666;
    line-height: 12px;
}
.main{
    background: #ccc;
}
.icon{
    margin: 2.45rem 0 0 0  ;
    text-align: center;
    height: .48rem;
}
.login{
    margin-top:.44rem;
}

</style>