<template>
    <div class="presentTablePage">
        <div class="topform">
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                ref="formInline"
            >
                <div class="top1">
                    <el-form-item label="礼品名称 ：" prop="giftName">
                        <el-input
                            v-model="formInline.giftName"
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
                                :value="item.id"
                            ></el-option>
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
            <div class="search-reset">
                <el-button size="small" @click="search">查询</el-button>
                <el-button size="small" @click="reset('formInline')"
                    >重置</el-button
                >
                <el-button size="small" @click="buildPresent">新建</el-button>
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
                        <template v-if="item.name == 'giftImagePath'">
                            <img :src="scope.row[item.name]" alt class="imgs" />
                        </template>
                        <template v-else-if="item.name == 'createTime'">
                            <span>{{ scope.row[item.name] | filterTime }}</span>
                        </template>
                        <template v-else-if="item.name == 'operate'">
                            <el-button
                                type="text"
                                @click="presentedit(scope.row)"
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
        >
            <PersentNew
                v-if="addPage || editPage"
                @presentsave="presentsave"
                @editpresent="editpresent"
                @presentcancel="presentcancel"
                :object="object"
                :ind="ind"
            ></PersentNew>
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
import * as API from "@/api/pointManagement";
import { list } from "@/api/project";
import PersentNew from "./presentNew";
import { formatDate } from "@/utils/common.js";
export default {
    props: {
        tableList: {
            type: Array,
            default: () => []
        }
    },
    components: {
        SElPaginations,
        PersentNew
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
                projectName: "",
                giftName: "",
                callDate: ""
            },
            addPage: false,
            editPage: false,
            dialogTitle: "新建礼品",
            labelList: [
                {
                    label: "礼品ID",
                    name: "id"
                },
                {
                    label: "礼品名称",
                    name: "giftName"
                },
                {
                    label: "所属项目",
                    name: "projectName"
                },
                {
                    label: "礼品描述",
                    name: "giftDescribe"
                },
                {
                    label: "礼品图片",
                    name: "giftImagePath"
                },
                {
                    label: "所需积分",
                    name: "requiredIntegra"
                },
                {
                    label: "可兑换数量",
                    name: "quantityOfExchange"
                },
                {
                    label: "创建人",
                    name: "createUserName"
                },
                {
                    label: "创建时间",
                    name: "createTime",
                    width: 140
                },
                {
                    label: "操作",
                    name: "operate",
                    width: 90
                }
            ],
            loadingTable: false,
            projectList: [],
            object: {},
            ind: 0
        };
    },
    filters: {
        filterTime: val => {
            if (val) {
                return formatDate(new Date(val));
            } else {
                return "";
            }
        }
    },
    computed: {},
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
                currentPage: this.page.page,
                endTime: this.formInline.callDate
                    ? this.formInline.callDate[1]
                    : null,
                giftName: this.formInline.giftName
                    ? this.formInline.giftName
                    : null,
                pageSize: this.page.pageSize,
                projectId: this.formInline.projectName
                    ? this.formInline.projectName
                    : null,
                startTime: this.formInline.callDate
                    ? this.formInline.callDate[0]
                    : null
            };
            API.getPresent(param)
                .then(res => {
                    this.tableData = res ? res.list : [];
                    this.page.total = res ? res.totalElement : 0;
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

        handkeyword(row) {
            this.$confirm("确认要删除此礼品吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                API.delPresent(Number(row.id))
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
        buildPresent() {
            this.addPage = true;
            this.dialogTitle = "新建礼品";
            this.object = null;
        },
        init() {
            list().then(res => {
                this.projectList = res;
            });
        },
        closeAdd() {
            this.addPage = this.editPage = false;
        },
        presentsave(val, name) {
            let form = {};
            form = {
                giftName: val.giftName,
                giftDescribe: val.giftDescribe,
                requiredIntegra: Number(val.requiredIntegra),
                quantityOfExchange: Number(val.quantityOfExchange),
                projectName: name,
                projectId: val.projectId,
                giftImagePath: val.giftImagePath
            };
            API.addPresent(form)
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
            this.object = null;
        },
        presentedit(row) {
            this.editPage = true;
            this.ind = row.id;
            this.object = row;
            this.dialogTitle = "编辑礼品";
        },
        editpresent(val, id, name) {
            let form = {};
            form = {
                id: id,
                giftName: val.giftName,
                giftDescribe: val.giftDescribe,
                requiredIntegra: Number(val.requiredIntegra),
                quantityOfExchange: Number(val.quantityOfExchange),
                projectName: name,
                projectId: val.projectId,
                giftImagePath: val.giftImagePath
            };
            API.updataPresent(form)
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
        },
        presentcancel() {
            this.addPage = this.editPage = false;
        }
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
.presentTablePage{

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
            margin-right 24px
        }
        // flex-wrap: wrap;
        // .el-form-item{
        //     flex-shrink: 0;
        // }
  }
    .search-reset{
        // flex: 1;
        // text-align: center;
    }
}
.imgs{
    width :50px;
    height:50px
}
}
</style>
