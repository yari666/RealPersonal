<!--运维-通知-->

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
                <el-button class="add-btn" @click="addNotice">新增</el-button>
                <el-button type="primary" class="ml10">导出数据</el-button>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%" max-height="700">
            <el-table-column prop="noticeTitle" label="标题"></el-table-column>
            <el-table-column
                prop="companyName"
                label="运维方"
            ></el-table-column>
            <el-table-column
                prop="publishDate"
                label="通知时间"
            ></el-table-column>
            <el-table-column width="180px" label="操作">
                <template slot-scope="scope">
                    <span class="base-font" @click="info(scope.row)">查看</span>
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
            title="通知详情"
            :visible.sync="noticeInfo"
        >
            <notice-info
                v-if="noticeInfo"
                :infoContent="infoContent"
                @closeDialog="closeDialog"
            ></notice-info>
        </el-dialog>

        <el-dialog
            :close-on-click-modal="false"
            title="新增通知"
            :visible.sync="showAddNotice"
        >
            <add-notice-box
                v-if="showAddNotice"
                @closeDialog="closeDialog"
            ></add-notice-box>
        </el-dialog>
    </div>
</template>

<script>
const timestamp = require("time-stamp");

import noticeInfo from "~/components/noticeInfo";
import addNoticeBox from "./addNoticeBox";

import { NoticeLists } from "~/config/api.js";

export default {
    data() {
        return {
            tableData: [],
            totalCount: 0,
            params: {
                IsOwner: true, //是否为业主方
                KeyWord: "",
                Sorting: "",
                SkipCount: 0, //第几页
                MaxResultCount: 10, //每页显示10条
            },

            noticeInfo: false,
            showAddNotice: false,
            infoContent: {},
        };
    },
    components: { noticeInfo, addNoticeBox },
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    created() {
        this.getNoticeList();
    },
    methods: {
        // 获取通知列表
        getNoticeList() {
            let obj = Object.assign({}, this.params, { UserId: this.userId });
            NoticeLists(obj).then((res) => {
                if (res && res.data) {
                    res.data.items.forEach((item) => {
                        item.publishDate = timestamp(
                            "YYYY-MM-DD HH:mm:ss",
                            new Date(item.publishDate)
                        );
                    });

                    this.tableData = res.data.items;
                    this.totalCount = res.data.totalCount;
                }
            });
        },

        // 查询
        search() {
            this.params.SkipCount = 0;
            this.getNoticeList();
        },
        // 切换页
        handleCurrentChange(val) {
            this.params.SkipCount = parseInt(
                (val - 1) * this.params.MaxResultCount
            );
            this.getNoticeList();
        },

        addNotice() {
            this.showAddNotice = true;
        },

        info(row) {
            this.noticeInfo = true;
            this.infoContent = row;
        },

        closeDialog() {
            this.noticeInfo = false;
            this.showAddNotice = false;
            this.getNoticeList();
        },
    },
};
</script>

<style lang="less" scoped>
.block {
    text-align: center;
    margin: 15px auto 0;
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