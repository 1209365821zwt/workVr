<template>
    <div class="main-userform">
        <div class="userform" :style="{ marginTop: '-20%' }">
            <el-form
                :model="ruleForm"
                ref="ruleForm"
                :rules="rules"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="所属项目 :" prop="projectId">
                    <el-select
                        v-model="ruleForm.projectId"
                        placeholder="请选择"
                        @change="changePro"
                    >
                        <el-option
                            v-for="item in projectLabel"
                            :key="item.id"
                            :label="item.projectName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签名称 :" prop="labelName">
                    <el-input
                        v-model="ruleForm.labelName"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <div class="btns">
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="buildtForm('ruleForm')"
                            v-if="!object"
                            >保存</el-button
                        >
                        <el-button
                            type="primary"
                            @click="submitForm('ruleForm')"
                            v-else-if="object"
                            >保存</el-button
                        >
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { list } from "@/api/project";
export default {
    props: {
        object: {
            type: Object,
            default: () => {}
        },
        ind: {
            type: Number
        }
    },
    data() {
        return {
            ruleForm: {
                id: "",
                projectId: "",
                labelName: ""
            },
            projectLabel: [],
            obj: {},
            rules: {
                projectId: [
                    {
                        required: true,
                        message: "请选择所属项目"
                    }
                ],
                labelName: [
                    {
                        required: true,
                        message: "请输入标签名称"
                    },
                    {
                        max: 50,
                        message: '长度在 50 个字符内'
                    }
                ]
            }
        };
    },
    methods: {
        buildtForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$emit(
                        "labelsave",
                        this.ruleForm,
                        this.obj.projectName
                    );
                }
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$emit(
                        "editlabel",
                        this.ruleForm,
                        this.ind,
                        this.obj.projectName
                    );
                }
            });
        },
        cancel() {
            this.$emit("labelcancel");
        },
        init() {
            list().then(res => {
                this.projectLabel = res;
            });
        },
        changePro() {
            this.projectLabel.forEach(item => {
                if (item.id == this.ruleForm.projectId) this.obj = item;
            });
        }
    },
    created() {
        this.init();
    },
    mounted() {
        if (this.object) {
            this.ruleForm = { ...this.object };
        } else {
            this.ruleForm = {
                id: "",
                projectId: "",
                labelName: ""
            };
        }
    }
};
</script>

<style lang="stylus" scoped>
.main-userform{
    width: 100%;
    height: 100%;
    margin-top: 150px;
    .userform  {
        width: 300px;
        height: 70%;
        margin: auto;
        .el-form-item /deep/ .el-form-item__label  {
          width: 200px;
          text-align: left;
      }


    }
    .usertop{
        margin-top: 20px;
    }
    .save-button{
        width: 100%;
        position: absolute;
        bottom:20%;
        .btns{
        width: 100%;
        text-align: left;
        margin-left: 50px;
        }
    }
}
.el-form.demo-form-inline.el-form--inline /deep/ .top1 /deep/ .el-form-item /deep/ .el-form-item__label{
  width: 200px !important;
  font-size: 10px;
}
.topform{
  display: flex;
}
.el-form--inline /deep/ .el-form-item__label {
    float: none;
    width: 200px !important;
    display: inline-block;
}
</style>
