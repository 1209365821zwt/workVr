<template>
    <div>
        <div class="main-topform">
            <div class="topform">
                <el-form
                    :inline="true"
                    :model="formInline"
                    class="demo-form-inline"
                    ref="formInline"
                >
                    <div class="top1">
                        <el-form-item label="项目名称 ：" prop="projectId">
                            <el-select
                                v-model="formInline.projectId"
                                placeholder="请选择"
                                @change="changepro"
                                clearable
                            >
                                <el-option
                                    v-for="item in projectList"
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
                    :key="index"
                >
                    <template slot-scope="scope">
                        <template v-if="item.name == 'operate'">
                            <el-button
                                type="text"
                                @click="configlist(scope.row)"
                                >配置</el-button
                            >
                            <!-- <el-button type="text" size="small" @click='handkeyword(scope.row)'>删除</el-button> -->
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
            <Checkbox
                v-if="addPage"
                :tabList="tabList"
                :ind="ind"
                @cancel="cancel"
                @save="save"
                :select="select"
            ></Checkbox>
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
import Checkbox from "../../newFunction/components/newCheck";
import { list } from "@/api/project";
import * as API from "@/api/function";
export default {
    components: {
        SElPaginations,
        Checkbox
    },
    data() {
        return {
            tableData: [],
            projectList: [],
            addPage: false,
            dialogTitle: "新建",

            page: {
                page: 1,
                pageSize: 5,
                total: 0
            },
            formInline: {
                projectId: ""
            },
            tabList: [],
            labelList: [
                {
                    label: "项目名称",
                    name: "projectName"
                },
                {
                    label: "更新人",
                    name: "updatePerson"
                },
                {
                    label: "更新时间",
                    name: "updateTime"
                },
                {
                    label: "操作",
                    name: "operate"
                }
            ],
            loadingTable: false,
            ind: 0,
            obj: {},
            select: []
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
        // newBuild(){

        //     API.ListTree(
        //         Number(this.formInline.projectId)
        //     ).then(res=>{
        //         this.tabList=res.backFunctionManagementList
        //         this.addPage=true;
        //     })
        //     this.ind=this.formInline.projectId
        // },
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
                pageSize: this.page.pageSize,
                projectId: this.formInline.projectId
                    ? this.formInline.projectId
                    : null,
                projectName: this.obj.projectName ? this.obj.projectName : null
            };
            API.getFunctionList(param)
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
        closeAdd() {
            this.addPage = false;
        },
        search() {
            this.page.page = 1;
            this.submitForm();
        },
        changeProject() {
            this.$router.push("/newProject");
        },
        //获取列表
        init() {
            list().then(res => {
                this.projectList = res;
            });
        },
        changepro() {
            this.projectList.forEach(item => {
                if (item.id == this.formInline.projectId) this.obj = item;
            });
        },
        save() {
            this.addPage = false;
            this.submitForm();
        },
        cancel() {
            this.addPage = false;
        },
        configlist(item) {
            API.ListTree(Number(item.projectId)).then(res => {
                this.select = res.authExist || [];
                this.tabList = res.backFunctionManagementList || [];
                this.addPage = true;
            });
            this.ind = item.projectId;
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

<style lang="stylus" scoped>
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
</style>
