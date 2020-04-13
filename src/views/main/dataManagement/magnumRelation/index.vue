<template>
  <div>
    <div class="topform">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <el-form-item label="所属项目：">
              <el-select v-model="formInline.projectId" clearable placeholder="请选择" size="small">
                  <el-option
                      v-for="item in projectList"
                      :key="item.id"
                      :label="item.projectName"
                      :value="item.id">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="医院名称：">
              <el-select
                        v-model="formInline.hciName" 
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入"
                        :remote-method="queryHci"
                        clearable>
                        <el-option
                      v-for="item in hciList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.insCode">
                  </el-option>
                    </el-select>
          </el-form-item>
          <el-form-item label="医生姓名：">
              <el-select v-model="formInline.docName" filterable
                        remote
                        reserve-keyword
                        placeholder="请输入"
                        clearable
                        :remote-method="queryDoc">
                  <el-option
                      v-for="item in docList"
                      :key="item.naxionsHcpId"
                      :label="item.hcpName"
                      :value="item.customerCode">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="代表姓名：">
              <el-select v-model="formInline.username"
                filterable
                        remote
                        reserve-keyword
                        placeholder="请输入"
                        :remote-method="queryUser"
                        clearable>
                  <el-option
                      v-for="item in userList"
                      :key="item.id"
                      :label="item.saleRepName"
                      :value="item.userId">
                  </el-option>
              </el-select>
          </el-form-item>
        </el-form> 
        <div class="flex">
            <query-reset @query="search" @reset="reset" class="search"></query-reset>
            <div class="btnBox">
                <el-button class='button' type="primary" @click="addBtnClick">新建</el-button>
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
                <el-button type="primary" :disabled="!tableData.length" class='button' @click='exportData'>导出</el-button>
                <el-button type="primary" class='button' @click='download'>下载导入模板</el-button>
                <!-- <el-button type="primary" class='button'>中间表计算</el-button> -->
            </div>
        </div>
        
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        border
        v-loading="loadingTable"
        class="dr-list"
        style="width:100%"
        >
        <template v-for="(item,index) in labelList">
            <el-table-column :key="index" :label="item.label" :prop="item.name" align="center" :width="item.width">
            <template slot-scope="scope">
                <template v-if="item.name == 'index'">
                <span class="color-btn edit">{{scope.$index+1}}</span>
                </template>
                <template v-else-if="item.name == 'isShow'">
                <el-switch v-model="scope.row.isShow" active-color="#13ce66" @change="changeSwitch(scope.row)"></el-switch>
                </template>
                <template v-else-if="item.name == 'operate'" style="width:200px">
                    <!-- <div class="operate"> -->
                    <el-button @click="editEnterprise(scope.row)" size="mini">编辑</el-button>
                    <el-button @click="deleteItem(scope.row)" size="mini" type="danger" plain>删除</el-button>
                    <!-- </div> -->
                </template>
                <span v-else>{{scope.row[item.name]}}</span>
            </template>
            </el-table-column>
        </template>
        </el-table>
        <v-pagination
        :pageSize="page.pageSize"
        :page="page.page"
        :total="page.total"
        @change="reload"
        ></v-pagination>
        <el-dialog
      width="600px"
      v-if="addVisible"
      :visible="addVisible"
      :title="dialogTitle"
      :before-close="closeAdd"
    >
      <add-edit @change="addChange" :formV="formdata" :dialogTitle="dialogTitle"></add-edit>
    </el-dialog>
  </div>
</template>

