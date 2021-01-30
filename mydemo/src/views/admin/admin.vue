<template>
<div>
    <el-Bread></el-Bread>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add">添加</el-button>
    <add :flag='flag' @change="change" ref="from" :pag='pag'></add>
    <list @edit='edit' :pag='pag'></list>
</div>
</template>

<script>
import add from './add'
import list from './list'
export default {
    components:{
        add,
        list
    },
    methods: {
        add(){
            this.flag.Show=true
            this.flag.editFlag=false
        },
        change(e){
            this.flag.Show=e
        },
        edit(uid){
            this.flag.Show=true
            this.flag.editFlag=true
            // console.log(this.$refs);
            this.$refs.from.edit(uid)
        }
    },
    data() {
        return {
             flag:{
                Show:false,
                editFlag:false
            },
            pag:{
                size:3,
                page:1
            }
        }
    },
}
</script>

<style lang="" scoped >


</style>