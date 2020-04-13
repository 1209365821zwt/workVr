<template>
    <div class="mettingTable">
        <div class="main-topform">
            <div class="topform">
                <el-form
                    :inline="true"
                    :model="formInline"
                    class="demo-form-inline"
                    ref="formInline"
                >
                    <div class="top1">
                        <el-form-item label="项目名称 ：" prop="projectName">
                            <el-select
                                v-model="formInline.projectName"
                                placeholder="请选择"
                                clearable
                            >
                                <el-option
                                    v-for="item in projectList"
                                    :key="item.id"
                                    :label="item.projectName"
                                    :value="item.projectName"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="会议名称 ：" prop="name">
                            <el-input
                                v-model="formInline.name"
                                placeholder="请输入"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="会议开始时间 :" prop="callDate">
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
                                size="small"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="btnBox">
                    <div class="search-reset">
                        <el-button size="small" @click="search">查询</el-button>
                        <el-button size="small" @click="reset('formInline')"
                            >重置</el-button
                        >
                    </div>
                    <div
                        class="buttonform"
                        :style="{ textAlign: 'left', marginBottom: '40px' }"
                    >
                        <el-upload
                            :headers="headers"
                            class="upload-demo"
                            :action="actionImport"
                            :show-file-list="false"
                            accept=".xls,.xlsx"
                            :with-credentials="true"
                            :on-success="importData"
                            :on-error="importDataErr"
                        >
                            <el-button type="primary" class="button"
                                >导入</el-button
                            >
                        </el-upload>
                        <el-button
                            type="primary"
                            class="button"
                            @click="download"
                            >下载导入模板</el-button
                        >
                    </div>
                </div>
            </div>
        </div>
        <el-table
            :data="tableData"
            v-loading="loadingTable"
            :row-class-name="tableRowClassName"
            border
        >
            <template v-for="(item, index) in labelList">
                <el-table-column
                    :prop="item.name"
                    :label="item.label"
                    :width="item.width"
                    :key="index"
                >
                </el-table-column>
            </template>
        </el-table>
        <s-ElPaginations
            :pageSize="page.pageSize"
            :page="page.page"
            :total="page.total"
            @change="reload"
        ></s-ElPaginations>
    </div>
</template>

<script>
import SElPaginations from "@/components/elPagination";
import * as API from "@/api/dataManagement";
import { list } from "@/api/project";
import Cookie from "js-cookie";
export default {
    props: {
        tableList: {
            type: Array,
            default: () => []
        }
    },
    components: {
        SElPaginations
    },
    data() {
        return {
            tableData: [],
            page: {
                page: 1,
                pageSize: 5,
                total: 0
            },
            headers: { sessionId: Cookie.get("sessionId") },
            actionImport:
                process.env.BASE_API + "/excelImport/meetingExcelImport",
            code: 1,
            formInline: {
                projectName: "",
                callDate: "",
                name: ""
            },
            labelList: [
                {
                    label: "序号",
                    name: "id",
                    width: 90
                },
                {
                    label: "所属项目",
                    name: "projectName"
                },
                {
                    label: "会议ID",
                    name: "businessCode"
                },
                {
                    label: "会议名称",
                    name: "name"
                },
                {
                    label: "会议详情",
                    name: "description"
                },
                {
                    label: "会议类型",
                    name: "categoryName"
                },
                {
                    label: "开始时间",
                    name: "startDate",
                    width: 140
                },
                {
                    label: "结束时间",
                    name: "endDate",
                    width: 140
                }
            ],
            loadingTable: false,
            projectList: [],
            docList: []
        };
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
        reload(val, type) {
            if (type == "size") {
                this.page.page = 1;
                this.page.pageSize = val;
            } else {
                this.page.page = val;
            }
            this.submitForm();
        },
        //查询获取列表
        submitForm() {
            this.loadingTable = true;
            //  // eslint-disable-next-line no-unused-vars
            let param = {};
            param = {
                meetingName: this.formInline.name ? this.formInline.name : null,
                endDate: this.formInline.callDate
                    ? this.formInline.callDate[1]
                    : null,
                pageNo: this.page.page,
                pageSize: this.page.pageSize,
                projectName: this.formInline.projectName
                    ? this.formInline.projectName
                    : null,
                startDate: this.formInline.callDate
                    ? this.formInline.callDate[0]
                    : null
            };
            API.mettingData(param)
                .then(res => {
                    this.tableData = res ? res.records : [];
                    this.page.total = res ? res.total : 0;
                    this.loadingTable = false;
                })
                .catch(() => {
                    this.loadingTable = false;
                });
        },
        reset(formName) {
            this.$refs[formName].resetFields();
        },
        search() {
            this.page.page = 1;
            this.submitForm();
        },
        changeProject() {
            this.$router.push("/newProject");
        },
        //导入
        importData(res) {
            let code = res && res.code,
                msg = res && res.message;
            if (code == 200) {
                this.$message({
                    type: "success",
                    message: "导入成功!"
                });
                this.page.page = 1;
                this.submitForm();
            } else {
                this.$message({
                    type: "error",
                    message: msg
                });
            }
        },
        //导入
        importDataErr(err) {
            let errMsg = (err && err.message) || "导入失败!";
            this.$message({
                type: "error",
                message: errMsg
            });
        },
        //下载模板
        download() {
            window.open("static/excels/metting.xlsx", "_blank");
        },
        //获取列表
        init() {
            list().then(res => {
                this.projectList = res;
            });
        },
        handkeyword() {
            this.$router.push("/keywordManagement");
        }
    },
    created() {
        this.init();
        // this.enterpriseHcpHcPNameList()
    },
    mounted() {
        this.submitForm();
    }
};
</script>

<style lang="stylus">
.mettingTable{
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
.el-form-item.el-form-item--small.el-form-item__content{
  margin-left:30px!important;
}
.topform{
  width: 100%;
  display: flex;
  flex-direction column
  .top1{
        display: flex;
        .el-form-item{
            margin-right 34px
        }
  }

}
.btnBox{
    display flex;
    .search-reset{
       width:150px;
    }
    .buttonform{
        flex:1;
        display :flex;
        .button{
            margin-right :24px;
        }
    }
}
}
</style>
