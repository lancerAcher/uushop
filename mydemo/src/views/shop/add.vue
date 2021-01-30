<template>
<div>
    <el-dialog
    :title="flag.editFlag?'编辑商品':'添加商品'"
    :visible.sync="flag.Show"
    width="50%"
    @opened='createEditor'
    :before-close="handle"
    >
    <el-form :rules="rules" :model="form" label-width="80px" ref="ruleForm">
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
            <el-select v-model="form.second_cateid" placeholder="请选择">
                <el-option
                v-for="item in secondList"
                :key="item.id"
                :label="item.rolename"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsname">
            <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
            <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="market_price">
            <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片">
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
         <el-form-item label="商品规格" prop='specsid'>
            <el-select v-model="form.specsid" placeholder="请选择"  @change="goods(form.specsid)">
                <el-option
                v-for="item in listShopSize"
                :key="item.id"
                :label="item.specsname"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="规格属性" prop='specsattr'>
            <el-select v-model="form.specsattr" placeholder="请选择" multiple >
                <el-option
                v-for="item in goodsList"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="是否新品">
         <el-radio v-model="form.isnew" :label="1">是</el-radio>
         <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖">
         <el-radio v-model="form.ishot" :label="1">是</el-radio>
         <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
         <el-form-item label="商品描述">
        <div id="editor"></div>
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
import {oneShop,editShop,setShop} from '../../util/axios'
import {mapGetters,mapActions} from 'vuex'
export default {
    props:['flag','pag'],
    data() {
        return {
            form:{
                first_cateid:'',//一级分类编号
                second_cateid:'',//二级分类编号
                goodsname:'',//商品名称
                price:'',//商品价格
                market_price:'',//市场价格
                img:'',//商品图片（文件）
                description:'',//商品描述
                specsid:'',//商品规格编号
                specsattr:'',//商品规格属性
                isnew:1,//是否新品
                ishot:1,//是否热卖推荐
                status:1//状态1正常2禁用
            },
            rules:{
                first_cateid:[
                    { required: true, message: '请选择一级分类', trigger: 'blur' },
                ],
                second_cateid:[
                     { required: true, message: '请选择二级分类', trigger: 'blur' },
                ],
                goodsname:[
                     { required: true, message: '请选择商品名称', trigger: 'blur' },
                ],
                price:[
                     { required: true, message: '请选择商品价格', trigger: 'blur' },
                ],
                market_price:[
                     { required: true, message: '请选择市场价格', trigger: 'blur' },
                ],
                specsid:[
                     { required: true, message: '请选择商品规格', trigger: 'blur' },
                ],
                specsattr:[
                     { required: true, message: '请选择规格属性', trigger: 'blur' },
                ],
            },
            secondList:{},//二级分类列表
            goodsList:[],//商品规格属性
            editor:'',
            dialogImageUrl: "", //预览图片地址
            dialogVisible: false, //预览的弹框默认是false
            imgUrl: "", //文件图片的配置对象
            fileList: [], //上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
            page:{
                size:this.numShopSize,
                page:1
            }//获取商品规格总数并传参获取所有商品规格
        }
    },
    computed:{
        ...mapGetters({
            // 获取商品分类的所有参数
            shopGoodsList:'shopgoods/shopGoodsList',
            // 获取商品规格的数据个数
            numShopSize:'shopsize/allShopSize',
            // 获取商品规格的所有数据
            listShopSize:'shopsize/listShopSize'
        })
    },
    mounted() {
        // 获取商品分类
        this.getShopGoods()
        // 获取商品规格数据
        this.allShopSize(this.page)
    },
    methods: {
        ...mapActions({
            // 获取所有商品数据同时传入参数获取当前页数数据
            allShop:'shop/allShopAction',
            // 获取商品分类的分类数据
            getShopGoods:'shopgoods/actionShopGoods',
            // 获取商品规格的规格数据
            allShopSize:'shopsize/allShopSizeAction'
        }),
        createEditor(){
             //实例化富文本编辑器
            this.editor = new E("#editor");
            //创建并初始化 把des 初识描述属性赋值
            this.editor.create();
            //初始化之后每次都重新赋空
            // this.editor.txt.html('')
            // this.form.description ? this.form.description:''
            console.log(this.form.description);
            this.editor.txt.html(this.form.description)
            //取值 this.editor.txt.html()
        },
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
        // 获取对应id的二级分类编号
        secondId(id){
            let index=this.shopGoodsList.findIndex(item=>id==item.id)
            this.secondList=this.shopGoodsList[index].children
            this.form.second_cateid=''
        },
        // 获取规格属性
        goods(id){
            let index=this.listShopSize.findIndex(item=>id==item.id)
            this.goodsList=this.listShopSize[index].attrs
            this.form.specsattr=''
        },
        handle(){
            this.$emit('change',false);
            this.$refs.ruleForm.resetFields();
            this.fileList=[]
            this.form.description=''
        },
        send(formname){
            this.$refs[formname].validate((vaild)=>{
                if(vaild){
                    this.form.img=this.imgUrl
                    this.form.specsattr=this.form.specsattr?this.form.specsattr.join(','):''
                    this.form.description= this.editor.txt.html()
                    // console.log(this.form);
                    
                    setShop(this.form)
                    .then(res=>{
                        console.log(res);
                        if(res.data.code==200){
                            this.$message.success(res.data.msg)
                            this.handle()
                            this.allShop(this.pag)
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
            oneShop({id})
            .then(res=>{
                if(res.data.code==200){
                    this.form=res.data.list
                    this.form.id=id
                    // 判断图片是否存在，如果存在则吧图片地址给fileList
                    // 如果不存在则将其置空
                    this.fileList=this.form.img?[{url:this.$imgUrl+this.form.img}]:[]
                    this.form.specsattr=this.form.specsattr.split(',');
                    this. secondId(this.form.first_cateid)
                    this.form.second_cateid=id
                }
            })
        },
        sendEdit(formName){
              this.$refs[formName].validate((valid)=>{
                  if(valid){
                      this.form.img=this.imgUrl
                      this.form.specsattr=this.form.specsattr?this.form.specsattr.join(','):''
                      this.form.description= this.editor.txt.html()
                      editShop(this.form)
                      .then(res=>{
                          if(res.data.code==200){
                            this.$message.success(res.data.msg)
                            this.handle()
                            this.allShop(this.pag)
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