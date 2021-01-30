import {getSeckill} from '../../../util/axios'
const state={
    seckillList:[]
}

const getters={
    seckillList(state){
        return state.seckillList
    }
}
const mutations={
    getSeckill(state,payload){
        state.seckillList=payload
    }
}
const actions={
    actionSeckill({commit}){
        getSeckill()
        .then(res=>{
            if(res.data.code==200){
                commit('getSeckill',res.data.list)
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