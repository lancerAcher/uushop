<template>
<div class="container">
    <el-form :model="form" :rules="rules" hide-required-asterisk ref="ruleForm">
        <!-- 账号 -->
        <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" prefix-icon='iconfont icon-yonghu'></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" prefix-icon='iconfont icon-mima'></el-input>
        </el-form-item>
        <div class="login">
             <el-button type="primary" @click="login('ruleForm')">登录</el-button>
             <el-button type="info" @click="remove">重置</el-button>
        </div>
    </el-form>

</div>
</template>

<script>
import {loginAdmin} from '../util/axios'
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            form:{
                username:'admin',
                password:'123456'
            },
            rules:{
                username:[
                      { required: true, message: '请输入用户名', trigger: 'blur' },
                      { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                      { required: true, message: '请输入密码', trigger: 'blur' },
                      { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        ...mapActions(['loginInfo']),
        remove(){
            this.$refs.ruleForm.resetFields()
        },
        login(formName){
            
            this.$refs[formName].validate(valid=>{
                if(valid){
                     loginAdmin(this.form)
                    .then(res=>{
                        // console.log(res);
                        if(res.data.code==200){
                            // sessionStorage.setItem('login',JSON.stringify(res.data.list))
                            this.loginInfo(res.data.list)
                            this.$message.success(res.data.msg)
                            this.$router.push('/home')
                        }else{
                            this.$message.error(res.data.msg)
                            return
                        }
                    })
                }
            })
           
        }
    },
}
</script>

<style lang="stylus" scoped >
.container
    background #2b4b4b
    height 100%
    width 100%
    .el-form
        width 450px
        height 260px
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
        background #fff
        border-radius 3px
        .el-form-item
            padding 0px 10px
        .login
            float right
            padding 0px 10px
            box-sizing border-box

</style>