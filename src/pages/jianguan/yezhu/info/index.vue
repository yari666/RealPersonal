<!--业主信息-->

<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="0">
            <base-info
                v-if="activeName == '0'"
                :infoData="infoData"
            ></base-info>
        </el-tab-pane>
        <el-tab-pane label="项目列表" name="1" v-if="projectList.length">
            <item-list
                v-if="activeName == '1'"
                :projectList="projectList"
            ></item-list>
        </el-tab-pane>
        <el-tab-pane label="污水站" name="2" v-if="sewageList.length">
            <wsz-list
                v-if="activeName == '2'"
                :sewageList="sewageList"
            ></wsz-list>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import baseInfo from "./baseInfo";
import itemList from "./itemList";
import wszList from "./wszList";

import { OwnerDetailByComapnyId } from "~/config/api.js";

export default {
    data() {
        return {
            activeName: "0",
            infoData: {},
            projectList: [],
            sewageList: [],
        };
    },
    props: ["infoIndex", "id"],
    components: { baseInfo, itemList, wszList },
    created() {
        this.getInfo();
    },
    mounted() {
        this.activeName = this.infoIndex;
    },
    watch: {
        infoIndex() {
            this.activeName = this.infoIndex;
        },
    },
    methods: {
        handleClick(tab, event) {},

        // 获取业主信息
        getInfo() {
            OwnerDetailByComapnyId({ Id: this.id }).then((res) => {
                if (res && res.data) {
                    this.infoData = res.data;
                    this.projectList = res.data.projectNameList;
                    this.sewageList = res.data.sewageNameList;
                }
            });
        },
    },
};
</script>