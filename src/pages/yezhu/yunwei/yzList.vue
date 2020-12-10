<!---业主-运维管理----->
<template>
    <div class="main">
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
                        @click="getOperationList"
                        >查询</el-button
                    >
                </el-form-item>
            </el-form>

            <div class="fr">
                <el-button class="add-btn" @click="addOperation"
                    >新增</el-button
                >
                <el-button type="primary" class="ml10">导出数据</el-button>
            </div>
        </div>

        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%" max-height="700">
            <el-table-column prop="tab1" label="运维方名称"
                ><template slot-scope="scope">
                    <b>{{ scope.row.operationalEnterpriseName }}</b>
                    <p>陕西省/安康市/汉滨区</p>
                </template></el-table-column
            >

            <el-table-column
                prop="companyLegalPerson"
                width="120px"
                label="负责人"
            ></el-table-column>

            <el-table-column
                prop="companyMobilePhone"
                label="联系方式"
                width="120px"
            ></el-table-column>

            <el-table-column
                prop="operationContent"
                label="运维内容"
            ></el-table-column>

            <el-table-column
                prop="tab5"
                width="100px"
                label="维修工单"
            ></el-table-column>

            <el-table-column
                prop="tab6"
                width="100px"
                label="巡检工单"
            ></el-table-column>

            <el-table-column
                prop="jionDate"
                label="添加时间/人"
                width="140px"
            ></el-table-column>

            <el-table-column prop="tab8" label="备注"></el-table-column>

            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <span class="base-font" @click="addSewage(scope.row)"
                        >添加污水站</span
                    >
                    <span class="danger-font" @click="del(scope.row)"
                        >删除</span
                    >
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @current-change="handleCurrentChange"
                :page-size="params.MaxResultCount"
                layout="prev, pager, next, jumper"
                :total="totalCount"
            ></el-pagination>
        </div>

        <!-- 弹框内容 -->
        <el-dialog
            :close-on-click-modal="false"
            title="添加运维方"
            :visible.sync="showAddYw"
        >
            <add-yw v-if="showAddYw" @closeOperation="closeOperation"></add-yw>
        </el-dialog>

        <el-dialog
            :close-on-click-modal="false"
            title="添加污水站"
            :visible.sync="showAddWsz"
        >
            <add-wsz
                v-if="showAddWsz"
                :operationId="operationId"
                @closeSewage="closeSewage"
            ></add-wsz>
        </el-dialog>
    </div>
</template>

<script>
const timestamp = require("time-stamp");

import areaType from "~/components/areaType";
import addYw from "./addYw";
import addWsz from "./addWsz";

import { ThirdOperationList, DelThirdOperation } from "~/config/api.js";

export default {
    data() {
        return {
            tableData: [],
            totalCount: 0,
            params: {
                KeyWord: "",
                Sorting: "",
                SkipCount: 0, //第几页
                MaxResultCount: 10, //每页显示10条
            },

            showAddYw: false,
            showAddWsz: false,

            operationId: "",
        };
    },
    components: { areaType, addYw, addWsz },
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    created() {
        this.getOperationList();
    },
    methods: {
        // 获取运维列表
        getOperationList() {
            let obj = Object.assign({}, this.params, { UserId: this.userId });

            ThirdOperationList(obj).then((res) => {
                if (res && res.data) {
                    res.data.items.forEach((item) => {
                        item.jionDate = timestamp(
                            "YYYY-MM-DD HH:mm:ss",
                            new Date(item.jionDate)
                        );
                    });
                    this.tableData = res.data.items;
                    this.totalCount = res.data.totalCount;
                }
            });
        },

        // 删除运维
        del(row) {
            this.$confirm("是否确定与此运维方解除合作?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    DelThirdOperation({ Id: row.id }).then((res) => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        this.getOperationList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },

        // 新增运维方
        addOperation() {
            this.showAddYw = true;
        },
        closeOperation() {
            this.showAddYw = false;
            this.getOperationList();
        },

        // 添加污水站
        addSewage(row) {
            this.showAddWsz = true;
            this.operationId = row.id;
        },
        closeSewage() {
            this.showAddWsz = false;
            this.getOperationList();
        },

        // 切换页
        handleCurrentChange(val) {
            this.params.SkipCount = parseInt(
                (val - 1) * this.params.MaxResultCount
            );
            this.getOperationList();
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
.danger-font {
    margin-left: 15px;
}
</style>