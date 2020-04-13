<template>
    <div class="informationTable">
        <div class="main-topform">
            <div class="topform">
                <el-form
                    :inline="true"
                    :model="formInline"
                    class="demo-form-inline"
                    ref="formInline"
                >
                    <div class="top1">
                        <el-form-item label="姓名：" prop="name">
                            <el-input
                                v-model="formInline.name"
                                placeholder="请输入"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            prop="email"
                            label="账号 :"
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
                        <el-form-item label="所属项目：" prop="region">
                            <el-select
                                v-model="formInline.region"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in projectlist"
                                    :key="item.id"
                                    :label="item.projectName"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="search-reset">
                    <el-button size="small" @click="search">查询</el-button>
                    <el-button size="small" @click="reset('formInline')"
                        >重置</el-button
                    >
                    <el-button size="small" @click="jumpback">新建</el-button>
                </div>
            </div>
        </div>
        <el-table
            :data="tableData"
            v-loading="loadingTable"
            border
            :row-class-name="tableRowClassName"
            :style="{ marginTop: '3%' }"
        >
            <template v-for="(item, index) in labelList">
                <el-table-column
                    :prop="item.name"
                    :label="item.label"
                    :key="index"
                >
                    <template slot-scope="scope">
                        <template v-if="item.name == 'accountType'">
                            <span v-if="scope.row[item.name] == 1">诺信</span>
                            <span v-else-if="scope.row[item.name] == 2"
                                >客户</span
                            >
                        </template>
                        <template v-else-if="item.name == 'status'">
                            <!-- {{scope.row[item.name]}} -->
                            <el-switch
                                v-model="scope.row[item.name]"
                                :active-value="1"
                                :inactive-value="0"
                                @change="handclick(scope.row)"
                            ></el-switch>
                        </template>
                        <template v-else-if="item.name == 'opreate' && scope.row['status']">
                            <el-button
                                type="text"
                                @click="dialogFormVisible(scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                type="text"
                                size="small"
                                @click="handkeyword(scope.row)"
                                >重置密码</el-button
                            >
                        </template>
                        <span v-else>{{ scope.row[item.name] }}</span>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <el-dialog
            width="600px"
            v-if="addPage || newPassword"
            :visible="addPage || newPassword"
            :before-close="closeAdd"
            :title="dialogTitle"
        >
            <Buildmation
                v-if="addPage"
                @cancel="closeAdd"
                @informationsave="informationsave"
                :project="project"
            ></Buildmation>
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
import Buildmation from "../../newInformation/components/informationForm";
import * as API from "@/api/getRole";
import { list } from "@/api/project";
export default {
    props: {
        tableList: {
            type: Array,
            default: () => []
        }
    },
    components: {
        SElPaginations,
        Buildmation
    },
    data() {
        return {
            tableData: [],
            page: {
                page: 1,
                pageSize: 5,
                total: 0
            },
            formInline: {
                region: "",
                email: "",
                name: ""
            },
            addPage: false,
            editPage: false,
            newPassword: false,
            dialogTitle: "新建账号",
            labelList: [
                {
                    label: "账号ID",
                    name: "id"
                },
                {
                    label: "账号",
                    name: "email"
                },
                {
                    label: "所属项目",
                    name: "projectName"
                },
                {
                    label: "姓名",
                    name: "name"
                },
                {
                    label: "角色",
                    name: "roleName"
                },
                {
                    label: "账号类型",
                    name: "accountType"
                },
                {
                    label: "账号状态",
                    name: "status"
                },
                {
                    label: "操作",
                    name: "opreate"
                }
            ],
            loadingTable: false,
            projectlist: [],
            project: {}
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
            // eslint-disable-next-line no-unused-vars
            let param = {};
            param = {
                name: this.formInline.name ? this.formInline.name : null,
                email: this.formInline.email ? this.formInline.email : null,
                projectId: this.formInline.region
                    ? this.formInline.region
                    : null,
                currentPage: this.page.page,
                pageSize: this.page.pageSize
            };
            API.Accountlist(param)
                .then(res => {
                    this.tableData = res ? res.list : [];
                    this.page.total = res ? res.totalElement : 0;
                    this.loadingTable = false;
                })
                .catch(() => {
                    this.loadingTable = false;
                });
        },
        //获取项目列表
        list() {
            list().then(res => {
                this.projectlist = res;
            });
        },
        handclick(item) {
            //修改状态
            API.updateAccountStatus(item.status, item.id)
                .then(res => {
                    this.$message({
                        type: "success",
                        message: "修改成功!"
                    });
                    this.submitForm();
                })
                .catch(() => {
                    this.$message.error("修改失败!");
                });
        },
        closeAdd() {
            this.addPage = this.newPassword = false;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handkeyword(row) {
            this.$confirm("确认修改密码吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                API.resetPassword(Number(row.id))
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "修改成功!"
                        });
                        this.submitForm();
                    })
                    .catch(() => {
                        this.$message.error("修改失败");
                    });
            }).catch(() => {
                this.$message.error("取消重置");
            });
        },
        search() {
            this.page.page = 1;
            this.submitForm();
        },
        reset(formName) {
            this.page.page = 1;
            this.$refs[formName].resetFields();
        },
        jumpback() {
            this.addPage = true;
            this.project = {};
        },
        informationsave(val) {
            let param = {
                accountType: Number(val.accountType),
                email: val.email,
                name: val.name,
                password: val.password,
                projectId: val.projectId,
                roleId: val.roleId,
                status: val.status ? 1 : 0
                // "roleName": "string",
                // "projectName": "string",
            };
            if (val.id) {
                param.id = val.id;
                //编辑
                API.updataAccount(param)
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "编辑成功!"
                        });
                        this.submitForm();
                    })
                    .catch(() => {
                        this.$message.error("编辑失败");
                    });
            } else {
                API.addAccount(param)
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
            }
            this.addPage = this.newPassword = false;
        },
        dialogFormVisible(row) {
            this.addPage = true;
            this.dialogTitle = "编辑数据";
            this.project = row;
        }
    },
    created() {
        this.list();
        this.submitForm();
    }
};
</script>

<style lang="stylus">
.informationTable{
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
  flex-direction :column;
  .top1{
        display: flex;
        .el-form-item{
            margin-right :34px;
        }
  }

}
}
</style>
