import {getMenuList} from '../../../util/axios'
const state={
    menuList:[]
}

const getters={
    getMenuList(state){
        return state.menuList
    }
}
const mutations={
    getMenuList(state,payload){
        state.menuList=payload
        // console.log(state.menuList);
    }
}
const actions={
    getMenuListAction({commit}){
        
        getMenuList()
        .then(res=>{
            // console.log(res);
            if(res.data.code==200){
                // console.log(1);
                commit('getMenuList',res.data.list)
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