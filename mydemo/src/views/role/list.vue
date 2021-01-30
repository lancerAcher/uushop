<template>
<div>
    <el-table :data="roleList" style="width: 100%" border>
      <el-table-column prop="id" label="用户编号" width="180"> </el-table-column>
      <el-table-column prop="rolename" label="昵称" width="180"> </el-table-column>
      <el-table-column prop="menus" label="权限" width="180"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item"> 
          <el-button type="success" v-if="item.row.status==1" plain>启用</el-button>
          <el-button type="danger" v-else plain>禁用</el-button>
          </template>
      </el-table-column>
      <el-table-column  label="操作" width="200px">
        <template slot-scope="item">
        <el-button type="primary" @click="edit(item.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import {dleRoleList} from '../../util/axios'
import {mapActions, mapGetters} from 'vuex'
export default {
    mounted() {
        this.getRoleList()
    },
    methods:{
         ...mapActions({
                getRoleList:'role/actionGetRoleList'
            }),
            edit(id){
             this.$emit('edit',id)  
            },
            del(id){
               this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                dleRoleList({id})
                .then(res=>{
                  console.log(res);
                  if(res.data.code==200){
                          this.$message.success(res.data.msg)
                          this.getRoleList()
                  }
                })
                .catch(err=>{
                  console.log(err);
                  return
                })
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
            }
    },
    computed:{
        ...mapGetters({
            roleList:'role/roleList'
        })
    }
}
</script>

<style lang="" scoped >


</style>