<template>
<div>
    <el-table :data="listShopSize" style="width: 100%" border>
      <el-table-column prop="id" label="规格编号" width="180"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"> </el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="180"> 
          <template slot-scope="item">
              <div>
                  <el-tag :key="list" v-for="list in item.row.attrs" type="info">{{list}}</el-tag>
              </div>
          </template>
      </el-table-column>
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
    <el-pagination
        background
        layout="prev, pager, next"
        :total="numShopSize"
        @current-change='page'
        :page-size='pag.size'
        >
        </el-pagination>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {delShopSize} from '../../util/axios'
export default {
    data() {
        return {
            
        }
    },
    props:['pag'],
    mounted() {
        this.allShopSize(this.pag)
    },
    methods: {
         ...mapActions({
            allShopSize:'shopsize/allShopSizeAction'
        }),
        page(val){
            this.pag.page=val
            this.allShopSize(this.pag)
        },
        del(id){
            this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                delShopSize({id})
                .then(res=>{
                    console.log(res);
                    if(res.data.code==200){
                            this.$message.success(res.data.msg)
                            this.allShopSize(this.pag)
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
            listShopSize:'shopsize/listShopSize',
            numShopSize:'shopsize/allShopSize'
        })
    }
}
</script>

<style lang="stylus" scoped >
.el-pagination
    text-align center

</style>