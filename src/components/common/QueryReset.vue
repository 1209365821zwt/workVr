<template>
    <div class="query-reset">
        <!-- <el-input v-model="input" :placeholder="placeholder"></el-input> -->
        <el-button size="small" @click="reset" class="btn reset">重置</el-button>
        <el-button size="small" @click="query(true)" class="btn query">查询</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            input: this.value
        }
    },
    props:{
        value: {
            type: String
        },
        placeholder:{
            type: String,
            default: ''
        }
    },
    methods: {
        query(isQuery){
            this.$emit('query',this.input,isQuery);
        },
        reset(){
            // this.input = '';
            // this.query(false);
            this.$emit('reset',true);
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.query-reset
    user-select: none
    // .el-input
    //     width: 300px
    //     .el-input__inner
    //         height: 32px
    //         line-height: 32px
    //         border-radius:4px
    //         border:1px solid #D7E2E0
        // input:-webkit-input-placeholder
    // .el-button
        // width: 70px
        // height: 32px
        // line-height: 0
        // border-radius: 4px
        // font-size:14px;
        // font-family:PingFangSC-Regular;
        // font-weight:400;
        // color: #fff;
        // vertical-align: top
        // &.query
            // background: #00B99E
            // border: 1px solid #2CC1AB
            // margin: 0 5px 0 10px
            // color: #fff;
            // &:hover
            //     background: #00A088
            //     color: #fff;
        // &.reset
            // background: #FF9100
            // border: 1px solid #FF9100
            // margin: 0
            // color: #fff;
            // &:hover
            //     background-color: #F17400
            //     color: #fff;
</style>
