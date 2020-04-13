<template>
  <div>
      <el-breadcrumb separator="/">
  <el-breadcrumb-item v-for="item in navlink" :key='item.title' :to="item.path">
   {{item.title}}
  </el-breadcrumb-item>
</el-breadcrumb>
  </div>
</template>

<script>
export default {
    name:'Navlink',
   props:{
       navlink:{
           type:Array,
           default:()=>[]
       }
   }
}
</script>

<style>

</style>