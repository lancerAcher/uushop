<template>
  <div>
    <!-- 弹出框 -->
    <el-dialog :title="flag.editFlag?'编辑菜单':'添加菜单'" :visible.sync='flag.Show' width="30%" center  :show-close='false'>
      <!-- 表单 -->
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules='rules'>
        <!-- 菜单名称 -->
      <el-form-item label="菜单名称" prop='title'>
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <!-- 选择上级菜单 -->
      <el-form-item label="上级菜单" prop='pid'>
        <el-select v-model="form.pid" placeholder="请选择上级菜单">
          <el-option label="顶级菜单" :value="0"></el-option>
        <el-option
          v-for="item in menuList"
          :key="item.id"
          :label="item.title"
          :value="item.id">
        </el-option>
        </el-select>
      </el-form-item>
      <!-- 选择菜单类型 -->
       <el-form-item label="菜单类型">
         <el-radio v-model="form.type" :label="1">目录</el-radio>
         <el-radio v-model="form.type" :label="2">菜单</el-radio>
      </el-form-item>
      <!-- 当选择第一个时情况 -->
       <el-form-item label="图标类型" v-if="form.type==1">
        <el-select v-model="form.icon"  placeholder="请选择">
          <!-- <el-option label='顶级菜单' :value='0'></el-option> -->

        <el-option
          v-for="item in iconList"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
        </el-select>
      </el-form-item>
      <!-- 选择第二个情况 -->
      <el-form-item label="菜单地址" v-else>
        <el-select v-model="form.url" placeholder="请选择">
        <el-option
          v-for="item in indexRoutes"
          :key="item.path"
          :label="item.name"
          :value="item.path">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item lable='状态'>
        <el-switch
          v-model="form.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="2">
        </el-switch>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handle()">取 消</el-button>
        <el-button v-if="!flag.editFlag" type="primary" @click="send('ruleForm')">确 定</el-button>
        <el-button v-else type="primary" @click="sendEdit('ruleForm')">编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {indexRoutes} from '../../router'
import {mapActions,mapGetters} from 'vuex'
import {setMenuList,getOneMenuList,editOneMenuList} from '../../util/axios'
export default {
    props:['flag'],
    data() {
      return {
        form:{
         pid:0,//上级分类编号
         title:'',//标题
         icon:'',//图标
         type:1,//类型1目录2菜单
         url:'',//菜单地址
         status:1,//状态1正常2禁用
        },
        // topList:[
        //   {
        //   id: 0,
        //   label: '系统管理'
        // }, {
        //   id: 1,
        //   label: '商城管理'
        // }
        // ],
        iconList:[
          "el-icon-s-tools",
          "el-icon-setting",
          "el-icon-s-goods",
          "el-icon-goods"
        ],
        indexRoutes,
        rules:{
          title:[
               { required: true, message: '请填写菜单名称', trigger: 'blur' },
          ],
          pid:[
                 { type: 'date', required: true, message: '请选择上级菜单', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      handle(){
         this.$emit('change',false)
         this.$refs.ruleForm.resetFields()
      },
      send(formName){
        // console.log(this.$refs);
        this.$refs[formName].validate((valid)=>{
          if(valid){
            setMenuList(this.form)
            .then(res=>{
              // console.log(res);
              if(res.data.code==200){
                this.$message.success(res.data.msg)
                this.handle()
                this.getMenuList()
              }
              if(res.data.code==500){
                 this.$message.error(res.data.msg)
                 return
              }
            })
            .catch(err=>{
              console.log(err);
              return 
            })
          }
        })
      },
      ...mapActions({
      getMenuList:'menu/getMenuListAction'
    }),
    edit(id){
      // console.log(id);
      getOneMenuList({id})
      .then(res=>{
        // console.log(res);
        if(res.data.code==200){
          this.form=res.data.list
          this.form.id=id
        }
      })
    },
    sendEdit(formName){
       this.$refs[formName].validate((valid)=>{
          if(valid){
            editOneMenuList(this.form)
            .then(res=>{
              // console.log(res);
              // console.log(this.form);
              if(res.data.code==200){
                this.$message.success(res.data.msg)
                this.handle()
                this.getMenuList()
              }
              if(res.data.code==500){
                 this.$message.error(res.data.msg)
                 return
              }
            })
            .catch(err=>{
              console.log(err);
              return 
            })
          }
        })
    }
    },
    computed:{
       ...mapGetters({
      'menuList':'menu/getMenuList'
    })
    }
};
</script>

<style lang="" scoped >
</style>