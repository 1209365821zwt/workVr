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
                <el-form-item label="角色名称 :" prop="name">
                    <el-input
                        v-model="ruleForm.name"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="角色描述：" prop="textarea">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="ruleForm.textarea"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="btns">
                <el-button size="small" @click="save('ruleForm')" v-if="!object"
                    >保存</el-button
                >
                <el-button size="small" @click="editsave('ruleForm')" v-else-if="object"
                    >保存</el-button
                >
                <el-button size="small" @click="cancel">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        object: {
            type: Object,
            default: () => {
                return this.ruleForm;
            }
        },
        ind: {
            type: Number
        }
    },
    data() {
        return {
            ruleForm: {
                name: "",
                textarea: ""
            },
            rules:{
                name:[
                    {
                        required: true,
                        message: '请输入角色名称'
                    },{
                        max: 50,
                        message: '长度在 50 个字符内'
                    }
                ],
                textarea: [
                    {
                        required: false,
                        max: 300,
                        message: '长度在 300 个字符内'
                    }
                ]
            }
        };
    },
    methods: {
        save(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$emit("save", this.ruleForm);
                }
            })
        },
        cancel() {
            this.$emit("cancle");
        },
        editsave(formName) {
            this.$refs[formName].validate(valid => {
                if(valid){
                    if (this.object) {
                        this.$emit("editsave", this.ruleForm);
                    }
                }
            })
        }
    },
    create() {},
    mounted() {
        if (this.object) {
            this.ruleForm = this.object;
        } else {
            this.ruleForm = {
                name: "",
                textarea: ""
            };
        }
    }
};
</script>

<style lang="stylus" scoped>
.main-userform{
    width: 100%;
    height: 100%;
    margin-top:-50px;
    .userform{
        width: 300px;
        height: 70%;
        margin: auto;
        .el-form-item__label{
            text-align: left!important;
        }
    }
    .usertop{
        margin-top: 0px;
    }
    .save-button{
        width: 100%;
        position: absolute;
        bottom:25%;
        .btns{
            width: 100%;
            margin-left: 50px;
        }
    }
}
.btns{
    margin-left:100px;
}
</style>
