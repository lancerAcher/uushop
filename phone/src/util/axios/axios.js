import axios from 'axios'
let http=axios.create({
    baseURL:'/api'//你的代理服务器地址

})
// 拦截
http.interceptors.request.use(req=>{
    const LoginInfo = JSON.parse(window.sessionStorage.getItem('login'));
    if (LoginInfo) {
        req.headers.authorization = LoginInfo.token;
        // console.log(LoginInfo.token);
    }
    return req
})
// 响应拦截
http.interceptors.response.use(res=>{
    return res.data
})
export default http