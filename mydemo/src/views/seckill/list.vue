<template>
<div>
    <el-table :data="seckillList" style="width: 100%" border>
      <el-table-column prop="title" label="活动名称" width="180"> </el-table-column>
      
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
import {mapActions,mapGetters} from 'vuex'
import {delSeckill} from '../../util/axios'
export default {
    data() {
        return {
            
        }
    },
    
    mounted() {
        this.getSeckill()
    },
    methods: {
         ...mapActions({
            getSeckill:'seckill/actionSeckill',
        }),
        del(id){
            this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                delSeckill({id})
                .then(res=>{
                    console.log(res);
                    if(res.data.code==200){
                            this.$message.success(res.data.msg)
                            this.getSeckill()
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
        edit(id){
            this.$emit('edit',id)
        }
    },
    computed:{
        ...mapGetters({
            seckillList:'seckill/seckillList',
        })
    }
}
</script>

<style lang="stylus" scoped >
.el-pagination
    text-align center
.img
    height 130px
</style>