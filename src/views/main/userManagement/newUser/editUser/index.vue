<template>
  <div class="edditUser">
      <userForm :ind='ind' :object='object'></userForm>
  </div>
</template>

<script>
import userForm from '../components/userForm'
export default {
    components:{
        userForm
    },
    data(){
        return {
            ind:1,
            object:{}
        }
    },
    created(){
        this.object=this.$route.query.row
    }
}
</script>

<style lang='stylus' scoped>
.edditUser{
    width: 100%;
    height: 100%;
}
</style>