<template>
    <div class="container">
        <van-nav-bar title="小U商城" left-arrow />
        <!-- 搜索框 -->
        <div class="second">
            <div class="search">
                <div>
                    <span class="iconfont icon-icon_dizhi"></span>
                </div>
                <div >
                    <img :src="second.logo" alt="" class="logo">
                </div>
                <div class="position">
                    <span class="iconfont icon-sousuo"></span>
                    <input type="text" class="inp" placeholder="按内容搜索">
                </div>
                <span class="iconfont icon-shangdian"></span>
            </div>
                <div class="tab">
                <ul>
                    <li :key="item.id" v-for="(item) in tab"><p><span :class="item.icon"></span>{{item.title}}</p></li>
                </ul>
            </div>
            </div>
        <div class="banner">
            <div class="top">
                <div class="banner-left">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="banner-center">
                <!-- 轮播图 -->
               <van-swipe :autoplay="2000">
                <van-swipe-item v-for="item in bannerList" :key="item.id">
                    <img class="swiperImg" :src="item.img?$imgUrl + item.img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2014707384,415122160&fm=15&gp=0.jpg'" alt="" height="100%"  width="100%"/>
                </van-swipe-item>
                </van-swipe>
            </div>
            <div class="banner-right"></div>
            </div>
            <!-- 秒杀 -->
            <div>
                <ul class="banner-bottom">
                    <li :key="item.id" v-for="item in kingKong">
                        <img :src="item.src" alt="">
                        <p>{{item.detail}}</p>
                    </li>
                </ul>
                
            </div>
        </div>
        <div class="msg">
            <!-- 秒杀 -->
            <div class="msg1">
                <div class="left">
                    <div class="head">
                        <h2>限时秒杀</h2>
                        <div><p>查看更多</p><span class="iconfont icon-iconfontjiantou3"></span></div>
                    </div>
                    <p>每天0场,好货秒不停</p>
                    <div class="time">
                        <span>05</span>
                        <i>:</i>
                        <span>20</span>
                        <i>:</i>
                        <span>48</span>
                    </div>
                </div>
                <div class="right">
                    <div :key="item.id" v-for="item in msg">
                        <h2>{{item.title}}</h2>
                        <p>{{item.detail}}</p>
                        <span class="tip"><p>{{item.msg}}</p> <i class="iconfont icon-ic_arrow_r"></i></span>
                    </div>
                </div>
            </div>
            <div class="msg2">
                <van-tabs type="card">
                    <van-tab title="最新商品">
                        <van-card
                        v-for="newGoods in newList"
                        :key="newGoods.id"
                        :price="newGoods.price.toFixed(2)"
                        desc="描述信息"
                        @click='goGoodsDetail(newGoods.id)'
                        :title="newGoods.goodsname"
                        :thumb="
                            newGoods.img
                            ? $imgUrl + newGoods.img
                            : 'https://img.yzcdn.cn/vant/ipad.jpeg'
                        "
                        />
                    </van-tab>
                    <van-tab title="爆款商品">
                        <van-card
                        v-for="hotGoods in hotList"
                        :key="hotGoods.id"
                        :price="hotGoods.price.toFixed(2)"
                        desc="描述信息"
                        @click='goGoodsDetail(hotGoods.id)'
                        :title="hotGoods.goodsname"
                        :thumb="
                            hotGoods.img
                            ? $imgUrl + hotGoods.img
                            : 'https://img.yzcdn.cn/vant/ipad.jpeg'
                        "
                        />
                    </van-tab>
                    <van-tab title="所有商品">
                        <van-card
                        v-for="goods in goodsList"
                        :key="goods.id"
                        :price="goods.price.toFixed(2)"
                        desc="描述信息"
                        @click='goGoodsDetail(goods.id)'
                        :title="goods.goodsname"
                        :thumb="
                            goods.img
                            ? $imgUrl + goods.img
                            : 'https://img.yzcdn.cn/vant/ipad.jpeg'
                        "
                        />
                    </van-tab>
                    </van-tabs>
            </div>
            
        </div>
        <div class="foot"></div>
    </div>
    
</template>

