<template>
<div>
    <el-dialog
    :title="flag.editFlag?'编辑商品规格':'添加商品规格'"
    :visible.sync="flag.Show"
    width="43%"
    :before-close="handle"
    >
    <el-form :rules="rules" :model="form" label-width="80px" ref="ruleForm" >
         <el-form-item label="规格名称" prop="specsname">
            <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item
            v-for="(item, index) in arr"
            label="规格属性"
            :key="index"
        >
         <el-input v-model="item.lable" style="width:75%"></el-input>
         <el-button v-if="index==0" @click="addInput" type="primary">新增规格属性</el-button>
         <el-button v-else @click="delInput(index)">删除</el-button>
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
import {oneShopSize,editShopSize,setShopSize} from '../../util/axios'
import {mapGetters,mapActions} from 'vuex'
export default {
    props:['flag','pag'],
    data() {
        return {
            form:{
                specsname:'',//商品规格名称
                attrs:'',//商品规格属性值
                status:1//状态1正常2禁用
            },
            rules:{
                specsname:[
                     { required: true, message: '请填写用户名', trigger: 'blur' },
                ]
            },
            arr:[
                {
                    lable:''
                },
                
            ]
            
        }
    },
    methods: {
        addInput(){
           if(this.arr.length<=6){
                this.arr.push({lable:''})
           }else{
               this.$message.warning("最多只能添加6个输入框");
           }
        },
        delInput(index){
            this.arr.splice(index,1)
        },
        ...mapActions({
            allShopSize:'shopsize/allShopSizeAction',
            
        }),
        handle(){
            this.$emit('change',false)
            this.$refs.ruleForm.resetFields();
            this.arr=[
                {
                    lable:''
                },
            ]
        },
        send(formname){
            // console.log(this.arr);
            this.form.attrs=this.arr.map(item=>item.lable).join(',')
            // console.log(this.form);
            this.$refs[formname].validate((vaild)=>{
                setShopSize(this.form)
                .then(res=>{
                    // console.log(res);
                    if(res.data.code==200){
                        this.$message.success(res.data.msg)
                        this.handle()
                        this.allShopSize(this.pag)
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
            })
        },
        edit(id){
            oneShopSize({id})
            .then(res=>{
                if(res.data.code==200){
                    this.form=res.data.list[0]
                    // console.log(res);
                    this.form.id=id
                    this.form.attrs.map((item,index)=>{
                        if(index==0){
                            this.arr[0].lable=item
                        }else{
                            this.arr.push({
                                lable:item
                            })
                        }
                    })
                }
            })
        },
        sendEdit(formName){
              this.$refs[formName].validate((valid)=>{
                  if(valid){
                      this.form.attrs=this.arr.map(item=>item.lable).join(',')
                      editShopSize(this.form)
                      .then(res=>{
                          if(res.data.code==200){
                            this.$message.success(res.data.msg)
                            this.handle()
                            this.allShopSize(this.pag)
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
    computed:{
        
    },
    mounted() {
      
    },
}
</script>

<style lang="stylus" scoped >

   

</style>