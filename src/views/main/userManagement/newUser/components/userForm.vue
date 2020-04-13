<template>
    <div class="main-userform">
        <div class="userform">
            <div>
                <h4>用户信息</h4>
                <el-form
                    :model="ruleForm"
                    ref="ruleForm"
                    :rules="rules"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="用户姓名 :" prop="saleRepName">
                        <el-input
                            v-model="ruleForm.saleRepName"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="所属项目 :" prop="projectId">
                        <el-select
                            v-model="ruleForm.projectId"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in list"
                                :key="item.projectId"
                                :label="item.projectName"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位 :" prop="roleId">
                        <el-select
                            v-model="ruleForm.roleId"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in roleList"
                                :key="item.label"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属上级 :" prop="parentName">
                        <el-select
                            v-model="ruleForm.parentName"
                            placeholder="请选择"
                            @focus="handclick"
                        >
                            <el-option
                                v-for="item in parentNameOptions"
                                :key="item.userId"
                                :label="item.saleRepName"
                                :value="item.userId"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item
                        prop="email"
                        label="邮箱"
                    >
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="员工号 :"
                        prop="userId"
                        :rules="rules.userId"
                    >
                        <el-input
                            v-model="ruleForm.userId"
                            placeholder="请输入"
                            :disabled="dialogTitle == '编辑数据'"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="手机号 :"
                        prop="mobilePhone"
                        :rules="rules.tel"
                    >
                        <el-input
                            v-model="ruleForm.mobilePhone"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="用户状态" prop="status">
                        <el-switch
                            v-model="ruleForm.status"
                            :active-value="1"
                            :inactive-value="0"
                        ></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btns">
                <el-button type="primary" @click="buildtForm('ruleForm')">保存</el-button>
                <el-button
                    @click="
                        () => {
                            this.$emit('cancel');
                        }
                    "
                    >取消</el-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import * as API from "@/api/userData";
import { list } from "@/api/project";
import { regTel } from "@/utils/common";
export default {
    props: {
        object: {
            type: Object,
            default: () => {
                return {
                    id: "",
                    saleRepName: "",
                    projectId: "",
                    roleId: "",
                    roleName: "",
                    parentId: "",
                    email: "",
                    status: "",
                    userId: "",
                    mobilePhone: ""
                };
            }
        },
        dialogTitle: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            parentNameOptions: [],
            loading: false,
            ruleForm: JSON.stringify(this.object),
            list: [],
            roleList: [
                {
                    label: "销售代表",
                    value: 1
                },
                {
                    label: "管理员",
                    value: 2
                },
                {
                    label: "测试",
                    value: 3
                },
                {
                    label: "地区经理",
                    value: 4
                },
                {
                    label: "大区经理",
                    value: 5
                }
            ],
            prelistdata: [],
            restaurants: [],
            state: "",
            rules: {
                saleRepName:[
                    {
                        required: true,
                        message: "请输入用户名"
                    },
                    {
                        max: 50,
                        message: '长度在 50 个字符内'
                    }
                ],
                projectId:[
                    {
                        required: true,
                        message: '请选择所属项目'
                    }
                ],
                roleId:[
                    {
                        required: true,
                        message: '请选择职位'
                    }
                ],
                parentName: [
                    {
                        required: true,
                        message: '请选择所属上级'
                    }
                ],
                tel: [
                    {
                        required: false,
                        message: "请输入正确手机号"
                    },{
                        max: 11,
                        message: "请输入11位手机号"
                    }
                ],
                email:[
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
                ],
                userId: [
                    {
                        required: true,
                        message: "请输入员工号"
                    }
                ]
            }
        };
    },
    beforeMount() {
        this.ruleForm = JSON.parse(this.ruleForm);
    },
    methods: {
        projectlist() {
            list().then(res => {
                this.list = res;
            });
        },

        buildtForm(formName) {
          this.$refs[formName].validate(valid => {
                if (valid) {
                    let param = {
                        email: this.ruleForm.email,
                        parentUserId: this.ruleForm.parentName,
                        projectId: this.ruleForm.projectId,
                        roleId: this.ruleForm.roleId,
                        saleRepName: this.ruleForm.saleRepName,
                        status: this.ruleForm.status ? 1 : 0,
                        mobilePhone: this.ruleForm.mobilePhone,
                        userId: this.ruleForm.userId
                    };
                    if (this.ruleForm.id) {
                        param.id = this.ruleForm.id;
                        //编辑
                        API.useradd(param)
                            .then(() => {
                                this.$emit("save");
                                //成功
                                this.$message({
                                    type: "success",
                                    message: "编辑成功"
                                });
                            })
                            .catch(() => {
                                // this.$message.error('编辑失败')
                            });
                    } else {
                        API.useradd(param)
                            .then(() => {
                                this.$emit("save");
                                this.$message({
                                    type: "success",
                                    message: "保存成功"
                                });
                            })
                            .catch(() => {
                                // this.$message.error('保存失败')
                            });
                    }
                }
            })
        },
        handclick() {
            if (!this.ruleForm.roleId || !this.ruleForm.projectId) {
                this.$message.warning("需先输入项目与职位名");
            } else {
                API.prelist(
                    Number(this.ruleForm.roleId),
                    this.ruleForm.projectId
                ).then(res => {
                    this.parentNameOptions = res;
                });
            }
        },
        createFilter(queryString) {
            return restaurant => {
                return (
                    restaurant.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        loadAll() {
            return [];
        }
    },
    created() {
        this.projectlist();
    },
    mounted() {
        // this.restaurants = this.loadAll();
    }
};
</script>

<style lang="stylus" scoped>
.main-userform{
    width: 100%;
    height: 100%;
    .userform{
        width: 300px;
        height: 70%;
        margin: auto;
    .el-form-item__label{
        text-align: left!important;
    }

        h4{
            margin-bottom: 20px;
            margin-top: 10%;
            text-align: left;
        }
    }
    .save-button{
        width: 100%;
        position: relative;
        bottom:-30%;
        .btns{
        width: 100%;
        margin-left: 0;
        }
    }
}
.btns{
    margin-top:50px;
    margin-left :100px;
}
</style>
