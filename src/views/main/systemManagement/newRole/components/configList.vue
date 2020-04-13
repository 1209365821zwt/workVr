<template>
    <div
        class="custom-tree-container"
        :style="{ marginLeft: '35%', marginTop: '0px' }"
    >
        <div class="block">
            <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                ref="tree"
                default-expand-all
                @check="handleCheckChange"
                :default-checked-keys="selectedList"
                :expand-on-click-node="false"
            >
            </el-tree>
        </div>
        <div class="btns">
            <el-button size="small" @click="save">保存</el-button>
            <el-button size="small" @click="cancel">取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "configList",
    props: {
        configList: {
            type: Array,
            default: () => []
        },
        ind: {
            type: Number,
            default: 0
        },
        dataList: {
            type: Array,
            default: () => []
        },
        selectedList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            data: JSON.stringify(this.dataList),
            roleData: []
        };
    },
    created() {
    },
    beforeMount() {
        this.data = JSON.parse(this.data);
    },
    methods: {
        handleCheckChange(data, checknodes) {
            let node1 = this.$refs.tree.getCheckedNodes(false, true);
            this.roleData = node1;
            let node2 = data;
            // console.log(node2);
            let node3 = checknodes;
            // console.log(node3);
        },
        save() {
            this.$emit("Authoritysave", this.roleData, this.ind);
        },
        cancel() {
            this.$emit("Authoritycancel");
        }
    },
    mounted() {
        this.data = this.dataList;
    }
};
</script>

<style lang="stylus" scoped>
.custom-tree-container{
    .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

  }
  .role-content{
    width: 100%;
    height: 100%;
    position: absolute!important;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .btns{
      margin-top: 20px;
  }
}

</style>
