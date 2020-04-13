<template>
 <div class="labelTable">
     <div class="main-topform">
    <div class="topform">
         <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <div class="top1">
  <el-form-item label="所属项目:" prop="projectName">
    <el-select v-model="formInline.projectName" placeholder="请选择" clearable>
      <el-option v-for='item in projectList' :key='item.id' :label="item.projectName" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="标签名称 ：" prop="labelName">
           <el-input v-model="formInline.labelName" placeholder="请输入"></el-input>
    </el-form-item>
  </div>  
  </el-form> 
          <div class="search-reset">
        <el-button size="small" @click="search">查询</el-button>
        <el-button size="small" @click="reset('formInline')">重置</el-button>
        <el-button type="primary" @click="jumpback">新建</el-button>
  </div>
 </div>
</div>
<el-table
    :data="tableData"
    v-loading="loadingTable"
    :row-class-name="tableRowClassName"
    border
        :style="{marginTop:'3%'}"
    >
    <template v-for="(item,index) in labelList">
          <el-table-column
      :prop="item.name"
      :label="item.label"
      :key="index">
      <template slot-scope="scope">     
       <template v-if="item.name == 'operate'">
       <el-button type="text" @click="labeledit(scope.row)">编辑</el-button>
        <el-button type="text" size="small" @click='handkeyword(scope.row)'>删除</el-button>
    </template>
     <span v-else>{{scope.row[item.name]}}</span>
      </template>
    </el-table-column>
    </template>   
  </el-table>   
  <el-dialog
      width="600px"
      v-if="addPage || editPage "
      :visible="addPage || editPage "
      :before-close="closeAdd"
      :title="dialogTitle"
    >
    <Buildlabel v-if='addPage || editPage' @labelsave='labelsave' @labelcancel='labelcancel' @editlabel='editlabel' :ind='ind' :object='object'></Buildlabel>
    </el-dialog>
    <s-ElPaginations :pageSize="page.pageSize" :page="page.page" :total="page.total" @change="reload"></s-ElPaginations>
 </div>
</template>

<script>
import SElPaginations from '@/components/elPagination'
import * as API from '@/api/function'
import {list} from '@/api/project'
import Buildlabel from '../../newLabel/components/newLabelForm'
export default {
  
    components:{
        SElPaginations,
        Buildlabel
    },
    data() {
        return {
            tableData:[],   
            formInline:{
                projectName:'',
                labelName:'',
            },
            page: {
                page: 1,
                pageSize: 5,
                total: 0
            },
            projectList:[],
            dialogTitle:'新添标签',
            labelList:[
            
                {
                    label:'所属项目',
                    name:'projectName'
                },{
                    label:'标签名称',
                    name:'labelName'
                },
                {
                    label:'创建人',
                    name:'createUserName'
                },
                {
                    label:'创建时间',
                    name:'createTime'
                },
                {
                    label:'操作',
                    name:'operate'
                }
             
            ],
            loadingTable: false,
            addPage:false,
            editPage:false,
            object:{},
            ind:1
        }
    },
    methods: {
        tableRowClassName({ rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        handleClick(row) {
            this.$router.push({
                path:'/newProject/projectEdit',
                query:row
            })
        }, 
        //获取所有列表
        init(){
            list().then(res=>{
                this.projectList=res
            })
        },
        reload(val, type) {
            if (type == 'size') {
                this.page.page = 1;
                this.page.pageSize = val;
            } else {
                this.page.page = val;
            }
            this.submitForm();
        },
        //查询获取列表
        submitForm() {
            this.loadingTable=true;
            //  // eslint-disable-next-line no-unused-vars
            let param={};
            param= {               
                "currentPage": this.page.page,
                "labelName": this.formInline.labelName ? this.formInline.labelName : null,
                "pageSize": this.page.pageSize,
                "projectId": this.formInline.projectName ? this.formInline.projectName : null,
            }
            API.getlabel(param).then(res=>{
                this.tableData = res ? res.list : [];
                this.page.total = res ? res.totalElement : 0;
                this.loadingTable = false;
            }).catch(()=>{
                this.loadingTable=false;
            })
        },
        reset(formName) {
            this.$refs[formName].resetFields();
        },
        handkeyword(row){
            this.$confirm('确认要删除此标签吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                API.dellabel(
                    Number(row.id)
                ).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.submitForm()
                }).catch(()=>{
                    this.$message.error('删除失败')
                })
            }).catch(() => {
                this.$message.warning('此操作已取消')
            })
          
        },
        labeledit(row){
            this.editPage=true;
            this.dialogTitle='编辑数据'
            this.object={
                id:row.id,
                projectId: row.projectId,
                labelName:row.labelName,
            };
            this.ind=row.id
        },
        search(){
            this.page.page=1;
            this.submitForm()
        },
        jumpback(){
            this.addPage=true;
            this.object=null
            this.dialogTitle='新添数据'
        },
        closeAdd(){
            this.addPage=this.editPage=false
        },
        labelsave(val,name){          
            API.addlabel({
                projectId: val.projectId,
                labelName:val.labelName,
                projectName:name
            }).then(()=>{ 
                this.addPage=this.editPage=false;
                this.object=null
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                });  
                this.submitForm() 
            }).catch(()=>{
                this.$message.error('保存失败')
            })
                this.addPage=this.editPage=false;
        },
        labelcancel(){
            this.addPage=this.editPage=false
        },
        editlabel(val,id,name){
            API.updatalabel({
                id:id,
                projectId: val.projectId,
                labelName:val.labelName,
                projectName:name
            }).then(()=>{  
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                });           
                this.submitForm()
            }).catch(()=>{
                this.$message.error('保存失败')
            })
            this.addPage=this.editPage=false;
        }
    },
    created(){
        this.init();
        this.submitForm()
    },    
   
}
</script>

<style lang='stylus' scoped>
.el-pagination.is-background{
    text-align: right;
    margin-top: 20px;
}
.el-form.demo-ruleForm{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.el-form-item.el-form-item--feedback{
    flex-shrink: 0;
    width: 32%;
    text-align: left;
}
.btns{
    margin-left: 25px;
    margin-bottom: 30px;
}
.topform{
  width: 100%;
  display: flex;
  .top1{
        flex: 2;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .el-form-item{
            flex-shrink: 0;
        }
  }
    .search-reset{
        flex: 1;
        text-align: center;
    }
}
</style>

