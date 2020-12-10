<!---监管-污水站----->
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

            <!-- tab切换 -->
            <ul class="tab">
                <li
                    :class="tabIndex == index ? 'active' : ''"
                    v-for="(item, index) in tabData"
                    :key="index"
                    @click="changeTab(index)"
                >
                    {{ item }}
                </li>
            </ul>
        </div>

        <div class="tab-con">
            <list
                v-if="tabIndex == 0"
                @changePage="changePage"
                :tableData="tableData"
                :params="params"
                :totalCount="totalCount"
            ></list>
            <map-con :tableData="tableData" v-else></map-con>
        </div>
    </div>
</template>

<script>
import sewageInfo from "./info/index";
import list from "./list";
import mapCon from "~/components/mapCon";

import { SewageStationForGovList } from "~/config/api.js";

export default {
    data() {
        return {
            tabData: ["列表", "地图"],
            tabIndex: 0,

            tableData: [],
            totalCount: 0,

            params: {
                UserId: "",
                KeyWord: "",
                Sorting: "",
                SkipCount: 0, //跨过几条
                MaxResultCount: 10, //每页显示10条
            },
        };
    },
    components: { sewageInfo, list, mapCon },
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    watch: {
        userId() {
            this.params.UserId = this.userId;
            this.getList();
        },
    },
    created() {
        this.getList();
    },
    methods: {
        // 获取列表
        getList() {
            let obj = Object.assign({}, this.params, { UserId: this.userId });

            SewageStationForGovList(obj).then((res) => {
                if (res) {
                    this.tableData = res.data.items;
                    this.totalCount = res.data.totalCount;
                }
            });
        },

        changePage(e) {
            this.params.SkipCount = parseInt(
                (e.pageIndex - 1) * this.params.MaxResultCount
            );
            this.getList();
        },

        changeTab(index) {
            this.tabIndex = index;
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
.tab {
    position: absolute;
    top: 20px;
    right: 10px;
    border: 1px #28adca solid;
    border-radius: 3px;
    font-size: 14px;
    cursor: pointer;
    li {
        float: left;
        padding: 5px 20px;
        &.active {
            background: #28adca;
            color: #fff;
        }
    }
}
.tab-con {
    height: calc(~"100vh - 200px");
}

.el-input {
    width: 400px;
}
</style>