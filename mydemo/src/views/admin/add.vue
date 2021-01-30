<template>
<div>
    <el-dialog
    :title="flag.editFlag?'编辑管理员':'添加管理员'"
    :visible.sync="flag.Show"
    width="30%">
    <el-form :rules="rules" :model="form" label-width="80px" ref="ruleForm">
         <el-form-item label="所属角色" prop="roleid">
            <el-select v-model="form.roleid" placeholder="请选择"  >
                <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.rolename"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="用户名称" prop="username">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
         <el-form-item label="用户密码" prop="status">
            <el-input v-model="form.password" type='password'></el-input>
        </el-form-item>
        <el-form-item label="状态">
            <el-switch
                v-model="form.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="2">
            </el-switch>
        </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="handle">取 消</el-button>
        <el-button v-if="!flag.editFlag" type="primary" @click="send('ruleForm')">确 定</el-button>
        <el-button v-else type="primary" @click="sendEdit('ruleForm')">编 辑</el-button>
    </span>
    </el-dialog>
</div>
</template>

<script>
import {getAdminList,oneAdminList,editAdminList,setAdminList} from '../../util/axios'
import {mapGetters,mapActions} from 'vuex'
export default {
    props:['flag','pag'],
    data() {
        return {
            form:{
                roleid:'',//角色编号
                username:'',//管理员名称
                password:'',//密码
                status:1//状态1正常2禁用
            },
            // options:[0,1,2,3,4],
            rules:{
                roleid:[
                    { required: true, message: '请选择角色编号', trigger: 'blur' },
                ],
                username:[
                     { required: true, message: '请填写用户名', trigger: 'blur' },
                ]
            }
            
        }
    },
    methods: {
        ...mapActions({
            allAdminList:'admin/allAdminListAction',
            getRoleList:'role/actionGetRoleList'
        }),
        handle(){
            this.$emit('change',false)
            this.$refs.ruleForm.resetFields();
            this.form.password=''
        },
        send(formname){
            // console.log(this.form);
            this.$refs[formname].validate((vaild)=>{
                setAdminList(this.form)
                .then(res=>{
                    // console.log(res);
                    if(res.data.code==200){
                        this.$message.success(res.data.msg)
                        this.handle()
                        this.allAdminList(this.pag)
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
            })
        },
        edit(uid){
            oneAdminList({uid})
            .then(res=>{
                if(res.data.code==200){
                    this.form=res.data.list
                    this.form.uid=uid
                }
            })
        },
        sendEdit(formName){
              this.$refs[formName].validate((valid)=>{
                  if(valid){
                      editAdminList(this.form)
                      .then(res=>{
                          if(res.data.code==200){
                            this.$message.success(res.data.msg)
                            this.handle()
                            this.allAdminList(this.pag)
                          }
                          if(res.data.code==500){
                            this.$message.error(res.data.msg)
                            return
                          }
                      })
                      .catch(err=>{
                          console.log(err);
                      })
                      
                  }
              })
        }
    },
    computed:{
        ...mapGetters({
            options:'role/roleList'
        })
    },
    mounted() {
        this.getRoleList()
    },
}
</script>

<style lang="" scoped >


</style>