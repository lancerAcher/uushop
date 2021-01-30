<template>
  <div>
    <!-- 添加按钮
    <el-button type="primary">添加</el-button> -->
    <!-- 表单 -->
    <el-table :data="vipList" style="width: 100%" border  row-key="id" :tree-props="{children: 'children'}" default-expand-all>
      <el-table-column prop="id" label="用户编号" width="180"> </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"> </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item"> 
          <el-button type="success" v-if="item.row.status==1" plain>启用</el-button>
          <el-button type="danger" v-else plain>禁用</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="cation" label="操作" width="200px">
        <template slot-scope="item">
        <el-button type="primary" @click="edit(item.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapActions({
      getVip:'vip/actionGetVip'
    }),
    edit(uid){
      this.$emit('edit',uid)
    },
   
  },
  mounted() {
    this.getVip();
  },
  computed:{
    ...mapGetters({
      vipList:'vip/vipList'
    })
  }
};
</script>

<style lang="stylus" scoped >

</style>