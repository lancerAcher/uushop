import http from './axios'
// 菜单管理
// 登录
// export function loginFlag(e){
//     return http.post('/api/login',e)
// } 
// 获取数据
export function getMenuList(){
    return http.get('/api/menulist?istree=true')
}
// 获取一条数据
export function getOneMenuList(params){
    return http.get('/api/menuinfo',{params})
}
// 菜单修改数据
export function editOneMenuList(data){
    return http.post('/api/menuedit',data)
}
// 添加数据
export function setMenuList(e){
    return http.post('/api/menuadd',e)
}
// 删除数据
export function delMenuList(e){
    return http.post('/api/menudelete',e)
}

// 角色管理
// 添加角色数据
export function setRoleList(data){
    return http.post('/api/roleadd',data)
}
// 删除角色数据
export function dleRoleList(data){
    return http.post('/api/roledelete',data)
}
// 修改角色数据
export function editRoleList(data){
    return http.post('/api/roleedit',data)
}
// 查询所有数据
export function getRoleList(){
    return http.get('/api/rolelist')
}
// 查询一条数据
export function oneRoleList(params){
    return http.get('/api/roleinfo',{params})
}


// 管理员管理
// 添加管理员数据
export function setAdminList(data){
    return http.post('/api/useradd',data)
}
// 删除管理员
export function delAdminList(data){
    return http.post('/api/userdelete',data)
}
// 修改管理员
export function editAdminList(data){
    return http.post('/api/useredit',data)
}
// 查询管理员总数
export function allAdminList(){
    return http.get('/api/usercount')
}
// 查询一条数据
export function oneAdminList(params){
    return http.get('/api/userinfo',{params})
}
// 管理员登录
export function loginAdmin(data){
    return http.post('/api/userlogin',data)
}
// 管理员列表
export function getAdminList(params){
    return http.get('/api/userlist',{params})
}


// 商品分类
// 商品分类添加
export function setShopGoods(data){
    let file=new FormData();
    for (const key in data) {
       file.append(key,data[key])
    }
    return http.post('/api/cateadd',file)

}
// 商品分类列表
export function getShopGoods(){
    return http.get('/api/catelist?istree=true')
}
// 获取一条数据
export function getOneShopGoods(params){
    return http.get('/api/cateinfo',{params})
}
// 商品分类修改
export function editShopGoods(data){
    let file=new FormData();
    for (const key in data) {
        file.append(key,data[key])
    }
    return http.post('/api/cateedit',file)
}
// 商品分类删除
export function delShopGoods(data){
    return http.post('/api/catedelete',data)
}



// 商品规格
// 商品规格添加
export function setShopSize(data){
    let file=new FormData();
    for (const key in data) {
        file.append(key,data[key])
    }
    return http.post('/api/specsadd',file)
}
// 商品规格总数
export function allShopSize(){
    return http.get('/api/specscount')
}
// 商品规格列表分页
export function listShopSize(params){
    return http.get('/api/specslist',{params})
}
// 商品规格获取一条
export function oneShopSize(params){
    return http.get('/api/specsinfo',{params})
}
// 商品规格修改
export function editShopSize(data){
    let file=new FormData();
    for (const key in data) {
        file.append(key,data[key])
    }
    return http.post('/api/specsedit',file)
}
// 商品规格删除
export function delShopSize(data){
    return http.post('/api/specsdelete',data)
}


// 商品管理
// 商品添加
export function setShop(data){
    let file=new FormData();
    for (const key in data) {
       file.append(key,data[key])
    }
    return http.post('/api/goodsadd',file)
}
// 商品总数
export function allShop(){
    return http.get('/api/goodscount')
}
// 商品列表分页
export function listShop(params){
    return http.get('/api/goodslist',{params})
}
// 商品获取一条
export function oneShop(params){
    return http.get('/api/goodsinfo',{params})
}
// 商品修改
export function editShop(data){
    let file=new FormData();
    for (const key in data) {
       file.append(key,data[key])
    }
    return http.post('/api/goodsedit',file)
}
// 商品删除
export function delShop(data){
    return http.post('/api/goodsdelete',data)
}

// 会员管理
// 会员列表
export function getVip(){
    return http.get('/api/memberlist')
}
// 获取一条会员数据
export function getOneVip(params){
    return http.get('/api/memberinfo',{params})
}
// 会员修改
export function editVip(data){
    return http.post('/api/memberedit',data)
}

// 轮播图列表
// 轮播图添加
export function setBanner(data){
    let file=new FormData();
    for (const key in data) {
       file.append(key,data[key])
    }
    return http.post('/api/banneradd',file)
}
// 轮播图列表
export function getBanner(){
    return http.get('/api/bannerlist')
}
// 获取一条数据
export function getOneBanner(params){
    return http.get('/api/bannerinfo',{params})
}
// 轮播图修改
export function editBanner(data){
    let file=new FormData();
    for (const key in data) {
       file.append(key,data[key])
    }
    return http.post('/api/banneredit',file)
}
// 轮播图删除
export function delBanner(data){
    return http.post('/api/bannerdelete',data)
}

// 限时秒杀
// 限时秒杀添加
export function setSeckill(data){
    return http.post('/api/seckadd',data)
}
// 限时秒杀列表
export function getSeckill(){
    return http.get('/api/secklist')
}
// 获取一条数据
export function getOneSeckill(params){
    return http.get('/api/seckinfo',{params})
}
// 限时秒杀修改
export function editSeckill(data){
    return http.post('/api/seckedit',data)
}
// 限时秒杀删除
export function delSeckill(data){
    return http.post('/api/seckdelete',data)
}