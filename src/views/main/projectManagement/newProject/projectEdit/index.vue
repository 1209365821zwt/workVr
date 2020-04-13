<template>
  <div>
      <formItem :projectObj='projectObj' :ind='ind'></formItem>
  </div>
</template>

<script>
import formItem from '../components/formItem'
export default {
    components:{
        formItem
    },
    data(){
        return {
            projectObj:{},
            ind:0
        }
    },
    created(){
        this.projectObj=this.$route.query.item;
        this.ind=this.$route.query.ind
    }
}
</script>

<style>

</style>