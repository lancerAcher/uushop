// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入仓库
import store from './store'

Vue.config.productionTip = false

// 引入公共样式
import gCom from './common'
// console.log(gCom);
for (const key in gCom) {
    Vue.component(key,gCom[key])
}

//创建一个图片地址
Vue.prototype.$imgUrl = 'http://localhost:3000'

// 导入全局样式表
import  './assets/css/reset.css' 

//导入阿里矢量图
import  './assets/css/iconfont.css'

router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next()
    return
  }
  else if(sessionStorage.getItem('login')){
    next()
    return
  }else{
    next('/login')
  }
})

//全局引入element-ui
import elementUI from 'element-ui' 
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
