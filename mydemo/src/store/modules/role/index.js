import {getRoleList} from '../../../util/axios'
const state={
    roleList:[]
}

const getters={
    roleList(state){
        return state.roleList
    }
}
const mutations={
    getRoleList(state,payload){
        state.roleList=payload
    }
}
const actions={
    actionGetRoleList({commit}){
        getRoleList()
        .then(res=>{
            if(res.data.code==200){
                commit('getRoleList',res.data.list)
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