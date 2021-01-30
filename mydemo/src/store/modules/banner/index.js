import {getBanner} from '../../../util/axios'
const state={
    bannerList:[]
}

const getters={
    bannerList(state){
        return state.bannerList
    }
}
const mutations={
    getBanner(state,payload){
        state.bannerList=payload
    }
}
const actions={
    actionGetBanner({commit}){
        getBanner()
        .then(res=>{
            if(res.data.code==200){
                // console.log(res.data.list);
                if(res.data.list){
                    commit('getBanner',res.data.list)
                }
                else{
                    return
                }
                
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