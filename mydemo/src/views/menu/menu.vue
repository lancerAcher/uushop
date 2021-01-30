<template>
<div>
    <el-Bread></el-Bread>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add">添加</el-button>
    <adlist :flag='flag' @change="change" ref="from"></adlist>
    <list @edit='edit'></list>
</div>
</template>

<script>
import adlist from './add'
import list from './list'
export default {
    components:{
        adlist,
        list
    },
    data() {
        return {
            // flag:false,
            flag:{
                Show:false,
                editFlag:false
            }
        }
    },
    methods:{
        add(){
             this.flag.Show=true;
             this.flag.editFlag=false
        },
        change(e){
            this.flag.Show=e
        },
        edit(id){
            this.flag.Show=true
            this.flag.editFlag=true
            this.$refs.from.edit(id)
        }
    }
}
</script>

<style lang="" scoped >


</style>