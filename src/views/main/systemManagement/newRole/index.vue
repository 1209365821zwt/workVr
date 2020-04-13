<template>
  <div>
      <s-Navlink :navlink='navlink'></s-Navlink>
      <div class="role-content">
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
                    path:'/newRole/buildRole',
                    title:'新建角色'
                },
                {
                    path:'/newRole/editRole',
                    title:'角色管理'
                },
                {
                    path:'/newRole/configAuthority',
                    title:'配置权限'
                }
            ]
        }
    }
}
</script>

<style>
.role-content{
    width: 100%;
    height: 100%;
}
</style>