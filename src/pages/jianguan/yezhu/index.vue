<!---监管-业主数据----->
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
                        @click="getList"
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
                prop="companyName"
                label="业主名称"
            ></el-table-column>

            <el-table-column width="100px" label="业主类型"
                ><template slot-scope="scope">
                    {{ scope.row.ownerType == 0 ? "企业" : "政府" }}</template
                ></el-table-column
            >

            <el-table-column prop="area" label="所属区域"></el-table-column>

            <el-table-column prop="address" label="详细地址"></el-table-column>

            <el-table-column
                prop="tab5"
                width="100px"
                label="污水站数量"
            ></el-table-column>

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

            <el-table-column
                width="140px"
                prop="createdDate"
                label="开通时间"
            ></el-table-column>

            <el-table-column width="180px" label="操作">
                <template slot-scope="scope">
                    <span class="base-font" @click="openInfo(0, scope.row)"
                        >查看</span
                    >
                </template>
            </el-table-column>
        </el-table>

        <!-- 弹框内容 -->
        <el-dialog
            :title="companyName"
            :visible.sync="dialogTableVisible"
            :close-on-click-modal="false"
        >
            <company-info
                v-if="dialogTableVisible"
                :infoIndex="infoIndex"
                :id="companyId"
            ></company-info>
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
const timestamp = require("time-stamp");
import areaType from "~/components/areaType";
import companyInfo from "./info/index";

import { JgOwnerLists } from "~/config/api.js";

export default {
    data() {
        return {
            tableData: [],
            totalCount: 0,

            params: {
                UserId: "",
                KeyWord: "",
                Sorting: "",
                SkipCount: 0, //第几页
                MaxResultCount: 10, //每页显示10条
            },

            dialogTableVisible: false,
            infoIndex: "0",
            companyId: "",
            companyName: "",
        };
    },
    components: { areaType, companyInfo },
    watch: {
        dialogTableVisible(to) {
            if (!to) {
                this.infoIndex = "0";
            }
        },
    },
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    created() {
        this.getList();
    },
    methods: {
        // 获取列表
        getList() {
            let obj = Object.assign({}, this.params, { UserId: this.userId });

            JgOwnerLists(obj).then((res) => {
                if (res) {
                    res.data.items.forEach((item) => {
                        item.createdDate = timestamp(
                            "YYYY-MM-DD HH:mm:ss",
                            new Date(item.createdDate)
                        );
                    });
                    this.tableData = res.data.items;
                    this.totalCount = res.data.totalCount;
                }
            });
        },

        showInfo(row) {
            this.dialogName = row.sewageStationName;
            this.addCompany = true;
        },

        // 切换页
        handleCurrentChange(val) {
            this.params.SkipCount = parseInt(
                (val - 1) * this.params.MaxResultCount
            );
            this.getList();
        },

        openInfo(index, row) {
            this.infoIndex = index.toString();
            this.dialogTableVisible = true;
            this.companyId = row.id;
            this.companyName = row.companyName;
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

.el-input {
    width: 400px;
}
</style>