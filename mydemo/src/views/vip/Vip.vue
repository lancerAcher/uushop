<template>
<div>
    <el-Bread></el-Bread>
    <!-- 添加按钮 -->
    <!-- <el-button type="primary" @click="add">添加</el-button> -->
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
            flag:false
        }
    },
    methods: {
        add(){
            this.flag=true
            
        },
        change(e){
            this.flag=e
        },
        edit(uid){
            this.flag=true
            this.$refs.from.edit(uid)
        }
    },
}
</script>

<style lang="" scoped >


</style>