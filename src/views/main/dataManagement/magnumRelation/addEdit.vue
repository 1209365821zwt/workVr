<template>
    <div class="add-hospital">
        <el-form class="form" ref="hospitalForm" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="所属项目：" prop="projectId">
              <el-select v-model="form.projectId" clearable placeholder="请选择" @change="projectChange">
                  <el-option
                      v-for="item in projectList"
                      :key="item.id"
                      :label="item.projectName"
                      :value="item.id">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="医院名称：" prop="hospitalName">
              <el-select
                        v-model="form.hospitalName" 
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请选择"
                        :remote-method="queryHci"
                        clearable
                        @change="changeHos">
                        <el-option
                      v-for="item in hospitalList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                    </el-select>
          </el-form-item>
            <el-form-item label="所在省份：" prop="province">
                <el-select class="level" v-model="form.province" @change="changeProvince" clearable filterable placeholder="请选择" disabled>
                    <el-option
                        v-for="(item,province,i) in provinceList"
                        :key="i"
                        :label="province"
                        :value="province">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在城市：" prop="city">
                <el-select class="level" v-model="form.city" clearable filterable placeholder="请选择" disabled>
                    <el-option
                        v-for="(item,city,i) in cityList"
                        :key="i"
                        :label="city"
                        :value="city">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="医生姓名：" prop="docName" >
                <el-select v-model="form.docName" filterable
                        remote
                        reserve-keyword
                        placeholder="请选择"
                        :remote-method="queryDoc"
                        @change="changedoc">
                  <el-option
                      v-for="(item,index) in docList"
                      :key="item.naxionsHcpId+item.hcpName+index"
                      :label="item.hcpName"
                      :value="item.customerCode">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所在科室：" prop="department">
                <el-select class="level" v-model="form.department" filterable clearable placeholder="请选择" disabled>
                    <el-option
                        v-for="item in departmentList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职称：" prop="academicTitle">
                <el-select class="level" v-model="form.academicTitle" clearable placeholder="请选择" disabled>
                    <el-option
                        v-for="item in academicTitleList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代表姓名：" prop="userId">
              <el-select v-model="form.userId"
                filterable
                        remote
                        clearable
                        reserve-keyword
                        placeholder="请输入"
                        :remote-method="queryUser">
                  <el-option
                      v-for="item in saleRepNameList"
                      :key="item.id"
                      :label="item.saleRepName"
                      :value="item.userId">
                  </el-option>
              </el-select>
          </el-form-item>
        </el-form>
        <div class="footer">
            <el-button size="small" @click="cancel">取消</el-button>
            <el-button size="small" @click="submit('hospitalForm')">保存</el-button>
        </div>
    </div>