<script>
//引入axios的核心库
import axios from 'axios'
//引入接口文档
import { getBanner, getIndexGoodsList } from "../util/axios";
export default {
    data() {
        return {
           
            second:{
                logo:require('../assets/pic/logo/white.png'),
            },
            tab:[
                {   
                    id:'1',
                    title:'推荐'
                },
                 {
                     id:'2',
                    title:'女装'
                },
                 {
                     id:'3',
                    title:'鞋包'
                }, 
                {
                    id:'4',
                    title:'居家'
                },
                 {
                     id:'5',
                    title:'母婴'
                },
                 {
                     id:'6',
                    title:'美妆'
                },
                {
                    id:'7',
                    title:'分类',
                    icon:'iconfont icon-liebiao'
                }               
            ],
            bannerSrc:[
                {
                    id:1,
                    src:require('../assets/banner/index/mid.png')
                },
                {
                    id:2,
                    src:require('../assets/banner/index/mid.png')
                },
                {
                    id:3,
                    src:require('../assets/banner/index/mid.png')
                },
                {
                    id:4,
                    src:require('../assets/banner/index/mid.png')
                },
                {
                    id:5,
                    src:require('../assets/banner/index/mid.png')
                },{
                    id:6,
                    src:require('../assets/banner/index/mid.png')
                }

            ],
            kingKong:[
                {
                    id:1,
                    src:require('../assets/icon/index/kingkong/seckill.png'),
                    detail:'限时秒杀'
                },
                {
                    id:2,
                    src:require('../assets/icon/index/kingkong/top.png'),
                    detail:'畅销商品'
                },
                {
                    id:3,
                    src:require('../assets/icon/index/kingkong/brand.png'),
                    detail:'品质大牌'
                },
                {
                    id:4,
                    src:require('../assets/icon/index/kingkong/selfsupport.png'),
                    detail:'小U自营'
                },
                {
                    id:5,
                    src:require('../assets/icon/index/kingkong/integral.png'),
                    detail:'积分商城'
                }
            ],
            msg:[
                {
                    id:1,
                    title:'品牌上新',
                    detail:'9点整，抢大牌',
                    msg:'疯抢红包'
                },
                {
                    id:2,
                    title:'日用好物',
                    detail:'愿君多采撷',
                    msg:'塞满奖券'
                },
            ],
           
            msg1flag:'0',
            bannerList: [], //轮播图列表
            hotList: [], //热门商品
            newList: [], //最新商品
            goodsList: [], //所有商品
        }
    },
    methods: {
        change(e){
            this.msg1flag=e;
        },
        goGoodsDetail(id){
            // console.log(id);
             this.$router.push({
                path:'/detail',
                query:{
                id
                }
      })
    
        }
    },
    mounted() {
        //并发处理操作
      //让你按照执行接口顺序去操作你的接口
      axios.all([getBanner(),getIndexGoodsList()])
      .then(axios.spread((bannerList,goodsList)=>{
          console.log(bannerList,'轮播图列表');
          console.log(goodsList,'商品列表');
          //轮播图
          if(bannerList.code==200){
              this.bannerList = bannerList.list
          }
          //商品列表
          if(goodsList.code==200){
              this.newList = goodsList.list[0].content
              this.hotList = goodsList.list[1].content
              this.goodsList = goodsList.list[2].content
          }
      }))
    },
}

</script>

