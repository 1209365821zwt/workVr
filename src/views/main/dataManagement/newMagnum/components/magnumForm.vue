<template>
  <div class="main-userform">
     <div class="userform" :style="{marginTop:'5%'}">
         <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="所属项目 :" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择">
      <el-option label="区域一" value="1"></el-option>
      <el-option label="区域二" value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="医院名称 :" prop="usertime">
    <el-input v-model="ruleForm.usertime" placeholder="请输入"></el-input>
  </el-form-item>
   <el-form-item label="省份 :" prop="region1">
    <el-select v-model="ruleForm.region1" placeholder="请选择">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="城市 :" prop="region2">
    <el-select v-model="ruleForm.region2" placeholder="请选择">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="所在科室 :" prop="region3">
    <el-select v-model="ruleForm.region3" placeholder="请选择">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="职称 :" prop="region4">
    <el-select v-model="ruleForm.region4" placeholder="请选择">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="代表姓名 :" prop="oauth">
    <el-input v-model="ruleForm.oauth" placeholder="请输入"></el-input>
  </el-form-item>
   <div class="button">
        <el-form-item>
       <el-button type="primary" @click="submitForm" v-if='ind==1'>保存</el-button>
        <el-button type="primary" @click="buildtForm" v-else>保存</el-button>
         <el-button @click="cancel">取消</el-button>
  </el-form-item>
    </div>
</el-form>
      
      <!-- <s-Savebutton @save='save' @cancel="cancel"></s-Savebutton>   -->
     </div>
  </div>
</template>

<script>
export default {
  props:{
    object:{
       type:Object,
       default:()=>{}
    },
    ind:{
      type:Number,
    }
  },
 data() {
      return {
        ruleForm: {
          id:'',
          usertime: '',
          region: '',
          region1:'',
          region2:'',
          region3:'',
          region4:'',
           oauth:'',
        },
      }
 },
 methods:{
     buildtForm(){
        // this.$api.project.projectadd({
        //   usertime:this.ruleForm.usertime,
        //   oauth:this.ruleForm.oauth
        // }).then(res=>{
        //   console.log(res)
        // })
     },
     submitForm(){
      //  this.$api.project.projectedit({
      //     id:this.ruleForm.id,
      //     relate:this.ruleForm.region,
      //     oauth:this.ruleForm.oauth
      //   }).then(res=>{
      //     console.log(res)
      //   })
     },
     cancel(){
       this.$router.push('/dataManagement/magnumRelation')
     },
     init(){
        if(this.object){
          this.ruleForm={...this.object}
        }else{
        this.ruleForm={
         usertime: '',
          region: '',
          region1:'',
          region2:'',
          region3:'',
          region4:'',
           oauth:'',
        }
      }
     }
 },
 created(){
    this.init();
 }
}
</script>

<style lang="stylus">
.main-userform{
    width: 100%;
    height: 100%;
    .userform{
        width: 300px;
        height: 70%;
        margin: auto;
    .el-form-item__label{
        text-align: left!important;
    }
    
    }
    .usertop{
        margin-top: 20px;
    }
    .save-button{
        width: 100%;
        position: relative;
        bottom:-30%;
        .btns{
        width: 100%;
        margin-left: 0;
        }
    }
}
</style>