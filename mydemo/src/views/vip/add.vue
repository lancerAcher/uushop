<template>
  <div>
   
    <el-dialog title='编辑角色' :visible.sync='flag' width="30%" center  :show-close='false'>
      <!-- 表单 -->
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules='rules'>
       
      <el-form-item label="手机号" prop='phone'>
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
       <el-form-item label="昵称" prop='nickname'>
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
       <el-form-item label="密码" prop='password'>
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="状态">
            <el-switch
                v-model="form.status"
                active-color="#13ce66"
                inactive-color="#ccc"
                :active-value="1"
                :inactive-value="2">
            </el-switch>
        </el-form-item>
     
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handle()">取 消</el-button>
        <el-button  type="primary" @click="sendEdit('ruleForm')">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import {mapActions,mapGetters} from 'vuex'
import {getOneVip,editVip} from '../../util/axios'
export default {
    props:['flag'],
    data() {
      return {
        form:{
         nickname:'',//昵称
         phone:'',//手机号
         password:'',//密码   
         status:1,//状态1正常2禁用
        },
        rules:{
          nickname:[
               { required: true, message: '请填写昵称', trigger: 'blur' },
          ],
          phone:[
                 { required: true, message: '请填写手机号', trigger: 'blur' }
          ],
          password:[
                 { required: true, message: '请填写密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handle(){
         this.$emit('change',false)
         this.$refs.ruleForm.resetFields()
      },
      ...mapActions({
      getvipList:'vip/actionGetVip'
    }),
    edit(uid){
      getOneVip({uid})
      .then(res=>{
        // console.log(res);
        if(res.data.code==200){
          this.form=res.data.list
          this.form.uid=uid
          this.form.password=''
        }
      })
    },
    sendEdit(formName){
       this.$refs[formName].validate((valid)=>{
          if(valid){
            editVip(this.form)
            .then(res=>{
              if(res.data.code==200){
                this.$message.success(res.data.msg)
                this.handle()
                this.getvipList()
              }
              if(res.data.code==500){
                 this.$message.error(res.data.msg)
                 return
              }
            })
            .catch(err=>{
              console.log(err);
              return 
            })
          }
        })
    }
    },
    computed:{
       ...mapGetters({
      'vipList':'vip/vipList'
    })
    }
};
</script>

<style lang="" scoped >
</style>