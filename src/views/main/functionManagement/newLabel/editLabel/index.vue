<template>
  <div>
      <Newlabelform :object='object' :ind='ind'></Newlabelform>
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
      object:{},
      ind:2
    }
  },
  created(){
    this.object=this.$route.query.row;
  }
}
</script>

<style>

</style>