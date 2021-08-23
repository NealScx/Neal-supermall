<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
import TabControl from "../../components/content/TabControl/TabControl.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import Scroll from "../../components/common/scroll/scroll.vue";
import BackTop from "../../components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
// import Swiper from 'components/common/swiper/Swiper.vue';
// import SwiperItem from 'components/common/swiper/SwiperItem';

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("sell");
    this.getHomeGoods("new");
  },

  mounted() {
    // 获取tabControl的offsetTop
    // 所有的组件都有一个属性$el:用于获取组件中的元素
  },

  destroyed() {
    console.log("home_destoryed");
  },
  activated() {
    this.$refs.scroll.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY,0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },

  methods: {
    //  事件监听相关的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 通过自定义事件使用从Scroll.vue传来的position
    contentScroll(position) {
      // 1.判断BackTop是否显示
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
      console.log(position.y);
      console.log(this.tabOffsetTop);
    },
    loadMore() {
      this.getHomeGoods(this.currentType);

      this.$refs.scroll.scroll.refresh();
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh; /* vh:viewport height; */
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content {
  /* height: 300px; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* overflow: hidden; */
}

.tab-control {
  position: relative;
  z-index: 9;
}
/* .content {
  height: calc(100% - 49px); 
  margin-top: 44px;
} */
</style>