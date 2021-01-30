import {listShopSize,allShopSize} from '../../../util/axios'
const state={
    listShopSize:[],
    numShopSize:0
}

const getters={
    listShopSize(state){
        return state.listShopSize
    },
    allShopSize(state){
        return state.numShopSize
        
    }
}
const mutations={
    listShopSize(state,payload){
        state.listShopSize=payload
    },
    allShopSize(state,payload){
        state.numShopSize=payload
    }
}
const actions={
    allShopSizeAction({commit},payload){
        // console.log(payload);
        allShopSize()
        .then(res=>{
            if(res.data.code==200){
                commit('allShopSize',res.data.list[0].total)
                // let all=res.data.list[0].total
                // console.log(this.state);
                // console.log(payload);
                let size=payload.size
                // payload.page==undefined ? payload.page=1:payload.page
                let page=payload.page/1
                // console.log(size,page);
                listShopSize({size,page})
                .then(res=>{
                    // console.log(res);
                    if(res.data.code==200){
                        // console.log(1);
                        commit('listShopSize',res.data.list)
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