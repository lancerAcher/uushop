<template>
  <div>
    <!-- 添加按钮
    <el-button type="primary">添加</el-button> -->
    <!-- 表单 -->
    <el-table :data="menuList" style="width: 100%" border  row-key="id" :tree-props="{children: 'children'}" default-expand-all>
      <el-table-column prop="id" label="菜单编号" width="180"> </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180"> </el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="180"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item"> 
          <el-button type="success" v-if="item.row.status==1" plain>启用</el-button>
          <el-button type="danger" v-else plain>禁用</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="cation" label="操作" width="200px">
        <template slot-scope="item">
        <el-button type="primary" @click="edit(item.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {delMenuList} from '../../util/axios'
import {mapActions,mapGetters} from 'vuex'
export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapActions({
      getMenuList:'menu/getMenuListAction'
    }),
    edit(id){
      // console.log(id);
      this.$emit('edit',id)
    },
    del(id){
       this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          delMenuList({id})
          .then(res=>{
            console.log(res);
            if(res.data.code==200){
                    this.$message.success(res.data.msg)
                    this.getMenuList()
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
      // console.log(id);
      
    }
  },
  mounted() {
    this.getMenuList();
  },
  computed:{
    ...mapGetters({
      menuList:'menu/getMenuList'
    })
  }
};
</script>

<style lang="stylus" scoped >

</style>