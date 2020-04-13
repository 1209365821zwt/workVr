<template>
    <div class="changetable">
        <div class="topform">
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                ref="formInline"
            >
                <div class="top1">
                    <el-form-item label="代表姓名 ：" prop="repName">
                        <el-input
                            v-model="formInline.repName"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="所属项目:" prop="projectName">
                        <el-select
                            v-model="formInline.projectName"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in projectList"
                                :key="item.id"
                                :label="item.projectName"
                                :value="item.projectName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="更新兑换状态:" prop="exchangeState">
                        <el-select
                            v-model="formInline.exchangeState"
                            placeholder="请选择"
                        >
                            <el-option label="未兑换" value="1"></el-option>
                            <el-option label="已兑换" value="2"></el-option>
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
                <div class="buttonform">
                    <el-button type="primary" class="button" @click="exportData"
                        >导出</el-button
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
                        <el-button type="primary" size="small" class="button"
                            >导入</el-button
                        >
                    </el-upload>
                    <el-button type="primary" class="button" @click="download"
                        >下载导入模板</el-button
                    >
                </div>
            </div>
        </div>

        <el-table
            :data="tableData"
            v-loading="loadingTable"
            :row-class-name="tableRowClassName"
            border
            :style="{ marginTop: '3%' }"
        >
            <template v-for="(item, index) in labelList">
                <el-table-column
                    :prop="item.name"
                    :label="item.label"
                    :width="item.width"
                    :key="index"
                >
                    <template slot-scope="scope">
                        <template v-if="item.name == 'exchangeState'">
                            <span v-if="scope.row[item.name] == 1">未兑换</span>
                            <span v-else-if="scope.row[item.name] == 2"
                                >已兑换</span
                            >
                        </template>
                        <template v-else-if="item.name == 'operate'">
                            <el-button
                                type="text"
                                @click="presentedit(scope.row)"
                                >查看</el-button
                            >
                            <el-button
                                size="small"
                                v-if="scope.row.exchangeState == 2"
                                @click="change(scope.row)"
                                disabled
                                >兑换</el-button
                            >
                            <el-button
                                v-else
                                size="small"
                                @click="change(scope.row)"
                                >兑换</el-button
                            >
                        </template>
                        <span v-else>{{ scope.row[item.name] }}</span>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <el-dialog
            width="800px"
            v-if="detailPage"
            :visible="detailPage"
            :before-close="closeAdd"
            :title="dialogTitle"
        >
            <Detailpresent v-if="detailPage" :object="object"></Detailpresent>
        </el-dialog>
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
import { list } from "@/api/project";
import * as API from "@/api/pointManagement";
import Detailpresent from "./detailPresent";
import Cookie from "js-cookie";
import axios from "axios";
export default {
    props: {
        tableList: {
            type: Array,
            default: () => []
        }
    },
    components: {
        SElPaginations,
        Detailpresent
    },
    data() {
        return {
            headers: { sessionId: Cookie.get("sessionId") },
            tableData: [],
            actionImport:
                process.env.BASE_API + "/excelImport/exchangeExcelImport",
            page: {
                page: 1,
                pageSize: 5,
                total: 0
            },
            formInline: {
                repName: "",
                projectName: "",
                exchangeState: "",
                callDate: ""
            },
            detailPage: false,
            disabled: false,
            dialogTitle: "查看详情",
            object: {},
            labelList: [
                {
                    label: "序号",
                    name: "id"
                },
                {
                    label: "代表姓名",
                    name: "repName"
                },
                {
                    label: "所属项目",
                    name: "projectName"
                },
                {
                    label: "申请兑换时间",
                    name: "timeOfApplicationForExchange",
                    width: 140
                },
                {
                    label: "兑换礼品名称",
                    name: "exchangeGiftName"
                },
                {
                    label: "兑换数量",
                    name: "exchangeNum"
                },
                {
                    label: "所需积分",
                    name: "requiredIntegral"
                },
                {
                    label: "兑换状态",
                    name: "exchangeState"
                },
                {
                    label: "兑换时间",
                    name: "exchangeTime",
                    width: 140
                },
                {
                    label: "操作",
                    name: "operate",
                    width: 120
                }
            ],
            loadingTable: false,
            projectList: []
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
        handleClick(row) {
            this.$router.push({
                path: "/newProject/projectEdit",
                query: row
            });
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
        init() {
            list().then(res => {
                this.projectList = res;
            });
        },
        //查询获取列表
        submitForm() {
            this.loadingTable = true;
            // eslint-disable-next-line no-unused-vars
            let param = {};
            param = {
                currentPage: this.page.page,
                endTime: this.formInline.callDate
                    ? this.formInline.callDate[1]
                    : null,
                exchangeState: this.formInline.exchangeState
                    ? this.formInline.exchangeState
                    : null,
                pageSize: this.page.pageSize,
                projectName: this.formInline.projectName
                    ? this.formInline.projectName
                    : null,
                repName: this.formInline.repName
                    ? this.formInline.repName
                    : null,
                startTime: this.formInline.callDate
                    ? this.formInline.callDate[0]
                    : null
            };
            API.changePresent(param)
                .then(res => {
                    this.tableData = res ? res.list : [];
                    this.page.total = res ? res.totalElement : 0;
                    this.loadingTable = false;
                })
                .catch(() => {
                    this.loadingTable = false;
                });
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
        //导出
        exportData() {
            let form = {
                endTime: this.formInline.callDate
                    ? this.formInline.callDate[1]
                    : null,
                exchangeState: Number(this.formInline.exchangeState),
                projectName: this.formInline.projectName,
                repName: this.formInline.repName,
                startTime: this.formInline.callDate
                    ? this.formInline.callDate[0]
                    : null
            };
            this._exportData(form);
        },
        _exportData(form) {
            this.$loading({
                lock: true,
                text: "下载中...",
                background: "rgba(0, 0, 0, 0.7)"
            });
            axios({
                headers: {
                    "Content-Type": "application/json",
                    sessionId: Cookie.get("sessionId")
                },
                transformRequest: [
                    function(data) {
                        return JSON.stringify(data);
                    }
                ],
                timeout: 100000,
                withCredentials: true,
                method: "post",
                url: `${process.env.BASE_API}/excelDownload/getBackGiftExchangeExcelDownLoad`,
                data: form,
                responseType: "arraybuffer"
            })
                .then(res => {
                    const content = res.data;
                    const blob = new Blob([content], { type: "charset=UTF-8" });
                    const fileName = "兑换统计.xlsx";
                    if ("download" in document.createElement("a")) {
                        // 非IE下载
                        const elink = document.createElement("a");
                        elink.download = fileName;
                        elink.style.display = "none";
                        elink.href = URL.createObjectURL(blob);
                        document.body.appendChild(elink);
                        elink.click();
                        URL.revokeObjectURL(elink.href); // 释放URL 对象
                        document.body.removeChild(elink);
                    } else {
                        // IE10+下载
                        navigator.msSaveBlob(blob, fileName);
                    }
                    this.$loading().close();
                })
                .catch(() => {
                    this.$message.error("导出失败!");
                    this.$loading().close();
                });
        },
        reset(formName) {
            this.$refs[formName].resetFields();
        },
        presentedit(row) {
            this.detailPage = true;
            API.detailPresent(row.id).then(res => {
                this.object = res;
            });
        },
        closeAdd() {
            this.detailPage = false;
        },
        search() {
            this.page.page = 1;
            this.submitForm();
        },
        download() {
            window.open("static/excels/pointMessage.xlsx", "_blank");
        },
        change(row) {
            this.$confirm("确认兑换该礼品吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                API.changestate(Number(row.id))
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "兑换成功!"
                        });
                        this.submitForm();
                    })
                    .catch(() => {
                        this.$message.error("兑换失败");
                    });
            });
        },
    },
    created() {
        this.init();
    },
    mounted() {
        this.submitForm();
    }
};
</script>

<style lang="stylus">
.changetable{

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
        // flex-wrap: wrap;
        // .el-form-item{
        //     flex-shrink: 0;
        // }
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
