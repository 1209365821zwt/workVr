<template>
  <div>
    <div class="header">
<el-breadcrumb separator="/">
  <el-breadcrumb-item to="/newProject/projectChild">项目管理</el-breadcrumb-item>
  <el-breadcrumb-item to="/newProject/projectEdit">项目编辑</el-breadcrumb-item>
</el-breadcrumb>
</div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
    props:{
 
    },
    created(){
    },
    components:{
    }
}
</script>

<style>

</style>