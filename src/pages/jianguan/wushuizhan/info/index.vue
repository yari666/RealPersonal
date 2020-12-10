<!--监管-污水站-基本信息-->
<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="0">
            <base-info
                :sewageBaseInfo="sewageBaseInfo"
                :deviceLists="deviceLists"
            ></base-info>
        </el-tab-pane>
        <el-tab-pane label="预警通知" name="1">
            <list1 :type="1"></list1>
        </el-tab-pane>
        <el-tab-pane label="维修记录" name="2">
            <list1 :type="2"></list1>
        </el-tab-pane>
        <el-tab-pane label="巡检记录" name="3">
            <list1 :type="3"></list1>
        </el-tab-pane>
        <el-tab-pane label="监查记录" name="4">
            <list1 :type="4"></list1>
        </el-tab-pane>
        <el-tab-pane label="健康评价" name="5">
            <jkpj></jkpj>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import baseInfo from "./baseInfo"; //业主+运维
import jkpj from "~/components/jkpj";
import list1 from "~/components/list1";

import { SewageDetail } from "~/config/api.js";

export default {
    data() {
        return {
            activeName: "0",
            sewageBaseInfo: {},
            deviceLists: [],
        };
    },
    props: ["infoIndex", "sewageId"],
    components: { baseInfo, list1, jkpj },
    watch: {
        infoIndex() {
            this.activeName = this.infoIndex;
        },
    },
    created() {
        this.activeName = this.infoIndex;
        this.getSewageInfo();
    },
    methods: {
        // 获取污水站信息
        getSewageInfo() {
            SewageDetail({ Id: this.sewageId }).then((res) => {
                if (res) {
                    res = res.data;
                    this.sewageBaseInfo = res.sewageBaseInfo;
                    this.deviceLists = res.deviceLists;
                }
            });
        },

        handleClick(tab, event) {
            // this.$emit("changeInfoIndex", { infoIndex: tab.index });
        },
    },
};
</script>