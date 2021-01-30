<template>
<div>
    <van-nav-bar title="个人中心" left-arrow @click-left="$router.back()"/>
    <div class="top">
        <div v-if="form" class="head">
        <!-- 用户头像 -->
        <van-image
        round
        width=".64rem"
        height=".64rem"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <!-- 用户名 -->
        <div class="msg">
            <p class="username">{{form.nickname}}</p>
            <p class="detail">完善资料让小U更懂您</p>
        </div>
        <!-- 每日签到 -->
        <div class="tip">
            每日签到
        </div>
        </div>
        <div v-else class="head">
            <!-- 用户头像 -->
            <van-image
            round
            width=".64rem"
            height=".64rem"
            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1467095430,4291835140&fm=15&gp=0.jpg"
            />
            <!-- 用户名 -->
            <div class="msg">
                <p class="username" @click="$router.push('/login')" >请登录</p>
                <p class="detail">完善资料让小U更懂您</p>
            </div>
            <!-- 每日签到 -->
            <div class="tip">
                每日签到
            </div>
            
        </div>
        <van-grid :border="false" :column-num="4" >
            <van-grid-item>
                <p>12</p>
                我的收藏
            </van-grid-item>
            <van-grid-item>
                <p>12</p>
                浏览记录
            </van-grid-item>
            <van-grid-item>
                <p>￥0</p>
                我的红包
            </van-grid-item>
            <van-grid-item>
                <p>12</p>
                优惠券
            </van-grid-item>
        </van-grid>
        <div class="order">
            <van-cell title="我的订单" is-link value="全部订单" />
             <van-grid :border="false" :column-num="4" >
            <van-grid-item>
                <van-icon name="pending-payment" size=".32rem"/>
                代付款
            </van-grid-item>
            <van-grid-item>
                <van-icon name="free-postage" size=".32rem"/>
                待收货
            </van-grid-item>
            <van-grid-item>
                <van-icon name="records" size=".32rem"/>
                评价
            </van-grid-item>
            <van-grid-item>
                <van-icon name="cash-back-record" size=".32rem"/>
                售后/退款
            </van-grid-item>
        </van-grid>
        </div>
    </div>
    <div class="select">
         
            <van-cell title="地址管理" is-link icon="location-o" />
            <van-cell title="我的钱包" is-link icon="gold-coin-o" />
            <van-cell title="我的二维码" is-link icon="qr" />
            <van-cell title="我的小伙伴" is-link icon="friends-o" />
        
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            form:{}
        }
    },
    mounted() {
        // 获取角色数据
        this.form=sessionStorage.getItem('login')?JSON.parse(sessionStorage.getItem('login')):false;
        console.log(this.form);
    },
    methods: {
        
    },
}
</script>

<style lang="" scoped >
.top{
    background-image: linear-gradient(180deg, #FF6040 0%, #FF8A80 100%);
    padding: .1rem;
    box-shadow: 0 .02rem .06rem 0 rgba(255,149,128,0.50);
    position: relative;
    height: 2.1rem;
}
.head{
    box-sizing: border-box;
    display: flex;
    position: relative;
}
.username{
    font-size: .18rem;
    color: #FFFFFF;
    line-height: .18rem;
}
.msg{
    margin-left: .1rem;
    height: .64rem;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}
.detail{
    font-family: PingFangSC-Regular;
    font-size: .1rem;
    color: #FFFFFF;
    line-height: .1rem;
    border-radius: .03rem;
    padding: .01rem;
    border: 1px solid white;
}
.tip{
    position: absolute;
    right: 0;
    top: .32rem;
    background: #FFD4CC;
    border-radius: .1rem 0 0 .1rem;
    font-size: .1rem;
    color: #FF6243;
    text-align: right;
    line-height: .2rem;
    width: .76rem;
    height: .2rem;
    padding: 0 .1rem;
    box-sizing: border-box;
}
.van-grid{
    margin-top: .1rem; 
    color: #fff;
    
}
.van-grid p{
    font-size: .18rem;
    margin-bottom: .05rem;
    
}
.van-grid-item >>>.van-grid-item__content {
    background: none;
}
.van-icon{
    margin-bottom: .05rem;
}
.van-cell{
    background: none;
    position: unset;
}
.order{
    background: #ccc;
    border-radius: .04rem;
    position: absolute;
    bottom: -.6rem;
    width: 3.55rem;
}
.select{
    margin-top: 100px;
}
</style>