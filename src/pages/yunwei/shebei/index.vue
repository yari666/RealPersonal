<!---运维-运维设备----->
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
        <el-table
            :data="tableData"
            show-summary
            border
            style="width: 100%"
            max-height="700"
        >
            <el-table-column label="所属业主"
                ><template slot-scope="scope">
                    <span>{{ scope.row.companyName }}</span>
                </template></el-table-column
            >

            <el-table-column label="所属污水站"
                ><template slot-scope="scope">
                    <span>{{ scope.row.sewageStationName }}</span>
                </template></el-table-column
            >

            <el-table-column
                prop="deviceName"
                label="设备名称"
            ></el-table-column>

            <el-table-column
                prop="designProcess"
                label="设备工艺"
                width="120px"
            ></el-table-column>

            <el-table-column
                prop="designedOutletWater"
                width="100px"
                label="设计出水量"
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
                label="单水能耗KW.h/m³"
                width="140px"
            ></el-table-column>

            <el-table-column
                prop="currentStatus"
                label="状态/时间"
                width="100px"
            ></el-table-column>

            <el-table-column prop="tab9" label="设备模块"></el-table-column>
        </el-table>

        <!-- 弹框内容 -->
        <el-dialog
            :close-on-click-modal="false"
            :title="dialogName"
            :visible.sync="addMachine"
        >
            <add v-if="addMachine"></add>
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
import { OperationDeviceLists } from "~/config/api.js";
export default {
    data() {
        return {
            tableData: [],
            totalCount: 0,
            addMachine: false,

            dialogName: "",
            params: {
                KeyWord: "",
                Sorting: "",
                SkipCount: 0, //第几页
                MaxResultCount: 10, //每页显示10条
            },
        };
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
        search() {
            this.params.SkipCount = 0;
            this.getList();
        },

        // 获取列表
        getList() {
            let obj = Object.assign({}, this.params, { UserId: this.userId });

            OperationDeviceLists(obj).then((res) => {
                if (res) {
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

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
.el-input {
    width: 400px;
}
</style>