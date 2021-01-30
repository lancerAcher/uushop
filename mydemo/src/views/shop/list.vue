<template>
<div>
    <el-table :data="listShop" style="width: 100%" border>
      <el-table-column prop="id" label="商品编号" width="180"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180"> </el-table-column>
      <el-table-column prop="price" label="商品价格" width="180"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="180"> </el-table-column>
      <el-table-column prop="img" label="图片" width="180">
          <template slot-scope="item">
              <div>
                  <img class="img" :src="item.row.img?$imgUrl+item.row.img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2014707384,415122160&fm=15&gp=0.jpg'" alt="">
              </div>
          </template>
        </el-table-column>
      <el-table-column prop="isnew" label="是否新品" > 
          <template slot-scope="item">
              <div>
                  <el-tag v-if="item.row.isnew==1" type="success">是</el-tag>
                  <el-tag v-else type="danger">否</el-tag>
              </div>
          </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" >
          <template slot-scope="item">
              <div>
                  <el-tag v-if="item.row.isnew==1" type="success">是</el-tag>
                  <el-tag v-else type="danger">否</el-tag>
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
        :total="allNumShop"
        @current-change='page'
        :page-size='pag.size'
        >
        </el-pagination>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {delShop} from '../../util/axios'
export default {
    data() {
        return {
            
        }
    },
    props:['pag'],
    mounted() {
        this.allShop(this.pag)
    },
    methods: {
         ...mapActions({
            allShop:'shop/allShopAction',
        }),
        page(val){
            this.pag.page=val
            this.allShop(this.pag)
        },
        del(id){
            this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                delShop({id})
                .then(res=>{
                    console.log(res);
                    if(res.data.code==200){
                            this.$message.success(res.data.msg)
                            this.allShop(this.pag)
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
            listShop:'shop/listShop',
            allNumShop:'shop/allNumShop'
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