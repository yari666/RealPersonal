<!--运维-我的业主方-->

<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="main p20">
        <el-tab-pane label="运维方列表" name="list">
            <yz-list></yz-list>
        </el-tab-pane>
        <el-tab-pane label="运维方通知" name="notice">
            <notice></notice>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import yzList from "./yzList";
import notice from "./notice";

export default {
    data() {
        return {
            activeName: "list",
        };
    },
    components: { yzList, notice },
    methods: {
        handleClick(tab, event) {},
    },
};
</script>