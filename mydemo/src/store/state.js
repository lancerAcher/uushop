export default({
    loginInfo:sessionStorage.getItem('login')?JSON.parse(sessionStorage.getItem('login')):null
    
})