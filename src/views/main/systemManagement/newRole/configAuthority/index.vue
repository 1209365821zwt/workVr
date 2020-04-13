<template>
  <div>
      <Configlist :configList="configList"></Configlist>
  </div>
</template>

<script>
import Configlist from '../components/configList'
export default {
  components:{
    Configlist
  },
  data(){
    return {
       configList:[
         {
           title:'首页'
         },
         {
           title:"项目管理"
         },
         {
           title:'数据管理',
           children:[
             {
               title:'医院-代表关系'
             },
             {
               title:'医生-代表关系'
             }
           ]
         },
          {
           title:'功能管理',
           children:[
             {
               title:'功能配置'
             }
           ]
         },
       ]
    }
  }
}
</script>

<style>

</style>