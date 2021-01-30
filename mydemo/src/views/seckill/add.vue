<template>
<div>
    <el-dialog
    :title="flag.editFlag?'编辑商品':'添加商品'"
    :visible.sync="flag.Show"
    width="50%"
    :before-close="handle"
    >
    <el-form :rules="rules" :model="form" label-width="80px" ref="ruleForm">
         <el-form-item label="活动名称" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
         <el-form-item label="活动期限" prop="title">
           <el-date-picker
            v-model="value"
            type="datetimerange"
            value-format='timestamp'
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
            </el-date-picker>
        </el-form-item>
         <el-form-item label="一级分类" prop='first_cateid'>
            <el-select v-model="form.first_cateid" placeholder="请选择"  @change='secondId(form.first_cateid)'>
                <el-option
                v-for="item in shopGoodsList"
                :key="item.id"
                :label="item.catename"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="二级分类" prop='second_cateid' >
            <el-select v-model="form.second_cateid" placeholder="请选择" @change="second">
                <el-option
                v-for="item in secondList"
                :key="item.id"
                :label="item.rolename"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品" prop='goodsid' >
            <el-select v-model="form.goodsid" placeholder="请选择">
                <el-option
                v-for="item in listShop"
                :key="item.id"
                :label="item.goodsname"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="状态">
            <el-switch
                v-model="form.status"
                active-color="#13ce66"
                inactive-color="#ccc"
                :active-value="1"
                :inactive-value="2">
            </el-switch>
        </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="handle">取 消</el-button>
        <el-button v-if="!flag.editFlag" type="primary" @click="send('ruleForm')">确 定</el-button>
        <el-button v-else type="primary" @click="sendEdit('ruleForm')">编 辑</el-button>
    </span>
    </el-dialog>
</div>
</template>

<script>
import E from 'wangeditor'
import {getOneSeckill,editSeckill,setSeckill,listShop} from '../../util/axios'
import {mapGetters,mapActions} from 'vuex'
export default {
    props:['flag',],
    data() {
        return {
            form:{
                title:'',//限时秒杀名称
                begintime:'',//开始时间
                endtime:'',//结束时间
                first_cateid:'',//一级分类编号
                second_cateid:'',//二级分类编号
                goodsid:'',//商品规格编号
                status:1//状态1正常2禁用
            },
            rules:{
                 first_cateid:[
                    { required: true, message: '请选择一级分类', trigger: 'blur' },
                ],
                second_cateid:[
                     { required: true, message: '请选择二级分类', trigger: 'blur' },
                ],
                title:[
                     { required: true, message: '请选择活动名称', trigger: 'blur' },
                ]
            },
            value:[],
            secondList:{},//二级分类列表
            goodsName:[],//商品属性,
            listShop:[]

        }
    },
    computed:{
        ...mapGetters({
            // 获取商品分类的所有参数
            shopGoodsList:'shopgoods/shopGoodsList',

        })
    },
    mounted() {
        // 获取商品分类
        this.getShopGoods()

    },
    methods: {
        ...mapActions({
            // 获取商品分类的分类数据
            getShopGoods:'shopgoods/actionShopGoods',
            // 获取秒杀数据
            getSeckill:'seckill/actionSeckill'
           
        }),
        // 获取对应id的二级分类编号
        secondId(id){
            let index=this.shopGoodsList.findIndex(item=>id==item.id)
            this.secondList=this.shopGoodsList[index].children
            this.form.second_cateid=''
        },
        second(){
            this.form.goodsid=''
           listShop({
               fid:this.form.first_cateid,
               sid:this.form.second_cateid
           }).then(res=>{
               if(res.data.code==200){
                //    console.log(res);
                   this.listShop=res.data.list
               }
           })
        },
        handle(){
            this.$emit('change',false);
            this.$refs.ruleForm.resetFields();
            this.value=[]

        },
        send(formname){
            console.log(this.value);
           this.form.begintime=this.value[0]
           this.form.endtime=this.value[1]
            this.$refs[formname].validate((vaild)=>{
                console.log(this.form);
                if(vaild){
                    setSeckill(this.form)
                    .then(res=>{
                        // console.log(res);
                        if(res.data.code==200){
                            this.$message.success(res.data.msg)
                            this.handle()
                            this.getSeckill()
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
        edit(id){
            getOneSeckill({id})
            .then(res=>{
                if(res.data.code==200){
                    
                    this.form=res.data.list
                    let data1=new Date(this.form.begintime/1)
                    let data2=new Date(this.form.endtime/1)
                    this.value=[data1,data2]
                    this.form.id=id
                    this. secondId(this.form.first_cateid)
                    this.form.second_cateid=id
                   
                    
                }
            })
        },
        sendEdit(formName){
              this.$refs[formName].validate((valid)=>{
                  if(valid){
                    //   this.form.begintime=this.value[0].getTime()
                    //   this.form.endtime=this.value[1].getTime()
                     this.form.begintime=this.value[0]
                    this.form.endtime=this.value[1]
                      editSeckill(this.form)
                      .then(res=>{
                          if(res.data.code==200){
                            this.$message.success(res.data.msg)
                            this.handle()
                            this.getSeckill()
                          }
                          if(res.data.code==500){
                            this.$message.error(res.data.msg)
                            return
                          }
                      })
                      .catch(err=>{
                          console.log(err);
                      })
                      
                  }
              })
        }
    },
    
}
</script>

<style lang="" scoped >


</style>