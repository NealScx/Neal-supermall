<template>
  <scroll ref="scroll" :pullUpLoad="true">
    <div>
      <h2>分类</h2>
      <back-top @click.native="backClick" v-show="isShowBackTop" />
    </div>
  </scroll>
</template>

<script>
import { backTopMixin } from "common/mixin";
import scroll from "../../components/common/scroll/scroll.vue";
export default {
  name: "Category",
  components: { scroll },
  mixins: [backTopMixin],
  data() {
    return {};
  },
  methods: {
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;

      this.listenShowBackTop(position); // mixin
    },
  },
};
</script>

<style scope>
body {
  height: 15000px;
}
</style>