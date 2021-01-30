// 引入axios
import axios from 'axios'
import router from '../../router'
const http=axios.create({
  // baseURL:'http://localhost:3000'//基础地址
  baseURL:'/api'//基础地址
})


// axios请求拦截器
http.interceptors.request.use(req=>{
  // console.log(req);
  let token=sessionStorage.getItem('login') ? JSON.parse(sessionStorage.getItem('login')).token:''
  req.headers.authorization=token
  return req
})
http.interceptors.response.use(res=>{
  // return res
  // if(res.data.code==500){
  //   alert(res.data.msg)
  //   router.push('/login')
  // }
   if(res.data.code==403){
    alert(res.data.msg)
    router.push('/login')
  }
  else{
    return res
  }
})
export default http

/* 
token概念是如何产生的？
每一个接口（必须要登录之后的要操作状态）在调取的过程中，我们要验证它的用户名和密码。每验证一次，我们要与服务器进行交互，然后要频繁查询数据库
在后端就产生了token的概念（它就是一个令牌）。当你第一次登录的时候，登录成功之后后端，返回给我们一个token（字符串）。每一次再调取其他接口的时候，只需要验证这个token即可
token它是有时效的。大概时效时长在10分-40分（后端去设定的）。前端要配合token失效做强制跳转到登录
前端操作token，会把token携带在请求头中
*/