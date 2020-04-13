<template>
    <div class="userTable">
        <div class="main-topform">
            <div class="topform">
                <el-form
                    :inline="true"
                    :model="formInline"
                    class="demo-form-inline"
                    ref="formInline"
                >
                    <div class="top1">
                        <el-form-item label="所属项目" prop="region">
                            <el-select
                                v-model="formInline.region"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in list"
                                    :key="item.id"
                                    :label="item.projectName"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="用户姓名" prop="user">
                            <el-input
                                v-model="formInline.user"
                                placeholder="请输入"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            prop="email"
                            label="邮箱"
                            :rules="[
                                {
                                    required: true,
                                    message: '请输入邮箱地址',
                                    trigger: 'blur'
                                },
                                {
                                    type: 'email',
                                    message: '请输入正确的邮箱地址',
                                    trigger: ['blur', 'change']
                                }
                            ]"
                        >
                            <el-input v-model="formInline.email"></el-input>
                        </el-form-item>
                        <el-form-item label="所属上级" prop="name">
                            <el-input
                                v-model="formInline.name"
                                placeholder="请输入"
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="btnBox">
                    <div class="search-reset">
                        <el-button size="small" @click="search">查询</el-button>
                        <el-button size="small" @click="reset('formInline')"
                            >重置</el-button
                        >
                        <el-button size="small" @click="jumpback"
                            >新建</el-button
                        >
                    </div>
                    <div class="buttonform">
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
                            @click="exportData"
                            class="button"
                            >导出</el-button
                        >
                        <el-button
                            type="primary"
                            @click="download"
                            class="button"
                            >下载导入模板</el-button
                        >
                    </div>
                </div>
            </div>
        </div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            v-loading="loadingTable"
            :style="{ marginTop: '3%' }"
            class="dr-list"
            border
            size="small"
        >
            <template v-for="(item, index) in labelList">
                <el-table-column
                    :key="index"
                    :label="item.label"
                    :prop="item.name"
                    align="center"
                    :width="item.width"
                >
                    <template slot-scope="scope">
                        <template v-if="item.name == 'status'">
                            <el-switch
                                v-model="scope.row[item.name]"
                                :active-value="1"
                                :inactive-value="0"
                                @change="handclick(scope.row)"
                            ></el-switch>
                        </template>
                        <template v-else-if="item.name == 'operate'">
                            <el-button @click="editUser(scope.row)" size="mini"
                                >编辑</el-button
                            >
                            <!-- <el-button
                                @click="delUser(scope.row)"
                                size="mini"
                                type="danger"
                                plain
                                >删除</el-button
                            > -->
                        </template>
                        <span v-else>{{ scope.row[item.name] }}</span>
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
            <userForm
                v-if="addPage"
                :object="object"
                :dialogTitle="dialogTitle"
                @cancel="cancel"
                @save="save"
            ></userForm>
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
import * as API from "@/api/userData";
import { list } from "../../../../api/project";
import SElPaginations from "@/components/elPagination";
import Cookie from "js-cookie";
import axios from "axios";
import userForm from "../newUser/components/userForm";
export default {
    components: {
        SElPaginations,
        userForm
    },
    methods: {
        search() {
            this.page.page = 1;
            this.getList();
        },
        reset(formName) {
            this.$refs[formName].resetFields();
        },
        jumpback() {
            this.addPage = true;
            this.dialogTitle = "新建数据";
            this.object = {
                status: 1
            };
        },
        //获取项目列表
        getprojectname() {
            list().then(res => {
                this.list = res;
            });
        },
        //获取列表
        getList() {
            this.loadingTable = true;
            let param = {};
            param = {
                email: this.formInline.email,
                parentName: this.formInline.name,
                projectId: this.formInline.region,
                saleRepName: this.formInline.user,
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
        reload(val, type) {
            if (type == "size") {
                this.page.page = 1;
                this.page.pageSize = val;
            } else {
                this.page.page = val;
            }
            this.getList();
        },
        editUser(row) {
            this.object = row;
            this.addPage = true;
            this.dialogTitle = "编辑数据";
        },
        delUser(row) {
            this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                API.dellist(Number(row.id))
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        this.getList();
                    })
                    .catch(() => {
                        this.$message.error("删除失败");
                    });
            }).catch(() => {
                this.$message.warning('此操作已取消')
            });
        },
        handclick(item) {
            let param = {
                id: item.id,
                status: item.status
            };
            this.$confirm("确认修改状态吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                API.changestatus(param)
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "修改成功"
                        });
                    })
                    .catch(() => {
                        this.$message.error("修改失败");
                    });
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
                this.getList();
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
            window.open("static/excels/userMessage.xlsx", "_blank");
        },
        //导出
        exportData() {
            let form = {
                parentUser: this.formInline.name,
                projectId: this.formInline.region,
                saleRepCode: this.formInline.email,
                saleRepName: this.formInline.user
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
                url: `${process.env.BASE_API}/excelDownload/usersListExcelDownLoad`,
                data: form,
                responseType: "arraybuffer"
            })
                .then(res => {
                    const content = res.data;
                    const blob = new Blob([content], { type: "charset=UTF-8" });
                    const fileName = "用户信息统计.xlsx";
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
        closeAdd() {
            this.addPage = false;
        },
        cancel() {
            this.addPage = false;
        },
        save() {
            this.addPage = false;
            this.getList();
        }
    },
    created() {
        this.getprojectname();
    },
    mounted() {
        this.getList();
    },
    data() {
        return {
            tableData: [],
            headers: { sessionId: Cookie.get("sessionId") },
            actionImport:
                process.env.BASE_API + "/excelImport/usersExcelImport",
            addPage: false,
            object: {},
            dialogTitle: "新建数据",
            labelList: [
                {
                    label: "用户ID",
                    name: "id"
                },
                {
                    label: "用户姓名",
                    name: "saleRepName"
                },
                {
                    label: "所属项目",
                    name: "projectName"
                },
                {
                    label: "职位",
                    name: "roleName"
                },
                {
                    label: "员工号",
                    name: "userId"
                },
                {
                    label: "邮箱",
                    name: "email"
                },
                {
                    label: "所属上级",
                    name: "parentName"
                },
                {
                    label: "状态",
                    name: "status"
                },
                {
                    label: "手机号",
                    name: "mobilePhone"
                },
                {
                    label: "操作",
                    name: "operate",
                    width: "150px"
                }
            ],
            loadingTable: false,
            formInline: {
                region: "",
                user: "",
                email: "",
                name: ""
            },
            list: [],
            page: {
                page: 1,
                pageSize: 5,
                total: 0
            },
            value: true,
            value1: false
        };
    }
};
</script>

<style lang="stylus">
.userTable{
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
  flex-direction column;
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
     width:100%;
     .search-reset{
         width 230px;
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
