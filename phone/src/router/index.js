import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
     path:'/index',
     component:()=>import('../pages/index.vue'),
    //  二级路由
     children:[
        {
          path:'/home',
          component:()=>import('../views/home.vue')
        },
        {
          path:'/cate',//分类
          component:()=>import('../views/cate.vue')
        },
        {
          path:'/cart',//购物车
          component:()=>import('../views/cart.vue')
        },
        {
          path:'/mine',//个人中心
          component:()=>import('../views/mine.vue')
        },
        {
          // 重定向
          path:'',
          redirect:'/home'
        }
     ]
    },
    {
      // 商品；列表
      path:'/list',
      component:()=>import('../pages/goodsList.vue')
    },
    {
      // 商品详情
      path:'/detail',
      component:()=>import('../pages/goodsDetail.vue')
    },
    {
      // 登录
      path:'/login',
      component:()=>import('../pages/login.vue')
    },
    {
      // 注册
      path:'/register',
      component:()=>import('../pages/register.vue')
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
})
