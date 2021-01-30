import {getVip} from '../../../util/axios'
const state={
    vipList:[]
}

const getters={
    vipList(state){
        return state.vipList
    }
}
const mutations={
    getVip(state,payload){
        state.vipList=payload
    }
}
const actions={
    actionGetVip({commit}){
        getVip()
        .then(res=>{
            if(res.data.code==200){
                
                if(res.data.list){
                    commit('getVip',res.data.list)
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