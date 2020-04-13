<template>
    <el-form class="filter-condition" ref="form" inline >
            <template  v-for="(item,i) in list">
                <!-- 固定字段 -->
                 <!-- :class="{'date-range-box':isDateType(condition.value),'small-input-box':isSmallInput(condition.value)}" -->
                <el-form-item v-for="(condition,j) in item.options" v-if="condition.isSelected" :label="condition.label" :key="i+''+j" label-width="110px">
                    <!-- 基本信息 -->
                    <el-date-picker
                        v-if="isDateType(condition.value)"
                        v-model="condition.fieldValue"
                        type="datetimerange"
                        align="right"
                        unlink-panels
                        placeholder="请选择"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        @change="changeDate(condition)"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        size="small">
                    </el-date-picker>
                    <!-- <span>{{timeDefaultShow}}</span> -->
                    <el-date-picker
                        v-if="condition.value == 'lastInterviewDate' || condition.value == 'doctorCreatedTime'"
                        v-model="condition.fieldValue"
                        type="datetimerange"
                        align="right"
                        unlink-panels
                        placeholder="请选择"
                        range-separator="至"
                        :default-time="['12:00:00', '08:00:00']"
                        :default-value="timeDefaultShow"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptionsO"
                        @change="changeDate(condition)"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        size="small">
                    </el-date-picker>
                    <!-- <el-select v-else-if="condition.value == 'interviewResult'" v-model="condition.fieldValue" placeholder="请选择">
                        <el-option v-for="(interview,intIndex) in interviewResults" :key="intIndex" :label="interview.visitResult" :value="interview.id"></el-option>
                    </el-select> -->
                    <!-- <el-input v-if="condition.value == 'name'" v-model="condition.fieldValue" clearable placeholder="请输入"></el-input> -->
                    <el-select  v-else-if="condition.value == 'sex'" v-model="condition.fieldValue" size="small" placeholder="请选择" clearable>
                        <el-option label="男" :value="0"></el-option>
                        <el-option label="女" :value="1"></el-option>
                        <el-option label="未知" :value="2"></el-option>
                    </el-select>
                    <!-- <el-input v-else-if="condition.value == 'tel'" v-model="condition.fieldValue" placeholder="请输入"></el-input> -->
                    <!-- <el-input v-else-if="condition.value == 'wechat'" v-model="condition.fieldValue" clearable placeholder="请输入" ></el-input>
                    <el-select  v-if="condition.value == 'isAddWechat'" v-model="condition.fieldValue" placeholder="请选择" clearable>
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select> -->
                    <el-input v-else-if="condition.value == 'email'" v-model="condition.fieldValue" clearable size="small" placeholder="请输入" ></el-input>
                    <el-input v-else-if="condition.value == 'address'" v-model="condition.fieldValue" clearable size="small" placeholder="请输入" ></el-input>
                    <!-- <el-input v-else-if="condition.value == 'depart'" v-model="condition.fieldValue" placeholder="请输入" ></el-input> -->
                    <el-select
                        v-else-if="condition.value == 'depart'"
                        v-model="condition.fieldValue"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入"
                        :remote-method="queryDept"
                        :loading="loadingDept"
                        clearable
                        size="small">
                        <el-option
                            v-for="(item,d) in deptList"
                            :key="d"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                    <el-select v-else-if="condition.value == 'doctorTitle'" v-model="condition.fieldValue" size="small" placeholder="请选择" clearable>
                        <el-option v-for="(title,ti) in drTitleList" :label="title" :value="title" :key="ti"></el-option>
                    </el-select>
                    <el-select v-else-if="condition.value == 'doctorPosition'" v-model="condition.fieldValue" placeholder="请选择" clearable size="small">
                        <el-option v-for="(title,pi) in drPositionList" :label="title" :value="title" :key="pi"></el-option>
                    </el-select>
                    <!-- 诺信医生等级 -->
                    <el-select v-else-if="condition.value == 'adsHcpLevel'" v-model="condition.fieldValue" multiple filterable collapse-tags placeholder="请选择" clearable size="small">
                        <el-option 
                            v-for="(item,index) in ads_hcp_level" 
                            :key="index"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                    <!-- 医院信息 -->
                    <el-input v-else-if="condition.value == 'hospitalName'" v-model="condition.fieldValue" clearable size="small" placeholder="请输入" ></el-input>
                    <!-- 诺信医院等级 -->
                    <el-select  v-else-if="condition.value == 'adsHciLevel'" v-model="condition.fieldValue" clearable size="small" multiple filterable collapse-tags>
                        <el-option 
                            v-for="(item,index) in ads_hci_level" 
                            :key="index"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                    <el-input v-else-if="condition.value == 'hospitalId'" v-model="condition.fieldValue" clearable size="small" placeholder="请输入" ></el-input>
                    <el-select v-else-if="condition.value == 'province'" v-model="condition.fieldValue" filterable clearable size="small" placeholder="请选择" @change="provinceChange" @clear="clearCity">
                        <el-option
                            v-for="(obj,province,index) in provinceList"
                            :key="index"
                            :label="province"
                            :value="province">
                        </el-option>
                    </el-select>
                    <el-select v-else-if="condition.value == 'city'" v-model="condition.fieldValue" filterable clearable placeholder="请选择" size="small">
                        <el-option
                            v-for="(obj,city,index) in cityList"
                            :key="index"
                            :label="city"
                            :value="city">
                        </el-option>
                    </el-select>
                    <!-- <template v-else-if="condition.value == 'hospitalProvinceCity'">
                        <el-select class="province-city" v-model="condition.province" filterable clearable placeholder="请选择" @change="provinceChange(condition)" size="small">
                            <el-option
                                v-for="(obj,province,index) in provinceList"
                                :key="index"
                                :label="province"
                                :value="province">
                            </el-option>
                        </el-select>
                        <el-select class="province-city" v-model="condition.city" filterable placeholder="请选择" clearable size="small">
                            <el-option
                                v-for="(obj,city,index) in cityList"
                                :key="index"
                                :label="city"
                                :value="city">
                            </el-option>
                        </el-select>
                    </template> -->
                    <el-select v-else-if="condition.value == 'hospitalLevel'"  v-model="condition.fieldValue" filterable placeholder="请选择" clearable size="small">
                        <el-option
                            v-for="grade in hospitalLevelList"
                            :key="grade.value"
                            :label="grade.label"
                            :value="grade.value">
                        </el-option>
                    </el-select>
                    <!-- 处方信息 -->
                    <!-- 医生潜力 -->
                    <el-select v-else-if="condition.value == 'potential'" v-model="condition.fieldValue" clearable size="small">
                        <el-option label="高潜力" :value="3"></el-option>
                        <el-option label="中潜力" :value="2"></el-option>
                        <el-option label="低潜力" :value="1"></el-option>
                        <el-option label="其他" :value="4"></el-option>
                        <el-option label="未知" :value="-1"></el-option>
                    </el-select>
                    <!-- 是否有药 -->
                    <el-select  v-else-if="condition.value == 'hasDrug'" v-model="condition.fieldValue" clearable size="small">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                        <el-option label="临采" :value="2"></el-option>
                        <el-option label="未知" :value="-1"></el-option>
                    </el-select>
                    <!-- 目标客户 -->
                    <el-select v-else-if="condition.value == 'target'" v-model="condition.fieldValue" clearable size="small">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                        <el-option label="未知" :value="-1"></el-option>
                    </el-select>
                    <!-- 招募状态 -->
                    <el-select v-else-if="condition.value == 'recruit'" v-model="condition.fieldValue" clearable size="small">
                        <el-option label="成功招募" :value="1"></el-option>
                        <el-option label="招募失败" :value="0"></el-option>
                        <el-option label="暂未招募" :value="-1"></el-option>
                    </el-select>
                    <!-- 覆盖状态 -->
                    <el-select v-else-if="condition.value == 'cover'" v-model="condition.fieldValue" clearable size="small">
                        <el-option label="未开始" :value="0"></el-option>
                        <el-option label="覆盖中" :value="1"></el-option>
                        <el-option label="退出项目" :value="2"></el-option>
                        <el-option label="其他" :value="-1"></el-option>
                    </el-select>
                    <!-- 是否有AE -->
                    <el-select v-else-if="condition.value == 'hasAe'" v-model="condition.fieldValue" clearable size="small">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                        <el-option label="未知" :value="-1"></el-option>
                    </el-select>
                    <el-select v-else-if="condition.value == 'hospitalType'" v-model="condition.fieldValue" clearable size="small">
                        <el-option v-for="(typeN,typeI) in targetHciTypeList" :key="typeI" :label="typeN.label" :value="typeN.label"></el-option>
                    </el-select>
                    <el-select v-else-if="condition.value == 'departType'" v-model="condition.fieldValue" clearable size="small">
                        <el-option v-for="(typeN,typeI) in targetDeptTypeList" :key="typeI" :label="typeN.label" :value="typeN.label"></el-option>
                    </el-select>
                    <!-- 是否脱落 -->
                    <!-- <el-select v-else-if="condition.value == 'breakOff'" v-model="condition.fieldValue" clearable>
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                        <el-option label="未知" :value="-1"></el-option>
                    </el-select> -->
                    <!-- 拜访记录 -->
                    <!-- 拜访结果 -->
                    <!-- <el-select v-else-if="condition.value == 'interviewResult'" v-model="condition.fieldValue" placeholder="请选择" multiple
                        collapse-tags
                        class="mul-selector">
                        <el-option v-for="(interview,intIndex) in interviewResults" :key="intIndex" :label="interview.visitResult" :value="interview.id"></el-option>
                    </el-select> -->
                    <span class="del-condition-btn" @click="delCondition(condition)"></span>
                </el-form-item>
                <!-- 动态字段列表 -->
                <!-- type 1输入框，2单选框，3单选下拉，4联系方式，5多选下拉，6数字 -->
                <el-form-item v-for="(condition,j) in item.fieldList" v-if="condition.isSelected" :label="condition.name" :key="i+'-'+j">
                    <el-input v-if="condition.type == 1" v-model="condition.fieldValue" clearable placeholder="请输入" size="small"></el-input>
                    <el-input v-else-if="condition.type == 4 || condition.type == 6" v-model="condition.fieldValue" clearable placeholder="请输入" size="small"></el-input>
                    <!-- <el-input-number v-else-if="condition.type == 4 || condition.type == 6" v-model="condition.fieldValue" placeholder="请输入" :controls="false"></el-input-number> -->
                    <el-select v-else-if="condition.type == 2 || condition.type == 3 " v-model="condition.fieldValue" clearable placeholder="请选择" size="small">
                        <el-option v-for="(option,o) in condition.options" :label="option" :value="option" :key="o"></el-option>
                    </el-select>
                    <el-select v-else-if=" condition.type == 5 " v-model="condition.fieldValue"
                        multiple
                        collapse-tags
                        clearable
                        class="mul-selector"
                        placeholder="请选择"
                        size="small">
                        <el-option v-for="(option,o) in condition.options" :label="option" :value="option" :key="o"></el-option>
                    </el-select>
                    <span class="del-condition-btn" @click="delCondition(condition)"></span>
                </el-form-item>
            </template>
            <!-- <el-button v-if="selected && selected.length" size="small" class="filter-btn" @click="filterHandler">筛选</el-button> -->
    </el-form>