<script>
import QueryReset from "common/QueryReset";
import VPagination from "common/VPagination";
import addEdit from "./addEdit";
import * as API from '@/api/dataManagement';
import Cookie from 'js-cookie'
import axios from 'axios'
export default {
    components: {
        QueryReset,
        VPagination,
        addEdit
    },
    data() {
        return {
            formInline: {
                projectId: null,
                hciName: null,
                username: null,
                docName: null
            },
            headers: {sessionId:Cookie.get("sessionId")},
            actionImport:process.env.BASE_API + '/excelImport/repRelationshipExcelImport',
            projectList: [],
            hciList: [],
            docList: [],
            userList: [],
            page: {
                page: 1,
                pageSize: 10,
                total: 0
            },
            loadingTable: false,
            tableData: [],
            labelList: [
                {
                    label: "序号",
                    name: "index",
                    width:60
                },
                {
                    label: "所属项目",
                    name: "projectName"
                },
                {
                    label: "医院名称",
                    name: "hospitalName",
                    width: 200
                },
                {
                    label: "省份",
                    name: "province"
                },
                {
                    label: "城市",
                    name: "city"
                },
                {
                    label: "医生姓名",
                    name: "hcpName"
                },
                {
                    label: "科室",
                    name: "department"
                },
                {
                    label: "职称",
                    name: "academicTitle"
                },
                {
                    label: "代表姓名",
                    name: "saleRepName"
                },{
                    label:"操作",
                    name:"operate",
                    width: 150
                }
            ],
            addVisible:false,
            dialogTitle:"新增",
            formdata:null
        }
    },
    mounted() {
        this.initData();
        this.getData();
    },
    methods: {
        initData() {
            this.projectManagementList();
            this.enterpriseHcpHciNameList();
            // this.enterpriseHcpHcPNameList();
            this.salerepSaleNameList();
        },
        projectManagementList() {
            API.projectManagementList().then(res => {
                this.projectList = res || [];
            })
        },
        enterpriseHcpHciNameList(keyWord) {
            API.enterpriseHcpHciNameList({ name: keyWord }).then(res => {
                this.hciList = res || [];
            })
        },
        enterpriseHcpHcPNameList(keyWord) {
            API.enterpriseHcpHcPNameList({ hcpName: keyWord }).then(res => {
                this.docList = res || [];
            })
        },
        salerepSaleNameList(keyWord) {
            API.salerepSaleNameList({ saleRepName: keyWord, projectId: this.formInline.projectId }).then(res => {
                this.userList = res || [];
            })
        },
        getData() {
            let that = this,
                param = {
                    pageNo: this.page.page, //页数
                    pageSize: this.page.pageSize, //每页显示数量
                    projrctId: this.formInline.projectId || null,
                    insCode: this.formInline.hciName || null,
                    customerCode: this.formInline.docName || null,
                    userId: this.formInline.username || null
                };
            this.loadingTable = true;
            API.enterpriseSaleRepProductHcppageList(param).then(res => {
                this.loadingTable = false;
                if (res && res.records) {
                    that.tableData = res.records || [];
                    that.page.total = res.total || 0;
                    that.page.page = res.current || 1;
                } else {
                    that.tableData = [];
                    that.page.total = 0;
                    that.page.page = 1;
                }
                this.$emit("searchdata", { tableData: that.tableData, page: this.page })
            }).catch(() => {
                that.tableData = [];
                that.page.total = 0;
                that.page.page = 1;
                this.loadingTable=false;
            });
        },
        search() {
            this.page.page = 1;
            this.getData();
        },
        reset() {
            this.formInline = {
                projectId: null,
                hciName: null,
                username: null,
                docName: null
            }
        },
        queryHci(query) {
            if (query !== '') {
                this.enterpriseHcpHciNameList(query)
            }
        },
        queryDoc(query) {
            if (query !== '') {
                this.enterpriseHcpHcPNameList(query)
            }
        },
        queryUser(query) {
            if (query !== '') {
                this.salerepSaleNameList(query)
            }
        },
        reload(val, type) {
            const vm = this;
            if (type == "size") {
                vm.page.page = 1;
                vm.page.pageSize = val;
            } else {
                vm.page.page = val;
            }
            vm.getData();
        },
        
        closeAdd() {
            this.addVisible = false;
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
                this.getData();
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
        //导出
        exportData(){
            let form = {
                customerCode: this.formInline.docName || null,
                insCode: this.formInline.hciName || null,
                projectId: this.formInline.projectId || null,
                userId: this.formInline.username || null
            };
            this._exportData(form)
        },
        _exportData(form) {
            this.$loading({
                lock: true,
                text: '下载中...',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            axios({
                headers: {
                    'Content-Type': 'application/json',
                    'sessionId':Cookie.get("sessionId")
                },
                transformRequest: [function (data) {
                    return JSON.stringify(data)
                }],
                timeout: 100000,
                withCredentials: true,
                method: 'post',
                url: `${process.env.BASE_API}/excelDownload/repRelationshipExcelDownLoad`,
                data: form,
                responseType: 'arraybuffer'
            }).then((res) => {
                const content = res.data;
                const blob = new Blob([content], { type: 'charset=UTF-8' });
                const fileName = '代表关系.xlsx';
                if ('download' in document.createElement('a')) { // 非IE下载
                    const elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href) // 释放URL 对象
                    document.body.removeChild(elink);
                } else { // IE10+下载
                    navigator.msSaveBlob(blob, fileName);
                }
                this.$loading().close();
            }).catch(() => {
                this.$message.error('导出失败!');
                this.$loading().close();
            })
        },
        //下载模板
        download() {
            window.open('static/excels/represents.xlsx', '_blank');
        },
        // 新增
        addBtnClick(){
            this.formdata={
                projectId:null,
                hospitalName:null,
                province:null,
                city:null,
                docName:null,
                department:null,
                academicTitle:null,
                saleRepName:null,
            }
            this.dialogTitle='新增';
            this.addVisible=true;
        },
        // 编辑
        editEnterprise(item){
            this.dialogTitle='编辑';
            this.addVisible=true;
            this.formdata=item;
        },
        addChange(data) {
            this.addVisible = false;
            if (data) {
                this.$message({
                    type: 'success',
                    message: `${this.dialogTitle}成功!`
                });
                this.getData();
            }
        },
        deleteItem(item){
            this.$confirm('确认要删除此条数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                API.enterpriseSaleRepProductHcpdelect({id:item.id}).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getData();
                })
                
            }).catch(()=>{
                this.$message.warning('此操作已取消')
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
 .btnBox{
        flex:2;
         display:flex;
         .button{
             margin-right:15px;
         }
     }     
.main-topform
    width 100%
.topform
    width 100%
    .top1
        flex 2
        display flex
        flex-wrap wrap
        justify-content space-between
        .el-form-item
            flex-shrink 0
            width 32%
    .search-reset
        flex 1
        text-align center
.flex
    display flex
    justify-content space-between
    align-items center;
    margin-bottom  20px;
    .search
         flex 1
  
       
             
      
       
</style>