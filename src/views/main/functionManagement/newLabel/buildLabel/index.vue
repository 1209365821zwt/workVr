<template>
  <div>
      <Newlabelform :ind='ind'></Newlabelform>
  </div>
</template>

<script>
import Newlabelform from '../components/newLabelForm'
export default {
  components:{
    Newlabelform
  },
  data(){
    return {
      ind:1
    }
  }
}
</script>

<style>

</style>