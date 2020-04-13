<template>
 <div class='tabList'>
    <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="130px" class="demo-ruleForm">
 <el-form-item label="项目名称 :" prop="name">
     <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="项目状态 :" prop="region">
 <el-select v-model="ruleForm.region" placeholder="请选择">
      <el-option label="进行中" value="1"></el-option>
      <el-option label="已结束" value="0"></el-option>
    </el-select>  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="search">查询</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button  class="btns" @click="changeProject">新建</el-button>
  </el-form-item>
</el-form>
     <el-table
    :data="tableData"
    v-loading="loadingTable"
    border
    :row-class-name="tableRowClassName"
    >
    <template v-for="(item,index) in labelList">
          <el-table-column
        :prop="item.name"
        :label="item.label"
        :width="item.width"
        :key="index">
        <template slot-scope="scope"> 
        <template v-if='item.name=="projectStatus"'>
            <span>{{scope.row[item.name]==1?'进行中':'已结束'}}</span>
        </template>
            <template v-else-if='item.name=="accessMode"'>
            <span v-if="scope.row[item.name]==1">企业微信</span>
            <span v-else-if="scope.row[item.name]==2">微信公众号</span>
            <span v-else-if="scope.row[item.name]==3">微信小程序</span>
            <span v-else-if="scope.row[item.name]==4">企业app</span>
        </template>
        <template v-else-if='item.name=="updateCycle"'>
            <span v-if="scope.row[item.name]==1">日更</span>
            <span v-else-if="scope.row[item.name]==2">周更</span>
            <span v-else-if="scope.row[item.name]==3">月更</span>
        </template>
        <template v-else-if="item.name == 'operate'">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click='handkeyword(scope.row)'>关键词</el-button>
            <!-- <el-button type="text" size="small" @click="down(scope.row)">下线</el-button> -->
        </template>
        <span v-else>{{scope.row[item.name]}}</span>
        </template>
    </el-table-column>
    </template>
   
  </el-table>
     <el-dialog
      width="600px"
      v-if="addPage"
      :visible="addPage"
      :before-close="closeAdd"
      :title="dialogTitle"
    >
    <Fromitem v-if="addPage" :projectObj='projectObj' @cancel='cancel' @save='save'></Fromitem>
    </el-dialog>
    <s-ElPaginations :pageSize="page.pageSize" :page="page.page" :total="page.total" @change="reload"></s-ElPaginations>
 </div>
</template>

<script>
import * as API from "@/api/project";
import SElPaginations from '@/components/elPagination'
import Fromitem from '../newProject/components/formItem'
export default {
    props:{
        tableList:{
            type:Array,
            default:()=>[]
        }
    },
    components:{
        SElPaginations,
        Fromitem
    },
    data() {
        return {
            tableData:[],  
            ruleForm:{
                name:'',
                region:''
            },     
            page: {
                page: 1,
                pageSize: 5,
                total: 0
            },
            addPage:false,
            projectObj:{},
            dialogTitle:'新建数据',
            labelList:[
                {
                    label: '项目ID',
                    name: 'id'
                },
                {
                    label:'项目名称',
                    name:'projectName'
                },{
                    label:'项目状态',
                    name:'projectStatus'
                },
                {
                    label:'项目有效期',
                    name:'projectValidity'
                },
                {
                    label:'接入方式',
                    name:'accessMode'
                },
                {
                    label:'用户数量',
                    name:'userCount'
                },
                {
                    label:'更新周期',
                    name:'updateCycle'
                },
                {
                    label:'下次更新时间',
                    name:'nextUpdateTime'
                },
                {
                    label:'关联VR项目',
                    name:'linkedVr'
                },
                {
                    label: '操作',
                    name: 'operate',
                    width: 120
                }
            ],
            loadingTable: false,
        }
    },
    mounted(){
        this.submitForm()
    },
    methods: {
        tableRowClassName({ rowIndex }) {
            if (rowIndex === 1) {
                return "warning-row";
            } else if (rowIndex === 3) {
                return "success-row";
            }
            return "";
        },
        search(){
            this.page.page=1;
            this.submitForm()
        },
        handleClick(row) {
            this.projectObj=row;
            this.addPage=true;
            this.dialogTitle='项目编辑'
        }, 
        //查询获取列表
        submitForm() {
            this.loadingTable=true;
            //  // eslint-disable-next-line no-unused-vars
            let param={};
            param= {
                filtrations:[
                    {
                        fieldName:"projectName",
                        fieldValue:this.ruleForm.name,
                        matchType:'LIKE'
                    },
                    {
                        fieldName:"projectStatus",
                        fieldValue:this.ruleForm.region,
                        matchType:'EQ'
                    }
                
                ],
                current:this.page.page,
                size:this.page.pageSize
            }
            API.listBypage(param).then(res=>{
                this.tableData = res ? res.records : [];
                this.page.total = res ? res.total : 0;
                this.loadingTable = false;
            }).catch(()=>{
                this.loadingTable=false;
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        changeProject(){
            this.addPage=true;
            this.dialogTitle='新建数据';
            this.projectObj={}

        },
        handkeyword(row){    
            this.$router.push({
                path:'/keywordManagement',
                query:{id:row.id}
            })
        },
        closeAdd(){
            this.addPage=false
        },
        cancel(){
            this.addPage=false
        },
        save(){
            this.addPage=false;
            this.page.page = 1;
            this.submitForm()
        },
        down(row){
            this.$confirm('确认下线吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                API.update(
                    {
                        id:row.id,
                        projectStatus:row.projectStatus
                    }
                ).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.submitForm()
                }).catch(()=>{
                    this.$message.error('操作失败')
                })
            }).catch(() => {
                this.$message.warning('此操作已取消')
            })
        }
    },
    created(){
    },    
   
}
</script>

<style lang='stylus'>
.tabList{
.el-pagination.is-background{
    text-align: right;
    margin-top: 20px;
}
.el-form-item__label{
    text-align :center;
}
.el-form.demo-ruleForm{
  
    display: flex;
    flex-wrap: wrap;
}
.
.el-form-item.el-form-item--feedback{
    flex-shrink: 0;
    width: 42%;
    text-align: left;
}
.btns{
    margin-left: 15px;
    margin-bottom: 30px;
}
}

</style>