

export default({
    loginInfo(state,payload){
        state.loginInfo=payload
        if(payload){
            // 设置本地存储
            sessionStorage.setItem('login',JSON.stringify(payload))
        }else{
            sessionStorage.removeItem('login')
        }
    }
})