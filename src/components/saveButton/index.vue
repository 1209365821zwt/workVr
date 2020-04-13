<template>
  <div class="save-button">
      <div class="btns">
           <el-button size="small" @click="save">保存</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
      </div>
     
  </div>
</template>

<script>
export default {
    name:'Savebutton',
    methods:{
        save(){
            this.$emit('save')
        },
        cancel(){
            this.$emit('cancel')
        }
    }
}
</script>

<style>

</style>