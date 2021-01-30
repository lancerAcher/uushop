<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="购物车列表" left-arrow @click-left="$router.back()" />
    <!-- 商品列表 -->
    <van-list v-if="cartList.length > 0">
      <van-swipe-cell v-for="(item) in cartList" :key="item.id">
       
        <van-card
          :price="item.price.toFixed(2)"
          desc="描述信息"
          :title="item.goodsname"
          :num="item.num"
          :thumb="
            item.img
              ? $imgUrl + item.img
              : 'https://img.yzcdn.cn/vant/ipad.jpeg'
          "
        >
          <template #footer>
            <van-stepper
              v-model="item.num"
              theme="round"
              button-size="22"
              disable-input
            />
          </template>
        </van-card>
        <template #right>
          <van-button
            @click="delCart(item.id)"
            square
            text="删除"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
      <van-submit-bar
        button-text="提交订单"
        @submit="onSubmit"
      >

        总计：{{AllPrice}}
      </van-submit-bar>
    </van-list>
    <!-- 无商品列表 -->
    <van-list v-else
      ><van-empty description="购物车空空如也快去买买买！！！"
    /></van-list>
  </div>
</template>

<script>
//引入接口
import { getCartList, deleteCart } from "../util/axios";
//引入弹框
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      cartList: [],
      img: require("../assets/images/select.jpg"),
      AllFlag: false,
    };
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    getCartList() {
      getCartList({
        uid:
          this.$route.query.uid ||
          JSON.parse(sessionStorage.getItem("login")).uid,
      }).then((res) => {
        if (res.code == 200) {
          this.cartList = res.list ? res.list : [];
          this.cartList.flag = false;
        }
      });
    },
    click(idx) {
      this.cartList[idx].flag =!this.cartList[idx].flag;
      this.AllFlag = this.cartList.every((item) => item.flag);
      console.log(this.cartList[idx].flag);
    },
    //封装一个购物车删除事件
    delCart(id) {
      deleteCart({
        id,
      }).then((res) => {
        if (res.code == 200) {
          this.getCartList();
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    // 提交订单
    onSubmit() {},
    all() {
      // console.log(1);
      this.AllFlag = !this.AllFlag;
      if (this.AllFlag) {
        this.cartList.map((item) => (item.flag = true));
      } else {
        this.cartList.map((item) => (item.flag = false));
      }
    },
  },
  computed: {
    AllPrice() {
      let sum = 0;
      this.cartList.map((item) => {
          console.log(item);
          sum += item.num * (item.price / 1);
          console.log(sum);
        
      });
      return sum ;
    },
  },
  //进入组件前的组件守卫
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("login")) {
      //如果已经登录，直接放行，跳转到购物车
      next();
    } else {
      Dialog.confirm({
        title: "未登录",
        message: "未登录不能查看购物车，快登录！！！",
      })
        .then(() => {
          // on confirm
          console.log("跳到登录");
          next("/login");
        })
        .catch(() => {
          //取消就回到上一页
          next(from.path);
        });
    }
  },
};
</script>

<style lang="" scoped>
.van-button {
  height: 100%;
}
.circle {
  display: block;
}

.foot {
  display: flex;
  height: 0.3rem;
  font-size: 0.2rem;
  margin-top: 0.2rem;
}
.foot input {
  margin-top: 0.03rem;
}
.all {
  width: 0.15rem;
  height: 0.15rem;
  border: 1px solid red;
  border-radius: 50%;
}
.span {
  width: 0.15rem;
  height: 0.15rem;
  border: 1px solid red;
  overflow: hidden;
  position: absolute;
  border-radius: 50%;
  z-index: 10;
  top: 35%;
}
.van-swipe-cell {
  position: relative;
}
</style>
