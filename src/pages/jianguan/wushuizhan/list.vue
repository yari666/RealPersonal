<!-- 监管-污水站-列表 -->

<template>
    <div class="main box">
        <el-table
            :data="tableData"
            show-summary
            border
            style="width: 100%"
            max-height="680"
        >
            <el-table-column
                prop="sewageStationName"
                width="150px"
                label="污水站名称"
            ></el-table-column>

            <el-table-column label="所属业主/区域">
                <template slot-scope="scope">
                    <b>{{ scope.row.ownerName }} [政府]</b>
                    <p>{{ scope.row.area }}</p>
                </template>
            </el-table-column>

            <el-table-column
                prop="treatmentWater"
                width="100px"
                label="处理水量m³/d"
            ></el-table-column>

            <el-table-column
                prop="totalEnergyConsumption"
                width="100px"
                label="总能耗KW.h"
            ></el-table-column>

            <el-table-column
                prop="singleWaterEnergyConsumption"
                width="120px"
                label="单水能耗KW.h/m³"
            ></el-table-column>

            <el-table-column width="100px" label="当前状态">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.currentStatus">{{
                        scope.row.currentStatus
                    }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column
                width="100px"
                prop="durationTime"
                label="持续时间"
            ></el-table-column>

            <el-table-column width="320px" label="健康评价">
                <template slot-scope="scope">
                    <el-button size="mini">综合评分：86</el-button>
                    <el-button size="mini">评分等级：良</el-button>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="openInfo(5, scope.row)"
                        >查看</el-button
                    >
                </template>
            </el-table-column>

            <el-table-column
                width="100px"
                prop="deviceCount"
                label="设备数量/套"
            ></el-table-column>

            <el-table-column
                width="100px"
                prop="designProcess"
                label="设备工艺"
            ></el-table-column>

            <el-table-column width="80px" label="监控点">
                <template>
                    <el-button type="primary" size="mini">查看</el-button>
                </template>
            </el-table-column>

            <el-table-column width="180px" label="操作">
                <template slot-scope="scope">
                    <span class="primary-font" @click="openInfo(0, scope.row)"
                        >查看</span
                    >
                </template>
            </el-table-column>
        </el-table>

        <!-- 弹框内容 -->
        <el-dialog
            title="松坝社区污水站"
            :visible.sync="dialogTableVisible"
            :close-on-click-modal="false"
        >
            <sewage-info
                :infoIndex="infoIndex"
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

export default {
    data() {
        return {
            dialogTableVisible: false,
            infoIndex: "0",
            sewageId: "",
        };
    },
    components: { sewageInfo },
    props: ["tableData", "params", "totalCount"],
    methods: {
        openInfo(index, row) {
            this.infoIndex = index.toString();
            this.sewageId = row.id;

            this.dialogTableVisible = true;
        },

        // 切换页
        handleCurrentChange(val) {
            this.$emit("changePage", { pageIndex: val });
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
</style>