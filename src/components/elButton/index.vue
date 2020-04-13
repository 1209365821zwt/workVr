<template>
  <div class="search-reset">
        <el-button size="small" @click="search(true)">查询</el-button>
        <el-button size="small" @click="reset">重置</el-button>
  </div>

</template>

<script>
export default {
    name:'Button',
    data(){
        return {
            input:this.value
        }
    },
    props:{
        value:{
            type:String,
            default:''
        }
    },
    methods:{
        search(isSearch){
            this.$emit('search',this.input,isSearch)
        },
        reset(){
            this.$emit('reset',true)
        }
    }
}
</script>

<style>

</style>