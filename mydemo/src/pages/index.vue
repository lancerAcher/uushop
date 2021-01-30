<template>
  <div id="app">
    <el-container class="main">
      <el-header>
        XXX大型后台管理系统
          <div class="userInfo">
          <span>{{getUserInfo.username}}</span>
          <el-button @click="logout" type="primary" size='mini'>退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <anav></anav>
        <!-- <el-aside width="200px">
          <el-menu  router='true' unique-opened default-active="defaultActive">
            <el-menu-item><i class="el-icon-menu"></i>首页</el-menu-item>
            <el-submenu index="1" >
              <template slot="title"><i class="el-icon-s-tools"></i>系统管理</template>
              <el-menu-item-group >
                <el-menu-item index="/menu" >菜单管理</el-menu-item>
                <el-menu-item  index="/role">角色管理</el-menu-item>
                <el-menu-item  index="/admin">管理员管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-s-goods"></i>商城管理</template>
              <el-menu-item  index="/shopGoods">商品分类</el-menu-item>
              <el-menu-item  index="/shopSize">商品规格</el-menu-item>
              <el-menu-item  index="/shop">商品管理</el-menu-item>
              <el-menu-item  index="/Vip">会员管理</el-menu-item>
              <el-menu-item  index="/banner">轮播图管理</el-menu-item>
              <el-menu-item  index="/seckill">秒杀活动</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside> -->
        <!-- 主体 -->
        <el-main>
          <!-- 面包屑 -->
          <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="header">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$router.name}}</el-breadcrumb-item>
          </el-breadcrumb> -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import anav from '../components/aside'
export default {
    methods:{
         ...mapActions(['loginInfo']),
    //退出事件
    logout(){
      //修改getUserInfo它的仓库状态然后跳转到登录
      this.loginInfo(null)
      this.$router.push('/login')
    }
  
    },
    data() {
      return {
        
      }
    },
    mounted(){
      
    },
    components:{
      anav
    },
    computed:{
         ...mapGetters(['getUserInfo'])
    }
}
</script>

<style lang="stylus" scoped >
.main 
  height 100%
  color #333

  .el-header 
    background-color: #B3C0D1
    line-height 60px
  


  .el-main 
    background-color #E9EEF3
    height 100%

.userInfo
  float right
</style>
