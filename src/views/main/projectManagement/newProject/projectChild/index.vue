<template>
  <div>
     <formItem :ind='ind'></formItem>
  </div>
</template>

<script>
import formItem from '../components/formItem'
export default {
    components:{
        formItem
    },
    data(){
        return{
            ind:0
        }
    },
    created(){
        this.ind=this.$route.query.ind
    }
}
</script>

<style>

</style>