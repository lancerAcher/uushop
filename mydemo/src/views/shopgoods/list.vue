<template>
  <div>
    <!-- 添加按钮
    <el-button type="primary">添加</el-button> -->
    <!-- 表单 -->
    <el-table :data="shopGoodsList" style="width: 100%" border  row-key="id" :tree-props="{children: 'children'}" default-expand-all>
      <el-table-column prop="id" label="分类编号" width="180"> </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"> </el-table-column>
      <el-table-column  label="图片"> 
        <template slot-scope="item">
          <div v-if="item.row.pid!=0">
            <img class="img" :src="item.row.img?$imgUrl+item.row.img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2014707384,415122160&fm=15&gp=0.jpg'" alt="">
          </div>
          <div v-else>

          </div>
        </template>
      </el-table-column>
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
import {delShopGoods} from '../../util/axios'
import {mapActions,mapGetters} from 'vuex'
export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapActions({
           getShopGoods:'shopgoods/actionShopGoods' 
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
          delShopGoods({id})
          .then(res=>{
            console.log(res);
            if(res.data.code==200){
                    this.$message.success(res.data.msg)
                    this.getShopGoods()
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
    this.getShopGoods();
  },
  computed:{
    ...mapGetters({
            shopGoodsList:'shopgoods/shopGoodsList'
    })
  }
};
</script>

<style lang="stylus" scoped >
.img
  // width 130px
  height 130px
</style>