<template>
<div>
    <!-- 弹出框 -->
    <el-dialog :title="flag.editFlag?'编辑角色':'添加角色'" :visible.sync='flag.Show' width="30%" center  :show-close='false'>
      <!-- 表单 -->
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules='rules'>
        <!-- 菜单名称 -->
      <el-form-item label="角色名称" prop='rolename'>
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" >
          <!-- show-checkbox  节点是否可被选择
               default-expand-all 是否默认展开所有节点
               node-key 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的	
               highlight-current 是否高亮当前选中节点，默认值是 false。
          -->
          <el-tree
            :data="menus"
            show-checkbox  
            :default-expand-all='true'
            node-key="id"
            check-strictly
            ref="tree"
            :props="defaultProps">
        </el-tree>
        
      </el-form-item>
      <el-form-item lable='状态'>
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
        <el-button @click="handle()">取 消</el-button>
        <el-button v-if="!flag.editFlag" type="primary" @click="send('ruleForm')">确 定</el-button>
        <el-button v-else type="primary" @click="sendEdit('ruleForm')">编 辑</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import {setRoleList,editRoleList,oneRoleList} from '../../util/axios'
import {mapActions,mapGetters} from 'vuex'
export default {
        data() {
            return {
                form:{
                   rolename:'',//角色名称
                   menus:[],//角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
                   status:1,//状态1正常2禁用
                },
                rules:{
                    rolename:[
                        { required: true, message: '请输入管理员名称', trigger: 'blur' },
                        { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                    ]
                },
                defaultProps: {
                    children: 'children',
                    label: 'title'
                }
            }
        },
        methods: {
            handle(){
                this.$emit('changeFalg',false)
                this.$refs.ruleForm.resetFields()
                this.$refs.tree.setCheckedKeys([]);
            },
            send(formname){
                this.form.menus=this.$refs.tree.getCheckedKeys()
                // console.log(this.$refs.tree.getCheckedKeys());
                // console.log(this.$refs.tree.getCheckedKeys());
                // console.log(this.form);
                this.$refs[formname].validate((valid)=>{
                    if(valid){
                        setRoleList(this.form)
                        .then(res=>{
                            if(res.data.code==200){
                                // console.log(this.form);
                                // console.log(res);
                                this.$message.success(res.data.msg)
                                this.handle()
                                this.getRoleList()
                            }
                        })
                        .catch(err=>{
                            console.log(err);
                            return
                        })
                    }
                })
                
            },
            ...mapActions({
                getRoleList:'role/actionGetRoleList',
                getMenuList:'menu/getMenuListAction'
            }),
            edit(id){
                oneRoleList({id})
                .then(res=>{
                    if(res.data.code==200){
                        this.form=res.data.list
                        this.form.id=id
                        this.$refs.tree.setCheckedKeys((res.data.list.menus).split(',')); 
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            sendEdit(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        this.form.menus=this.$refs.tree.getCheckedKeys()
                        editRoleList(this.form)
                        .then(res=>{
                            if(res.data.code==200){
                                this.$message.success(res.data.msg)
                                this.handle()
                                this.getRoleList()
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
        mounted() {
            this.getMenuList()
        },
        props:['flag'],
        computed:{
            ...mapGetters({
                menus:'menu/getMenuList'
            })
        }
}
</script>

<style lang="" scoped >


</style>