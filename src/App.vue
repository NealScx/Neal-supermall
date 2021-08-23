<template>
  <div id="app">
    <!-- exclude需要组件有name值 -->
    <keep-alive exclude="Detail"> 
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar.vue";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style scoped>
@import "assets/css/base.css";
</style>
