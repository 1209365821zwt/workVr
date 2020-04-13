<template>
  <div class="buttonform" :style="{textAlign:'left',marginBottom:'40px'}">
       <el-button type="primary" @click="jumpback">新建</el-button>     
  </div>
</template>

<script>
export default {
    methods:{
        jumpback(){
            this.$router.push('/newRole')
        }
    }
}
</script>

<style lang='stylus' scoped>
.buttonform{
    width: 100%;
}
</style>