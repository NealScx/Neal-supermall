<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: rgb(233, 233, 233);

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);

}
</style>