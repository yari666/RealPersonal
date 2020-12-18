<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户信息" name="first">
            <base-box></base-box>
        </el-tab-pane>
        <el-tab-pane label="用户权限" name="second">
            <authority></authority>
        </el-tab-pane>
    </el-tabs>
</template>



<script>
import baseBox from "./base";
import authority from "./authority";
import Authority from "./authority.vue";

export default {
    data() {
        return {
            activeName: "first",
        };
    },
    components: { baseBox, authority },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
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