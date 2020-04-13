<template>
  <div>
    <userForm :ind='ind'></userForm>
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
            ind:2
        }
    }
}
</script>

<style>

</style>