<style lang="" scoped >
.container{
    width: 3.75rem;
    margin: 0 auto;
}
.second{
    height: .8rem;
    background-image: linear-gradient(to bottom,#FF6040,#FF8A80 );
}
.search{
    display: flex;
}
.icon-icon_dizhi{
    color: #ffffff;
    display: block;
    width: .1833rem;
    height: .22rem;
    font-size: .19rem;
    margin: .15rem 0rem 0 .13rem;
}
.logo{
    width: .91rem;
    height: .24rem;
    margin: .14rem 0 0 .1rem;
}
.inp{
    outline: none;
    border: none;
    width: 1.36rem;
    height: .32rem;
    font-size: .14rem;
}
.position{
    position: relative;
    display: flex;
    margin:.1rem 0 0 .2rem;
    background: white;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: .03rem;
}
.icon-sousuo{
    display: block;
    color: #999;
    font-size: .16rem;

    text-align: center;
    line-height: .32rem;
    width: .34rem;
    height: .32rem;
}
.icon-shangdian{
    font-size: .2rem;
    color: #fff;
    margin: .16rem .12rem 0 .18rem;
}
.banner{
    width: 3.75rem;
    height: 3rem;
    /* border: 1px black solid; */
    box-sizing: border-box;
    padding-top: .12rem;
}
.banner .top{
    display: flex;
    justify-content: space-between;
}
.banner-left,.banner-right{
    width: .1rem;
    height: 1.85rem;
    margin-top: .1rem;
}
.banner-left{
    box-shadow: 0 .05rem .05rem  0 rgba(255,191,179,0.20);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.banner-left div{
    width: .1rem;
    background: #FFB580;
}
.banner-left div:nth-child(1){
    height: .17rem;
    border-radius:  0 .03rem  .03rem 0 ;
}
.banner-left div:nth-child(2){
    height: 1.34rem;
   
}
.banner-left div:nth-child(3){
    height: .225rem;
    border-radius:  0 .03rem  .03rem 0 ;
}
.banner-right{
    background: #a6dfcc;
    box-shadow: 0 .05rem .05rem  0 rgba(166,223,204,0.20);
    border-radius: .03rem 0  0 .03rem;
    
}
.banner-center{
    width: 3.35rem;
    height: 1.95rem;
    /* border: 1px black solid; */
    position: relative;
}
.van-swipe{
    width: 100%;
    height: 100%;
}
.banner-bottom {
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-family: PingFangSC-Light;
    font-size: .1rem;
    color: #333333;
    text-align: center;
    line-height: .1rem;
    margin: .25rem 0 .21rem 0;

}
.banner-bottom p{
    margin-top: .05rem;
    transform: scale(.83);
}
.banner-bottom img{
    width: .32rem;
    height: .32rem;
}
.tab{
    display: flex;
    font-size: .14rem;
}
.tab ul{
    display: flex;
    font-family: PingFangSC-Regular;
    color: #FFF3F2;
    text-align: center;
    line-height: .16rem;
    justify-content: space-between;
    box-sizing: border-box;
    padding: .1rem;
    flex: 1;
    
}
.tab li{
    box-shadow: 0 .02rem .06rem 0 rgba(255,149,128,0.50);
}
.icon-liebiao{
    font-size: .12rem;
    /* display: block; */
    
}
.tab  ul li:last-child{
    box-shadow: -0.05rem 0rem .1rem -0.05rem  #E63D2E;
    display: flex;
    height: .28rem;
    background-image: linear-gradient(to bottom,#FF7A68,#FF8A80  );
    
}
.tab  ul li:last-child span{
    margin-right: .02rem;
    margin-left: .0732rem;
}
.msg{
    background: #f2f2f2;
    padding: .1rem;
    box-sizing: border-box;
}
.msg1{
    display: flex;
    justify-content: space-between;
}
.msg1 .right div:first-child{
    background: url('../assets/pic/images/small.png') no-repeat;
    margin-bottom: .05rem;
    background-size: cover;
}
.msg1 .right div{
    width: 1.75rem;
    height: .85rem;
    padding: .1rem .2rem 0 .1rem;
    box-sizing: border-box;
    
}
.msg1 .right div:nth-child(2){
    background: url('../assets/pic/images/02.png') no-repeat;
    background-size: cover;
}
.msg1 .left{
    width: 1.75rem;
    height: 1.75rem; 
    background: url('../assets/pic/images/big.png') no-repeat;
    padding: .1rem .2rem 0 .1rem;
    box-sizing: border-box;
    background-size: cover;
}
.msg1 .left .head{
    display: flex;
    justify-content: space-between;
}
.msg1  h2{
    font-size: .16rem;
    color: #85A642;
    line-height: .16rem;
    width: .64rem;
    height: .16rem;
}
.msg1   p{
    font-size: .12rem;
    color: #333333;
    line-height: .12rem;
    transform: scale(.83);

}
.msg1  p:nth-child(2){
    margin-top: .1rem;
    color: #B1CC7A;
    text-align: left;
    display: block;
    margin-left: -0.13rem;
}
.msg1 .left .head p{
    margin-top: .03rem;
    display: inline-block;
}
.icon-iconfontjiantou3{
    font-size: .03rem;
    color: #333333;
    margin-left: .04rem;
}
.msg1 .time{
    display: flex;
    margin-top: .05rem;
    font-size: .12rem;
    color: #FFFFFF;
    text-align: center;
    line-height: .16rem;  
}
.msg1 .time span{
    display: block;
    width: .16rem;
    height: .18rem;
    background-image: linear-gradient(180deg, #85A642 0%, #B1CC7A 100%);
    border-radius: 1px;
    
}
.msg1 .time i{
    color: #85A642;
    margin: 0 .02rem;
}
.msg1 .right div:first-child h2{
    color: #FF6040;
}
.msg1 .right  div:first-child p{
    color: #FF9580 ;
}
.msg1 .right div:nth-child(2) h2{
    color: #AF40FF;
}
.msg1 .right div:nth-child(2) p{
    color: #CA80FF;
}
.msg1 .right .tip{
    width: .6rem;
    height: .2rem;
    font-size: .12rem;
    line-height: .2rem;
    color: #fff;
    background-image: linear-gradient(180deg, #FF6040 0%, #FF9F80 100%);
    border-radius: .02rem .12rem .12rem .02rem;
    margin-top: .08rem;
    display: flex;
}
.msg1 .right .tip p{
    color: #fff !important;
    line-height: .2rem;
}
.msg1 .right div:nth-child(2) .tip{
    background-image: linear-gradient(180deg, #AF40FF 0%, #F58CFF 100%);
}
.icon-ic_arrow_r{
    line-height: .2rem;
    font-size: .12rem;
    margin-left: -0.03rem;
}
.msg2{
    background: #FFFFFF;
}
.msg2 img{
    width: .8rem;
    height: .8276rem;
}
.msg2 ul{
    display: flex;
    justify-content: space-between;
    position: relative;
}
.msg2 ul:first-child li{
    flex: 1;
    text-align: center;
    font-size: .16rem;
    color: #999999;
    line-height: .16rem;
    margin-bottom: .1579rem;
    margin-top: .1062rem;
}
.msg2 ul:first-child .red{
    color: #FF6040;
}
.msg2 ul .line{
    position: absolute;
    background: #FFFFFF;
    box-shadow: .02rem -1px .02rem -1px rgba(153,153,153,0.20);
    border-radius: .05rem 0 0 0;
    left: 1.8rem;
}
.msg2 ul .line img{
    width: .15rem;
    height: .331rem;

}
.foot{
    height: .83rem;
}
</style>

