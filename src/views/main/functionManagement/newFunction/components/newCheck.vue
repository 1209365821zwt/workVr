<template>
    <div class="set-authority">
        <div class="menu-authority">
            <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                ref="tree"
                @check="handleCheckChange"
                :default-checked-keys="select"
                :expand-on-click-node="false"
            >
            </el-tree>
        </div>
        <div class="footer">
            <el-button size="small" @click="submit">保存</el-button>
            <el-button size="small" @click="()=>{this.$emit('cancel')}">取消</el-button>
        </div>
    </div>
</template>
<script>
import * as API from '@/api/function';
import Cookie from 'js-cookie'
export default {
    props: {
        info: {
            type: Object,
            default: function () {
                return this.formTemp;
            }
        },
        ind:{
            type:Number,
            default:0

        },
        tabList:{
            type:Array,
            default:()=>[]
        },
        select:{
            type:Array,
            default:()=>[]
        },
    },
    computed: {
        form () {
            return this.info ? this.info : this.formTemp;
        }
    },
    beforeMount() {
        this.data = JSON.parse(this.data);
    },
    data () {
        return {
            data: JSON.stringify(this.tabList),
            roleData: [],
            formTemp: {
                id: null,
                name: null
            },
            menu: []
        }
    },
    created () {
    },
    methods: {
        handleCheckChange(data, checknodes) {
            let node1 = this.$refs.tree.getCheckedNodes(false, false);
            this.roleData = node1;
            let node2 = data;
            let node3 = checknodes;
        },
        // 保存
        submit () {
            const vm = this;
            let EuserName = JSON.parse(Cookie.get('userInfo')) || {};
            let createPerson = EuserName && EuserName.userName ? EuserName.userName : '';
            const params = {
                projectId: vm.ind,
                functionList: []
            };
            let data = this.roleData || [];
            data.map(item => {
                return params.functionList.push(item.id);
            });
            if (!params.children) {//有問題
                API.getFunctionProjectId(params.functionList,params.projectId,createPerson).then((data)=>{
                    if (data) {
                        vm.$message({
                            type: 'success',
                            message: '保存成功!',
                            duration: 5 * 1000
                        })
                    vm.$emit('save')
                    }
                })
            } else {
                vm.$message({
                    type: 'warning',
                    message: '请选择权限',
                    duration: 5 * 1000
                })
            }
        },
    }
    
}
</script>
<style lang="stylus" scoped>
.set-authority
    .form
        width: 200px;
        margin: 0 auto;
        .el-form-item
            margin-bottom: 10px;
    .menu-authority
        width: 80%;
        min-height: 300px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: 0 auto 30px auto;
        padding: 20px 55px;
        .el-checkbox
            margin-bottom: 20px;
        .group
            margin-left: 30px
    .footer
        text-align: center;
</style>
