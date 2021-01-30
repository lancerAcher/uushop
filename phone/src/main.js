// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import  './assets/js/remScale'
import  './assets/css/reset.css'
import './assets/css/iconfont.css'
import less from 'less'
Vue.use(less)

// 引入vant
import vantUI from 'vant'
import  'vant/lib/index.css'
Vue.use(vantUI)

// 引入swiper
import  'swiper/js/swiper.min'
import   'swiper/css/swiper.min.css'

// 设置图片服务器
Vue.prototype.$imgUrl='http://localhost:3000'
Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