</template>
<script>
import provinceCity from 'static/jsons/areas.json';
// import {hospitalGradeList} from '@/constant';
// import {visitResultList} from '@/api/test';
import {formatDate} from '@/utils/common';
import * as API from '@/api/doctor';
import {queryDepartment,sysDictList} from '@/api/department';
import {targetHospitalTypeList,targetDepartTypeList,hospitalGradeList} from '@/constant';
export default {
    props: {
        list: {
            type: Array,
            default: function(){
                return [
                    // {
                    //     // 字段分组 组名
                    //     label: '基本信息',
                    //     // 固定字段
                    //     options: [
                    //         {
                    //             // 字段填入、选择值
                    //             fieldValue: null,
                    //             // 是否固定字段
                    //             isFixed: true,
                    //             // 是否显示？
                    //             isSelected: false,
                    //             // 字段名
                    //             label: '性别',
                    //             value: 'sex'
                    //         }
                    //     ],
                    //     // 动态字段
                    //     fieldList: [
                    //         {
                    //             classification: 1,
                    //             extendType: null,
                    //             fieldId: 8,
                    //             fieldName: "医生职称",
                    //             fieldValue: null,
                    //             id: 8,
                    //             isSelected: false,
                    //             name: "医生职称",
                    //             required: 1,
                    //             type: 3,
                    //             options: [
                    //                 "主任医师",
                    //                 "副主任医师",
                    //                 "主治医师",
                    //                 "住院医师",
                    //                 "其他",
                    //                 "未知"
                    //             ]
                    //         }
                    //     ],
                    // }
                ]
            }
        },
        selected: {
            type: Array,
            default: function(){
                return []
            }
        },
        productId: {
            type: Number,
            default: null
        }
    },
    data(){
        return {
            timeDefaultShow:'',
            pickerOptions: {
                shortcuts: [{
                    text: '一周内',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '一个月内',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '三个月内',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            pickerOptionsO: {
                shortcuts: [{
                    text: '一周内',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '一个月内',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '三个月内',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }],
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;
                }
            },
            provinceList:  provinceCity || [],
            cityList: [],
            hospitalLevelList: hospitalGradeList || [],
            // interviewResults: [],
            // 医生职称列表
            drTitleList: [],
            // 医生职务列表
            drPositionList: [],
            // 科室列表
            deptList: [],
            loadingDept: false,
            targetHciTypeList: targetHospitalTypeList,
            targetDeptTypeList: targetDepartTypeList,
            ads_hci_level:[],
            ads_hcp_level:[]

        }
    },
    watch: {
    },
    created () {
        this.getTitleList();
        this.getPositionList();
        this.getads_hci_level({type:'ads_hci_level'});//表示查询医院等级
        this.getads_hcp_level({type:'ads_hcp_level'});//表示查询医生等级
    },
    mounted(){
        // this.formatProvinceCity(provinceCity);
        // this.timeDefaultShow = new Date();
        // this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
        // this.$root.eventHub.$on("refreshDrList", () => {
        //     this.condition.fieldValue=null;
        // });
    },
    methods: {
        //获取医生医院等级
        getads_hci_level(param){
            sysDictList(param).then(res=>{
                this.ads_hci_level = res || [];
            }).catch(()=>{
                this.ads_hci_level = [];
            })
        },
        getads_hcp_level(param){
            sysDictList(param).then(res=>{
                this.ads_hcp_level = res || [];
            }).catch(()=>{
                this.ads_hcp_level = [];
            })
        },
        // 省市列表
        formatProvinceCity(provinceCity){
            provinceCity['其他'] = {
                "其他": [
                    "其他"
                ]
            };
            for (const key in provinceCity) {
                if (provinceCity.hasOwnProperty(key)) {
                    const province = provinceCity[key];
                    province['其他'] = {
                        "其他": [
                            "其他"
                        ]
                    };
                }
            }
        },
        // 省市组件-选择省份
        // provinceChange(condition){
        //     const province = condition.province;
        //     condition.city = null;
        //     this.cityList = this.provinceList[province] || [];
        //     // if(province.indexOf('北京')+province.indexOf('天津')+province.indexOf('上海')+province.indexOf('重庆')>-4){
        //     //     this.cityList = {
        //     //         '市辖区': []
        //     //     }
        //     // }
        // },
        // 非省市组件-选择省份
        provinceChange(province){
            this.cityList = this.provinceList[province] || []
            if(province.indexOf('北京')+province.indexOf('天津')+province.indexOf('上海')+province.indexOf('重庆')>-4){
                this.cityList = {
                    '市辖区': []
                }
            }
        },
        // 清空城市
        clearCity () {
            this.list.map((e)=>{
                e.options.filter((item)=>{
                    if(item.value == 'city'){
                        item.fieldValue = null;
                        return item
                    }
                })
            })
            this.cityList = [];
        },
        // 删除此筛选条件
        delCondition(condition){
            const value = condition.value ? condition.value : condition.name;
            this.selected.splice(this.selected.indexOf(value),1);
            this.list.map((e)=>{
                e.options.filter((item)=>{
                    const val = item.value || item.name;
                    if(value == val){
                        if(value == 'hospitalProvinceCity'){
                            item.city = null;
                            item.province = null;
                        }else {
                            item.fieldValue = condition.type == 5 ? [] : null
                        }
                        return item
                    }
                })
                e.fieldList.filter((item)=>{
                    const val = item.value || item.name;
                    if(value == val){
                        item.fieldValue = condition.type == 5 ? [] : null
                        return item
                    }
                })
            })
            // if(this.selected.length>0){
            this.$emit('filterHandler');
            // }
        },
        // 日期改变
        changeDate(condition){
            const range = condition.fieldValue;
            range[0] = range[0] ? formatDate(range[0],'yyyy-MM-dd HH-mm-ss') : null;
            range[1] = range[1] ? formatDate(range[1],'yyyy-MM-dd HH-mm-ss') : null;
        },
        // 是否日期
        isDateType(val){
            return val == 'nextInterviewDate';
        },
        // 是否小输入框
        isSmallInput(val){
            return val == 'sex' || val == 'hasDrug' || val == 'target' || val == 'recruit' || val == 'breakOff' || val == 'isAddWechat';
        },
        // 拜访结果
        // getInterviewResults(){
        //     const productId = this.productId;
        //     // if (productId) {
        //     visitResultList(productId).then((data)=>{
        //         this.interviewResults = data || [];
        //     })
        //     // }
        // },
        filterHandler(){
            this.$emit('filterHandler');
        },
        // 医生职称列表
        getTitleList(){
            API.getDrTitleList().then((data)=>{
                this.drTitleList = data || [];
            })
        },
        // 医生职务列表
        getPositionList(){
            API.getDrPositionList().then((data)=>{
                this.drPositionList = data || [];
            })
        },
        // 查询科室
        queryDept(query) {
            const vm = this;
            if (query !== '') {
                this.loadingDept = true;
                queryDepartment(query).then((data)=>{
                    vm.loadingDept = false;
                    vm.deptList = data || [];
                }).catch(()=>{
                    vm.loadingDept = false;
                })
            } else {
                this.deptList = [];
            }
        },
    }
}
</script>
<style lang="stylus">
.filter-condition
    .el-form-item
        .el-form-item__content
            min-width: 198px
        .el-input
            width: 160px
    .del-condition-btn
        display: inline-block
        width: 16px
        height: 16px
        vertical-align: middle
        background-image: url(./del_icon_unactive@2x.png)
        background-repeat: no-repeat
        background-size: 16px 16px
        background-position: center
        cursor: pointer
        user-select: none
        &:hover
            background-image: url(./del_icon_active@2x.png)!important
    // 以下为老版本
    // list-style: none
    // .condition-item
    //     display: inline-block
    // .el-form-item
    //     // margin: 3px 10px 3px 0
    //     .el-form-item__label
    //         // padding-right: 6px
    //         min-width: 100px
    //     .el-form-item__content
    //         // min-width: 185px
    //         min-width: 193px
    //     .el-input
    //         width: 160px
    //         .el-input__inner
    //             height: 32px
    //         // .el-input__icon
    //         //     height: 32px
    //     .el-select
    //         .el-input
    //             width: 160px
    //             .el-input__inner
    //                 height: 32px
    //                 width: 160px
    //         &.province-city
    //             .el-input
    //                 width: 95px
    //         &.mul-selector
    //             margin-left: 20px
    //             .el-input
    //                 width: 160px !important
    //                 .el-input__inner
    //                     height: 32px!important
    //             .el-select__tags
    //                 white-space: nowrap;
    //                 overflow: hidden;
    //             .el-select__tags>span
    //                 .el-icon-close
    //                     display: none;
    //     // &.date-range-box
    //     //     .el-form-item__content
    //     //         width: 250px
    //     //     .el-date-editor
    //     //         width: 185px
    //     // &.small-input-box
    //     //     .el-form-item__content
    //     //         width: 125px !important
    //         // .el-input
    //         //     width: 100px !important
    // .del-condition-btn
    //     display: inline-block
    //     width: 16px
    //     height: 16px
    //     vertical-align: middle
    //     background-image: url(./del_icon_unactive@2x.png)
    //     background-repeat: no-repeat
    //     background-size: 16px 16px
    //     background-position: center
    //     cursor: pointer
    //     user-select: none
    //     &:hover
    //         background-image: url(./del_icon_active@2x.png)!important
    // .filter-btn
    //     margin: 7px 0 0 0;
    // .el-date-editor
    //     height: 32px;
    //     line-height: 32px;
</style>
