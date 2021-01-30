<template>
<div>
    <el-Bread></el-Bread>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add">添加</el-button>
    <add :flag='flag' @change="change" ref="from"></add>
    <list @edit='edit' ></list>
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
        edit(id){
            this.flag.Show=true
            this.flag.editFlag=true
            // console.log(this.$refs);
            this.$refs.from.edit(id)
        }
    },
    data() {
        return {
             flag:{
                Show:false,
                editFlag:false
            },
            
        }
    },
}
</script>

<style lang="" scoped >


</style>