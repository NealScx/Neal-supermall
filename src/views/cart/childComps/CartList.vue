<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll" :pullUpLoad="true">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import scroll from "../../../components/common/scroll/scroll.vue";
import CartListItem from "./CartListItem.vue";

export default {
  components: { scroll, CartListItem },
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
}

.content {
  height: 100%;
  overflow: hidden;
}
</style>