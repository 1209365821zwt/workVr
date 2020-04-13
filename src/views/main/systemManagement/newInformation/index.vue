<template>
  <div>
      <s-Navlink :navlink='navlink'></s-Navlink>
      <div class="information-content">
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
                  path:'/newInformation/buildInformation',
                  title:'系统管理'
              },
              {
                  path:'/newInformation/editInformation',
                  title:'账号管理'
              }
          ]
      }
  }
}
</script>

<style>
.information-content{
    width: 100%;
    height: 100%;
}
</style>