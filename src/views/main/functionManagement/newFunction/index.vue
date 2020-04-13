<template>
  <div>
      <s-Navlink :navlink='navlink'></s-Navlink>
      <div class="function-content">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
          navlink:[
              {
                  path:'/newFunction/functionEdit',
                  title:'功能管理'
              },
              {
                  path:'/newFunction/configFunction',
                  title:'配置功能'
              }
          ]
      }
  }
}
</script>

<style>
.function-content{
    width: 100%;
    height: 100%;
}
</style>