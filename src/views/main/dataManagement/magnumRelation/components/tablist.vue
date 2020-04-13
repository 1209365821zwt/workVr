<template>
    <div>
        <Topdataform @searchdata="searchdata"></Topdataform>
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
                    <el-button @click="detail(scope.row)" size="mini">查看详情</el-button>
                    <el-button @click="delEnterprise(scope.row)" size="mini" type="danger" plain>删除</el-button>
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
    </div>
</template>

<script>
import Topdataform from "./topDataForm";
import VPagination from "common/VPagination";
import Buttons from "./buttons";
export default {
    props: {
        tableList: {
            type: Array,
            default: () => []
        }
    },
    components: {
        Topdataform,
        Buttons,
        VPagination
    },
    data() {
        return {
            tableData: [],
            page: {
                page: 1,
                pageSize: 10,
                total: 0
            },
            labelList: [
                {
                    label: "序号",
                    name: "index"
                },
                {
                    label: "所属项目",
                    name: "projectName"
                },
                {
                    label: "医院名称",
                    name: "hospitalName"
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
                }
            ],
            loadingTable: false
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
            this.init();
        },
        //查询获取列表
        submitForm() {
            //  this.loadingTable=true;
            //  // eslint-disable-next-line no-unused-vars
            //  let param={};
            //  param= {
            //     name:this.ruleForm.name,
            //     region:this.ruleForm.region,
            //     page: this.page.page,
            //     pageSize: this.page.pageSize,
            //  }
            //  console.log(param)
            //  this.$api.project.searchlist(param).then(res=>{
            //    this.tableData=res.data
            //    this.loadingTable=false;
            //  }).catch(()=>{
            //    this.loadingTable=false;
            //  })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        changeProject() {
            this.$router.push("/newProject");
        },
        searchdata(data) {
            this.tableData = data.tableData;
            this.page = data.page
        },
        editdata(item) {
            this.$router.push({
                path: "/newMagnum/editData",
                query: { item }
            });
        }
    },
    created() {
        this.init();
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
