<!---运维-运维污水站----->
<template>
    <div class="main p20">
        <!-- 筛选项 -->
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline fl">
                <el-form-item label="关键词">
                    <el-input
                        placeholder="请输入关键词"
                        v-model="params.KeyWord"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button
                        type="primary"
                        style="background: #28adca"
                        @click="search()"
                        >查询</el-button
                    >
                </el-form-item>
            </el-form>

            <div class="fr">
                <el-button
                    type="primary"
                    class="ml10"
                    style="background: #28adca"
                    >导出数据</el-button
                >
            </div>
        </div>

        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%" max-height="700">
            <el-table-column
                prop="sewageStationName"
                label="污水站名称"
            ></el-table-column>
            <el-table-column
                prop="companyName"
                label="所属业主"
            ></el-table-column>
            <el-table-column
                prop="tab2"
                width="80px"
                label="业主类型"
            ></el-table-column>

            <el-table-column prop="area" label="所属区域"></el-table-column>

            <el-table-column
                prop="oprDeviceCount"
                label="设备/套"
            ></el-table-column>

            <el-table-column
                prop="designProcess"
                label="设备工艺"
            ></el-table-column>

            <el-table-column
                prop="currentStatus"
                label="当前状态"
            ></el-table-column>

            <el-table-column
                prop=""
                width="100px"
                label="运维工单"
            ></el-table-column>

            <el-table-column
                prop=""
                width="100px"
                label="远程名单"
            ></el-table-column>

            <el-table-column width="180px" label="操作">
                <template slot-scope="scope">
                    <span class="base-font" @click="showInfo(0, scope.row)"
                        >查看</span
                    >
                </template>
            </el-table-column>
        </el-table>

        <!-- 弹框内容 -->
        <el-dialog
            :close-on-click-modal="false"
            :title="dialogName"
            :visible.sync="showSewageInfo"
        >
            <sewage-info
                v-if="showSewageInfo"
                :sewageId="sewageId"
            ></sewage-info>
        </el-dialog>

        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @current-change="handleCurrentChange"
                :page-size="params.MaxResultCount"
                layout="prev, pager, next, jumper"
                :total="totalCount"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import sewageInfo from "./info/index";

import { OperationSewageStationLists } from "~/config/api.js";

export default {
    data() {
        return {
            tableData: [],
            totalCount: 0,

            showSewageInfo: false,
            dialogName: "",
            sewageId: "",
            infoIndex: 0,

            params: {
                KeyWord: "",
                Sorting: "",
                SkipCount: 0, //第几页
                MaxResultCount: 10, //每页显示10条
            },
        };
    },
    components: { sewageInfo },
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    created() {
        this.getList();
    },
    methods: {
        search() {
            this.getList();
        },

        // 获取列表
        getList() {
            let obj = Object.assign({}, this.params, { UserId: this.userId });

            OperationSewageStationLists(obj).then((res) => {
                if (res) {
                    this.tableData = res.data.items;
                    this.totalCount = res.data.totalCount;
                }
            });
        },

        showInfo(index, row) {
            this.dialogName = row.sewageStationName;
            this.showSewageInfo = true;
            this.sewageId = row.sewageStationId;
            this.infoIndex = index;
        },

        // 切换页
        handleCurrentChange(val) {
            this.params.SkipCount = parseInt(
                (val - 1) * this.params.MaxResultCount
            );
            this.getList();
        },
    },
};
</script>

<style lang="less" scoped>
.block {
    text-align: center;
    margin: 15px auto 0;
}
.w100 {
    width: 120px;
}
.tab-type {
    position: absolute;
    top: 0;
    right: 0;
}
.search-box {
    position: relative;
}
.el-select {
    width: 120px;
}

.el-input {
    width: 400px;
}
</style>