<template>
<div>
    <el-table :data="adminList" style="width: 100%" border>
      <el-table-column prop="uid" label="用户编号" width="180"> </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item"> 
          <el-button type="success" v-if="item.row.status==1" plain>启用</el-button>
          <el-button type="danger" v-else plain>禁用</el-button>
          </template>
      </el-table-column>
      <el-table-column  label="操作" width="200px">
        <template slot-scope="item">
        <el-button type="primary" @click="edit(item.row.uid)">编辑</el-button>
        <el-button type="danger" @click="del(item.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="allAdmin"
        @current-change='page'
        :page-size='pag.size'
        >
        </el-pagination>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {delAdminList} from '../../util/axios'
export default {
    data() {
        return {
            
        }
    },
    props:['pag'],
    mounted() {
        this.allAdminList(this.pag)
    },
    methods: {
         ...mapActions({
            allAdminList:'admin/allAdminListAction'
        }),
        page(val){
            this.pag.page=val
            this.allAdminList(this.pag)
        },
        del(uid){
            this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                delAdminList({uid})
                .then(res=>{
                    console.log(res);
                    if(res.data.code==200){
                            this.$message.success(res.data.msg)
                            this.allAdminList(this.pag)
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
            },
        edit(uid){
            this.$emit('edit',uid)
        }
    },
    computed:{
        ...mapGetters({
            adminList:'admin/getAdminList',
            allAdmin:'admin/allAdminList'
        })
    }
}
</script>

<style lang="stylus" scoped >
.el-pagination
    text-align center

</style>