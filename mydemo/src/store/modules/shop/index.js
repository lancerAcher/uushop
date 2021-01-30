import {listShop,allShop} from '../../../util/axios'
const state={
    listShop:[],
    allNumShop:0
}

const getters={
    listShop(state){
        return state.listShop
    },
    allNumShop(state){
        return state.allNumShop
        
    }
}
const mutations={
    listShop(state,payload){
        state.listShop=payload
    },
    allShop(state,payload){
        state.allNumShop=payload
    }
}
const actions={
    allShopAction({commit},payload){
        // console.log(payload);
        allShop()
        .then(res=>{
            if(res.data.code==200){
                commit('allShop',res.data.list[0].total)
                let size=payload.size
                let page=payload.page/1
                // console.log(size,page);
                listShop({size,page})
                .then(res=>{
                    // console.log(res);
                    if(res.data.code==200){
                        commit('listShop',res.data.list)
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            }
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