import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

function hasUrl(url){
  return Store.getters.getUserInfo.menus_url.some(item=>item==url)
}

Vue.use(Router)

export const indexRoutes=[
  {
    path:'/menu',
    component:()=>import('../views/menu/menu.vue'),
    name:'菜单管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/menu') ? next() :next('/home')
    }

  },
  {
    path:'/role',
    component:()=>import('../views/role/role.vue'),
    name:'角色管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/role') ? next() :next('/home')
    }
  },
  {
    path:'/admin',
    component:()=>import('../views/admin/admin.vue'),
    name:'管理员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/admin') ? next() :next('/home')
    }
  },
  {
    path:'/shopGoods',
    component:()=>import('../views/shopgoods/shopGoods.vue'),
    name:'商品分类',
    beforeEnter: (to, from, next) => {
      hasUrl('/shopGoods') ? next() :next('/home')
    }
  },
  {
    path:'/shopSize',
    component:()=>import('../views/shopsize/shopSize.vue'),
    name:'商品规格',
    beforeEnter: (to, from, next) => {
      hasUrl('/shopSize') ? next() :next('/home')
    }
  },
  {
    path:'/shop',
    component:()=>import('../views/shop/shop.vue'),
    name:'商品管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/shop') ? next() :next('/home')
    }
  },
  {
    path:'/Vip',
    component:()=>import('../views/vip/Vip.vue'),
    name:'会员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/Vip') ? next() :next('/home')
    }
  },
  {
    path:'/banner',
    component:()=>import('../views/banner/banner.vue'),
    name:'轮播图管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/banner') ? next() :next('/home')
    }
  },
  {
    path:'/seckill',
    component:()=>import('../views/seckill/seckill.vue'),
    name:'秒杀活动',
    beforeEnter: (to, from, next) => {
      hasUrl('/seckill') ? next() :next('/home')
    }
  },
  {
    path:'/home',
    component:()=>import('../views/home.vue')
  }
]

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/login',
      component:()=>import('../pages/login.vue'),
      name:'首页'
    },
    {
      path:'/index',
      component:()=>import('../pages/index.vue'),
      children:[
        {
          path:'',
          redirect:'/home'
        },
        ...indexRoutes
      ]
    },
   
  ]
})
