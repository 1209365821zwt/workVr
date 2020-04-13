<template>
  <div>
      <Magnumform :ind='ind'></Magnumform>
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
      ind:2
    }
 },
 created(){
 }
}
</script>

<style>

</style>