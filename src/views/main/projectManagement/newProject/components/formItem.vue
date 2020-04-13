<template>
    <div class="projectForm">
        <div class="projectCForm">
            <el-form
                :model="ruleForm"
                ref="ruleForm"
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
            >
                <el-form-item label="项目名称" prop="projectName">
                    <el-input
                        v-model="ruleForm.projectName"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="项目有效期" prop="projectValidity">
                        <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.projectValidity"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;"
                        ></el-date-picker>
                </el-form-item>
                <el-form-item label="项目状态" prop="projectStatus">
                    <el-switch
                        v-model="ruleForm.projectStatus"
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="用户数量" prop="userCount">
                    <el-input
                        v-model="ruleForm.userCount"
                        placeholder="请输入"
                        type="number"
                    ></el-input>
                </el-form-item>
                <el-form-item label="更新周期" prop="updateCycle">
                    <el-select
                        v-model="ruleForm.updateCycle"
                        placeholder="请选择"
                    >
                        <el-option label="日更" :value="1"></el-option>
                        <el-option label="周更" :value="2"></el-option>
                        <el-option label="月更" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下次更新时间">
                    <el-form-item prop="nextUpdateTime">
                        <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.nextUpdateTime"
                            style="width: 100%;"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="关联VR项目" prop="linkedVr">
                    <el-select v-model="ruleForm.linkedVrId" placeholder="请选择">
                        <el-option  v-for="item in VRList" :key="item.linkedVrId"
                          :label="item.linkedVr" :value="item.linkedVrId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接入方式" prop="accessMode">
                    <el-select
                        v-model="ruleForm.accessMode"
                        placeholder="请选择"
                    >
                        <el-option label="企业微信" :value="1"></el-option>
                        <el-option label="微信公众号" :value="2"></el-option>
                        <el-option label="微信小程序" :value="3"></el-option>
                        <el-option label="企业app" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input
                        type="textarea"
                        max="300"
                        v-model="ruleForm.remark"
                    ></el-input>
                </el-form-item>
                <div class="button">
                    <el-form-item>
                        <el-button type="primary" @click="save('ruleForm')">保存</el-button>
                        <el-button
                            @click="
                                () => {
                                    this.$emit('cancel');
                                }
                            "
                            >取消</el-button
                        >
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import * as API from "@/api/project";
export default {
    props: {
        projectObj: {
            type: Object,
            default: () => {
                return {
                    id: "",
                    accessMode: "",
                    linkedVr: "",
                    nextUpdateTime: "",
                    projectName: null,
                    projectStatus: 0,
                    projectValidity: "",
                    remark: "",
                    updateCycle: 1,
                    userCount: "",
                    linkedVrId:null
                };
            }
        }
    },
    data() {
        return {
            ruleForm: JSON.stringify(this.projectObj),
            VRList:[],
            rules: {
                projectName: [
                    {
                        required: true,
                        message: '请输入项目名称',
                    },
                    { max: 50, message: '长度在 50 个字符内'}
                ],
                projectValidity: [
                    {
                        required: true,
                        message: '请选择项目有效期',
                    }
                ],
                projectStatus: [
                    {
                    required: true,
                    message: '请选择项目状态'
                    }
                ],
                userCount: [
                    {
                    required: true,
                    message: '请选择用户更新数量'
                    }
                ],
                updateCycle: [
                    {
                    required: true,
                    message: '请选择用户更新周期'
                    }
                ],
                remark: [
                    { max: 300, message: '长度在 300 个字符内'}
                ]
            }
        };
    },
    created() {
        this._getVrproject();
    },
    beforeMount() {
        this.ruleForm = JSON.parse(this.ruleForm);
    },
    mounted() {
        // this.ruleForm=JSON.parse(this.ruleForm);
    },
    methods: {
      _getVrproject(){
        API.getVrproject().then(res => {
          this.VRList = res || [];
        }).catch(() => {
          this.VRList = []
        })
      },
      save(formName) {
          this.$refs[formName].validate(valid => {
                if (valid) {
                    let param = {
                        accessMode: this.ruleForm.accessMode,
                        linkedVrId: this.ruleForm.linkedVrId,
                        nextUpdateTime: this.ruleForm.nextUpdateTime,
                        projectName: this.ruleForm.projectName,
                        projectStatus: this.ruleForm.projectStatus ? 1 : 0,
                        projectValidity: this.ruleForm.projectValidity,
                        remark: this.ruleForm.remark,
                        updateCycle: this.ruleForm.updateCycle,
                        userCount: this.ruleForm.userCount
                    };
                    if(this.ruleForm.linkedVrId){
                        this.VRList.forEach(v=>{
                        if(v.linkedVrId == this.ruleForm.linkedVrId){
                            param.linkedVr = v.linkedVr
                        }
                        })
                    }
                    if (this.ruleForm.id) {
                        param.id = this.ruleForm.id;
                        API.update(param)
                        .then(() => {
                            //成功
                            this.$message({
                                type: "success",
                                message: "编辑成功"
                            });
                            this.$emit("save");
                        })
                    } else {
                        API.inster(param)
                        .then(() => {
                            //成功
                            this.$message({
                                type: "success",
                                message: "保存成功"
                            });
                            this.$emit("save");
                        })
                    }
                }
          })
        }
    }
};
</script>
<style lang="stylus" scoped>
.projectForm{
    width: 100%;
    height:80%;
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%,-50%);
    .projectCForm{
        width: 300px;
        height: 70%;
        margin: auto;
    }
    .el-form-item__label{
        text-align: left!important;
    }
}
/deep/ .el-form-item__label{
  width: 150px;
}
.button{
  position: relative;
  bottom: -10px;
}
</style>
