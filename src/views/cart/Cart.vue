<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>
<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";


import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: { NavBar, CartList, CartBottomBar },
  computed: {
    // 两种语法
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: white;

  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.cart {
  height: 100vh;
}
</style>