<template>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.SkipCount / queryInfo.MaxResultCount + 1"
        :page-sizes="[10, 15, 20, 25, 50]"
        :page-size="queryInfo.MaxResultCount"
        layout="total, sizes, total, prev, pager, next, jumper"
        :total="total"
    ></el-pagination>
</template>


<script>
export default {
    props: {
        total: Number,
        queryInfo: Object,
    },
    methods: {
        // 上下分页 pageIndex
        handleCurrentChange(page) {
            this.$emit("handleCurrentChange", page);
        },
        // 每页多少条切换 pageSize
        handleSizeChange(pagesize) {
            this.$emit("handleSizeChange", pagesize);
        },
    },
};
</script>
