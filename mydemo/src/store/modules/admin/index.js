import {getAdminList,allAdminList} from '../../../util/axios'
const state={
    adminList:[],
    allList:0
}

const getters={
    getAdminList(state){
        return state.adminList
    },
    allAdminList(state){
        return state.allList
        
    }
}
const mutations={
    getAdminList(state,payload){
        state.adminList=payload
    },
    allAdminList(state,payload){
        state.allList=payload
    }
}
const actions={
    // getAdminListAction(state){
    //     let size=10
    //     let page=this.allList/10
    //     getAdminList({size,page})
    //     .then(res=>{
    //         console.log(res);
    //         if(res.data.code==200){
    //             // console.log(1);
    //             state.commit('getAdminList',res.data.list)
    //         }
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    // },
    allAdminListAction({commit},payload){
        // console.log(payload);
        allAdminList()
        .then(res=>{
            if(res.data.code==200){
                commit('allAdminList',res.data.list[0].total)
                // let all=res.data.list[0].total
                // console.log(this.state);
                // console.log(payload);
                let size=payload.size
                
                let page=payload.page/1
                // console.log(size,page);
                getAdminList({size,page})
                .then(res=>{
                    // console.log(res);
                    if(res.data.code==200){
                        // if(res.data.list)
                        commit('getAdminList',res.data.list)
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