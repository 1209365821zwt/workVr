<template>
 <div class="salesTabel">
     <div class="main-topform">
    <div class="topform">
         <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <div class="top1">
  <el-form-item label="项目名称 ：" prop="projectName">
    <el-select v-model="formInline.projectName" placeholder="请选择" clearable>
      <el-option v-for="item in projectList" :key='item.id' :label="item.projectName" :value="item.projectName"></el-option>
     
    </el-select>
  </el-form-item>
     <el-form-item label="创建日期 :" prop="callDate">
                <el-date-picker
                    v-model="formInline.callDate"
                    type="daterange"
                    align="right"
                    unlink-panels
                    placeholder="请选择"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    size="small">
                </el-date-picker>
            </el-form-item>
  </div>  
  </el-form> 
  <div class="btnBox">
<div class="search-reset">
        <el-button size="small" @click="search">查询</el-button>
        <el-button size="small" @click="reset('formInline')">重置</el-button>
  </div>
  <div class="buttonform">
        <el-upload
                    :headers='headers'
                    class="upload-demo"
                    :action="actionImport"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    :with-credentials="true"
                    :on-success="importData"
                    :on-error="importDataErr">
                    <el-button type="primary" size="small" class="button">导入</el-button>
                    </el-upload>
         <el-button type="primary" class="button" @click="download">下载导入模板</el-button>
  </div>
  </div>
        
 </div>
</div>
    
      <el-table
    :data="tableData"
    v-loading="loadingTable"
    :style='{marginTop:"3%"}'
    border
    :row-class-name="tableRowClassName"
    >
    <template v-for="(item,index) in labelList">
          <el-table-column
      :prop="item.name"
      :label="item.label"
      :key="index"
      >
      <template slot-scope="scope">     
       <template v-if="item.name == 'id'">
       <span>{{(page.page - 1) * page.pageSize + scope.$index + 1}}</span>
    </template>
     <span v-else>{{scope.row[item.name]}}</span>
      </template>
    </el-table-column>
    </template>
  </el-table>
    <s-ElPaginations :pageSize="page.pageSize" :page="page.page" :total="page.total" @change="reload"></s-ElPaginations>
 </div>
</template>

<script>
import SElPaginations from '@/components/elPagination'
import Cookie from 'js-cookie'
import * as API from '@/api/dataManagement'
import {list} from '@/api/project'
export default {
    props:{
        tableList:{
            type:Array,
            default:()=>[]
        }
    },
    components:{
        SElPaginations
    },
    data() {
        return {
            headers: {sessionId:Cookie.get("sessionId")},
            tableData:[],   
            code:1,
            actionImport:process.env.BASE_API + '/excelImport/dataSalesExcelImport', 
            page: {
                page: 1,
                pageSize: 5,
                total: 0
            },
            formInline:{
                projectName:'',
                callDate:'',
            },
            projectList:[],
            labelList:[
                {
                    label: '序号',
                    name: 'id',
                   
                },
                {
                    label:'项目名称',
                    name:'projectName'
                },{
                    label:'区域',
                    name:'region'
                },
                {
                    label:'医院名称',
                    name:'hciName'
                },
                {
                    label:'医院ID',
                    name:'hospitalId'
                },
                {
                    label:'产品名称',
                    name:'productName'
                },
                {
                    label:'目标金额',
                    name:'targetValue'
                },{
                    label:'实际金额',
                    name:'actualValue'
                }
             
            ],
            loadingTable: false,
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
            // eslint-disable-next-line no-unused-vars
            let param={};
            param= {
                "pageNo":this.page.page,
                "endDate": this.formInline.callDate ? this.formInline.callDate[1] : null,
                "pageSize": this.page.pageSize,
                "projectName": this.formInline.projectName ? this.formInline.projectName : null,
                "startDate": this.formInline.callDate ? this.formInline.callDate[0] : null
            }
            API.enterpriseDataSales(param).then(res=>{
                this.tableData = res ? res.records : [];
                this.page.total = res ? res.total : 0;
                this.loadingTable = false;
            }).catch(()=>{
                this.loadingTable=false;
            })
        },
        reset(formName) {
            this.$refs[formName].resetFields();
        },
        changeProject(){
            this.$router.push('/newProject')
        },
        //导入
        importData(res) {
            let code = res && res.code,
                msg = res && res.message;
            if (code == 200) {
                this.$message({
                    type: 'success',
                    message: '导入成功!'
                });
                this.page.page = 1;
                this.submitForm();
            } else {
                this.$message({
                    type: 'error',
                    message: msg
                });
            }
           
        },
        //导入
        importDataErr(err) {
            let errMsg = err && err.message || '导入失败!';
            this.$message({
                type: 'error',
                message: errMsg
            });
        },
        //下载模板
        download() {
            window.open('static/excels/saleMessage.xlsx', '_blank');
        },
        //获取项目列表
        init(){
            list().then(res=>{
                this.projectList=res
            })
        },
        handkeyword(){
            this.$router.push('/keywordManagement')
        },
        search(){
            this.page.page=1;
            this.submitForm()
        }

    },
    created(){
        this.init()
    },    
    mounted(){
        this.submitForm()

    }
   
}
</script>

<style lang="stylus">
.salesTabel{
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

.topform{
  width: 100%;
  display: flex;
  flex-direction :column;
  .top1{
        display: flex;
        .el-form-item{
            margin-right :34px;
        }
  }

}
.btnBox{
     display flex;
     width:100%;
     .search-reset{
         width 150px;
     }
     .buttonform{
         flex:1;
         display:flex;
         .button{
             margin-right:20px;
         }
     }
     }
 
}
</style>

