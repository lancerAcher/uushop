import {getShopGoods} from '../../../util/axios'
const state={
    shopGoodsList:[]
}

const getters={
    shopGoodsList(state){
        return state.shopGoodsList
    }
}
const mutations={
    getShopGoods(state,payload){
        state.shopGoodsList=payload
    }
}
const actions={
    actionShopGoods({commit}){
        getShopGoods()
        .then(res=>{
            // console.log(res);
            if(res.data.code==200){
                // console.log(1);
                commit('getShopGoods',res.data.list)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
}
export default{
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}