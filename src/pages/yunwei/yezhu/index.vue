<!--运维-我的业主方-->

<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="main p20">
        <el-tab-pane label="业主方列表" name="list">
            <company></company>
        </el-tab-pane>
        <el-tab-pane label="业主方通知" name="notice">
            <notice></notice>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import company from "./company";
import notice from "./notice";

export default {
    data() {
        return {
            activeName: "list",
        };
    },
    components: { company, notice },
    methods: {
        handleClick(tab, event) {},
    },
};
</script>