<template>
  <div>
      <!-- <Keywordform></Keywordform> -->
      <Tabelkeyword :id='id'></Tabelkeyword>
  </div>
</template>

<script>
import Tabelkeyword from '../components/tabelKeyword'
// import Keywordform from '../components/keywordform'
export default {
    components:{
        Tabelkeyword,
    // Keywordform
    },
    data(){
        return {
            id:0
        }
    },
    created(){
        this.id=this.$route.query.id
    }
}
</script>

<style>

</style>