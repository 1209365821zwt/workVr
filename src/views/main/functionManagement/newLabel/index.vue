<template>
  <div>
      <s-Navlink :navlink='navlink'></s-Navlink>
      <div class="label-content">
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
                  path:'/newLabel/buildLabel',
                  title:'功能管理'
              },
              {
                  path:'/newLabel/editLabel',
                  title:'标签管理'
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