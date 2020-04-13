<template>
  <div>
      <Magnumform :object='object' :ind='ind'></Magnumform>
  </div>
</template>

<script>
import Magnumform from '../components/magnumForm'
export default {
 components:{
   Magnumform
 },
 data(){
   return {
    object:{},
    ind:1
   }
 },
  created(){
     this.object=this.$route.query.item
  }
}
</script>

<style>

</style>