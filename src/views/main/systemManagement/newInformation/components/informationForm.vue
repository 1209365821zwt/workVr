<template>
    <div class="main-userform">
        <div class="userform" :style="{ marginTop: '10%' }">
            <el-form
                :model="ruleForm"
                ref="ruleForm"
                :rules="rules"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item prop="email" label="账号">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="所属项目 :" prop="projectId">
                    <el-select
                        v-model="ruleForm.projectId"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in projectData"
                            :key="item.id"
                            :label="item.projectName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名 :" prop="name">
                    <el-input
                        v-model="ruleForm.name"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="角色 :" prop="roleId">
                    <el-select v-model="ruleForm.roleId" placeholder="请选择">
                        <el-option
                            v-for="item in roleData"
                            :key="item.createTime"
                            :label="item.roleName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号类型 :" prop="accountType">
                    <el-select
                        v-model="ruleForm.accountType"
                        placeholder="请选择"
                    >
                        <el-option label="诺信" :value="1"></el-option>
                        <el-option label="客户" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号状态" prop="status">
                    <el-switch
                        v-model="ruleForm.status"
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="登录密码 :" prop="password">
                    <el-input
                        placeholder="请输入密码"
                        v-model="ruleForm.password"
                        show-password
                    ></el-input>
                </el-form-item>
            </el-form>

            <div class="btns">
                <el-button size="small" @click="save('ruleForm')"
                    >保存</el-button
                >
                <el-button
                    size="small"
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
import { list } from "@/api/project";
import * as API from "@/api/getRole";
export default {
    props: {
        project: {
            type: Object,
            default: () => {
                return {
                    id: "",
                    email: "",
                    projectId: "",
                    name: "",
                    roleId: "",
                    accountType: "",
                    status: "",
                    password: ""
                };
            }
        }
    },
    data() {
        return {
            ruleForm: JSON.stringify(this.project),
            projectData: [],
            roleData: [],
            obj: {},
            rules: {
                email: [
                    {
                        required: true,
                        message: "请输入邮箱地址",
                    },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                    }
                ],
                projectId: [
                    {
                        required: true,
                        message: "请选择所属项目"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入姓名"
                    },
                    {
                        max: 50,
                        message: "长度在 50 个字符内"
                    }
                ],
                roleId: [
                    {
                        required: true,
                        message: "请选择角色"
                    }
                ],
                accountType: [
                    {
                        required: true,
                        message: "请选择账号类型"
                    }
                ],
                status: [
                    {
                        required: true,
                        message: "请选择账号状态"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入登录密码"
                    },
                    {
                        max: 20,
                        message: "长度在 20 个字符内"
                    }
                ]
            }
        };
    },
    beforeMount() {
        this.ruleForm = JSON.parse(this.ruleForm);
    },
    methods: {
        save(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$emit("informationsave", this.ruleForm);
                }
            });
        },
        init() {
            list().then(res => {
                this.projectData = res;
            });
            API.roleList().then(res => {
                this.roleData = res;
            });
        }
    },
    created() {
        this.init();
    },
    mounted() {}
};
</script>

<style lang="stylus">
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

    }
    .usertop{
        margin-top: 20px;
    }
    .save-button{
        width: 100%;
        position: absolute;
        bottom:10%;
        .btns{
        width: 100%;
        margin-left: 50px;
        }
    }
}
</style>
