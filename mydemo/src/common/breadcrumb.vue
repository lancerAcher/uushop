<template>
<div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="header">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
</div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped >
  .header
    line-height 60px

</style>