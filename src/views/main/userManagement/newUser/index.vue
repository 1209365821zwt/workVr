<template>
  <div class="main-user">
     <div class="userheader">
       <s-Navlink :navlink="navlink"></s-Navlink>
     </div>
     <div class="usercontent">
         <router-view></router-view>
     </div>
  </div>
</template>

<script>
import SNavlink from '@/components/navLink'
export default {
    components:{
        SNavlink
    },
    data(){
        return {
            navlink:[
                {
                    path:'/newUser/buildUser',
                    title:"用户管理"
                },{
                    path:'/newUser/editUser',
                    title:'新建用户'
                }
            ]
        }
    }
}
</script>

<style lang='stylus' scoped>
.main-user{
width: 100%;
height: 100%;
}
</style>