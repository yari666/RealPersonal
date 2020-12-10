<!---运维-我的业主方----->
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
                prop="companyName"
                label="业主名称"
            ></el-table-column>

            <el-table-column width="80px" label="业主类型"
                ><template slot-scope="scope">
                    {{ scope.row.ownerType == 0 ? "企业" : "政府" }}</template
                ></el-table-column
            >

            <el-table-column prop="area" label="所属区域"></el-table-column>

            <el-table-column label="负责人/联系方式">
                <template slot-scope="scope">
                    {{ scope.row.companyLegalPerson }}/{{
                        scope.row.companyMobilePhone
                    }}</template
                ></el-table-column
            >
            <el-table-column prop="tab5" label="运维内容"></el-table-column>

            <el-table-column
                prop="tab6"
                width="100px"
                label="维修工单"
            ></el-table-column>

            <el-table-column
                prop="tab7"
                width="100px"
                label="巡检工单"
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
            :close-on-click-modal="false"
            title="查看业主"
            :visible.sync="showInfo"
        >
            <company-info
                v-if="showInfo"
                :infoIndex="infoIndex"
                :id="infoId"
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
// import add from "./addCompany/addCompany";

import companyInfo from "./info/index";
import { MyOwnerLists } from "~/config/api.js";

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

            addCompany: false,
            showInfo: false,
            infoIndex: 0,
            infoId: "",
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
    components: { companyInfo },
    methods: {
        // 获取业主方列表
        getList() {
            let obj = Object.assign({}, this.params, { UserId: this.userId });
            MyOwnerLists(obj).then((res) => {
                if (res && res.data && res.data.totalCount) {
                    this.tableData = res.data.items;
                    this.totalCount = res.data.totalCount;
                }
            });
        },

        // 查询
        search() {
            this.params.SkipCount = 0;
            this.getList();
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
            this.infoId = row.companyId;
            this.showInfo = true;
        },

        closeDialog() {
            this.showInfo = false;
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