<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
            <base-box></base-box>
        </el-tab-pane>
        <el-tab-pane label="人员证书" name="second">
            <certificate></certificate>
        </el-tab-pane>
        <el-tab-pane label="人员履历" name="three">
            <vitae></vitae>
        </el-tab-pane>
    </el-tabs>
</template>


<script>
import baseBox from "./base";
import certificate from "./certificate";
import vitae from "./vitae";

export default {
    data() {
        return {
            activeName: "first",
        };
    },
    components: { baseBox, certificate, vitae },
    methods: {
        handleClick(tab, event) {},
    },
};
</script>

<style lang="less" >
.dialog {
    .el-dialog__body {
        padding: 10px 20px 30px;
    }
}
</style>