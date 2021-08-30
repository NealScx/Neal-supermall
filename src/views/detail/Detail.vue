<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNav"
    />
    <scroll
      class="content"
      ref="scroll"
      :pullUpLoad="true"
      :probeType="3"
      @scroll="contentScroll"
    >
      <!-- 属性:topImages 传入值:top-images -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";

import Scroll from "../../components/common/scroll/scroll.vue";
import { debouce } from "../../common/utils";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
  },

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // console.log(this.iid);

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result;

      // 2.取出轮播图的数据
      this.topImages = data.itemInfo.topImages;

      // 3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 6.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      this.$nextTick(() => {
        // 根据最新的数据,对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完成(目前获取到的offsetTop不包含其中的图片)
      });
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    // 4.给getThemeTopY赋值(对给this.themeTopY赋值的操作进行防抖)
    this.getThemeTopY = debouce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);

      console.log(this.themeTopYs);
    });
  },
  mounted() {},
  updated() {},

  methods: {
    imageLoad() {
      // console.log(this.$refs.scroll.scroll);
      // console.log(this.$refs.scroll.scroll.refresh);
      this.$refs.scroll.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;

      // 2.positionY和主题中值进行对比
      // [0, 6841, 7457, 7768]

      // positionY 在 0 和 6841之间，index = 0
      // positionY 在 =6841 和 7457之间，index = 1
      // positionY 在 7457 和 7768之间，index = 2

      // positionY >=7768时，index = 3
      let length = this.themeTopYs.length;
      for (let i = 0; i < this.themeTopYs.length; i++) {
        // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
        //   console.log(i);
        // }
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i == length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.detailNav.currentIndex = this.currentIndex;
        }
      }
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>