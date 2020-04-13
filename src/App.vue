<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="stylus">
@import './assets/stylus/index.styl'
.el-scrollbar{
  max-width: 200px;
}
</style>
