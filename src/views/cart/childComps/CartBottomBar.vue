<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :isChecked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>

    <div class="price">总价: {{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">去结算({{ checkLength }})</div>
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
    isSelectAll() {
      if (this.cartList.length === 0) {
        return false;
      }

      // 1.使用filter
      // return !this.cartList.filter((item) => item.checked).length;

      // 2.使用find
      // return !this.cartList.find((item) => !item.checked);

      // 3.普通遍历方法
      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        // 全不选中
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择商品", 2000);
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  align-items: center;

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
  flex: 1;
  text-align: center;
  font-weight: 700;
}

.calculate {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  background-color: rgb(255, 152, 169);
  color: #fff;
  border-radius: 30px;
}
</style>