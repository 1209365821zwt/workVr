<template>
    <div class="tabelKeyword">
        <div>
            <el-form
                :model="ruleForm"
                status-icon
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="关键词名称" prop="name">
                    <el-input
                        v-model="ruleForm.name"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="项目属性" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择">
                        <el-option label="产品" value="3"></el-option>
                        <el-option label="竞品" value="4"></el-option>
                        <el-option label="疾病" value="5"></el-option>
                        <el-option label="症状" value="6"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="btnBox">
                <div class="search-reset">
                    <el-button @click="search">查询</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button
                        size="small"
                        @click="dialogFormbuild"
                        class="button"
                        >新建</el-button
                    >
                </div>
                <div class="buttonform">
                    <el-upload
                        :headers="headers"
                        :action="actionImport"
                        class="upload-demo"
                        :show-file-list="false"
                        accept=".xls,.xlsx"
                        :on-success="importData"
                        :on-error="importDataErr"
                        :with-credentials="true"
                    >
                        <el-button type="primary" size="small" class="button"
                            >导入</el-button
                        >
                    </el-upload>
                    <el-button
                        type="primary"
                        size="small"
                        class="button"
                        @click="exportData"
                        >导出</el-button
                    >
                    <el-button
                        type="primary"
                        size="small"
                        @click="download"
                        class="button"
                        >下载导入模板</el-button
                    >
                </div>
            </div>
        </div>

        <el-table
            :data="tableData"
            :style="{ marginTop: '3%' }"
            v-loading="loadingTable"
            border
            :row-class-name="tableRowClassName"
        >
            <template v-for="(item, index) in labelList">
                <el-table-column
                    :prop="item.name"
                    :label="item.label"
                    :width="item.width"
                    :key="index"
                >
                    <template slot-scope="scope">
                        <template v-if="item.name == 'keywordType'">
                            <span v-if="scope.row[item.name] == 3">产品</span>
                            <span v-else-if="scope.row[item.name] == 4"
                                >竞品</span
                            >
                            <span v-else-if="scope.row[item.name] == 5"
                                >疾病</span
                            >
                            <span v-else-if="scope.row[item.name] == 6"
                                >症状</span
                            >
                        </template>
                        <template v-else-if="item.name == 'operate'">
                            <el-button
                                type="text"
                                @click="dialogForm(scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                type="text"
                                size="small"
                                @click="handkeyword(scope.row)"
                                >删除</el-button
                            >
                        </template>
                        <span v-else>{{ scope.row[item.name] }}</span>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <el-dialog
            width="600px"
            v-if="addPage || editPage"
            :visible="addPage || editPage"
            :before-close="closeAdd"
            :title="dialogTitle"
            class="dialog"
        >
            <el-form
                :model="form"
                v-if="addPage || editPage"
                :rules="rules"
                ref="keywordForm"
            >
                <el-form-item
                    label="关键词名称 :"
                    class="elform"
                    label-width="100px"
                    prop="keywordTradeName"
                >
                    <el-input
                        v-model="form.keywordTradeName"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="属性 :"
                    label-width="100px"
                    prop="keywordType"
                >
                    <el-select
                        v-model="form.keywordType"
                        placeholder="请选择活动区域"
                    >
                        <el-option label="产品" :value="3"></el-option>
                        <el-option label="竞品" :value="4"></el-option>
                        <el-option label="疾病" :value="5"></el-option>
                        <el-option label="症状" :value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="通用名 :"
                    class="elform"
                    label-width="100px"
                    prop='keyword'
                >
                    <el-input
                        v-model="form.keyword"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    v-if="ind == 1"
                    @click="dialogsure('keywordForm')"
                    >确 定</el-button
                >
                <el-button
                    type="primary"
                    v-else-if="ind == 2"
                    @click="dialogsureedit('keywordForm')"
                    >确 定</el-button
                >
                <el-button @click="cancle">取 消</el-button>
            </div>
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
import * as API from "@/api/keyword";
import SElPaginations from "@/components/elPagination";
import Cookie from "js-cookie";
import axios from "axios";
export default {
    components: {
        SElPaginations
    },
    props: {},
    data() {
        return {
            tableData: [],
            headers: { sessionId: Cookie.get("sessionId") },
            actionImport: null,
            page: {
                page: 1,
                pageSize: 5,
                total: 0
            },
            createUser: null,
            dialogTitle: "新建关键词",
            labelList: [
                {
                    label: "序号",
                    name: "id"
                },
                {
                    label: "关键词名称",
                    name: "keywordTradeName"
                },
                {
                    label: "通用名",
                    name: "keyword"
                },
                {
                    label: "属性",
                    name: "keywordType"
                },
                {
                    label: "创建人",
                    name: "createName"
                },
                {
                    label: "创建时间",
                    name: "createTime",
                    width: 140
                },
                {
                    label: "更新人",
                    name: "updateName"
                },
                {
                    label: "更新时间", 
                    name: "updateTime",
                    width: 140
                },
                {
                    label: "操作",
                    name: "operate",
                    width: 100
                }
            ],
            loadingTable: false,
            addPage: false,
            editPage: false,
            ruleForm: {
                name: "",
                region: ""
            },
            formLabelWidth: "100px",
            form: {
                id: "",
                keywordTradeName: "",
                keywordType: "",
                keyword: ""
            },
            ind: 0,
            rules: {
                keywordTradeName: [
                    {
                        required: true,
                        message: "请输入关键词"
                    },{
                        max: 50,
                        message: '长度在 50 个字符内'
                    }
                ],
                keywordType: [
                    {
                        required: true,
                        message: "请选择关键词属性"
                    }
                ],
                keyword:[
                    {
                        max: 50,
                        message: '长度在 50 个字符内'
                    }
                ]
            }
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
        dialogFormbuild() {
            this.ind = 1;
            if (this.ind == 1) {
                this.form = {
                    id: "",
                    keywordTradeName: "",
                    keywordType: "",
                    keyword: ""
                };
            }
            this.addPage = true;
            this.dialogTitle = "新建关键词";
        },
        search() {
            this.page.page = 1;
            this.submitForm();
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
        closeAdd() {
            this.addPage = this.editPage = false;
        },
        cancle() {
            this.addPage = this.editPage = false;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handkeyword(row) {
            this.$confirm("确认要删除关键词吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    API.Keydel(row.id)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.submitForm();
                        })
                        .catch(() => {
                            this.$message.error("删除失败");
                        });
                })
                .catch(() => {
                    this.$message.warning("此操作已取消");
                });
        },
        dialogForm(row) {
            this.ind = 2;
            if (this.ind == 2) {
                this.form = { ...row };
            }
            // if(this.form.keywordType==3){

            // }
            this.editPage = true;
            this.dialogTitle = "编辑关键词";
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
                keywordName: this.ruleForm.name,
                keywordProperty: this.ruleForm.region,
                projectId: this.$route.query.id || 0
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
                url: `${process.env.BASE_API}/excelDownload/inquiryKeywordTimeTrendExcelDownload`,
                data: form,
                responseType: "arraybuffer"
            })
                .then(res => {
                    const content = res.data;
                    const blob = new Blob([content], { type: "charset=UTF-8" });
                    const fileName = "关键词统计.xlsx";
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
        //新建数据
        dialogsure(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    API.keywordadd({
                        keyword: this.form.keyword,
                        keywordTradeName: this.form.keywordTradeName,
                        keywordType: this.form.keywordType,
                        projectId: this.$route.query.id
                    })
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "保存成功!"
                            });
                            this.submitForm();
                        })
                        .catch(() => {
                            this.$message.error("保存失败");
                        });
                    this.addPage = this.editPage = false;
                }
            });
        },
        //编辑数据
        dialogsureedit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    API.keywordadd({
                        id: this.form.id,
                        keyword: this.form.keyword,
                        keywordTradeName: this.form.keywordTradeName,
                        keywordType: this.form.keywordType,
                        projectId: this.$route.query.id
                    })
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "编辑成功!"
                            });
                            this.submitForm();
                        })
                        .catch(() => {
                            this.$message.error("编辑失败!");
                        });
                    this.addPage = this.editPage = false;
                }
            });
        },
        //查询列表数据
        submitForm() {
            this.loadingTable = true;
            //  // eslint-disable-next-line no-unused-vars
            let param = {};
            param = {
                filtrations: [
                    {
                        fieldName: "keywordTradeName",
                        fieldValue: this.ruleForm.name,
                        matchType: "LIKE"
                    },
                    {
                        fieldName: "keywordType",
                        fieldValue: this.ruleForm.region,
                        matchType: "EQ"
                    },
                    {
                        fieldName: "projectId",
                        fieldValue: this.$route.query.id,
                        matchType: "EQ"
                    }
                ],
                current: this.page.page,
                size: this.page.pageSize
            };
            API.pageList(param)
                .then(res => {
                    this.tableData = res ? res.records : [];
                    this.page.total = res ? res.total : 0;
                    this.loadingTable = false;
                })
                .catch(() => {
                    this.loadingTable = false;
                });
        },
        buildlist(data) {
            this.tableData = data;
        },

        changeProject() {
            this.$router.push("/newProject");
        },
        //导入
        // /excelImport/keywordExcelImport
        //下载模板
        download() {
            window.open("static/excels/keyword.xlsx", "_blank");
        }
    },
    created() {
        let userInfo = JSON.parse(Cookie.get('userInfo')) || {};
        let createUser = userInfo && userInfo.userName ? userInfo.userName : '';
        this.createUser = createUser;
        this.actionImport = `${process.env.BASE_API}/excelImport/keywordExcelImport/?createUser=${this.createUser}&projectId=${this.$route.query.id}`
        this.submitForm();
    },
    mounted() {}
};
</script>

<style lang="stylus">
.tabelKeyword{
.el-pagination.is-background{
    text-align: right;
    margin-top: 20px;
}
.el-form.demo-ruleForm{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.
.el-form-item.el-form-item--feedback{
    flex-shrink: 0;
    width: 32%;
    text-align: left;
}
.elform{
    width:68%
}
.el-dialog__body{
    margin-left:100px;
}
.btnBox{
    display:flex;
    width:100%;
    .search-reset{
         width 220px;
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
