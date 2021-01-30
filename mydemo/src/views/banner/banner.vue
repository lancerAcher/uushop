<template>
<div>
    <el-Bread></el-Bread>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add">添加</el-button>
    <add :flag='flag' @change="change" ref="from"></add>
    <list @edit='edit'></list>
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
    data() {
        return {
            flag:{
                Show:false,
                editFlag:false
            }
        }
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
            this.$refs.from.edit(id)
        }
    },
}
</script>

<style lang="" scoped >


</style>