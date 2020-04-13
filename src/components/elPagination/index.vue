<template>
	<div class="v-pagination">
		<el-pagination
			class='is-background'
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page"
			:page-sizes="sizes"
			:page-size="pageSize"
			:layout="layout"
			:total="total"
			popper-class="v-popper">
		</el-pagination>
	</div>
</template>
<script>
export default {
    name:'ElPaginations',
    props: {
        page: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        total: {
            type: Number,
            default: 0
        },
        sizes: {
            type: Array,
            default: function () {
                return [5, 10, 20]
            }
        },
        layout: {
            type: String,
            default: 'prev, pager, next, total, jumper, sizes'
        }
    },
       
    methods: {
        // 每页显示数据量变更
        handleSizeChange(val) {
            this.$emit('change', val, 'size');
        },
        // 页码变更
        handleCurrentChange(val) {
            this.$emit('change', val, 'curPage');
        }
    }
}
</script>
<style lang="stylus" scoped>
.v-pagination{
    height: 32px;
    margin-top: 20px;
    text-align: right;
}
    
</style>
