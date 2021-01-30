<template>
<div>
    <el-aside width="200px">
        <!-- 
                    el-menu 属性 
                    default-active	当前激活菜单的 index
                    background-color 背景色
                     text-color 文本颜色
                     ctive-text-color 被激活的颜色
                     unique-opened	是否只保持一个子菜单的展开
                     router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
                -->
          <el-menu  router unique-opened default-active="defaultActive">
            <el-menu-item><i class="el-icon-menu"></i>首页</el-menu-item>
            <el-submenu :index="item.id.toString()"  v-for="item in getUserInfo.menus" :key="item.id">
              <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
              <el-menu-item-group v-for="list in item.children" :key="list.id">
                <el-menu-item :index="list.url" >{{list.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
      return {
        defaultActive:'/home',
      }
    },
    mounted() {
     this.defaultActive=this.$route.path
    //  console.log(this.getUserInfo);
    },
    computed:{
      ...mapGetters(['getUserInfo'])
    }

}
</script>

<style lang="stylus" scoped >

  .el-aside 
    height 100%
    background-color #D3DCE6
  

</style>