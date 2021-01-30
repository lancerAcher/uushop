<template>
<div>
    <el-dialog
    :title="flag.editFlag?'编辑商品分类':'添加商品分类'"
    :visible.sync='flag.Show'
     width="30%"
    :before-close="handle"
    >
    <el-form :rules="rules" :model="form" label-width="80px" ref="ruleForm">

         <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
         <el-form-item label="图片" v-if="form.pid!=0" >
             <!-- 
            上传视图 
            action	必选参数，上传的地址	string
            on-preview	点击文件列表中已上传的文件时的钩子	function(file)	—	—
            on-remove	文件列表移除文件时的钩子	function(file, fileList)
            
            on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            list-type	文件列表的类型
            auto-upload	是否在选取文件后立即进行上传 默认是true 
            file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array
            limit	最大允许上传个数	number
            on-exceed	文件超出个数限制时的钩子	function(files, fileList)
            -->
            <el-upload
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item label="状态">
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
        <el-button @click="handle">取 消</el-button>
        <el-button v-if="!flag.editFlag" type="primary" @click="send('ruleForm')">确 定</el-button>
        <el-button v-else type="primary" @click="sendEdit('ruleForm')">编 辑</el-button>
    </span>
    </el-dialog>
</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {setBanner,editBanner,getOneBanner} from '../../util/axios'
export default {
    data() {
        return {
             form:{
                title:'',//标题
                img:'',//图片(文件，一般用于二级分类)
                status:1//状态1正常2禁用
            },
             rules:{
                title:[
                    { required: true, message: '请填写标题', trigger: 'blur' },
                ]
            },
            dialogImageUrl: "", //预览图片地址
            dialogVisible: false, //预览的弹框默认是false
            imgUrl: "", //文件图片的配置对象
            fileList: [] //上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
            
        }
    },
    props:['flag'],
    methods: {
        //文件上传的限制
        handleExceed(files, fileList) {
        this.$message.warning(
            `当前限制选择 1 个文件，本次选择了 ${
            files.length
            } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        );
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;

        },
         //当文件改变时，触发的函数方法
        onChange(file) {
            // console.log(file, "文件的属性配置");
            this.imgUrl = file.raw;
            // console.log(this.imgUrl);
        },
        handle(){
            this.$emit('change',false);
            this.$refs.ruleForm.resetFields();
             this.fileList=[]

        },
        send(formName){
            //  console.log(this.form);
                this.$refs[formName].validate(valid=>{
                    if(valid){
                        
                        this.form.img=this.imgUrl;
                        setBanner(this.form)
                        .then(res=>{
                            if(res.data.code==200){
                                console.log(res);
                                this.$message.success(res.data.msg)
                                this.handle()
                                this.getBanner()
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
                
        },
        sendEdit(formName){
          this.$refs[formName].validate(valid=>{
              if(valid){
                  this.form.img=this.imgUrl;
                  editBanner(this.form)
                  .then(res=>{
                      if(res.data.code==200){
                                this.$message.success(res.data.msg)
                                this.handle()
                                this.getBanner()
                            }
                            if(res.data.code==500){
                                this.$message.error(res.data.msg)
                                return
                            }
                  })
              }
          })
        },
        edit(id){
            console.log(id);
             getOneBanner({id})
            .then(res=>{
                // console.log(res);
                if(res.data.code==200){
                    this.form=res.data.list;
                    this.form.id=id
                    // 判断图片是否存在，如果存在则吧图片地址给fileList
                    // 如果不存在则将其置空
                    this.fileList=this.form.img?[{url:this.$imgUrl+this.form.img}]:[]
                    
                    
                }
            })
        },
        ...mapActions({
           getBanner:'banner/actionGetBanner' 
        })
    },
    mounted() {
        this.getBanner()
    },
    computed:{
        ...mapGetters({
            bannerList:'banner/bannerList'
        })
    }
}
</script>

<style lang="" scoped >


</style>