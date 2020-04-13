<template>
  <div>
      <s-Navlink :navlink="navlink"></s-Navlink>
      <div class="magnum-content">
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
                  path:'/newMagnum/buildData',
                  title:'新建医院-代表关系'
              },
              {
                  path:'/newMagnum/editData',
                  title:'数据管理'
              }
          ],
         
      }
  },

}
</script>

<style>

</style>