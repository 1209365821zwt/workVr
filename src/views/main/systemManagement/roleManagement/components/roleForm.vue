<template>
<div class="main-topform">
    <div class="topform">
         <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <div class="top1">
  <el-form-item label="角色名称：" prop="name">
           <el-input v-model="formInline.name" placeholder="请输入"></el-input>
    </el-form-item>
  </div>  
  </el-form> 
         <s-Button  @search="search" @reset="reset('formInline')"></s-Button>
 </div>
</div>


</template>

<script>
export default {
    data(){
        return {
            formInline:{
                name:''
            }
        }
    },
    methods:{
        search(){
            console.log('查询')
        },
        reset (formName) {
            this.$refs[formName].resetFields();
        },
    }
}
</script>

<style lang='stylus' scoped>
.main-topform{
  width: 100%;
}
.topform{
  width: 100%;
  display: flex;
  .top1{
        flex: 3;
        display: flex;
        flex-wrap: nowrap;
        // justify-content: space-between;
        .el-form-item{
            flex-shrink: 0;
           width:100%;
            display: flex;
            margin-right: 20px;
            .el-form-item__label{
                width: 100px!important;
                text-align: left;
            }
        }
  }
    .search-reset{
       flex: 1;
        text-align: right;
        margin-right: 20px;
    }
}

</style>