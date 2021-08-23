<template>
  <!-- ref/children -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot>
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control
          class="tab-control"
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
        ></tab-control>
        <goods-list :goods="showGoods" />
      </slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
      message: "哈哈哈",
    };
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true, // BetterScroll 2.x版本需要添加
      observeImage: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 2.监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position); //通过自定义事件传出position
    });
    // 3.监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>