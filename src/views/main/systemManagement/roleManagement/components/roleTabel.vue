<template>
    <div class="roleTable">
        <div class="main-topform">
            <div class="topform">
                <el-form
                    :inline="true"
                    :model="formInline"
                    class="demo-form-inline"
                    ref="formInline"
                >
                    <div class="top1">
                        <el-form-item label="角色名称：" prop="name">
                            <el-input
                                v-model="formInline.name"
                                placeholder="请输入"
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="search-reset">
                    <el-button size="small" @click="search">查询</el-button>
                    <el-button size="small" @click="reset('formInline')"
                        >重置</el-button
                    >
                    <el-button @click="jumpback">新建</el-button>
                </div>
            </div>
        </div>
        <el-table
            :data="tableData"
            v-loading="loadingTable"
            border
            :row-class-name="tableRowClassName"
        >
            <template v-for="(item, index) in labelist">
                <el-table-column
                    :prop="item.name"
                    :label="item.label"
                    :key="index"
                >
                    <template slot-scope="scope">
                        <template v-if="item.name == 'operate'">
                            <el-button
                                @click="handleClick(scope.row)"
                                type="text"
                                size="small"
                                >编辑</el-button
                            >
                            <el-button
                                type="text"
                                size="small"
                                @click="Authority(scope.row)"
                                >配置权限</el-button
                            >
                            <el-button
                                type="text"
                                size="small"
                                @click="delRole(scope.row)"
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
            v-if="addPage || editPage || AuthorityRole"
            :visible="addPage || editPage || AuthorityRole"
            :before-close="closeAdd"
            :title="dialogTitle"
        >
            <addRole
                v-if="addPage || editPage"
                @save="save"
                @cancle="cancle"
                :object="object"
                @editsave="editsave"
            ></addRole>
            <Authority
                v-else-if="AuthorityRole"
                :dataList="dataList"
                :selectedList="selectedList"
                @Authoritycancel="Authoritycancel"
                @Authoritysave="Authoritysave"
                :ind="ind"
            ></Authority>
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
import addRole from "../../newRole/components/roleForm";
import Authority from "../../newRole/components/configList";
import * as API from "@/api/getRole";
import SElPaginations from "@/components/elPagination";
export default {
    components: {
        addRole,
        SElPaginations,
        Authority
    },
    data() {
        return {
            tableData: [],
            dialogTitle: "添加数据",
            labelist: [
                {
                    label: "角色ID",
                    name: "id"
                },
                {
                    label: "角色名称",
                    name: "roleName"
                },
                {
                    label: "角色描述",
                    name: "roleDescribe"
                },
                {
                    label: "创建人",
                    name: "createUserName"
                },
                {
                    label: "创建时间",
                    name: "createTime"
                },
                {
                    label: "操作",
                    name: "operate"
                }
            ],
            loadingTable: false,
            value: true,
            formInline: {
                name: ""
            },
            addPage: false,
            editPage: false,
            AuthorityRole: false,
            page: {
                page: 1,
                pageSize: 5,
                total: 0
            },
            object: {
                name: "",
                textarea: ""
            },
            ind: 0,
            dataList: [],
            selectedList: []
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
            this.editPage = true;
            this.dialogTitle = "编辑数据";
            this.object = {
                id: row.id,
                name: row.roleName,
                textarea: row.roleDescribe
            };
        },
        submitForm() {
            this.loadingTable = true;
            //  // eslint-disable-next-line no-unused-vars
            let param = {};
            param = {
                currentPage: this.page.page,
                pageSize: this.page.pageSize,
                roleName: this.formInline.name
            };
            API.getRole(param)
                .then(res => {
                    this.tableData = res ? res.list : [];
                    this.page.total = res ? res.totalElement : 0;
                    this.loadingTable = false;
                })
                .catch(() => {
                    this.loadingTable = false;
                });
        },
        closeAdd() {
            this.addPage = this.editPage = this.AuthorityRole = false;
        },
        jumpback() {
            this.addPage = true;
            this.object = null;
            this.dialogTitle = "新添数据";
        },
        reset(formName) {
            this.page.page = 1;
            this.$refs[formName].resetFields();
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
        save(val) {
            this.addPage = this.editPage = this.AuthorityRole = false;
            API.addRole({
                roleDescribe: val.textarea,
                roleName: val.name
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "保存成功!"
                    });
                    this.submitForm();
                })
                .catch(() => {
                    this.$message.error("新建失败");
                });
            this.object = null;
        },
        cancle() {
            this.addPage = this.editPage = this.AuthorityRole = false;
        },
        delRole(row) {
            this.$confirm("是否要删除该角色?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                API.delRole(Number(row.id))
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
            }).catch(() => {
                this.$message.warning('此操作已取消')
            });
        },
        editsave(val) {
            this.addPage = this.editPage = this.AuthorityRole = false;
            API.updataRole({
                id: val.id,
                roleDescribe: val.textarea,
                roleName: val.name
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "保存成功!"
                    });
                    this.submitForm();
                })
                .catch(() => {
                    this.$message.error("保存失败!");
                });
        },
        //获取权限列表
        Authority(row) {
            this.dialogTitle = "配置权限";
            this.ind = row.id;
            API.AuthorityRole(Number(row.id)).then(res => {
                this.dataList = res.roleResponseList || [];
                this.selectedList = res.authExist || [];
                this.dataList.forEach(v => {
                    let childrenList = []
                    if(v.children && v.children.length){
                        v.children.map(item => {
                            if(this.selectedList.includes(v.id) && !this.selectedList.includes(item.id)){
                                this.selectedList.splice(this.selectedList.indexOf(v.id),1)
                            }
                        })
                    }
                })
                this.AuthorityRole = true;
            });
        },

        Authoritysave(data, id) {
            this.addPage = this.editPage = this.AuthorityRole = false;
            let IdList = [];
            data.map(item => {
                return IdList.push(item.id);
            });
            API.saveAuthorityRole(IdList, Number(id))
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "保存成功!"
                    });
                })
                .catch(() => {
                    this.$message.error("保存失败!");
                });
        },
        Authoritycancel() {
            this.addPage = this.editPage = this.AuthorityRole = false;
        }
    },

    mounted() {
        this.submitForm();
    }
};
</script>

<style lang="stylus">
.roleTable{
.el-pagination.is-background{
    text-align: right;
    margin-top: 20px;
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

}
}
</style>
