<template>
<div>
     <van-nav-bar title="分类" left-arrow />
      <div class="search">
      <input type="text" class="iconfont" :placeholder="seachPlaceholder" />
      </div>
          <div class="content">
      <div class="leftList">
        <ul>
          <li
            :class="index == checkedCart ? 'checked' : ''"
            v-for="(item, index) in cateTree"
            :key="item.id"
            @click="changeCart(index)"
          >
            {{ item.catename }}
          </li>
        </ul>
      </div>
      <div class="rightCart">
        <!-- <ul> -->
          <div :class="checkedCart==index?'checkedCar cart ':'cart'"  v-for="(item, index) in cateTree" :key="index" >
            <div v-if="!item.children" class="blankSpace">
               <h2> 这个分类是空的呢！</h2>
            </div>
            <ul>
              <li v-for="list in item.children" :key="list.id" @click="toList(list.id)">
                <img :src="list.img?$imgUrl+list.img:'http://p3.music.126.net/YKl4IRmJi4MPTx_cuJfJeQ==/109951165289082650.jpg?param=140y140'" alt="" />
                <p>{{list.catename}}</p>
              </li>
             
            </ul>
          </div>
        
      </div>
    </div>
</div>
</template>

<script>
import { getCateList } from "../util/axios";
export default {
  data() {
    return {
      seachPlaceholder: "\ue661 按内容搜索",
      cateTree: [],
      checkedCart: 0,
    };
  },
  mounted() {
    getCateList().then((res) => {
      if (res.code === 200) {
        this.cateTree = res.list;
      }
      console.log(res);
    });
  },
  methods: {
    changeCart(idx) {
      this.checkedCart = idx;
    },
    toList(id){
      this.$router.push('/list?id='+id)
    }
  },
};
</script>

<style lang="" scoped >
.search {
  height: 0.52rem;
  background-image: linear-gradient(180deg, #FF6040 0%, #FF8A80 100%);
  box-shadow: 0 29px 46px 0 rgba(255, 149, 128, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.search input {
  width: 3.55rem;
  height: 0.32rem;
  background: #FFFFFF;
  border: 1px solid #E6E6E6;
  border-radius: 3px;
  padding: 0.08rem 0.12rem;
  box-sizing: border-box;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 22px;
}
.search input::-webkit-input-placeholder {
  color: #999999;
}
.content {
  display: flex;
  width: 100%;
  height: 5.2rem;
  background-color: #f2f2f2;
}
.content .leftList {
  width: 1.18rem;
  height: 100%;
  background: #FFFFFF;
  box-shadow: 0 0.05rem 0.1rem 0 rgba(51, 51, 51, 0.1);
  overflow: auto;
}
.content .leftList ul {
  display: flex;
  flex-direction: column;
}
.content .leftList ul li {
  font-size: 0.14rem;
  color: #999999;
  text-align: center;
  line-height: 0.44rem;
}
.content .leftList ul li.checked {
  font-size: 0.16rem;
  color: #FF6040;
  text-align: center;
  font-weight: bold;
}
.content .rightCart {
  flex: 1;
}
.content .rightCart .checkedCar {
  display: block !important;
}
.content .rightCart .cart {
  display: none;
  width: 2.32rem;
  margin: 0.1rem auto;
  background-color: #FFFFFF;
  padding: 0.1rem 0.05rem;
  box-sizing: border-box;
}
.content .rightCart .cart .blankSpace {
  text-align: center;
}
.content .rightCart .cart .blankSpace h2 {
  margin: 0.8rem 0;
  color: black;
}
.content .rightCart .cart:last-child {
  margin-bottom: 0.15rem;
}
.content .rightCart .cart ul {
  display: flex;
  flex-wrap: wrap;
}
.content .rightCart .cart ul li {
  margin: 0 0.05rem 0.1rem;
}
.content .rightCart .cart ul li img {
  width: 0.64rem;
  height: 0.64rem;
}
.content .rightCart .cart ul li p {
  width: 0.64rem;
  margin-top: 0.05rem;
  font-size: 0.12rem;
  color: #999999;
  text-align: center;
  line-height: 0.12rem;
}


</style>