</template>
<script>
import provinceCity from "static/jsons/areas.json";
import * as API from '@/api/dataManagement';
export default {
    props: {
        formV: {
            type: Object,
            default: ()=>{
                return {
                    projectId:null,
                    hospitalName:null,
                    province:null,
                    city:null,
                    docName:null,
                    department:null,
                    academicTitle:null,
                    saleRepName:null,
                    userId: null
                }
            }
        },
        dialogTitle: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            saving: false,
            rules: {
                projectId: [
                    {
                        required: true,
                        validator: "请选择项目",
                        message: '请选择项目',
                        type: 'number'
                    }
                ],
                hospitalName: [
                    {
                        required: true,
                        message: "请输入医院名称",
                    },
                    {
                        max: 100,
                        message: '长度在 100 个字符内'
                    }
                ],
                province: [
                    {
                        required: false,
                        message: "请选择所在省份",
                    }
                ],
                city: [
                    {
                        required: false,
                        message: "请选择所在城市",
                    }
                ],
                docName: [
                    {
                        required: true,
                        message: "请输入医生姓名",
                    },
                    {
                        max: 50,
                        message: '长度在 50 个字符内'
                    }
                ],
                department : [
                    {
                        required: false,
                        message: "请选择科室"
                    }
                ],
                academicTitle : [
                    {
                        required: false,
                        message: "请选择职称"
                    }
                ],
                userId : [
                    {
                        required: true,
                        message: "请选择代表"
                    }
                ]
            },
            provinceList: provinceCity || [],
            cityList: [],
            hospitalList : [],
            projectList : [],
            departmentList : [],
            academicTitleList : [],
            saleRepNameList : [],
            docList:[],
            saving:false,
            form:{}
        };
    },
    created () {
        this.form = {...this.formV};
        this.form.docName = this.formV.customerCode || '';
        if(this.dialogTitle == '编辑' && this.form.hcpName){
            this.queryDoc(this.form.hcpName)
        }
        if(this.dialogTitle == '编辑' && this.form.saleRepName){
            this.salerepSaleNameList(this.form.saleRepName)
        }
    },
    mounted () {
        if(this.form.province){
            this.cityList = this.provinceList[this.form.province]
        }
        this.initData();
    },
    methods: {
        // 项目改变查询名下是否有之前代表
        projectChange(){
            this.salerepSaleNameList(this.form.saleRepName)
        },
        cahngeuuu(){
            this.form.projectId = this.form.projectId+'';
        },
        // 改变省份
        changeProvince(province) {
            this.form.city = null;
            this.cityList = this.provinceList[province] || [];
            if (
                province.indexOf("北京") +
                    province.indexOf("天津") +
                    province.indexOf("上海") +
                    province.indexOf("重庆") >
                -4
            ) {
                this.cityList = {
                    市辖区: []
                };
            }
        },
        // 保存
        submit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid && !this.saving) {
                    const form = {
                        userId: this.form.userId || '',
                        customerCode: this.form.docName || '',
                        projectId: this.form.projectId || null
                    };
                    if(this.dialogTitle == '编辑'){
                        form.id = this.form.id
                    }
                    this.saving = true;
                    API.enterpriseSaleRepProductHcpaddOrUpdate(form).then(res=>{
                        this.saving = false;
                        this.$emit("change",res)
                    }).catch(() => {
                        this.saving = false;
                    })
                } else {
                    return false;
                }
            });
        },
    
        queryHci(query) {
            if (query !== '') {
                this.enterpriseHcpHciNameList(query)
            }
        },
        queryDoc(query) {
            if (query !== '') {
                this.enterpriseHcpHcPNameList(query)
            }
        },
        queryUser(query) {
            if (query !== '') {
                this.salerepSaleNameList(query)
            }
        },
        initData() {
            this.projectManagementList();
            this.enterpriseHcpHciNameList();
        },
        // 项目 列表
        projectManagementList() {
            API.projectManagementList().then(res => {
                this.projectList = res || [];
            })
        },
        // 医院 列表
        enterpriseHcpHciNameList(keyWord) {
            API.enterpriseHcpHciNameList({ name: keyWord }).then(res => {
                this.hospitalList = res || [];
            })
        },
        // 医生 列表
        enterpriseHcpHcPNameList(keyWord) {
            API.enterpriseHcpHcPNameList({ hcpName: keyWord }).then(res => {
                this.docList = res || [];
            })
        },
        // 代表 列表
        salerepSaleNameList(keyWord) {
            API.salerepSaleNameList({ saleRepName: keyWord, projectId: this.form.projectId }).then(res => {
                this.saleRepNameList = res || [];
                if(!this.saleRepNameList || !this.saleRepNameList.length){
                    this.form.userId = null
                }
            })
        },
        changeHos(){
            let hospitalList = this.hospitalList,
                id = this.form.hospitalName,
                obj = null;
            hospitalList.forEach((item)=>{
                if(item.id==id){
                    obj = item 
                }
            })
            if(obj){
                this.form.province = obj.province;
                this.form.city = obj.city;
            }
        },
        changedoc(){
            let docList = this.docList,
                id = this.form.docName,
                obj = null;
            
            docList.forEach((item)=>{
                if(item.customerCode==id){
                    obj = item 
                }
            })
            if(obj){
                this.form.department = obj.department;
                this.form.academicTitle = obj.academicTitle;
            }
        },
        // 取消
        cancel() {
            this.$emit("change", false);
        }
    }
};
</script>
<style lang="stylus" scoped>
.add-hospital {
    .form {
        width: 300px;
        margin: 0 auto;

        .el-textarea {
            width: 180px;
        }
    }

    .footer {
        text-align: center;
    }
}
</style>
