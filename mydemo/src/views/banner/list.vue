<template>
  <div>

    <el-table :data="bannerList" style="width: 100%" border  row-key="id" :tree-props="{children: 'children'}" default-expand-all>
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180"> </el-table-column>
      <el-table-column  label="图片"> 
        <template slot-scope="item">
          <div>
            <img class="img" :src="item.row.img?$imgUrl+item.row.img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2014707384,415122160&fm=15&gp=0.jpg'" alt="">
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
import {delBanner} from '../../util/axios'
import {mapActions,mapGetters} from 'vuex'
export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapActions({
           getBanner:'banner/actionGetBanner' 
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
          delBanner({id})
          .then(res=>{
            console.log(res);
            if(res.data.code==200){
                    this.$message.success(res.data.msg)
                    this.getBanner()
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
  mounted() {
    this.getBanner();
  },
  computed:{
    ...mapGetters({
            bannerList:'banner/bannerList'
    })
  }
};
</script>

<style lang="stylus" scoped >
.img
  height 130px
</style>