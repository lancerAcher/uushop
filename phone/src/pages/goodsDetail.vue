<template>
  <div>
    <van-nav-bar title="商品详情" left-arrow @click-left="$router.back()" />

    <div>
      <van-swipe :autoplay="2000">
        <van-swipe-item v-if="detailList.img == ''">
          <img
            class="swiperImg"
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2014707384,415122160&fm=15&gp=0.jpg"
            alt=""
            height="100%"
            width="100%"
          />
        </van-swipe-item>
        <van-swipe-item v-else v-for="item in detailList.img" :key="item.id">
          <img
            class="swiperImg"
            :src="
              item.img
                ? $imgUrl + item.img
                : 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2014707384,415122160&fm=15&gp=0.jpg'
            "
            alt=""
            height="100%"
            width="100%"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="content">
      <div class="text">
        <p>{{ detailList.goodsname }}</p>
        <p>
          ￥{{ detailList.market_price
          }}<span>(此价格不与套装优惠同时享受)</span>
        </p>
      </div>
    </div>
    <div class="listDetail">
      <div>
        <span class="goodsname">购买数量</span>
        <van-stepper v-model="num" />
      </div>
      <div>
        <p>商品属性</p>
      </div>
      <div>
        <p>
          {{ detailList.specsname}}
         <van-tag v-for="attr in attrList" :key="attr" type="success">{{
            attr
        }}</van-tag>
        </p>
      </div>
    </div>
    <div class="ShopDetail">
      <div>
        <h3>商品详情</h3>
      </div>
      <div v-html="detailList.description"></div>
    </div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button
        @click="toCart"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button @click="toBuy" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
//调取封装的接口
import { getGoodsInfo, addCart } from "../util/axios";
import { Toast } from "vant";
//调用弹框要引入一下
import { Dialog } from "vant";
export default {
  data() {
    return {
      detailList: {}, //商品详情
      num: 0, //购买数量
      attrList: [],
    };
  },
  mounted() {
    //组件一加载就调取商品详情接口
    getGoodsInfo({
      id: this.$route.query.id,
    }).then((res) => {
      console.log(res, "商品详情");
      if (res.code == 200) {
        this.detailList = res.list[0];
        this.attrList = res.list[0].specsattr
          ? res.list[0].specsattr.split(",")
          : [];
      }
    });
  },
  methods: {
    toCart() {
      //已登录的状态，跳转到购物车页面并调取添加购物车接口
      if (sessionStorage.getItem("login")) {
        //   console.log(typeof JSON.parse(sessionStorage.getItem("login")).uid);
        //   console.log(typeof this.num);
        //   console.log(typeof this.detailList.id);
        //调取添加接口
        addCart({
                uid:JSON.parse(sessionStorage.getItem('login')).uid,
                num:this.num,
                goodsid:this.detailList.id
        }).then((res) => {
            console.log(res);
          Toast.success(res.msg);
          //跳转到购物车列表
          this.$router.push({
            path: "/cart",
            query: {
              uid: JSON.parse(sessionStorage.getItem("login")).uid,
            },
          });
        });
      } else {
        //未登录的状态让其去登录
        this.$router.push("/login");
      }
    },
    //跳转到订单页
    toBuy() {
      Dialog.alert({
        message: "暂无订单页，再见！！！",
      }).then(() => {
        // on close
      });
    },
  },
};
</script>

<style lang="" scoped >
.goodsname {
  font-size: 24px;
}
.price {
  font-size: 20px;
  color: red;
}
.priceInfo {
  font-size: 22px;
  color: #ccc;
}
.van-stepper {
  display: inline-block;
}
.content {
  color: black;
  height: 1.3rem;
  background-color: white;
}
.content .text {
  padding: 0.1rem;
}
.content .text p:nth-child(1) {
  /* height: 0.4rem; */
  overflow: hidden;
  font-size: 0.28rem;
  line-height: 0.5rem;
}
.content .text p:nth-child(2) {
  margin-top: 10px;
  font-size: 0.24rem;
  color: #e33c3e;
}
.content .text p:nth-child(2) span {
  color: #868686;
  font-size: 0.12rem;
  margin-left: 0.15rem;
}
.listDetail {
  margin-top: 0.2rem;
  font-size: 0.18rem;
  /* height: 4rem; */
  background-color: white;
  line-height: 1rem;
  color: black;
}
.listDetail div {
  height: 0.6rem;
  background-color: white;
  line-height: 0.6rem;
  color: #3b3b3b;
  padding: 0 0.15rem;
}
.listDetail div:nth-child(2) {
  border-bottom: 1px solid #868686;
  display: flex;
  justify-content: space-between;
}
.listDetail div:nth-child(2) p span {
  color: #b2291d;
  border: 1px solid #b2291d;
  padding: 0 0.1rem;
  margin: 0 0.05rem;
  border-radius: 0.06rem;
}
.listDetail div:nth-child(1) {
  border-bottom: 1px solid #868686;
  display: flex;
  justify-content: space-between;
}
.listDetail div:nth-child(1) > div {
  padding: 0;
  width: 1.2rem;
  height: 0.30rem;
  align-self: center;
  border: 1px solid #868686;
  border-radius: 0.06rem;
  overflow: hidden;
  display: flex;
}
.listDetail div:nth-child(1) > div input {
  text-align: center;
  border: none;
  font-size: 0.16rem;
}
.listDetail div:nth-child(1) > div input:nth-child(odd) {
  width: 0.4rem;
  height: 100%;
}
.listDetail div:nth-child(1) > div input:nth-child(2) {
  flex: 1;
  width: 0.2rem;
  padding: 0 0.1rem;
  border-left: 1px solid #868686;
  border-right: 1px solid #868686;
}
.listDetail div:nth-child(3) p {
  color: #b6b6b6;
  font-size: 0.18rem;
}
.listDetail div:nth-child(3) p span {
  display: inline-block;
  padding: 0 0.13rem;
  line-height: 0.4rem;
  margin: 0 0.05rem;
  background-color: #e1e1e3;
  color: white;
  border-radius: 0.08rem;
}
.listDetail div:nth-child(3) p span:nth-child(1) {
  margin-left: 0.6rem;
}
.listDetail div:nth-child(3) p span:hover {
  background-color: #e33c3e;
}
.ShopDetail {
  color: black;
  margin-bottom: 1rem;
  background-color: white;
}
.ShopDetail div:first-child {
  height: 0.8rem;
  margin-top: 0.2rem;
  padding: 0 0.15rem;
}
.ShopDetail div h3 {
  font-size: 0.22rem;
  line-height: 0.8rem;
  color: #3b3b3b;
}

.account {
  width: 3.75rem;
  height: 0.5rem;
  margin: auto;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
.account a {
  flex: 1;
  align-self: center;
  text-align: center;
}
.account a p {
  /* margin-top: 0.1rem; */
  font-size: 0.18rem;
  color: #868686;
}
.account a i {
  font-size: 0.24rem;
}

.account input {
  width: 1.4rem;
  border: none;
  font-size: 0.18rem;
  color: white;
}
.account input:nth-child(2) {
  background-color: #f26b10;
}
.account input:nth-child(3) {
  background-color: #e43d40;
}
</style>