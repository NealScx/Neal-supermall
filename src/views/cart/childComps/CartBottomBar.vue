<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" />
      <span>全选</span>
    </div>

    <div class="price">总价: {{ totalPrice }}</div>

    <div class="calculate">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton.vue";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: { CheckButton },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "¥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;
  background-color: #eee;
}

.check-content {
  display: flex;
  width: 80px;
  align-items: center;
  margin-left: 10px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 80px;
  text-align: center;
  font-size: 14px;
  background-color: rgb(255, 152, 169);
  color: #fff;
  border-radius: 30px;
}
</style>