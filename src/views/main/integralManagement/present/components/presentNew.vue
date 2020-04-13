<template>
    <div class="main-userform">
        <div class="userform">
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                ref="formInline"
                :rules="rules"
                label-width="120px"
                :style="{ marginLeft: '20%' }"
            >
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
                        @change="changePeo"
                    >
                        <el-option
                            v-for="item in List"
                            :key="item.id"
                            :label="item.projectName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="礼品描述 :" prop="giftDescribe">
                    <el-input
                        type="textarea"
                        v-model="formInline.giftDescribe"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="所需积分 ："
                    prop="requiredIntegra"
                >
                    <el-input
                        v-model="formInline.requiredIntegra"
                        placeholder="请输入"
                        type="number"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="可兑换数量 ："
                    prop="quantityOfExchange"
                >
                    <el-input
                        v-model="formInline.quantityOfExchange"
                        placeholder="请输入"
                        type="number"
                    ></el-input>
                </el-form-item>
                <el-form-item label="礼品图片：" prop="giftImagePath">
                    <el-upload
                        :headers="headers"
                        class="avatar-uploader"
                        :action="actionUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img
                            v-if="formInline.giftImagePath"
                            :src="formInline.giftImagePath"
                            class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div></div>

            <div class="btns">
                <el-button type="primary" @click="buildtForm('formInline')" v-if="!object"
                    >保存</el-button
                >
                <el-button type="primary" @click="submitForm('formInline')" v-else-if="object"
                    >保存</el-button
                >
                <el-button @click="cancel">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { list } from "@/api/project";
import Cookie from "js-cookie";
export default {
    props: {
        object: {
            type: Object,
            default: () => {
                return {};
            }
        },
        ind: {
            type: Number
        }
    },
    data() {
        return {
            headers: { sessionId: Cookie.get("sessionId") },
            formInline: {
                id: "",
                giftName: "",
                giftDescribe: "",
                requiredIntegra: "",
                quantityOfExchange: "",
                projectName: "",
                projectId: "",
                giftImagePath: ""
            },
            dialogImageUrl: "",
            dialogVisible: false,
            actionUrl: process.env.BASE_API + "/upload/img",
            rules: {
                giftName: [
                    {
                        required: true,
                        message: '请输入礼品名称'
                    },{
                        max: 50,
                        message: '长度在 50 个字符内'
                    }
                ],
                projectName:[
                    {
                        required: true,
                        message: '请选择所属项目'
                    }
                ],
                giftDescribe: [
                    {
                        required: true,
                        message: '请输入礼品描述'
                    },{
                        max: 300,
                        message: '长度在 300 个字符内'
                    }
                ],
                requiredIntegra: [
                    {
                        required: true,
                        message: "请输入数字",
                    }
                ],
                quantityOfExchange: [
                    {
                        required: true,
                        message: "请输入数字",
                    }
                ],
                giftImagePath: [
                    {
                        required: true,
                        message: '请上传1张图片，图片大小不超过5M'
                    }
                ]
            },
            List: [],
            obj: {}
        };
    },
    methods: {
        handleAvatarSuccess(res) {
            const { code, message, data } = res;
            if (res && code == 200 && data) {
                this.formInline.giftImagePath = data;
                this.$message.success(message);
            } else {
                this.$message.warning(message);
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 4;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            //返回true会像服务器发送请求
            //false啥也不干
            return isJPG && isLt2M;
        },
        buildtForm(formName) {
            this.$refs[formName].validate(valid => {
                if(valid){
                    this.$emit("presentsave", this.formInline, this.obj.projectName);
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if(valid){
                    this.$emit(
                        "editpresent",
                        this.formInline,
                        this.ind,
                        this.obj.projectName
                    );
                }
            })
        },
        cancel() {
            this.$emit("presentcancel");
        },
        init() {
            list().then(res => {
                this.List = res;
            });
        },
        changePeo() {
            this.List.forEach(item => {
                if (item.id == this.formInline.projectName) this.obj = item;
            });
        }
    },
    created() {
        this.init();
    },
    mounted() {
        if (this.object) {
            this.formInline = { ...this.object };
        } else {
            this.formInline = {
                id: "",
                giftName: "",
                giftDescribe: "",
                requiredIntegra: "",
                quantityOfExchange: "",
                giftImagePath: ""
            };
        }
    }
};
</script>

<style lang="stylus" scoped>
.main-userform{
    width: 100%;
    height: 100%;
    .userform{
        width: 450px;
        height: 70%;
        margin: auto;
    .el-form-item__label{
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    margin-top :50px;
  }
</style>
